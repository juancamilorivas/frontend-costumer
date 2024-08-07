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
import { createUserWithEmailAndPassword } from "firebase/auth";
import { faX } from "@fortawesome/free-solid-svg-icons/faX";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { initialAuth } from "../firebase";
import { useDispatch } from "react-redux";
import { setUser } from "../reducers/user/userSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { db } from "../firebase";
import validator from "validator";
import { runTransaction, doc, setDoc } from "firebase/firestore";

const sfDocRef = doc(db, "guia", "config");

const CreateScreen = ({ navigation }) => {
  const MAX_RETRIES = 3;
  let retries = 0;

  //STATES
  const [email, setEmail] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [cedula, setCedula] = useState("");
  const [celular, setCelular] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = React.useState(false);


  //CONSTS
  const dispatch = useDispatch();
  const lowerCaseEmail = email.toLowerCase();

  //GUARDAR EN EL STORAGE
  const storeData = async (id, userData) => {
    try {
      await AsyncStorage.setItem("key", id);
      console.log("User guardado en storage", id);

      const jsonData = JSON.stringify(userData);
      await AsyncStorage.setItem("userData", jsonData);
      console.log("User data guardado en storage", jsonData);
    } catch  {
      Alert.alert("error al guardar");
    }
  };

  //INCREMENT LOCKER NUMBER
  const incrementNumber = async () => {

    setIsLoading(true);

    if ((nombre, apellidos, cedula, celular == "")) {
      setIsLoading(false);
      Alert.alert("Todos los campos son obligatorios");
      return;
    }
    if (!validator.isEmail(email)) {
      setIsLoading(false);
      Alert.alert("El correo electrónico proposionado no es valido.");
      return;
    }
    if (password == "") {
      setIsLoading(false);
      Alert.alert("Escribe una contrasena");
      return;
    }
    if (email !== lowerCaseEmail) {
      setIsLoading(false);
      Alert.alert("El correo electrónico contiene mayusculas");
      return;
    }
    const transactionFunction = async (transaction) => {
      const sfDoc = await transaction.get(sfDocRef);
      if (!sfDoc.exists()) {
        setIsLoading(false);
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
        setIsLoading(false);
        return null;
      }
    };
    try {
      const newNumber = await runTransaction(db, async (transaction) => {
        return await transactionFunction(transaction);
      });

      if (newNumber !== null) {
        let locker = newNumber.toString();
        handleCreateAccount(locker);
      }
    } catch {
      if (error.code === "failed-precondition" && retries < MAX_RETRIES) {
        retries++;
        setIsLoading(false);
        await incrementNumber(); // Reintentar la transacción
      } else {
        setIsLoading(false);
        await incrementNumber(); // Reintentar la transacción
      }
    }
  };



  

  // // CREATE STRIPE CUSTOMER
  const handleSubmit = async ({ name, email, userCredential, locker }) => {
    try {
      const response = await fetch(
        "https://app-zrcl5qd7da-uc.a.run.app/api/createstripecustomer",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email }),
        }
      );

      if (response.ok) {
        const customer = await response.json();
        const userData = {
          email: userCredential.user.email,
          createdAt: new Date(),
          locker: "box" + locker,
          name: nombre,
          surname: apellidos,
          country: "Colombia",
          nit: cedula,
          cellPhone: celular,
          stripeCustomerId: customer.id,
          destinationAddress: "",
          destinyDaneCode: "",
          locationName: "",
          prefix: "+057",
          nitType: "CC",
        };
        const uid = userCredential.user.uid;
        storeData(uid, userData);


        try {
          const userDocRef = doc(db, "users", uid);
          await setDoc(userDocRef, userData);
        } catch (error) {
          console.error("Error saving user data:", error);
        }
        navigation.navigate("TabsNavigation");
      } else {
        const error = await response.json();
        Alert.alert("Error", error.message);
      }
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  //CREATE ACCOUNT
  const handleCreateAccount = async (locker) => {
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
      await handleSubmit({
        name: nombre,
        email: email,
        userCredential: userCredential,
        locker: locker,
      });
    } catch {
      setIsLoading(false);
      Alert.alert(
        "El correo electrónico ya existe o la constrasena es inválida."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <FontAwesomeIcon icon={faX} size={30} style={styles.iconArrowLeft} />
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
              onChangeText={(text) => setCelular(text.trim())}
              style={styles.input}
              placeholder="Numero celular"
              placeholderTextColor="#373737"
            />
          </View>
          <View>
            <TextInput
              // onChangeText={(text) => setEmail(text.trim())}
              onChangeText={(text) => setEmail(text.trim().toLowerCase())}
              value={email}
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





          {/* <TouchableOpacity
            onPress={incrementNumber}
            style={[styles.button, { backgroundColor: "#0038FF" }]}
          >
            <Text style={{ fontSize: 17, fontWeight: "400", color: "#ffffff" }}>
              Crear cuenta
            </Text>
          </TouchableOpacity> */}





          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#0038FF" }]}
            onPress={incrementNumber}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator size="large" color="#fff" />
            ) : (
            <Text style={{ fontSize: 17, fontWeight: "400", color: "#ffffff" }}>
              Crear cuenta
            </Text>            )}
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
    backgroundColor: "#212020",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  login: {
    height: 500,
    borderColor: "gray",
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
    borderColor: "gray",
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
