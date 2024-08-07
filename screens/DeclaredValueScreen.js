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

//REDUX IMPORTS
import { useDispatch } from "react-redux";
import { setReceiver } from "../reducers/receiver/receiverSlice";




const LocalCarrierInsuranceScreen = ({ navigation }) => {

  const dispatch = useDispatch();
  const [value, setValue] = React.useState("");

  const nextScreen = () => {
    // Convertir el valor a número
    const cleanedValue = parseFloat(value.replace(/[^0-9.]/g, ""));
    
    // Validar si el valor es válido
    if (isNaN(cleanedValue)) {
      Alert.alert("Error", "Por favor, ingrese un valor válido en dólares.");
      return;
    }
    
    // Disparar la acción de Redux y navegar a la siguiente pantalla
    dispatch(setReceiver({ declaredValueDian: cleanedValue }));
    navigation.navigate("PaymentResume");
  };

  const handleTextChange = (text) => {
    // Filtrar caracteres no permitidos (excepto números y punto)
    const formattedText = text.replace(/[^0-9.]/g, "");
    setValue(formattedText);
  };


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
          placeholder="Ej: USD 10.00"
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
