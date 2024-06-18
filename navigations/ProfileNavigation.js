import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileScreen from "../screens/ProfileScreen";
import PersonalDataScreen from "../screens/PersonalDataScreen";
import SearchScreen from "../screens/SearchScreen";
import AddressScreen from "../screens/AddressScreen";

const Stack = createNativeStackNavigator();

const ProfileNavigation = () => {




  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="PersonalData"
        component={PersonalDataScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Address"
        component={AddressScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default ProfileNavigation;
