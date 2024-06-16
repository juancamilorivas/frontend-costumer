import React, { useEffect } from "react";
import { StyleSheet, SafeAreaView, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import WarehouseScreen from "./WarehouseScreen";

const VerifyUserScreen = ({ navigation }) => {
  // const [uid, setUid] = React.useState(null);
  useEffect(() => {
    const getMyStringValue = async () => {
      try {
        const value = await AsyncStorage.getItem('key');
        console.log('este es el uid desde warehouse:', value);
        setUid(value); 
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
        {/* <WarehouseScreen uid={uid}/> */}
        <ActivityIndicator size="large" color="#fff" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000', 
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default VerifyUserScreen;
