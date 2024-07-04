import React from "react";
import {
  TextInput,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchPersonalData } from "../apiServices";

const FromDataScreen = () => {
  const [form, setForm] = React.useState({
    nombre: "",
    apellido: "",
    celular: "",
    cedula: "",
    direccion: "",
    pais: "Colombia",
    ciudad: "",
    email: "",
    destinyDaneCode: "",
  });

  // LLAMADO INCIAL PARA TRAER LA DATA DEL CLIENTE, SE CARGA AL ABRIR LA SCREEN
  React.useEffect(() => {
    const getMyStringValue = async () => {
      try {
        const value = await AsyncStorage.getItem("key");
        if (value) {
          const userData = await fetchPersonalData(value);
          if (userData) {
            setForm({
              nombre: userData.name || "",
              apellido: userData.surname || "",
              celular: userData.cellPhone || "",
              cedula: userData.nit || "",
              direccion: userData.destinationAddress || "",
              pais: "Colombia",
              ciudad: userData.locationName || "",
              email: userData.email || "",
              destinyDaneCode: userData.destinyDaneCode || "",
            });
          }
        }
      } catch (e) {
        console.error("Something went wrong identifying user storage", e);
      }
    };

    getMyStringValue();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.title}>Remitente</Text>

          <Text style={styles.textForm}>Pais</Text>
          <TextInput
            style={styles.input}
            placeholder="Pais"
            value={form.pais}
            editable={false}
          />

          <Text style={styles.textForm}>Ciudad</Text>
          <TextInput
            style={styles.input}
            placeholder="Ciudad"
            value={form.ciudad}
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
            editable={false}
          />

          <Text style={styles.textForm}>Apellidos(s)</Text>
          <TextInput
            style={styles.input}
            placeholder="Apellidos"
            value={form.apellido}
            editable={false}
          />

          <Text style={styles.textForm}>Direccion*</Text>
          <TextInput
            style={styles.input}
            placeholder="Direccion"
            value={form.direccion}
            editable={false}
          />

          <Text style={styles.textForm}>Celular</Text>
          <TextInput
            style={styles.input}
            placeholder="Celular"
            value={form.celular}
            editable={false}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default FromDataScreen;

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
