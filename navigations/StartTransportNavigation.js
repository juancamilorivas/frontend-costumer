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
      <Stack.Screen
        name="CreateFavorite"
        component={CreateFavoriteScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SendToAnotherPerson"
        component={SendToAnotherPersonScreen}
        options={{
          title: "Destinatario",
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
      <Stack.Screen
        name="DeclaredValue"
        component={DeclaredValueScreen}
        options={{
          title: "Valor declarado",
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

      <Stack.Screen
        name="LocalCarrierInsurance"
        component={LocalCarrierInsuranceScreen}
        options={{
          title: "Seguro nacional",
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
      <Stack.Screen
        name="PaymentResume"
        component={PaymentResumeScreen}
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
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
            >
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
