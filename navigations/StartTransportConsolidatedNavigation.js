import React from "react";
import { TouchableOpacity, Alert } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PaymentResumeConsolidationScreen from "../screens/PaymentResumeConsolidationScreen";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons/faChevronLeft";
import { faCircleQuestion } from "@fortawesome/free-solid-svg-icons/faCircleQuestion";
import { useDispatch } from "react-redux";
import { unsetConsolidation } from "../reducers/consolidation/consolidationSlice";

const Stack = createNativeStackNavigator();

const StartTransportNavigation = ({ navigation }) => {
  const dispatch = useDispatch();

  const handleUnsetReceiverAndGoBack = () => {
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
            // Ejecutar las funciones después de presionar OK en el alert
            dispatch(unsetConsolidation());
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
        name="PaymentResumeConsolidation"
        component={PaymentResumeConsolidationScreen}
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
            <TouchableOpacity onPress={handleUnsetReceiverAndGoBack}>
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
