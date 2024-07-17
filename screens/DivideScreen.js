import React from "react";
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
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useDispatch } from "react-redux";
import { setDivide } from "../reducers/divide/divideSlice";

const DivideScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const [value, setValue] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isFocus, setIsFocus] = React.useState(false);
  const [instrucciones, setInstrucciones] = React.useState("");
  const [wordCount, setWordCount] = React.useState(0); // State para contar palabras

  const data = [
    // { label: "1", value: "1" },
    { label: "2", value: "2" },
    { label: "3", value: "3" },
    { label: "4", value: "4" },
    { label: "5", value: "5" },
  ];

  // Función para contar palabras
  const handleTextChange = (text) => {
    const words = text.trim().split(/\s+/);
    setWordCount(words.length);
    if (words.length > 50) {
      Alert.alert(
        "Límite alcanzado",
        "Por favor, reduce la cantidad de palabras "
      );
    } else {
      setInstrucciones(text);
    }
  };


  const dispatchValues = () => {
    setIsLoading(true)
    if (!value) {
      Alert.alert("Alerta", "Debes seleccionar un valor");
      setIsLoading(false)

      return;
    }

    if (!instrucciones) {
      Alert.alert("Alerta", "Debes proporciona instrucciones");
      setIsLoading(false)
      return;
    }

    dispatch(
      setDivide({
        divideNumber: value,
        divideInstructions: instrucciones,
      })
    );
    setIsLoading(false)
    navigation.navigate("StartDivide");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.title}>Dividir</Text>

          <Text style={styles.textForm}>
            ¿En cuentas cajas se debe dividir?
          </Text>
          <View style={styles.containerDropDown}>
            <Dropdown
              style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              iconStyle={styles.iconStyle}
              data={data}
              maxHeight={250}
              labelField="label"
              valueField="value"
              placeholder={!isFocus ? "Selecciona una cifra" : "Dividir en:"}
              value={value}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={(item) => {
                setValue(item.value);
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

          <Text style={styles.textForm}>Comentarios o instrucciones</Text>
          <TextInput
            style={styles.input}
            placeholder="Instrucciones"
            multiline={true}
            numberOfLines={4}
            onChangeText={handleTextChange}
            maxLength={500}
            value={instrucciones}
          />

          <TouchableOpacity
            style={styles.buttonStyles}
            onPress={dispatchValues}
            disabled={isLoading || wordCount > 50}
          >
            {isLoading ? (
              <ActivityIndicator size="large" color="#fff" />
            ) : (
              <Text style={styles.textButtonStyles}>Continuar</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DivideScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#C4C4C4",
  },
  container: {
    flex: 1,
    padding: 15,
  },
  input: {
    height: 100,
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
    fontSize: 16,
  },
  textForm: {
    marginBottom: 5,
    fontSize: 14,
  },
  icon: {
    marginLeft: 10,
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
});
