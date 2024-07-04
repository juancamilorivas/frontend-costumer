import React from "react";
import {
  Image,
  Text,
  StyleSheet,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";


const AddressScreen = () => {



  const [casillero, setCasillero] = React.useState(null);

  // Función para obtener userData del almacenamiento
  const getUserData = async () => {
    try {
      const jsonData = await AsyncStorage.getItem("userData");
      if (jsonData !== null) {
        const userData = JSON.parse(jsonData);
        console.log("User data obtenida del storage", userData);
        setCasillero(userData.casillero.toUpperCase());
      } else {
        console.log("No se encontró ningún userData en el storage");
      }
    } catch (e) {
      Alert.alert("Error al obtener los datos");
      console.error("Error al obtener los datos del storage", e);
    }
  };

  React.useEffect(() => {
    getUserData();
  }, []);


  return (
    <View style={styles.mainContainer}>
      <Text style={styles.title}>Direccion</Text>

      <View style={styles.inputAndTextContainer}>
        <Text style={styles.subTitle}>Address Line 1</Text>
        <View style={styles.dianTextContainer}>
          <Text
            numberOfLines={5}
            ellipsizeMode="tail"
            style={styles.addressText}
          >
            8435 NW 74TH ST
          </Text>
        </View>
      </View>

      <View style={styles.inputAndTextContainer}>
        <Text style={styles.subTitle}>Address Line 2</Text>
        <View style={styles.dianTextContainer}>
          <Text
            numberOfLines={5}
            ellipsizeMode="tail"
            style={styles.addressText}
          >
            {casillero}
          </Text>
        </View>
      </View>

      <View style={styles.bigInputAndTextContainer}>
        <View style={styles.bigTextContainer}>
          <Text
            style={styles.addressTextBigText}
          >
            City: Miami State: Florida
          </Text>
          <Text
            style={styles.addressTextBigText}
          >
            Zip Code: 33166 
          </Text>
          <Text
            style={styles.addressTextBigText}
          >
            Phone Number: 305-5915802
          </Text>
          <Text
            style={styles.addressTextBigText}
          >
            United States
          </Text>
        </View>
      </View>


    </View>
  );
};

export default AddressScreen;

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
    height: 50,
    justifyContent: "center",
  },
  bigTextContainer: {
    backgroundColor: "#ffffff",
    padding: 10,
    borderRadius: 5,
    justifyContent: "center",
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
    width: "100%",
  },
  bigInputAndTextContainer: {
    justifyContent: "center",
    width: "100%",
    paddingTop: 20
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    paddingTop: 30,
    paddingBottom: 30,
  },
  subTitle: {
    fontSize: 18,
    marginVertical: 15,
    fontWeight: "bold",
  },
  addressText: {
    fontSize: 16,
  },
  addressTextBigText: {
    fontSize: 16,
    paddingVertical: 4
  }
});
