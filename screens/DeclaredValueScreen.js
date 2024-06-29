// import React from "react";
// import {
//   Text,
//   StyleSheet,
//   View,
//   TouchableOpacity,
//   TextInput,
// } from "react-native";

// //REDUX IMPORTS
// import { useSelector } from "react-redux";


// const DeclaredValueScreen = ({navigation}) => {
//   const [declaredValue, setDeclaredValue] = React.useState("")
//   const {
//     name,
//     surname,
//     locationName,
//     destinyDaneCode,
//     destinationAddress,
//     cellPhone,
//     shipmentNumber,
//   } = useSelector((state) => state.receiver);

//   console.log(
//     name,
//     surname,
//     locationName,
//     destinyDaneCode,
//     destinationAddress,
//     cellPhone,
//     shipmentNumber
//   );


//   const handleInputChange = (text) => {
//     // Eliminar cualquier carácter no numérico excepto el punto decimal
//     const numericValue = text.replace(/[^0-9.]/g, '');
  
//     // Dividir en parte entera y decimal
//     const parts = numericValue.split('.');
//     let formattedValue = parts[0]; // parte entera
  
//     if (parts.length > 1) {
//       // Si hay parte decimal, agregar el punto y dos decimales
//       formattedValue += '.' + parts[1].slice(0, 2);
//     }
  
//     setDeclaredValue(formattedValue);
//   };


//   return (
//     <View style={styles.mainContainer}>
//       <Text style={styles.title}>Valor declarado</Text>
//       <Text style={styles.subTitle}>¿Cual es el valor de lo que transportas?</Text>



//     <View  style={styles.inputAndTextContainer}>
//     <TextInput
//         // onChangeText={(text) => setDeclaredValue(text.trim())}
//         onChangeText={(text) => handleInputChange(text)}
//         style={styles.input}
//         value={declaredValue}
//         placeholder="Ej: 150.00"
//         placeholderTextColor="#C4C4C4"
//         keyboardType="numeric"
//       />
//       <View style={styles.dianTextContainer}>
//         <Text numberOfLines={5} ellipsizeMode="tail">
//           Todos los envíos que sean declarados por valor inferior a USD200 no
//           pagan impuestos al ingresar a Colombia según lo dispuesto en el
//           Decreto 1090 de 2020, los que superen este valor pagaran impuestos.
//           <Text
//             style={styles.link}
//             onPress={() =>
//               Linking.openURL(
//                 "https://www.dian.gov.co/Viajeros-y-Servicios-aduaneros/Paginas/Modalidad-de-trafico-postal-y-envios-urgentes.aspx"
//               )
//             }
//           >
//             Leer más.
//           </Text>
//         </Text>
//       </View>
//     </View>




//       <TouchableOpacity
//             style={styles.buttonStyles}
//             onPress={() => navigation.navigate("PaymentResume", { declaredValue })}

//           >
//             <Text style={styles.textButtonStyles}>Continuar</Text>
//           </TouchableOpacity>
//     </View>
//   );
// };

// export default DeclaredValueScreen;

// //STYLES
// const styles = StyleSheet.create({
//   input: {
//     width: "100%",
//     height: 46,
//     borderColor: "#fff",
//     borderWidth: 2,
//     borderWidth: 2,
//     borderRadius: 5,
//     padding: 10,
//     marginVertical: 10,
//     backgroundColor: "#ffffff",
//     marginBottom: 20,
//     fontSize: 16,
//   },
//   link: {
//     color: "blue",
//     textDecorationLine: "underline",
//   },
//   dianTextContainer: {
//     backgroundColor: "#ffffff",
//     padding: 10,
//     borderRadius: 5,
//   },
//   mainContainer: {
//     backgroundColor: "#C4C4C4",
//     flex: 1,
//     fontSize: 14,
//     padding: 15,
//     alignItems: "flex-start",
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
//   inputAndTextContainer: {
//     justifyContent: "center",
//     width: "100%"
//   },
//   title: {
//     fontSize: 25,
//     fontWeight: "bold",
//   },
//   subTitle: {
//     fontSize: 14,
//     marginVertical: 15
//   }
// });














import React from "react";
import {
  Image,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import { CheckBox } from "@rneui/themed";
import { useSelector } from "react-redux";

//REDUX IMPORTS
import { useDispatch } from "react-redux";
import { setReceiver } from "../reducers/receiver/receiverSlice";


const LocalCarrierInsuranceScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [isChecked, setChecked] = React.useState(false);
  const [value, setValue] = React.useState("usd ");
  const {
    name,
    surname,
    locationName,
    destinyDaneCode,
    destinationAddress,
    cellPhone,
  } = useSelector((state) => state.receiver);

  console.log(
    name,
    surname,
    locationName,
    destinyDaneCode,
    destinationAddress,
    cellPhone
  );

 


  const formatValue = (text) => {
    // Eliminar cualquier carácter no numérico
    const cleanedText = text.replace(/[^0-9]/g, "");
    // Formatear el número con puntos de separación de miles
    const formattedText = cleanedText.replace(/\B(?=(\d{2})+(?!\d))/g, ".");
    return `USD ${formattedText}`;
  };


 

  const handleTextChange = (text) => {
    const formattedText = formatValue(text);
    setValue(formattedText);
  };


  const cleanValue = (text) => {
    return text.replace(/[^0-9]/g, "");
  };


  const nextScreen = () => {
    const cleanedValue = cleanValue(value);
    if (!cleanedValue) {
      Alert.alert("Error", "Por favor, ingrese un valor antes de continuar.");
      return;
    }
    dispatch(
      setReceiver({
        declaredValue: cleanedValue,
      }),
      navigation.navigate("DeclaredValue")
    );
  }

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.title}>Valor declarado</Text>
      <Text style={styles.subTitle}>
      Indique el valor de lo que transporta en dolares
      </Text>

      <View style={styles.inputAndTextContainer}>
        <TextInput
          value={value}
          onChangeText={handleTextChange}
          style={styles.input}
          placeholder="Ej: $10.00"
          placeholderTextColor="#C4C4C4"
          keyboardType="numeric"
        />
      </View>




      <View  style={styles.inputAndTextContainer}>
  
      <View style={styles.dianTextContainer}>
        <Text numberOfLines={5} ellipsizeMode="tail">
          Todos los envíos que sean declarados por valor inferior a USD200 no
          pagan impuestos al ingresar a Colombia según lo dispuesto en el
          Decreto 1090 de 2020, los que superen este valor pagaran impuestos.
          <Text
            style={styles.link}
            onPress={() =>
              Linking.openURL(
                "https://www.dian.gov.co/Viajeros-y-Servicios-aduaneros/Paginas/Modalidad-de-trafico-postal-y-envios-urgentes.aspx"
              )
            }
          >
            Leer más.
          </Text>
        </Text>
      </View>
    </View>

  

      <TouchableOpacity
        style={styles.buttonStyles}
        onPress={nextScreen}
      >
        <Text style={styles.textButtonStyles}>Continuar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LocalCarrierInsuranceScreen;

// STYLES
const styles = StyleSheet.create({
  input: {
    width: "100%",
    height: 46,
    borderColor: "#fff",
    borderWidth: 2,
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    backgroundColor: "#ffffff",
    fontSize: 16,
  },
  link: {
    color: "blue",
    textDecorationLine: "underline",
  },
  dianTextContainer: {
    backgroundColor: "#ffffff",
    padding: 10,
    borderRadius: 5,
  },
  mainContainer: {
    backgroundColor: "#C4C4C4",
    flex: 1,
    fontSize: 14,
    padding: 15,
    alignItems: "flex-start",
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
    marginVertical: 10,
  },
  textButtonStyles: {
    color: "white",
    fontWeight: "bold",
    fontSize: 25,
  },
  inputAndTextContainer: {
    justifyContent: "flex-start",
    width: "100%",
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
  },
  subTitle: {
    fontSize: 14,
    marginVertical: 15,
  },
  checkboxContainer: {
    backgroundColor: "#C4C4C4",
  },
  checkboxText: {
    fontSize: 14,
  },
});
