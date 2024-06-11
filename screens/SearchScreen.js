import React, { useState } from "react";
import {
  TextInput,
  Button,
  Text,
  StyleSheet,
  Alert,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import HeaderArrowBack from "../components/HeaderArrowBack";
import { useNavigation } from "@react-navigation/native";

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState("");

  const navigation = useNavigation();

  const fetchPostContent = async () => {
    if (searchQuery == "") {
      Alert.alert("ingrese una guia");
      return;
    }

    try {
      const docRef = doc(db, "blogPosts", searchQuery.trim());
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        const postData = docSnap.data();
        setSearchResult(postData.postTitle || "No title found");
      } else {
        console.log("No such document!");
        setSearchResult("No se encontró el documento");
      }
    } catch (error) {
      console.error("Error fetching post content:", error);
      setSearchResult("Error al buscar contenido");
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <HeaderArrowBack text="Buscar" navigation={navigation} />
      <ScrollView style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Ingrese el número de la guia"
          onChangeText={(text) => setSearchQuery(text)}
          value={searchQuery}
          clearButtonMode="while-editing"
        />
        <Button title="Buscar" onPress={fetchPostContent} />
        <Text style={styles.result}>{searchResult}</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "white",
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 15,
    marginTop: Platform.OS === "android" ? 25 : 15,
  },
  input: {
    height: 50,
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: "white",
    borderRadius: 5,
    fontSize: 18,
  },
  result: {
    marginTop: 20,
    fontSize: 18,
    textAlign: "center",
  },
});

export default SearchScreen;
