import React from "react";
// import ServicesScreen from "../screens/ServicesScreen";
import EnterGuideScreen from "../screens/EnterGuideScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faWarehouse } from "@fortawesome/free-solid-svg-icons/faWarehouse";
import { faBolt } from "@fortawesome/free-solid-svg-icons/faBolt";
import { faBars } from "@fortawesome/free-solid-svg-icons/faBars";
import ProfileNavigation from "./ProfileNavigation";
import ServicesNavigation from "./ServicesNavigation";

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: {
          backgroundColor: "black",
        },

        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Bodega") {
            icon = (
              <FontAwesomeIcon icon={faWarehouse} size={size} color={color} />
            );
          } 
          else if (route.name === "Enter") {
            icon = (
              <FontAwesomeIcon icon={faBolt} size={size} color={color} />
            );
          } 
          else if (route.name === "Options") {
            icon = <FontAwesomeIcon icon={faBars} size={size} color={color} />;
          }

          return icon;
        },
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen
        name="Bodega"
        component={ServicesNavigation}
        options={{
          headerShown: false,
          tabBarLabel: "Bodega",
          tabBarHideOnKeyboard: "true",
          headerStyle: {
            backgroundColor: '#000000',
          },
          headerTintColor: '#ffffff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />

      <Tab.Screen
        name="Enter"
        component={EnterGuideScreen}
        options={{
          headerShown: false,
          tabBarLabel: "Servicios",
        }}
      />

      <Tab.Screen
        name="Options"
        component={ProfileNavigation}
        options={{
          headerShown: false,
          tabBarLabel: "Opciones",
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;

