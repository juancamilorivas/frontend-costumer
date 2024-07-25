import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  View,
  Alert,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons/faUser";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons/faArrowRightFromBracket";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { signOut } from "firebase/auth";
import { initialAuth } from "../firebase";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons/faLocationDot";


const ProfileScreen = ({ navigation }) => {
  const [storedValue, setStoredValue] = useState(null);

  //SIGN-OUT
  const handleSignOut = async () => {
    try {
      await signOut(initialAuth);
      await AsyncStorage.clear();
      navigation.navigate("LoginCreate");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };



  const confirmSignOut = () => {
    Alert.alert(
      "Confirmar",
      "Por favor confirme que desea cerrar su sesion",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Sign out canceled"),
          style: "cancel"
        },
        {
          text: "Si",
          onPress: handleSignOut
        }
      ],
      { cancelable: false }
    );
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
     

     {/* <View style={styles.mainTitleContainer}>
      <Text style={styles.mainTitle}>Opciones</Text>
      </View> */}

     
      <ScrollView style={styles.container}>
        <TouchableOpacity
          style={styles.options}
          onPress={() => navigation.navigate("PersonalData")}
        >
          <FontAwesomeIcon icon={faUser} size={25} style={styles.icon} color="gray"  />
          <Text style={styles.textOptions}>Mis datos personales</Text>
        </TouchableOpacity>

  
        <TouchableOpacity
          style={styles.options}
          onPress={() => navigation.navigate("Address")}
        >
          <FontAwesomeIcon
            icon={faLocationDot}
            size={25}
            style={styles.icon}
            color="gray" 
          />
          <Text style={styles.textOptions}>Direccion</Text>
        </TouchableOpacity>
        

        <TouchableOpacity style={styles.options} onPress={confirmSignOut}>
          <FontAwesomeIcon
            icon={faArrowRightFromBracket}
            size={25}
            style={styles.icon}
            color="gray" 
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
    paddingHorizontal: 20

  },
  options: {
    height: 55,
    width: "100%",
    backgroundColor: "white",
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    borderBottomWidth: 0.5,
    borderBottomColor: "gray",
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
  mainTitle: {
    fontSize: 45,
  },
  mainTitleContainer: {
    paddingLeft: 10,
    paddingTop: 60,
    paddingBottom: 30,
  }
});
