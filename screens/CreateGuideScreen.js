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

import { CheckBox } from "@rneui/themed";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faBarcode } from "@fortawesome/free-solid-svg-icons/faBarcode";
import { faBuilding } from "@fortawesome/free-solid-svg-icons/faBuilding";
import Header from "../components/Header";
import { faArrowRotateRight } from "@fortawesome/free-solid-svg-icons/faArrowRotateRight";

//FIREBASE IMPORTS
import { db } from "../firebase";
import { Timestamp, addDoc, collection } from "firebase/firestore";

//REDUX IMPORTS
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setCreateTracking } from "../reducers/createTrakcing/createTrackingSlice";
import { unsetCreateTracking } from "../reducers/createTrakcing/createTrackingSlice";

const CreateGuideScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  //REDUX
  const {
    trackingNumber,
    ubicacionEnbodega,
    locker,
    peso,
    alto,
    largo,
    ancho,
    tariffCode,
    contenido,
    status,
    imei,
    serial,
    selectedIndex,
  } = useSelector((state) => state.createTracking);

  //CHECKBOXES
  const handleCheckboxToggle = (index) => {
    if (selectedIndex === index) {
      dispatch(
        setCreateTracking({
          peso: "",
          alto: "",
          largo: "",
          ancho: "",
          tariffCode: "",
          contenido: "",
          selectedIndex: null,
        })
      );
      return;
    }
    if (index == "0") {
      dispatch(
        setCreateTracking({
          peso: "1",
          alto: "1",
          largo: "11",
          ancho: "22",
          tariffCode: "121.3.124.34",
          contenido: "Documentos",
          imei: "",
          serial: "",
          selectedIndex: index,
        })
      );

      return;
    }
    if (index == "1") {
      dispatch(
        setCreateTracking({
          peso: "",
          alto: "",
          largo: "",
          ancho: "",
          tariffCode: "121.121.121",
          contenido: "Computador",
          selectedIndex: index,
        })
      );

      return;
    }
    if (index == "2") {
      dispatch(
        setCreateTracking({
          peso: "1",
          alto: "",
          largo: "",
          ancho: "",
          tariffCode: "321.321.321",
          contenido: "Celular",
          imei: "",
          serial: "",
          selectedIndex: index,
        })
      );

      return;
    } else {
      // De lo contrario, marca el índice seleccionado
      console.log(index);
    }
  };

  const enviarFormulario = async () => {
    // Aquí puedes manejar el envío de los datos del formulario
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

    console.log("Formulario enviado:", {
      trackingNumber,
      locker,
      peso,
      alto,
      largo,
      ancho,
      tariffCode,
      ubicacionEnbodega,
      contenido,
      imei,
      serial,
    });

    const docRef = await addDoc(collection(db, "trackings"), {
      corporative: false,
      providerTrackingNumber: trackingNumber,
      locker: locker,
      weight: peso,
      height: alto,
      length: largo,
      width: ancho,
      tariffCode: tariffCode,
      warehouseLocation: ubicacionEnbodega,
      contenido: contenido,
      imei: imei,
      serial: serial,
      dateCreation: Timestamp.fromDate(new Date()),
      status: [
        {
          status: status,
          dateCreation: Timestamp.fromDate(new Date()),
        },
      ],
    });
    const numeroDeGuia = docRef.id;
    Alert.alert("Se creo exitosamente la guia, el numero de guia es: ", numeroDeGuia);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView>
        <View style={styles.titleAndIconContainer}>
          <Header text="Crear guia" />

          <View style={styles.iconContainer}>
            <TouchableOpacity
              style={styles.iconStyles}
              onPress={() => dispatch(unsetCreateTracking())}
            >
              <FontAwesomeIcon
                icon={faArrowRotateRight}
                size={25}
                color="#000000"
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.container}>
          <Text style={styles.textForm}>Trakcing number</Text>
          <View style={styles.containerTracking}>
            <TextInput
              style={styles.inputTracking}
              placeholder="Número de Tracking"
              value={trackingNumber}
              clearButtonMode="while-editing"
              // onChangeText={(text) => setTrackingNumber(text)}
              onChangeText={(text) =>
                dispatch(setCreateTracking({ trackingNumber: text }))
              }
            />
            <FontAwesomeIcon icon={faBarcode} size={40} style={styles.icon} />
          </View>

          <Text style={styles.textForm}>Casillero*</Text>
          <TextInput
            style={styles.input}
            placeholder="Casillero"
            value={locker}
            clearButtonMode="while-editing"
            // onChangeText={(text) => setLocker(text)}
            onChangeText={(text) =>
              dispatch(setCreateTracking({ locker: text }))
            }
          />

          <View style={styles.checkbox}>
            <View style={styles.checkboxContainer}>
              <CheckBox
                checked={selectedIndex === 0}
                onPress={() => handleCheckboxToggle(0)}
                checkedIcon="dot-circle-o"
                uncheckedIcon="circle-o"
                uncheckedColor="black"
                containerStyle={{
                  backgroundColor: "transparent",
                  borderWidth: 0,
                  padding: 0,
                  marginRight: 5,
                }} // Estilos del contenedor
              />
              <Text style={styles.checkboxText}>Sobre</Text>
            </View>

            <View style={styles.checkboxContainer}>
              <CheckBox
                checked={selectedIndex === 1}
                onPress={() => handleCheckboxToggle(1)}
                checkedIcon="dot-circle-o"
                uncheckedIcon="circle-o"
                uncheckedColor="black"
                containerStyle={{
                  backgroundColor: "transparent",
                  borderWidth: 0,
                  padding: 0,
                  marginRight: 5,
                }} // Estilos del contenedor
              />
              <Text style={styles.checkboxText}>Computador</Text>
            </View>

            <View style={styles.checkboxContainer}>
              <CheckBox
                checked={selectedIndex === 2}
                onPress={() => handleCheckboxToggle(2)}
                checkedIcon="dot-circle-o"
                uncheckedIcon="circle-o"
                uncheckedColor="black"
                containerStyle={{
                  backgroundColor: "transparent",
                  borderWidth: 0,
                  padding: 0,
                  marginRight: 5,
                }} // Estilos del contenedor
              />
              <Text style={styles.checkboxText}>Celular</Text>
            </View>
          </View>

          <Text style={styles.textForm}>Peso*</Text>
          <TextInput
            style={styles.input}
            placeholder="Peso"
            value={peso}
            // onChangeText={(text) => setPeso(text)}
            onChangeText={(text) => dispatch(setCreateTracking({ peso: text }))}
          />

          <Text style={styles.textForm}>Alto*</Text>
          <TextInput
            style={styles.input}
            placeholder="Casillero"
            value={alto}
            // onChangeText={(text) => setAlto(text)}
            onChangeText={(text) => dispatch(setCreateTracking({ alto: text }))}
          />

          <Text style={styles.textForm}>Largo*</Text>
          <TextInput
            style={styles.input}
            placeholder="Largo"
            value={largo}
            // onChangeText={(text) => setLargo(text)}
            onChangeText={(text) =>
              dispatch(setCreateTracking({ largo: text }))
            }
          />

          <Text style={styles.textForm}>Ancho*</Text>
          <TextInput
            style={styles.input}
            placeholder="Ancho"
            value={ancho}
            // onChangeText={(text) => setAncho(text)}
            onChangeText={(text) =>
              dispatch(setCreateTracking({ ancho: text }))
            }
          />

          <Text style={styles.textForm}>Partida arancelaria*</Text>
          <View style={styles.containerTracking}>
            <TextInput
              style={styles.inputTracking}
              placeholder="Partida arancelaria"
              value={tariffCode}
              // onChangeText={(text) => setTariffCode(text)}
              onChangeText={(text) =>
                dispatch(setCreateTracking({ tariffCode: text }))
              }
            />
            <FontAwesomeIcon icon={faBuilding} size={40} style={styles.icon} />
          </View>

          <Text style={styles.textForm}>Contenido*</Text>
          <TextInput
            style={styles.textArea}
            placeholder="Contenido fisico"
            value={contenido}
            multiline={true}
            crollViewProps={{
              showsVerticalScrollIndicator: true, // Muestra la barra de desplazamiento vertical
            }}
            // onChangeText={(text) => setContenido(text)}
            onChangeText={(text) =>
              dispatch(setCreateTracking({ contenido: text }))
            }
          />

          <Text style={styles.textForm}>Status*</Text>
          <TextInput
            style={styles.textArea}
            placeholder="Contenido fisico"
            value={status}
            multiline={true}
            crollViewProps={{
              showsVerticalScrollIndicator: true, // Muestra la barra de desplazamiento vertical
            }}
            // onChangeText={(text) => setStatus(text)}
            onChangeText={(text) =>
              dispatch(setCreateTracking({ status: text }))
            }
          />

          <Text style={styles.textForm}>IMEI</Text>
          <TextInput
            style={styles.input}
            placeholder="IMEI del celular"
            value={imei}
            // onChangeText={(text) => setImei(text)}
            onChangeText={(text) => dispatch(setCreateTracking({ imei: text }))}
          />

          <Text style={styles.textForm}>Serial</Text>
          <TextInput
            style={styles.input}
            placeholder="Serial del computador"
            value={serial}
            clearButtonMode="while-editing"
            // onChangeText={(text) => setSerial(text)}
            onChangeText={(text) =>
              dispatch(setCreateTracking({ serial: text }))
            }
          />

          <Text style={styles.textForm}>Ubicacion en bodega*</Text>
          <View style={styles.containerTracking}>
            <TextInput
              style={styles.inputTracking}
              placeholder="Ubicacion en bodega"
              value={ubicacionEnbodega}
              clearButtonMode="while-editing"
              // onChangeText={(text) => setUbicacionEnBodega(text)}
              onChangeText={(text) =>
                dispatch(setCreateTracking({ ubicacionEnbodega: text }))
              }
            />
            <FontAwesomeIcon icon={faBarcode} size={40} style={styles.icon} />
          </View>

          <TouchableOpacity
            style={styles.buttonStyles}
            onPress={enviarFormulario}
          >
            <Text style={styles.textButtonStyles}>Crear</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateGuideScreen;

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
    textAlignVertical: 'top', 
    
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
    alignSelf: "center", // Agrega esta línea para centrar el botón
    marginTop: 20, // Añade un margen superior opcional para separar el botón del contenido superior
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
    marginTop: Platform.OS === 'ios' ? 35 : 50, 

  },
  titleAndIconContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
