import React from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,

} from "react-native";

const DeclaredValueScreen = ({navigation}) => {
  const [declaredValue, setDeclaredValue] = React.useState("")

  const handleInputChange = (text) => {
    // Eliminar cualquier carácter no numérico excepto el punto decimal
    const numericValue = text.replace(/[^0-9.]/g, '');
  
    // Dividir en parte entera y decimal
    const parts = numericValue.split('.');
    let formattedValue = parts[0]; // parte entera
  
    if (parts.length > 1) {
      // Si hay parte decimal, agregar el punto y dos decimales
      formattedValue += '.' + parts[1].slice(0, 2);
    }
  
    setDeclaredValue(formattedValue);
  };


  return (
    <View style={styles.mainContainer}>
      <Text style={styles.title}>Valor declarado</Text>
      <Text style={styles.subTitle}>¿Cual es el valor de lo que transportas?</Text>



    <View  style={styles.inputAndTextContainer}>
    <TextInput
        // onChangeText={(text) => setDeclaredValue(text.trim())}
        onChangeText={(text) => handleInputChange(text)}
        style={styles.input}
        value={declaredValue}
        placeholder="Ej: 150.00"
        placeholderTextColor="#C4C4C4"
        keyboardType="numeric"
      />
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
            onPress={() => navigation.navigate("PaymentResume", { declaredValue })}

          >
            <Text style={styles.textButtonStyles}>Continuar</Text>
          </TouchableOpacity>
    </View>
  );
};

export default DeclaredValueScreen;

//STYLES
const styles = StyleSheet.create({
  input: {
    width: "100%",
    height: 46,
    borderColor: "#fff",
    borderWidth: 2,
    borderWidth: 2,
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    backgroundColor: "#ffffff",
    marginBottom: 20,
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
    marginTop: 20, 
    marginBottom: 18,
  },
  textButtonStyles: {
    color: "white",
    fontWeight: "bold",
    fontSize: 25,
  },
  inputAndTextContainer: {
    justifyContent: "center",
    width: "100%"
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
  },
  subTitle: {
    fontSize: 14,
    marginVertical: 15
  }
});
