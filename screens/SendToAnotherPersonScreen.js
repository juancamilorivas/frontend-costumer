import React from "react";
import {
  TextInput,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";

//REDUX IMPORTS
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setCreateTracking } from "../reducers/createTrakcing/createTrackingSlice";

const SendToAnotherPersonScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  //REDUX
  const {
    ubicacionEnbodega,
    locker,
    peso,
    alto,
    largo,
    ancho,
    tariffCode,
    contenido,
    imei,
    serial,
  } = useSelector((state) => state.createTracking);

  const enviarFormulario = async () => {
    if (!locker) {
      Alert.alert("El campo 'Casillero' es obligatorio");
      return;
    }

    if (!peso) {
      Alert.alert("El campo 'Peso' es obligatorio");
      return;
    }
    if (!alto) {
      Alert.alert("El campo 'Alto' es obligatorio");
      return;
    }
    if (!ancho) {
      Alert.alert("El campo 'Ancho' es obligatorio");
      return;
    }

    if (!tariffCode) {
      Alert.alert("El campo 'Partida arancelaria' es obligatorio");
      return;
    }
    if (!contenido) {
      Alert.alert("El campo 'Contenido' es obligatorio");
      return;
    }

    if (tariffCode == "321.321.321" && imei == "") {
      Alert.alert("El campo 'IMEI' es obligatorio");
      return;
    }
    if (tariffCode == "121.121.121" && serial == "") {
      Alert.alert("El campo 'Serial' es obligatorio");
      return;
    }
    if (!ubicacionEnbodega) {
      Alert.alert("El campo 'Ubicacion en bodega' es obligatorio");
      return;
    }

    dispatch(
      setCreateTracking({
        peso: "",
        alto: "",
        largo: "",
        ancho: "",
        tariffCode: "",
        contenido: "",
        ubicacionEnbodega: "",
        trackingNumber: "",
        locker: "",
        imei: "",
        serial: "",
        status: "Ingreso a bodega Miami FL.",
        selectedIndex: null,
      })
    );
    navigation.navigate("DeclaredValue");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView>

        <View style={styles.container}>
        <Text style={styles.title}>Enviar a otra persona</Text>


        <Text style={styles.textForm}>Cedula (CC)</Text>
          <TextInput
            style={styles.input}
            placeholder="Cedula"
            value={alto}
            onChangeText={(text) => dispatch(setCreateTracking({ alto: text }))}
          />

          <Text style={styles.textForm}>Nombre(s)</Text>
          <TextInput
            style={styles.input}
            placeholder="Nombre"
            value={locker}
            clearButtonMode="while-editing"
            onChangeText={(text) =>
              dispatch(setCreateTracking({ locker: text }))
            }
          />

          <Text style={styles.textForm}>Apellidos(s)</Text>
          <TextInput
            style={styles.input}
            placeholder="Apellidos"
            value={peso}
            onChangeText={(text) => dispatch(setCreateTracking({ peso: text }))}
          />

       

          <Text style={styles.textForm}>Direccion*</Text>
          <TextInput
            style={styles.input}
            placeholder="Direccion"
            value={largo}
            onChangeText={(text) =>
              dispatch(setCreateTracking({ largo: text }))
            }
          />

          <Text style={styles.textForm}>Pais</Text>
          <TextInput
            style={styles.input}
            placeholder="Pais"
            value={imei}
            onChangeText={(text) => dispatch(setCreateTracking({ imei: text }))}
          />

          <Text style={styles.textForm}>Ciudad</Text>
          <TextInput
            style={styles.input}
            placeholder="Ciudad"
            value={serial}
            clearButtonMode="while-editing"
            onChangeText={(text) =>
              dispatch(setCreateTracking({ serial: text }))
            }
          />

          <TouchableOpacity
            style={styles.buttonStyles}
            onPress={enviarFormulario}
          >
            <Text style={styles.textButtonStyles}>Continuar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SendToAnotherPersonScreen;

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
    height: 45,
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
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
});
