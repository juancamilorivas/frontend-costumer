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
  const [value, setValue] = React.useState("$");
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

  const handleCheckboxPress = () => {
    const newCheckedStatus = !isChecked;
    setChecked(newCheckedStatus);
    if (newCheckedStatus) {
      setValue("$10.000");
    } else {
      setValue("$");
    }
  };

  // const formatValue = (text) => {
  //   // Eliminar cualquier carácter no numérico excepto el símbolo de dólar
  //   const cleanedText = text.replace(/[^0-9]/g, "");
  //   if (cleanedText.length <= 2) {
  //     return `$${cleanedText}`;
  //   }
  //   // Agregar un punto después de los primeros dos números
  //   const formattedText = `$${cleanedText.slice(0, 2)}.${cleanedText.slice(2)}`;
  //   return formattedText;
  // };


  const formatValue = (text) => {
    // Eliminar cualquier carácter no numérico
    const cleanedText = text.replace(/[^0-9]/g, "");
    // Formatear el número con puntos de separación de miles
    const formattedText = cleanedText.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return `$${formattedText}`;
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
      <Text style={styles.title}>Seguro</Text>
      <Text style={styles.subTitle}>
        Indica un valor de seguro en pesos ($) colombianos
      </Text>

      <View style={styles.inputAndTextContainer}>
        <TextInput
          value={value}
          onChangeText={handleTextChange}
          style={styles.input}
          placeholder="Ej: $10.000"
          placeholderTextColor="#C4C4C4"
          keyboardType="numeric"
        />
      </View>

      <CheckBox
        checked={isChecked}
        onPress={handleCheckboxPress}
        checkedIcon="dot-circle-o"
        uncheckedIcon="circle-o"
        containerStyle={styles.checkboxContainer}
        textStyle={styles.checkboxText}
        title="Valor minimo a asegurar es de $10.000"
        checkedColor="blue"
        uncheckedColor="black"
      />

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
