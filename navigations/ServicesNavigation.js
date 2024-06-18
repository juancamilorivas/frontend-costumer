import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PayTransportScreen from "../screens/PayTransportScreen";
import ConsolidateScreen from "../screens/ConsolidateScreen";
import DivideScreen from "../screens/DivideScreen";
import WarehouseScreen from "../screens/WarehouseScreen";
import RepackScreen from "../screens/RepackScreen";
import DeleteTrackingScreen from "../screens/DeleteTrackingScreen";
import ViewDetailsScreen from "../screens/ViewDetailsScreen";
import InAndOutScreen from "../screens/InAndOutScreen";
import StartTransportNavigation from "./StartTransportNavigation";


const Stack = createNativeStackNavigator();

const ServicesNavigation = () => {
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
        options={{ headerShown: false }}
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
        name="Repack"
        component={RepackScreen}
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
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default ServicesNavigation;
