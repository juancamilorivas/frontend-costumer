import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ConsolidateScreen from "../screens/ConsolidateScreen";
import DivideScreen from "../screens/DivideScreen";
import WarehouseScreen from "../screens/WarehouseScreen";
import DeleteTrackingScreen from "../screens/DeleteTrackingScreen";
import ViewDetailsScreen from "../screens/ViewDetailsScreen";
import InAndOutScreen from "../screens/InAndOutScreen";
import StartTransportNavigation from "./StartTransportNavigation";
import StartTransportConsolidatedNavigation from "./StartTransportConsolidatedNavigation";
import StartDivideNavigation from "./StartDivideNavigation";
import { Alert, TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons/faChevronLeft";
import { faCircleQuestion } from "@fortawesome/free-solid-svg-icons/faCircleQuestion";
import { faCircleArrowRight } from "@fortawesome/free-solid-svg-icons/faCircleArrowRight";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { unsetConsolidation } from "../reducers/consolidation/consolidationSlice";
import { unsetDivide } from "../reducers/divide/divideSlice";

const Stack = createNativeStackNavigator();

const ServicesNavigation = ({ navigation }) => {
  const dispatch = useDispatch();

  const { shipmentNumbers } = useSelector((state) => state.consolidation);

  const checkConsolidation = () => {
    if (shipmentNumbers.length <= 1) {
      Alert.alert("Debes seleccionar almenos 2 items");
    } else {
      navigation.navigate("StartTransportConsolidated");
    }
  };

  const handleUnsetConsolidatedAndGoBack = () => {
    dispatch(unsetConsolidation());
    navigation.navigate("Bodega", { screen: "Warehouse" });
  };

  const handleUnsetDivideAndGoBack = () => {
    dispatch(unsetDivide());
    navigation.navigate("Bodega", { screen: "Warehouse" });
  };

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Warehouse"
        component={WarehouseScreen}
        options={{
          title: "Bodega",
          headerShown: true,
          headerStyle: {
            backgroundColor: "#000000",
          },
          headerTintColor: "#ffffff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />

      <Stack.Screen
        name="Consolidate"
        component={ConsolidateScreen}
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
            <TouchableOpacity onPress={handleUnsetConsolidatedAndGoBack}>
              <FontAwesomeIcon icon={faChevronLeft} size={25} color="#ffffff" />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={checkConsolidation}>
              <FontAwesomeIcon
                icon={faCircleArrowRight}
                size={25}
                color="#ffffff"
              />
            </TouchableOpacity>
          ),
        }}
      />

      <Stack.Screen
        name="StartTransportConsolidated"
        component={StartTransportConsolidatedNavigation}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="StartDivide"
        component={StartDivideNavigation}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Divide"
        component={DivideScreen}
        options={{
          title: "Dividir",
          headerShown: true,
          headerStyle: {
            backgroundColor: "#000000",
          },
          headerTintColor: "#ffffff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerLeft: () => (
            <TouchableOpacity onPress={handleUnsetDivideAndGoBack}>
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
                navigation.navigate("Bodega", { screen: "Warehouse" });
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
