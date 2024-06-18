import React from "react";
import { Button, TouchableOpacity } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RecipientScreen from "../screens/RecipientScreen";
import CreateFavoriteScreen from "../screens/CreateFavoriteScreen";
import SendToAnotherPersonScreen from "../screens/SendToAnotherPersonScreen";
import DeclaredValueScreen from "../screens/DeclaredValueScreen";
import LocalCarrierInsuranceScreen from "../screens/LocalCarrierInsuranceScreen";
import PaymentResumeScreen from "../screens/PaymentResumeScreen";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons/faChevronLeft";
import { faCircleQuestion } from "@fortawesome/free-solid-svg-icons/faCircleQuestion";

const Stack = createNativeStackNavigator();

const StartTransportNavigation = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Recipient"
        component={RecipientScreen}
        options={{
          title: "¿ Quien Recibe ?",
          headerShown: true,
          headerStyle: {
            backgroundColor: "#000000",
          },
          headerTintColor: "#ffffff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
            >
              <FontAwesomeIcon icon={faChevronLeft} size={25} color="#ffffff" />
            </TouchableOpacity>
          ),
          headerRight: () => (
            // <Button
            //   onPress={() => alert("Botón presionado!")}
            //   title="Botón"
            //   color="#ffffff"
            // />
            <TouchableOpacity
            onPress={() => alert("Botón presionado!")}
          >
            <FontAwesomeIcon icon={faCircleQuestion} size={25} color="#ffffff" />
          </TouchableOpacity>

          ),
        }}
      />
      <Stack.Screen
        name="CreateFavorite"
        component={CreateFavoriteScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SendToAnotherPerson"
        component={SendToAnotherPersonScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DeclaredValue"
        component={DeclaredValueScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="LocalCarrierInsurance"
        component={LocalCarrierInsuranceScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PaymentResume"
        component={PaymentResumeScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default StartTransportNavigation;
