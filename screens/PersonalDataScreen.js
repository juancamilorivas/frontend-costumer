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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchPersonalDataOnSnapshot } from "../apiServices";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

const PersonalDataScreen = () => {

  const [uid, setUid] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [form, setForm] = React.useState({
    nombre: "",
    apellido: "",
    celular: "",
    cedula: "",
    direccion: "",
    pais: "Colombia",
    ciudad: "",
    email: "",
  });

  const handleChange = (name, value) => {
    setForm({
      ...form,
      [name]: value,
    });
  };

  React.useEffect(() => {
    const getMyStringValue = async () => {
      try {
        const value = await AsyncStorage.getItem("key");
        if (value) {
          setUid(value);
          const unsubscribe = fetchPersonalDataOnSnapshot(value, (userData) => {
            if (userData) {
              setForm({
                nombre: userData.name || "",
                apellido: userData.surname || "",
                celular: userData.cellPhone || "",
                cedula: userData.nit || "",
                direccion: userData.destinationAddress || "",
                pais: "Colombia",
                ciudad: userData.destinyDaneCode || "",
                email: userData.email || "",
              });
            }
          });

          // Limpia la suscripción cuando el componente se desmonta
          return () => unsubscribe();
        }
      } catch (e) {
        console.log("Something went wrong identifying user storage", e);
      }
    };

    getMyStringValue();
  }, []);





  const enviarFormulario = async () => {
    setIsLoading(true);

    const { cedula, nombre, apellido, direccion, celular, ciudad, email } = form;

      // Verificar si algún campo está vacío
  if (!cedula || !nombre || !apellido || !direccion || !celular || !ciudad || !email) {
    Alert.alert("Todos los campos son obligatorios");
    setIsLoading(false);
    return;
  }
    const userDataForm = {
      name: nombre,
      surname: apellido,
      nit: cedula,
      cellPhone: celular,
      email: email,
      destinyDaneCode: ciudad,
      destinationAddress: direccion
    };
    try {
      const userDocRef = doc(db, "users", uid);
      await setDoc(userDocRef, userDataForm);
      // Alert.alert("informacion guardada exitosamente")
    } catch (error) {
      console.error("Error saving user data:", error);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView>

        <View style={styles.container}>
        <Text style={styles.title}>Mis datos personales</Text>

        <Text style={styles.textForm}>Cedula (CC)</Text>
          <TextInput
            style={styles.input}
            placeholder="Cedula"
            value={form.cedula}
            keyboardType="numeric"
            editable={false}
            onChangeText={(value) => handleChange('cedula', value)}
          />

        <Text style={styles.textForm}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={form.email}
            editable={false}
            onChangeText={(value) => handleChange('email', value)}
          />

          <Text style={styles.textForm}>Nombre(s)</Text>
          <TextInput
            style={styles.input}
            placeholder="Nombre"
            value={form.nombre}
            onChangeText={(value) => handleChange('nombre', value)}
          />

          <Text style={styles.textForm}>Apellidos(s)</Text>
          <TextInput
            style={styles.input}
            placeholder="Apellidos"
            value={form.apellido}
            onChangeText={(value) => handleChange('apellido', value)}
          />

          <Text style={styles.textForm}>Direccion*</Text>
          <TextInput
            style={styles.input}
            placeholder="Direccion"
            value={form.direccion}
            onChangeText={(value) => handleChange('direccion', value)}
          />

          <Text style={styles.textForm}>Celular</Text>
          <TextInput
            style={styles.input}
            placeholder="Celular"
            value={form.celular}
            onChangeText={(value) => handleChange('celular', value)}
          />

          <Text style={styles.textForm}>Pais</Text>
          <TextInput
            style={styles.input}
            placeholder="Pais"
            value={form.pais}
            editable={false}
            onChangeText={(value) => handleChange('pais', value)}
          />

          <Text style={styles.textForm}>Ciudad</Text>
          <TextInput
            style={styles.input}
            placeholder="Ciudad"
            value={form.ciudad}
            onChangeText={(value) => handleChange('ciudad', value)}
          />

          <TouchableOpacity
            style={styles.buttonStyles}
            onPress={enviarFormulario}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator size="large" color="#fff" />
            ) : (
              <Text style={styles.textButtonStyles}>Guardar</Text>
            )}
          </TouchableOpacity>
          
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PersonalDataScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#C4C4C4",
  },
  container: {
    flex: 1,
    padding: 15,
  },
  containerTracking: {
    flexDirection: "row",
  },
  input: {
    height: 45,
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
  },
  inputTracking: {
    height: 45,
    width: "85%",
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
  },

  textForm: {
    marginBottom: 5,
    fontWeight: "bold",
    fontSize: 14,
  },
  icon: {
    marginLeft: 10,
  },
  textArea: {
    height: 90,
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
    textAlignVertical: "top",
  },
  checkbox: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 10,
    alignContent: "center",
    justifyContent: "space-around",
    alignItems: "center",
  },
  checkboxContainer: {
    flexDirection: "row",
  },
  checkboxText: {
    marginTop: 10,
    marginBottom: 10,
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
  iconStyles: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  iconContainer: {
    marginRight: 15,
    marginTop: Platform.OS === "ios" ? 35 : 50,
  },
  titleAndIconContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    marginVertical: 20,
  },
});







// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

// const App = () => {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch('https://api-v2.dev.mpr.mipaquete.com/getLocations?locationCode=05031000', {
//           method: 'GET',
//           headers: {
//             'session-tracker': 'a0c96ea6-b22d-4fb7-a278-850678d5429c',
//             'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Mjg1NDc3YTM4ODUyZTE5ZTllNjYwNjUiLCJuYW1lIjoiSmVzdXMiLCJzdXJuYW1lIjoiUmFtaXJleSIsImVtYWlsIjoiamVzdXNkYXZpZHJhbWlyZXpzYW5jaGV6QGdtYWlsLmNvbSIsImNlbGxQaG9uZSI6IjMwMDc3ODI4NzciLCJjcmVhdGVkQXQiOiIyMDIyLTA1LTE4VDE5OjIyOjM0LjgxNVoiLCJkYXRlIjoiMjAyMy0wNi0yOSAxNTowOTo1NiIsInBhc3N3b3JkIjoiQWNvbGl0bzE5OTghIiwiaWF0IjoxNjg4MDY5Mzk2fQ.qdi9g-deHsELupnCP4u8juzBpQCv5_S-Sj_ftq-BXEA',
//             'Content-Type': 'text/plain'
//           }
//         });
//         const result = await response.json();
//         setData(result);
//       } catch (error) {
//         setError(error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   if (loading) {
//     return (
//       <View style={styles.container}>
//         <ActivityIndicator size="large" color="#0000ff" />
//       </View>
//     );
//   }

//   if (error) {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.errorText}>Error: {error.message}</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <Text>{JSON.stringify(data, null, 2)}</Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 16,
//   },
//   errorText: {
//     color: 'red',
//     fontSize: 16,
//   },
// });

// export default App;

