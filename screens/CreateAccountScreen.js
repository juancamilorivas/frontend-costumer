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
} from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons/faArrowLeft";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { initialAuth } from "../firebase";
import { useDispatch } from "react-redux";
import { setUser } from "../reducers/user/userSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { db } from "../firebase";
import validator from 'validator';
import {
  runTransaction,
  doc,
  setDoc,
} from "firebase/firestore";

// const logo =
//   "https://qixeul.stripocdn.email/content/guids/CABINET_a5efd8f79280f89c49f5b6e4eb48877f95c5996885e4077eadd41ecc90a9c33a/images/postman_2.png";

const sfDocRef = doc(db, "guia", "config");

const CreateScreen = ({ navigation }) => {
  const MAX_RETRIES = 3;
  let retries = 0;

  //STATES
  const [email, setEmail] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [cedula, setCedula] = useState("");
  const [password, setPassword] = useState("");

  //CONSTS
  const dispatch = useDispatch();
  const lowerCaseEmail = email.toLowerCase(); 

  //GUARDAR EN EL STORAGE
  const storeData = async (id) => {
    try {
      const value = await AsyncStorage.setItem("key", id);
      console.log("User guardado en storage", value);
    } catch (e) {
      console.log("error al guardar", e);
    }
  };

  //INCREMENT LOCKER NUMBER
  const incrementNumber = async () => {
    const transactionFunction = async (transaction) => {
      const sfDoc = await transaction.get(sfDocRef);
      if (!sfDoc.exists()) {
        throw new Error("Document does not exist!");
      }
      const isUpdating = sfDoc.data().isUpdating;
      if (!isUpdating) {
        transaction.update(sfDocRef, { isUpdating: true });
        const currentNumber = parseInt(sfDoc.data().guiaActual, 10);
        const newNumber = currentNumber + 1;
        transaction.update(sfDocRef, { guiaActual: newNumber.toString() });
        transaction.update(sfDocRef, { isUpdating: false });
        return newNumber;
      } else {
        console.log("Document is currently being updated. Try again later.");
        return null;
      }
    };
    try {
      const newNumber = await runTransaction(db, async (transaction) => {
        return await transactionFunction(transaction);
      });

      if (newNumber !== null) {
        console.log("Transaction successfully committed!", newNumber);
        // setGuiaActual(newNumber.toString());
        let locker = newNumber.toString();
        handleCreateAccount(locker);
      }
    } catch (error) {
      if (error.code === "failed-precondition" && retries < MAX_RETRIES) {
        retries++;
        console.log("Transaction failed due to precondition. Retrying...");
        await incrementNumber(); // Reintentar la transacción
      } else {
        console.log("Transaction failed three times: ", error);
        // Manejar el error si se excedieron los reintentos
      }
    }
  };

  //CREATE ACCOUNT
  const handleCreateAccount = async (locker) => {
    if (nombre, apellidos, cedula == "") {
      Alert.alert("Todos los campos son obligatorios");
      return;
    }
    if (!validator.isEmail(email)) {
      Alert.alert('El correo electrónico proposionado no es valido.');
      return
    };
    if (password == "") {
      Alert.alert("Escribe una contrasena");
      return;
    }
    if (email !== lowerCaseEmail) {
      Alert.alert("El correo electrónico contiene mayusculas");
      return;
    }    



    try {
      const userCredential = await createUserWithEmailAndPassword(
        initialAuth,
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

      const userData = {
        email: userCredential.user.email,
        createdAt: new Date(),
        casillero: "box" + locker,
        nombre: nombre,
        apellidos: apellidos,
        cedula: cedula,
      };
      const uid = userCredential.user.uid;
      console.log("casillero guardadooo", locker);
      storeData(uid);
      try {
        const userDocRef = doc(db, "users", uid);
        await setDoc(userDocRef, userData);
        console.log("User data saved successfully");
      } catch (error) {
        console.error("Error saving user data:", error);
      }

      navigation.navigate("TabsNavigation");
    } catch (error) {
      Alert.alert(
        "El correo electrónico ya existe o la constrasena es inválida.",
        error
      );
    }




  };

  return (
    <View style={styles.container}>
      
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <FontAwesomeIcon
          icon={faArrowLeft}
          size={30}
          style={styles.iconArrowLeft}
        />
      </TouchableOpacity>

      <ScrollView
        contentContainerStyle={{
          flex: 1,
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "start",
        }}
      >
        <View style={styles.login}>
          {/* <Image source={{ uri: logo }} style={styles.logo} /> */}
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
            <TextInput
              onChangeText={(text) => setNombre(text.trim())}
              style={styles.input}
              placeholder="Nombre"
              placeholderTextColor="#373737"
            />
          </View>
          <View>
            <TextInput
              onChangeText={(text) => setApellidos(text.trim())}
              style={styles.input}
              placeholder="Apellidos"
              placeholderTextColor="#373737"
            />
          </View>
          <View>
            <TextInput
              onChangeText={(text) => setCedula(text.trim())}
              style={styles.input}
              placeholder="Cedula"
              placeholderTextColor="#373737"
            />
          </View>
          <View>
            <TextInput
              onChangeText={(text) => setEmail(text.trim())}
              style={styles.input}
              placeholder="personal@correo.com"
              placeholderTextColor="#373737"
            />
          </View>
          <View>
            <TextInput
              onChangeText={(text) => setPassword(text)}
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#373737"
              secureTextEntry={true}
            />
          </View>
          <TouchableOpacity
            onPress={incrementNumber}
            style={[styles.button, { backgroundColor: "#ee6b6e" }]}
          >
            <Text style={{ fontSize: 17, fontWeight: "400", color: "black" }}>
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
    justifyContent: "start",
    backgroundColor: "#000000",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  login: {
    height: 500,
    borderColor: "#fff",
    borderRadius: 10,
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
    width: 290,
    height: 50,
    borderColor: "#fff",
    borderWidth: 2,
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    backgroundColor: "#000000",
    marginBottom: 20,
    color: "white",
    fontSize: 18,
  },
  button: {
    width: 270,
    height: 50,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    borderColor: "#fff",
    borderWidth: 1,
  },
  iconArrowLeft: {
       color: "#ffffff",
       marginTop: 30,
       marginLeft: 30,
       marginBottom: 30,
  
      },

});

export default CreateScreen;
