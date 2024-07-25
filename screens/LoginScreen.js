import React, { useState } from "react";
import {
  Image,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";

import { signInWithEmailAndPassword } from "firebase/auth";
import { getAuth } from "firebase/auth";
import { useDispatch } from "react-redux";
import { setUser } from "../reducers/user/userSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchPersonalData } from "../apiServices";

const logo =
  "https://qixeul.stripocdn.email/content/guids/CABINET_a5efd8f79280f89c49f5b6e4eb48877f95c5996885e4077eadd41ecc90a9c33a/images/postman_2.png";

const LoginScreen = ({ navigation }) => {
  //STATES
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  //CONSTS
  const dispatch = useDispatch();

  //VERIFY EMAIL
  const isValidEmail = (email) => {
    const emailRegex =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return emailRegex.test(String(email).toLowerCase());
  };

  //GUARDAR EN EL STORAGE
  const storeData = async (id, userData) => {
    try {
      await AsyncStorage.setItem("key", id);
      console.log("User guardado en storage", id);

      const jsonData = JSON.stringify(userData);
      await AsyncStorage.setItem("userData", jsonData);
      console.log("User data guardado en storage", jsonData);
    } catch {
      Alert.alert("error al guardar");
    }
  };

  const handleSignIn = async () => {
    setIsLoading(true);
    if (email === "") {
      Alert.alert("Escribe un correo electrónico");
      setIsLoading(false);
      return;
    }
    if (password === "") {
      Alert.alert("Escribe una contraseña");
      setIsLoading(false);
      return;
    }
    if (!isValidEmail) {
      Alert.alert("El correo electrónico proporcionado no es válido.");
      setIsLoading(false);
      return;
    }

    const auth = getAuth();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      dispatch(
        setUser({
          authentication: true,
          email: userCredential.user.email,
          accessToken: userCredential.user.accessToken,
          uid: userCredential.user.uid,
        })
      );

      const value = userCredential.user.uid;
      if (value) {
        const userData = await fetchPersonalData(value);
        if (userData) {

          storeData(value, userData);
        }
      }

      navigation.navigate("TabsNavigation");
    } catch (error) {
      Alert.alert("El correo no existe en la base de datos o es inválido.");
    } finally {
      setIsLoading(false);
    }
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
              INICIAR SESION
            </Text>
          </View>
          <View>
            <Text style={{ fontSize: 17, fontWeight: "400", color: "white" }}>
              E-mail
            </Text>
            <TextInput
              onChangeText={(text) => setEmail(text.trim().toLowerCase())}
              style={styles.input}
              value={email}
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
            style={[styles.button, { backgroundColor: "#00cfeb90" }]}
            onPress={handleSignIn}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator size="large" color="#fff" />
            ) : (
              <Text style={{ fontSize: 17, fontWeight: "400", color: "white" }}>
                Iniciar sesion
              </Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("CreateAccountScreen")}
          >
            <Text
              style={{
                fontSize: 17,
                fontWeight: "400",
                color: "white",
                paddingTop: 30,
              }}
            >
              Crear cuenta
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
