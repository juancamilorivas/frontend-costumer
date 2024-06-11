import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons/faUser";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons/faArrowRightFromBracket";
import { faClockRotateLeft } from "@fortawesome/free-solid-svg-icons/faClockRotateLeft";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons/faMagnifyingGlass";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { signOut } from "firebase/auth";
import { initialAuth } from "../firebase";
import Header from '../components/Header'

const ProfileScreen = ({ navigation }) => {
  const [storedValue, setStoredValue] = useState(null);

  //SIGN-OUT
  const handleSignOut = async () => {
    try {
      await signOut(initialAuth);
      await AsyncStorage.clear();
      console.log("Signed out successfully!");
      navigation.navigate("LoginCreate");
      // Perform any additional actions after sign out
    } catch (error) {
      console.error("Error signing out:", error);
      // Handle sign-out error
    }
  };

  //OBTENER DATA
  const getMyStringValue = async () => {
    try {
      const value = await AsyncStorage.getItem("key");
      setStoredValue(value); // Actualiza el estado con el valor recuperado
      // console.log('desde adentro de la funcion que trae el storage', value); // Muestra el valor recuperado en lugar de storedValue
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getMyStringValue(); // Llamada a la función para obtener el valor al montar el componente
  }, [storedValue]); // Se ejecuta una sola vez al montar el componente


  return (
    <SafeAreaView style={styles.safeArea}>
 
    <Header text="Opciones"/>
      <ScrollView style={styles.container}>
        <TouchableOpacity
          style={styles.options}
          onPress={() => navigation.navigate("PersonalData")}
        >
          <FontAwesomeIcon icon={faUser} size={20} style={styles.icon} />
          <Text style={styles.textOptions}>Datos personales</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.options}
          onPress={() => navigation.navigate("Search")}
        >
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            size={20}
            style={styles.icon}
          />
          <Text style={styles.textOptions}>Buscar guia</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.options}
          onPress={() => navigation.navigate("HistoricalServices")}
        >
          <FontAwesomeIcon
            icon={faClockRotateLeft}
            size={20}
            style={styles.icon}
          />
          <Text style={styles.textOptions}>Historial de servicios</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.options} onPress={handleSignOut}>
          <FontAwesomeIcon
            icon={faArrowRightFromBracket}
            size={20}
            style={styles.icon}
          />
          <Text style={styles.textOptions}>Cerrar sesion</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "white",
    flex: 1,
  },
  container: {
    flex: 1,
  },
  options: {
    height: 50,
    width: "100%",
    backgroundColor: "white",
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
  },
  icon: {
    marginLeft: 30,
  },

  textOptions: {
    marginLeft: 30,
    fontSize: 15,
    color: "#232323",
  },

  headerText: {
    color: "white",
  },
});
