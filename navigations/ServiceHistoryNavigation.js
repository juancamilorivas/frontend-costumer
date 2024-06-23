import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ServiceHistoryScreen from "../screens/ServiceHistoryScreen";
import { TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons/faChevronLeft";
import { faCircleQuestion } from "@fortawesome/free-solid-svg-icons/faCircleQuestion";
import ImportServiceDetailsScreen from "../screens/ImportServiceDetailsScreen";
import DivisionServiceDetailsScreen from "../screens/DivisionServiceDetailsScreen";
import ImportConsolidatedServiceDetailsScreen from "../screens/ImportConsolidatedServiceDetailsScreen";

const Stack = createNativeStackNavigator();

const ServiceHistoryNavigation = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ServiceHistoryy"
        component={ServiceHistoryScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ImportServiceDetails"
        component={ImportServiceDetailsScreen}
        options={{
          title: "Detalle del servicio",
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
                navigation.navigate("ServiceHistoryy");
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
        name="DivisionServiceDetails"
        component={DivisionServiceDetailsScreen}
        options={{
          title: "Detalle del servicio",
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
                navigation.navigate("ServiceHistoryy");
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
        name="ImportConsolidatedServiceDetails"
        component={ImportConsolidatedServiceDetailsScreen}
        options={{
          title: "Detalle del servicio",
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
                navigation.navigate("ServiceHistoryy");
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

export default ServiceHistoryNavigation;
