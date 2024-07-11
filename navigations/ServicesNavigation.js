import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ConsolidateScreen from "../screens/ConsolidateScreen";
import DivideScreen from "../screens/DivideScreen";
import WarehouseScreen from "../screens/WarehouseScreen";
import RepackScreen from "../screens/RepackScreen";
import DeleteTrackingScreen from "../screens/DeleteTrackingScreen";
import ViewDetailsScreen from "../screens/ViewDetailsScreen";
import InAndOutScreen from "../screens/InAndOutScreen";
import StartTransportNavigation from "./StartTransportNavigation";
import StartTransportConsolidatedNavigation from "./StartTransportConsolidatedNavigation";
import { TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons/faChevronLeft";
import { faCircleQuestion } from "@fortawesome/free-solid-svg-icons/faCircleQuestion";

const Stack = createNativeStackNavigator();

const ServicesNavigation = ({navigation}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Warehouse"
        component={WarehouseScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Consolidate"
        component={ConsolidateScreen}
        // options={{ headerShown: false }}
        options={{
          title: "Consolidar",
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
                navigation.navigate('Bodega', { screen: 'Warehouse' });

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
        name="Divide"
        component={DivideScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="StartTransport"
        component={StartTransportNavigation}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="InAndOut"
        component={InAndOutScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DeleteTracking"
        component={DeleteTrackingScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ViewDetails"
        component={ViewDetailsScreen}
        // options={{ headerShown: false }}
        options={{
          title: "Opciones de entrega",
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
                navigation.navigate('Bodega', { screen: 'Warehouse' });

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

export default ServicesNavigation;




