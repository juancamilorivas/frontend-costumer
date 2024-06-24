// import React from "react";
// import {
//   TextInput,
//   SafeAreaView,
//   StyleSheet,
//   Text,
//   View,
//   ScrollView,
//   TouchableOpacity,
//   Alert,
// } from "react-native";

// //REDUX IMPORTS
// import { useSelector } from "react-redux";
// import { useDispatch } from "react-redux";
// import { setCreateTracking } from "../reducers/createTrakcing/createTrackingSlice";

// const PersonalDataScreen = ({ navigation }) => {
//   const dispatch = useDispatch();

//   //REDUX
//   const {
//     ubicacionEnbodega,
//     locker,
//     peso,
//     alto,
//     largo,
//     ancho,
//     tariffCode,
//     contenido,
//     imei,
//     serial,
//   } = useSelector((state) => state.createTracking);

//   const enviarFormulario = async () => {
//     if (!locker) {
//       Alert.alert("El campo 'Casillero' es obligatorio");
//       return;
//     }

//     if (!peso) {
//       Alert.alert("El campo 'Peso' es obligatorio");
//       return;
//     }
//     if (!alto) {
//       Alert.alert("El campo 'Alto' es obligatorio");
//       return;
//     }
//     if (!ancho) {
//       Alert.alert("El campo 'Ancho' es obligatorio");
//       return;
//     }

//     if (!tariffCode) {
//       Alert.alert("El campo 'Partida arancelaria' es obligatorio");
//       return;
//     }
//     if (!contenido) {
//       Alert.alert("El campo 'Contenido' es obligatorio");
//       return;
//     }

//     if (tariffCode == "321.321.321" && imei == "") {
//       Alert.alert("El campo 'IMEI' es obligatorio");
//       return;
//     }
//     if (tariffCode == "121.121.121" && serial == "") {
//       Alert.alert("El campo 'Serial' es obligatorio");
//       return;
//     }
//     if (!ubicacionEnbodega) {
//       Alert.alert("El campo 'Ubicacion en bodega' es obligatorio");
//       return;
//     }

//     dispatch(
//       setCreateTracking({
//         peso: "",
//         alto: "",
//         largo: "",
//         ancho: "",
//         tariffCode: "",
//         contenido: "",
//         ubicacionEnbodega: "",
//         trackingNumber: "",
//         locker: "",
//         imei: "",
//         serial: "",
//         status: "Ingreso a bodega Miami FL.",
//         selectedIndex: null,
//       })
//     );
//     navigation.navigate("DeclaredValue");
//   };

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <ScrollView>

//         <View style={styles.container}>
//         <Text style={styles.title}>Datos personales</Text>


//         <Text style={styles.textForm}>Cedula De Ciudadania (CC)</Text>
//           <TextInput
//             style={styles.input}
//             placeholder="Cedula"
//             value={alto}
//             onChangeText={(text) => dispatch(setCreateTracking({ alto: text }))}
//           />

//           <Text style={styles.textForm}>Nombre(s)</Text>
//           <TextInput
//             style={styles.input}
//             placeholder="Nombre"
//             value={locker}
//             clearButtonMode="while-editing"
//             onChangeText={(text) =>
//               dispatch(setCreateTracking({ locker: text }))
//             }
//           />

//           <Text style={styles.textForm}>Apellido(s)</Text>
//           <TextInput
//             style={styles.input}
//             placeholder="Apellidos"
//             value={peso}
//             onChangeText={(text) => dispatch(setCreateTracking({ peso: text }))}
//           />

       

//           <Text style={styles.textForm}>Direccion</Text>
//           <TextInput
//             style={styles.input}
//             placeholder="Direccion"
//             value={largo}
//             onChangeText={(text) =>
//               dispatch(setCreateTracking({ largo: text }))
//             }
//           />

        

//           <Text style={styles.textForm}>Pais</Text>
//           <TextInput
//             style={styles.input}
//             placeholder="Pais"
//             value={imei}
//             onChangeText={(text) => dispatch(setCreateTracking({ imei: text }))}
//           />

//           <Text style={styles.textForm}>Ciudad</Text>
//           <TextInput
//             style={styles.input}
//             placeholder="Ciudad"
//             value={serial}
//             clearButtonMode="while-editing"
//             onChangeText={(text) =>
//               dispatch(setCreateTracking({ serial: text }))
//             }
//           />

//           <TouchableOpacity
//             style={styles.buttonStyles}
//             onPress={enviarFormulario}
//           >
//             <Text style={styles.textButtonStyles}>Guardar</Text>
//           </TouchableOpacity>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default PersonalDataScreen;

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: "#C4C4C4",
//   },
//   container: {
//     flex: 1,
//     padding: 15,
//   },
//   containerTracking: {
//     flexDirection: "row",
//   },
//   input: {
//     height: 45,
//     width: "100%",
//     borderWidth: 1,
//     borderColor: "#ccc",
//     marginBottom: 10,
//     paddingHorizontal: 10,
//     backgroundColor: "#fff",
//     borderRadius: 5,
//   },
//   inputTracking: {
//     height: 45,
//     width: "85%",
//     borderWidth: 1,
//     borderColor: "#ccc",
//     marginBottom: 10,
//     paddingHorizontal: 10,
//     backgroundColor: "#fff",
//     borderRadius: 5,
//   },

//   textForm: {
//     marginBottom: 5,
//     fontWeight: "bold",
//     fontSize: 14,
//   },
//   icon: {
//     marginLeft: 10,
//   },
//   textArea: {
//     height: 90,
//     width: "100%",
//     borderWidth: 1,
//     borderColor: "#ccc",
//     marginBottom: 10,
//     paddingHorizontal: 10,
//     paddingVertical: 10,
//     backgroundColor: "#fff",
//     borderRadius: 5,
//     textAlignVertical: "top",
//   },
//   checkbox: {
//     flexDirection: "row",
//     marginTop: 10,
//     marginBottom: 10,
//     alignContent: "center",
//     justifyContent: "space-around",
//     alignItems: "center",
//   },
//   checkboxContainer: {
//     flexDirection: "row",
//   },
//   checkboxText: {
//     marginTop: 10,
//     marginBottom: 10,
//   },
//   buttonStyles: {
//     backgroundColor: "blue",
//     padding: 10,
//     height: 48,
//     borderRadius: 5,
//     width: "98%",
//     justifyContent: "center",
//     alignItems: "center",
//     alignSelf: "center",
//     marginTop: 20,
//     marginBottom: 18,
//   },
//   textButtonStyles: {
//     color: "white",
//     fontWeight: "bold",
//     fontSize: 25,
//   },
//   iconStyles: {
//     flexDirection: "row",
//     justifyContent: "flex-end",
//   },
//   iconContainer: {
//     marginRight: 15,
//     marginTop: Platform.OS === "ios" ? 35 : 50,
//   },
//   titleAndIconContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//   },
//   title: {
//     fontSize: 25,
//     fontWeight: "bold",
//     marginVertical: 20,
//   },
// });




































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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchPersonalDataOnSnapshot } from "../apiServices";


//REDUX IMPORTS
import { useDispatch } from "react-redux";
import { setReceiver } from "../reducers/receiver/receiverSlice";

const PersonalDataScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const [uid, setUid] = React.useState(null);
  const [form, setForm] = React.useState({
    nombre: "",
    apellido: "",
    celular: "",
    cedula: "",
    direccion: "",
    pais: "Colombia",
    ciudad: "",
    email: "",
  });

  const handleChange = (name, value) => {
    setForm({
      ...form,
      [name]: value,
    });
  };

  React.useEffect(() => {
    const getMyStringValue = async () => {
      try {
        const value = await AsyncStorage.getItem("key");
        if (value) {
          setUid(value);
          // Llama a fetchPersonalDataOnSnapshot con el uid obtenido y actualiza el estado del formulario
          const unsubscribe = fetchPersonalDataOnSnapshot(value, (userData) => {
            if (userData) {
              setForm({
                nombre: userData.name || "",
                apellido: userData.surname || "",
                celular: userData.cellPhone || "",
                cedula: userData.nit || "",
                direccion: userData.destinationAddress || "",
                pais: "Colombia",
                ciudad: userData.destinyDaneCode || "",
                email: userData.email || "",
              });
            }
          });

          // Limpia la suscripción cuando el componente se desmonta
          return () => unsubscribe();
        }
      } catch (e) {
        console.log("Something went wrong identifying user storage", e);
      }
    };

    getMyStringValue();
  }, []);

  const enviarFormulario = async () => {
    const { cedula, nombre, apellido, direccion, celular, ciudad, email } = form;

    if (!cedula) {
      Alert.alert("El campo 'Cedula' es obligatorio");
      return;
    }
    if (!nombre) {
      Alert.alert("El campo 'Nombre' es obligatorio");
      return;
    }
    if (!apellido) {
      Alert.alert("El campo 'Apellido' es obligatorio");
      return;
    }
    if (!direccion) {
      Alert.alert("El campo 'Direccion' es obligatorio");
      return;
    }

    if (!celular) {
      Alert.alert("El campo 'Celular' es obligatorio");
      return;
    }
    if (!ciudad) {
      Alert.alert("El campo 'Ciudad' es obligatorio");
      return;
    }
    if (!email) {
      Alert.alert("El campo 'Email' es obligatorio");
      return;
    }
  

    dispatch(
      setReceiver({
        "name": nombre,
        "surname": apellido,
        "cellPhone": celular,
        "email": email,
        "nit": cedula,
        "destinyDaneCode": ciudad,
        "destinationAddress": direccion
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
            value={form.cedula}
            keyboardType="numeric"
            onChangeText={(value) => handleChange('cedula', value)}
          />

        <Text style={styles.textForm}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={form.email}
            onChangeText={(value) => handleChange('email', value)}
          />

          <Text style={styles.textForm}>Nombre(s)</Text>
          <TextInput
            style={styles.input}
            placeholder="Nombre"
            value={form.nombre}
            // clearButtonMode="while-editing"
            onChangeText={(value) => handleChange('nombre', value)}
          />

          <Text style={styles.textForm}>Apellidos(s)</Text>
          <TextInput
            style={styles.input}
            placeholder="Apellidos"
            value={form.apellido}
            onChangeText={(value) => handleChange('apellido', value)}
          />

          <Text style={styles.textForm}>Direccion*</Text>
          <TextInput
            style={styles.input}
            placeholder="Direccion"
            value={form.direccion}
            onChangeText={(value) => handleChange('direccion', value)}
          />

          <Text style={styles.textForm}>Celular</Text>
          <TextInput
            style={styles.input}
            placeholder="Celular"
            value={form.celular}
            onChangeText={(value) => handleChange('celular', value)}
          />

          <Text style={styles.textForm}>Pais</Text>
          <TextInput
            style={styles.input}
            placeholder="Pais"
            value={form.pais}
            editable={false}
            onChangeText={(value) => handleChange('pais', value)}
          />

          <Text style={styles.textForm}>Ciudad</Text>
          <TextInput
            style={styles.input}
            placeholder="Ciudad"
            value={form.ciudad}
            onChangeText={(value) => handleChange('ciudad', value)}
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
