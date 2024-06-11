import React, { useEffect } from "react";
import { StyleSheet, SafeAreaView, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const VerifyUserScreen = ({ navigation }) => {
  useEffect(() => {
    const getMyStringValue = async () => {
      try {
        const value = await AsyncStorage.getItem('key');
        console.log('userId stored in storage:', value);
        if (value) {
          navigation.navigate("TabsNavigation");
        } else {
          navigation.navigate("LoginCreate");
        }
      } catch (e) {
        console.log('Something went wrong identifying user storage', e);
        navigation.navigate("LoginCreate");
      }
    };

    getMyStringValue();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#fff" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000', // Puedes usar un color o una imagen de fondo
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default VerifyUserScreen;
