import React, { useEffect } from "react";
import {
  TextInput,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchPersonalData } from "../apiServices";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";
import { EXPO_PUBLIC_API_MIPAQUETE } from "@env";

const PersonalDataScreen = () => {
  const [uid, setUid] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [form, setForm] = React.useState({
    nombre: "",
    apellido: "",
    celular: "",
    cedula: "",
    direccion: "",
    pais: "",
    ciudad: "",
    email: "",
    destinyDaneCode: "",
    casillero: "",
  });
  const [value, setValue] = React.useState(null);
  const [isFocus, setIsFocus] = React.useState(false);
  const [dataa, setDataa] = React.useState([]);

  const handleChange = (name, value) => {
    setForm({
      ...form,
      [name]: value,
    });
  };

  // LLAMADA A MI PAQUETE
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api-v2.dev.mpr.mipaquete.com/getLocations",
          {
            method: "GET",
            headers: {
              apikey: EXPO_PUBLIC_API_MIPAQUETE,
              "session-tracker": "a0c96ea6-b22d-4fb7-a278-850678d5429c",
            },
          }
        );
        const result = await response.json();
        const capitalize = (text) => {
          return text
            .toLowerCase()
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
        };
        const transformedData = result
          .map((item) => ({
            label: `${capitalize(item.locationName)}, ${capitalize(
              item.departmentOrStateName
            )}`,
            value: item._id,
            locationCode: item.locationCode,
          }))
          .sort((a, b) => a.label.localeCompare(b.label));
        setDataa(transformedData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  

  // LLAMADO INCIAL PARA TRAER LA DATA DEL CLIENTE, SE CARGA AL ABRIR LA SCREEN
  React.useEffect(() => {
    const getMyStringValue = async () => {
      try {
        const value = await AsyncStorage.getItem("key");
        if (value) {
          setUid(value);
          const userData = await fetchPersonalData(value);
          if (userData) {
            setForm({
              nombre: userData.name || "",
              apellido: userData.surname || "",
              celular: userData.cellPhone || "",
              cedula: userData.nit || "",
              direccion: userData.destinationAddress || "",
              pais: userData.country,
              ciudad: userData.locationName || "",
              email: userData.email || "",
              destinyDaneCode: userData.destinyDaneCode || "",
              casillero: userData.locker.toUpperCase() || "",
            });
          }
        }
      } catch (e) {
        console.error("Something went wrong identifying user storage", e);
      }
    };

    getMyStringValue();
  }, []);

  // GUARDAR INFORMACION DEL FORMULARIO EN FIREBASE
  const enviarFormulario = async () => {
    setIsLoading(true);
    const {
      cedula,
      nombre,
      apellido,
      direccion,
      celular,
      ciudad,
      email,
      destinyDaneCode,
    } = form;
    // Verificar si algún campo está vacío
    if (
      !cedula ||
      !nombre ||
      !apellido ||
      !direccion ||
      !celular ||
      !ciudad ||
      !email
    ) {
      Alert.alert("Todos los campos son obligatorios");
      setIsLoading(false);
      return;
    }
    const userDataForm = {
      name: nombre,
      surname: apellido,
      cellPhone: celular,
      locationName: ciudad,
      destinyDaneCode: destinyDaneCode,
      destinationAddress: direccion,
    };
    try {
      const userDocRef = doc(db, "users", uid);
      await updateDoc(userDocRef, userDataForm);
    } catch (error) {
      console.error("Error saving user data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.title}>Mis datos personales</Text>

          <Text style={styles.textForm}>Pais</Text>
          <TextInput
            style={styles.input}
            placeholder="Pais"
            value={form.pais}
            editable={false}
            onChangeText={(value) => handleChange("pais", value)}
          />

          <Text style={styles.textForm}>Ciudad</Text>
          <View style={styles.containerDropDown}>
            <Dropdown
              style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={dataa}
              search
              maxHeight={250}
              labelField="label"
              valueField="value"
              placeholder={!isFocus && form.ciudad ? form.ciudad : "Ciudad"}
              searchPlaceholder="Search..."
              value={value}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={(item) => {
                setValue(item.value);
                // setLocationCode(item.locationCode);
                setForm((prevForm) => ({
                  ...prevForm,
                  ciudad: item.label,
                  destinyDaneCode: item.locationCode,
                }));
                setIsFocus(false);
              }}
              renderLeftIcon={() => (
                <AntDesign
                  style={styles.icon}
                  color={isFocus ? "blue" : "black"}
                  name="Safety"
                  size={20}
                />
              )}
            />
          </View>

          <Text style={styles.textForm}>Casillero</Text>
          <TextInput
            style={styles.input}
            placeholder="Pais"
            value={form.casillero}
            editable={false}
          />

          <Text style={styles.textForm}>Cedula (CC)</Text>
          <TextInput
            style={styles.input}
            placeholder="Cedula"
            value={form.cedula}
            keyboardType="numeric"
            editable={false}
          />

          <Text style={styles.textForm}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={form.email}
            editable={false}
          />

          <Text style={styles.textForm}>Nombre(s)</Text>
          <TextInput
            style={styles.input}
            placeholder="Nombre"
            value={form.nombre}
            onChangeText={(value) => handleChange("nombre", value)}
          />

          <Text style={styles.textForm}>Apellidos(s)</Text>
          <TextInput
            style={styles.input}
            placeholder="Apellidos"
            value={form.apellido}
            onChangeText={(value) => handleChange("apellido", value)}
          />

          <Text style={styles.textForm}>Direccion*</Text>
          <TextInput
            style={styles.input}
            placeholder="Direccion"
            value={form.direccion}
            onChangeText={(value) => handleChange("direccion", value)}
          />

          <Text style={styles.textForm}>Celular</Text>
          <TextInput
            style={styles.input}
            placeholder="Celular"
            value={form.celular}
            onChangeText={(value) => handleChange("celular", value)}
          />

          {/* <Text style={styles.textForm}>Ciudad</Text>
          <TextInput
            style={styles.input}
            placeholder="Ciudad"
            value={form.ciudad}
            onChangeText={(value) => handleChange('ciudad', value)}
          /> */}

          <TouchableOpacity
            style={styles.buttonStyles}
            onPress={enviarFormulario}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator size="large" color="#fff" />
            ) : (
              <Text style={styles.textButtonStyles}>Guardar</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PersonalDataScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#C4C4C4",
  },
  container: {
    flex: 1,
    padding: 15,
  },
  containerTracking: {
    flexDirection: "row",
  },
  input: {
    height: 50,
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
    fontSize: 16,
  },
  inputTracking: {
    height: 45,
    width: "85%",
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
  },

  textForm: {
    marginBottom: 5,
    fontWeight: "bold",
    fontSize: 14,
  },
  icon: {
    marginLeft: 10,
  },
  textArea: {
    height: 90,
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
    textAlignVertical: "top",
  },
  checkbox: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 10,
    alignContent: "center",
    justifyContent: "space-around",
    alignItems: "center",
  },
  checkboxContainer: {
    flexDirection: "row",
  },
  checkboxText: {
    marginTop: 10,
    marginBottom: 10,
  },
  buttonStyles: {
    backgroundColor: "blue",
    padding: 10,
    height: 48,
    borderRadius: 5,
    width: "98%",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 18,
  },
  textButtonStyles: {
    color: "white",
    fontWeight: "bold",
    fontSize: 25,
  },
  iconStyles: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  iconContainer: {
    marginRight: 15,
    marginTop: Platform.OS === "ios" ? 35 : 50,
  },
  titleAndIconContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    marginVertical: 20,
  },

  containerDropDown: {
    backgroundColor: "transparent",
    paddingBottom: 10,
  },
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 5,
    paddingHorizontal: 8,
    backgroundColor: "white",
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
