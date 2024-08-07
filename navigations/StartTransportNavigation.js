import React from "react";
import { TouchableOpacity, Alert } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RecipientScreen from "../screens/RecipientScreen";
import CreateFavoriteScreen from "../screens/CreateFavoriteScreen";
import DeleteFavoriteScreen from "../screens/DeleteFavoriteScreen";
import SendToAnotherPersonScreen from "../screens/SendToAnotherPersonScreen";
import DeclaredValueScreen from "../screens/DeclaredValueScreen";
import LocalCarrierInsuranceScreen from "../screens/LocalCarrierInsuranceScreen";
import PersonalDataScreen from "../screens/PersonalDataScreen";
import PaymentResumeScreen from "../screens/PaymentResumeScreen";
import FromDataScreen from "../screens/FromDataScreen";
import ToDataScreen from "../screens/ToDataScreen";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons/faChevronLeft";
import { faX } from "@fortawesome/free-solid-svg-icons/faX";
import { faCircleQuestion } from "@fortawesome/free-solid-svg-icons/faCircleQuestion";
import { useDispatch } from "react-redux";
import { unsetReceiver } from "../reducers/receiver/receiverSlice";
const Stack = createNativeStackNavigator();

const StartTransportNavigation = ({ navigation }) => {




  const dispatch = useDispatch();

const handleUnsetReceiverAndGoBack = () => {
  Alert.alert(
    'Confirmación',
    '¿Desea cancelar el proceso actual?',
    [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          // Ejecutar las funciones después de presionar OK en el alert
          dispatch(unsetReceiver());
          navigation.navigate('Bodega', { screen: 'Warehouse' });
        },
      },
    ],
    { cancelable: false }
  );
};


  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Recipient"
        component={RecipientScreen}
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
              onPress={handleUnsetReceiverAndGoBack}
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
        // options={{ headerShown: false }}
        options={{
          title: "Crear favorito",
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
                navigation.navigate("Recipient");
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
        name="DeleteFavorite"
        component={DeleteFavoriteScreen}
        // options={{ headerShown: false }}
        options={{
          title: "Eliminar favorito",
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
                navigation.navigate("Recipient");
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
                navigation.navigate("Recipient");
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
              onPress={handleUnsetReceiverAndGoBack}
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
          title: "Seguro",
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
              onPress={handleUnsetReceiverAndGoBack}
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
              onPress={handleUnsetReceiverAndGoBack}
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
        name="PersonalData"
        component={PersonalDataScreen}
        options={{
          title: "Mis datos personales",
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
                navigation.navigate("Recipient");
              }}
            >
              <FontAwesomeIcon icon={faX} size={25} color="#ffffff" />
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
        name="fromData"
        component={FromDataScreen}
        options={{
          title: "Remitente",
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
                navigation.navigate("PaymentResume");
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
        name="toData"
        component={ToDataScreen}
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
                navigation.navigate("PaymentResume");
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




































{/* <Stack.Screen
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
              onPress={checkConsolidation}
            >
              <FontAwesomeIcon icon={faChevronLeft} size={25} color="#ffffff" />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate("Recipient")}>
              <FontAwesomeIcon
                icon={faCircleCheck}
                size={25}
                color="#ffffff"
              />
            </TouchableOpacity>
          ),
        }}
      /> */}





    </Stack.Navigator>
  );
};

export default StartTransportNavigation;
