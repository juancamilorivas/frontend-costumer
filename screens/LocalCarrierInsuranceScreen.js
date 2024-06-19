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
import { CheckBox } from '@rneui/themed';


const LocalCarrierInsuranceScreen = ({ navigation }) => {
  const [isChecked, setChecked] = React.useState(false);
  const [values, setValue] = React.useState("");
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.title}>Seguro nacional</Text>
      <Text style={styles.subTitle}>
        ¿Cual es el valor de lo que transportas?
      </Text>

      <View style={styles.inputAndTextContainer}>
        <TextInput
          onChangeText={(text) => setValue(text.trim())}
          style={styles.input}
          placeholder="Ej: 150.00"
          placeholderTextColor="#C4C4C4"
        />
      </View>



         <CheckBox
        checked={isChecked}
        onPress={() => setChecked(!isChecked)}
           checkedIcon="dot-circle-o"
           uncheckedIcon="circle-o"
           containerStyle={styles.checkboxContainer}
           textStyle={styles.checkboxText}
           title="Valor minimo a declarar es de $15.000"
           checkedColor="blue" 
           uncheckedColor="black" 
         />
     



      <TouchableOpacity
        style={styles.buttonStyles}
        onPress={() => navigation.navigate("PaymentResume")}
      >
        <Text style={styles.textButtonStyles}>Continuar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LocalCarrierInsuranceScreen;

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
    backgroundColor: "#C4C4C4"
  }, 
  checkboxText: {
    fontSize: 14,
  }
});
