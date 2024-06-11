import React from "react";
import CreateGuideScreen from "../screens/CreateGuideScreen";
import ServicesScreen from "../screens/ServicesScreen";
import EnterGuideScreen from "../screens/EnterGuideScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faSquarePlus } from "@fortawesome/free-solid-svg-icons/faSquarePlus";
import { faBolt } from "@fortawesome/free-solid-svg-icons/faBolt";
import { faBars } from "@fortawesome/free-solid-svg-icons/faBars";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons/faCirclePlus";
import ProfileNavigation from "./ProfileNavigation";

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

          if (route.name === "Create") {
            icon = (
              <FontAwesomeIcon icon={faSquarePlus} size={size} color={color} />
            );
          } else if (route.name === "Services") {
            icon = <FontAwesomeIcon icon={faBolt} size={size} color={color} />;
          } else if (route.name === "Enter") {
            icon = (
              <FontAwesomeIcon icon={faCirclePlus} size={size} color={color} />
            );
          } else if (route.name === "Options") {
            icon = <FontAwesomeIcon icon={faBars} size={size} color={color} />;
          }

          return icon;
        },
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen
        name="Create"
        component={CreateGuideScreen}
        options={{
          headerShown: false,
          tabBarLabel: "Crear",
          tabBarHideOnKeyboard: "true",
        }}
      />

      <Tab.Screen
        name="Enter"
        component={EnterGuideScreen}
        options={{
          headerShown: false,
          tabBarLabel: "Ingresar",
        }}
      />

      <Tab.Screen
        name="Services"
        component={ServicesScreen}
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
