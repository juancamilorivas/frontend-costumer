import React from "react";
import { TouchableOpacity, Alert } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import ConsolidateScreen from "../screens/ConsolidateScreen";
import PaymentResumeDivideScreen from "../screens/PaymentResumeDivideScreen";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons/faChevronLeft";
import { faCircleQuestion } from "@fortawesome/free-solid-svg-icons/faCircleQuestion";
import { useDispatch } from "react-redux";
import { unsetDivide } from "../reducers/divide/divideSlice";

const Stack = createNativeStackNavigator();

const StartTransportNavigation = ({ navigation }) => {
  const dispatch = useDispatch();

  const handleUnsetDivideAndGoBack = () => {
    Alert.alert(
      "Confirmación",
      "¿Desea cancelar el proceso actual?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            dispatch(unsetDivide());
            navigation.navigate("Bodega", { screen: "Warehouse" });
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <Stack.Navigator>

      <Stack.Screen
        name="PaymentResumeDivide"
        component={PaymentResumeDivideScreen}
        options={{
          title: "Resumen del servicio",
          headerShown: true,
          headerStyle: {
            backgroundColor: "#000000",
          },
          headerTintColor: "#ffffff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerLeft: () => (
            <TouchableOpacity onPress={handleUnsetDivideAndGoBack}>
              <FontAwesomeIcon icon={faChevronLeft} size={25} color="#ffffff" />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => alert("Botón presionado!")}>
              <FontAwesomeIcon
                icon={faCircleQuestion}
                size={25}
                color="#ffffff"
              />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export default StartTransportNavigation;
