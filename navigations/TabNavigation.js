import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faWarehouse } from "@fortawesome/free-solid-svg-icons/faWarehouse";
import { faBolt } from "@fortawesome/free-solid-svg-icons/faBolt";
import { faBars } from "@fortawesome/free-solid-svg-icons/faBars";
import ProfileNavigation from "./ProfileNavigation";
import ServicesNavigation from "./ServicesNavigation";
import ServiceHistoryNavigation from "./ServiceHistoryNavigation";
// import StartTransportNavigation from "./StartTransportNavigation";

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: {
          backgroundColor: "black",
          height: 60
        },

        tabBarIcon: ({ focused, color, size }) => {

          if (route.name === "Bodega") {
            icon = (
              <FontAwesomeIcon icon={faWarehouse} size={34} color={color} />
            );
          } else if (route.name === "Servicios") {
            icon = <FontAwesomeIcon icon={faBolt} size={34} color={color} />;
          } else if (route.name === "Options") {
            icon = <FontAwesomeIcon icon={faBars} size={34} color={color} />;
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
          // tabBarLabel: "Bodega",
          tabBarHideOnKeyboard: "true",
          headerStyle: {
            backgroundColor: "#000000",
          },
          headerTintColor: "#ffffff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />

      <Tab.Screen
        name="Servicios"
        component={ServiceHistoryNavigation}
        options={{
          headerShown: false,
        }}
      />

      <Tab.Screen
        name="Options"
        component={ProfileNavigation}
            options={{
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;
