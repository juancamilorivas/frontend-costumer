import React, { useState }from "react";
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

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { initialAuth } from "../firebase";
import { getAuth } from "firebase/auth";

import { useDispatch } from "react-redux";
import { setUser } from "../reducers/user/userSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

const logo =
  "https://qixeul.stripocdn.email/content/guids/CABINET_a5efd8f79280f89c49f5b6e4eb48877f95c5996885e4077eadd41ecc90a9c33a/images/postman_2.png";



const LoginScreen = ({ navigation }) => {

  //STATES
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");



  //CONSTS
  const dispatch = useDispatch();
  const lowerCaseEmail = email.toLowerCase(); // Convertir el email a minúsculas


//VERIFY EMAIL
  const isValidEmail = (email) => {
    const emailRegex =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return emailRegex.test(String(email).toLowerCase());
  };







//GUARDAR EN EL STORAGE
const storeData = async (id) => {
  try {
    const value = await AsyncStorage.setItem('key', id)
    console.log('User guardado en storage', value)
  } catch(e) {
    console.log('error al guardar', e);
  }
}




  //CREATE ACCOUNT
  const handleCreateAccount = () => {
    if(email == "") {
      Alert.alert("Escribe un correo electronico");
      return;
    }
    if(password == "") {
      Alert.alert("Escribe una contrasena");
      return;
    }
    if (!isValidEmail) {
      Alert.alert("El correo electrónico proposionado no es valido.");
      return;
    }
    if (email !== lowerCaseEmail) {
      Alert.alert("El correo electrónico contiene mayusculas");
      return;
    }

    createUserWithEmailAndPassword(initialAuth, email, password)
      .then((userCredential) => {
        dispatch(
          setUser({
            authentication: true,
            email: userCredential.user.email,
            accessToken: userCredential.user.accessToken,
            uid: userCredential.user.uid,
          })
        );

        console.log("Account created");
        storeData(userCredential.user.uid)
        navigation.navigate("TabsNavigation");
      })
      .catch((error) => {
        Alert.alert("El correo electrónico ya existe o es inválido.");
      });
  };













  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          flex: 1,
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View style={styles.login}>
          <Image source={{ uri: logo }} style={styles.logo} />
          <View>
            <Text
              style={{
                fontSize: 17,
                fontWeight: "400",
                color: "white",
                marginBottom: 20,
              }}
            >
              CREAR CUENTA
            </Text>
          </View>
          <View>
            <Text style={{ fontSize: 17, fontWeight: "400", color: "white" }}>
              E-mail
            </Text>
            <TextInput
              onChangeText={(text) => setEmail(text.trim())}
              style={styles.input}
              placeholder="personal@correo.com"
              placeholderTextColor="#373737"
            />
          </View>
          <View>
            <Text style={{ fontSize: 17, fontWeight: "400", color: "white" }}>
              Contrasena
            </Text>
            <TextInput
              onChangeText={(text) => setPassword(text)}
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#373737"
              secureTextEntry={true}
            />
          </View>
          <TouchableOpacity
            onPress={handleCreateAccount}
            style={[styles.button, { backgroundColor: "#ee6b6e" }]}
          >
            <Text style={{ fontSize: 17, fontWeight: "400", color: "black" }}>
            Crear cuenta
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("LoginCreate")}

          >
            <Text style={{ fontSize: 17, fontWeight: "400", color: "white", paddingTop: 30 }}>
              Iniciar sesion
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

//STYLES
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000000",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  login: {
    width: 350,
    height: 500,
    borderColor: "#fff",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: "#fff",
    borderWidth: 2,
    marginVertical: 30,
  },
  input: {
    width: 250,
    height: 40,
    borderColor: "#fff",
    borderWidth: 2,
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    backgroundColor: "#ffffff90",
    marginBottom: 20,
  },
  button: {
    width: 250,
    height: 40,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    borderColor: "#fff",
    borderWidth: 1,
  },
});


export default LoginScreen;
