import { StripeProvider, usePaymentSheet } from "@stripe/stripe-react-native";
import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  Alert,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import {
  fetchPost,
  getTrm,
  fetchPartidaArancelariaPorcentajes,
  savePayment,
  changeShipmentStatus,
} from "../apiServices";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons/faChevronRight";
import {
  EXPO_PUBLIC_API_MIPAQUETE,
  EXPO_PUBLIC_API_STRIPE_PUBLISHABLE,
} from "@env";
// import { useFocusEffect } from "@react-navigation/native";
import { CheckBox } from "@rneui/themed";
import { runTransaction, doc } from "firebase/firestore";

import { db } from "../firebase";

const sfDocRef = doc(db, "/shipmentNumberCount", "config");


const PaymentResumeScreen = () => {
  const [ready, setReady] = useState(false);
  const { initPaymentSheet, presentPaymentSheet, loading } = usePaymentSheet();
  const navigation = useNavigation();
  const [remitente, setRemitente] = React.useState({
    name: "",
    surname: "",
    locker: "",
  });
  const [iva, setIva] = useState(0);
  const [arancel, setArancel] = useState(0);
  const [envioNacionaldollars, setEnvioNacionaldollars] = useState(0);
  const [airCostValue, setAirCostValue] = useState(0);
  const [totalValue, setTotalValue] = useState(0.0);
  const [isChecked, setChecked] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [uid, setUid] = React.useState("");
  const [trm, setTrm] = React.useState("");
  const [locker, setLocker] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [partidaArancelaria, setPartidaArancelaria] = React.useState("");


  const handleCheckboxPress = () => {
    const newCheckedStatus = !isChecked;
    setChecked(newCheckedStatus);
    if (newCheckedStatus) {
      setValue("10.000");
    } else {
      setValue("");
    }
  };

  //recuera el valor shipping number de redux
  const {
    shipmentNumber,
    name,
    surname,
    declaredValue,
    declaredValueDian,
    destinyDaneCode,
    recogeEnBodega,
    locationName,
    destinationAddress,
    cellPhone,
    consolidated,
    shipmentNumbers,
  } = useSelector((state) => state.receiver);

  // INTIALIZATION OF PAYMENTSHEET
  useEffect(() => {
    initialisePaymentSheet();
  }, []);

  // Initialization of PaymentSheet
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const value = await AsyncStorage.getItem("key");
        setUid(value);
        const jsonData = await AsyncStorage.getItem("userData");
        if (jsonData !== null) {
          const userData = JSON.parse(jsonData);
          setRemitente({
            name: userData.name,
            surname: userData.surname,
          });
          setLocker(userData.casillero);
        } else {
          console.log("No se encontró ningún userData en el storage");
        }
      } catch (error) {
        console.log("Error fetching user data from AsyncStorage", error);
      }
    };

    fetchUserData();
  }, []);

  // PAYMENT SHEET STRIPE
  const initialisePaymentSheet = async () => {
    const { paymentIntent, ephemeralKey, customer } =
      await fetchPaymentSheetParams();

    const { error } = await initPaymentSheet({
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,
      merchantDisplayName: "Nowbox Corporation.",
      allowsDelayedPaymentMethods: true,
      returnURL: "stripe-example://stripe-redirect",
    });
    if (error) {
      console.log(`error code: ${error.code}`, error.message);
    } else {
      setReady(true);
    }
  };

  const fetchPaymentSheetParams = async () => {
    const data = await fetchPost(shipmentNumber);

    //iva y arancel firebase
    let iva = 0;
    let arancel = 0;
    if (declaredValueDian > 200) {
      const documentDataPartida = await fetchPartidaArancelariaPorcentajes(
        data.partidaArancelariaImpuestos
        
      );
      setPartidaArancelaria(data.partidaArancelariaImpuestos)
      const mutarValorIva = documentDataPartida.iva / 100;
      const mutarValorArancel = documentDataPartida.arancel / 100;
      iva = declaredValueDian * mutarValorIva;
      arancel = declaredValueDian * mutarValorArancel;
    }

    // TARIFA DE IMPORTACION
    const airCost = data.weight * 2.9;

    if (!recogeEnBodega) {
      try {
        // DATOS PARA EL FETCH A MIPAQUETE.COM CON BOGOTA COMO ORIGINLOCATIONCODE SIEMPRE POR DEFECTO
        const requestBody = {
          originCountryCode: "170",
          destinyCountryCode: "170",
          originLocationCode: "11001000",
          destinyLocationCode: destinyDaneCode,
          quantity: 1,
          width: data.width,
          length: data.lenghtValue,
          height: data.height,
          weight: data.weight,
          declaredValue: declaredValue,
        };

        // Fetch TRM Value
        const trmValue = await getTrm();
        setTrm(trmValue);

        //QUOTE SHIPPING
        const response = await fetch(
          "https://api-v2.dev.mpr.mipaquete.com/quoteShipping",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              apikey: EXPO_PUBLIC_API_MIPAQUETE,
              "session-tracker": "a0c96ea6-b22d-4fb7-a278-850678d5429c",
            },
            body: JSON.stringify(requestBody),
          }
        );
        const result = await response.json();

        // Function to find minimum shippingCost
        const encontrarMenorCostoEnvio = () => {
          if (result.length === 0) {
            return null; // Handle empty array case as needed
          }
          let minCostoEnvio = result[0].shippingCost;
          result.forEach((item) => {
            if (item.shippingCost < minCostoEnvio) {
              minCostoEnvio = item.shippingCost;
            }
          });
          return minCostoEnvio;
        };

        const menorCostoEnvio = encontrarMenorCostoEnvio();
        const envioNacionalEndolares = menorCostoEnvio / trmValue;

        // total suma de todos los valores
        const formattedAmount =
          parseFloat(airCost) +
          parseFloat(envioNacionalEndolares) +
          parseFloat(iva) +
          parseFloat(arancel);
        const fixedAmount = formattedAmount.toFixed(2);
        const amount = Math.round(fixedAmount * 100);

        // guardar valores en el estado local usestate
        setIva(iva.toFixed(2));
        setArancel(arancel.toFixed(2));
        setEnvioNacionaldollars(envioNacionalEndolares.toFixed(2));
        setAirCostValue(airCost.toFixed(2));
        setTotalValue(fixedAmount);

        // nombre y apelido remitente del storage
        const jsonData = await AsyncStorage.getItem("userData");
        const userDataa = JSON.parse(jsonData);

        // llamar a la cloud function con el valor total
        const responseCall = await fetch(
          "https://app-zrcl5qd7da-uc.a.run.app/payment-sheet",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              customer: userDataa.customerId,
              amount: amount,
            }),
          }
        );

        const { paymentIntent, ephemeralKey, customer } =
          await responseCall.json();

        return {
          paymentIntent,
          ephemeralKey,
          customer,
        };
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    } else {
      // total suma de todos los valores sin envio nacional
      const formattedAmount =
        parseFloat(airCost) + parseFloat(iva) + parseFloat(arancel);
      const fixedAmount = formattedAmount.toFixed(2);
      const amount = Math.round(fixedAmount * 100);

      // guardar valores en el estado local usestate
      setIva(iva.toFixed(2));
      setArancel(arancel.toFixed(2));
      setAirCostValue(airCost.toFixed(2));
      setTotalValue(fixedAmount);

      // nombre y apelido remitente del storage
      const jsonData = await AsyncStorage.getItem("userData");
      const userDataa = JSON.parse(jsonData);

      // llamar a la cloud function con el valor total
      const responseCall = await fetch(
        "https://app-zrcl5qd7da-uc.a.run.app/payment-sheet",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            customer: userDataa.customerId,
            amount: amount,
          }),
        }
      );

      const { paymentIntent, ephemeralKey, customer } =
        await responseCall.json();

      return {
        paymentIntent,
        ephemeralKey,
        customer,
      };
    }
  };

  //ABRIR STRIPE SHEET PARA HACER EL PAGO
  async function buy() {
    const { error } = await presentPaymentSheet();
    if (error) {
      console.log(`Error code: ${error.code}`, error.message);
    } else {
      let paymentState = "Pagado";
      setReady(false);
      savePayment(
        totalValue,
        uid,
        declaredValue,
        airCostValue,
        envioNacionaldollars,
        trm,
        iva,
        arancel,
        locker,
        shipmentNumber,
        name,
        surname,
        declaredValueDian,
        destinyDaneCode,
        recogeEnBodega,
        locationName,
        destinationAddress,
        cellPhone,
        paymentState,
        partidaArancelaria
      );
      changeShipmentStatus(shipmentNumber);
      Alert.alert("Success", "The payment was confirmed successfully", [
        {
          text: "OK",
          onPress: () => navigation.navigate("Bodega", { screen: "Warehouse" }),
        },
      ]);
    }
  }


  //ABRIR STRIPE SHEET PARA HACER EL PAGO
  async function payWithOutCreditCard() {
    Alert.alert(
      "Confirmar",
      "¿Desea iniciar la importacion de este item a Colombia",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Si",
          onPress: async () => {
            setIsLoading(true);























if (consolidated === true) {

  const MAX_RETRIES = 3;
   let retries = 0;
  //CREATE SHIPMENT NUMBER
  const incrementNumber = async () => {
    setIsLoading(true);

    // funcion creadora
    const transactionFunction = async (transaction) => {
      const sfDoc = await transaction.get(sfDocRef);
      if (!sfDoc.exists()) {
        setIsLoading(false);
        throw new Error("Document does not exist!");
      }
      const isUpdating = sfDoc.data().isUpdating;
      if (!isUpdating) {
        transaction.update(sfDocRef, { isUpdating: true });
        const currentNumber = parseInt(sfDoc.data().guiaActual, 10);
        const newNumber = currentNumber + 1;
        transaction.update(sfDocRef, { guiaActual: newNumber.toString() });
        transaction.update(sfDocRef, { isUpdating: false });
        return newNumber;
      } else {
        setIsLoading(false);
        return null;
      }
    };


    try {
      const newNumber = await runTransaction(db, async (transaction) => {
        return await transactionFunction(transaction);
      });

      if (newNumber !== null) {
        let locker = newNumber.toString();
        return locker; // Devuelve el valor de locker

      }
    } catch {
      if (error.code === "failed-precondition" && retries < MAX_RETRIES) {
        retries++;
        setIsLoading(false);
        await incrementNumber(); // Reintentar la transacción
      } else {
        setIsLoading(false);
        await incrementNumber(); // Reintentar la transacción
      }
    }
  };

  const locker = await incrementNumber();

  console.log(locker)

  await changeShipmentStatus(shipmentNumber);
  let paymentState = "Pendiente";
   savePayment(
    totalValue,
    uid,
    declaredValue,
    airCostValue,
    envioNacionaldollars,
    trm,
    iva,
    arancel,
    locker,
    shipmentNumber,
    name,
    surname,
    declaredValueDian,
    destinyDaneCode,
    recogeEnBodega,
    locationName,
    destinationAddress,
    cellPhone,
    paymentState,
    partidaArancelaria,
    consolidated,
    shipmentNumbers
  );


}


















            await changeShipmentStatus(shipmentNumber);
            let paymentState = "Pendiente";
             savePayment(
              totalValue,
              uid,
              declaredValue,
              airCostValue,
              envioNacionaldollars,
              trm,
              iva,
              arancel,
              locker,
              shipmentNumber,
              name,
              surname,
              declaredValueDian,
              destinyDaneCode,
              recogeEnBodega,
              locationName,
              destinationAddress,
              cellPhone,
              paymentState,
              partidaArancelaria,
              consolidated,
              shipmentNumbers,
            );
            setIsLoading(false);
            // navigation.navigate("Bodega", { screen: "Warehouse" });
            Alert.alert("Success", "The payment was confirmed successfully", [
              {
                text: "OK",
                onPress: () => navigation.navigate("Bodega", { screen: "Warehouse" }),
              },
            ]);
          },
        },
      ],
      { cancelable: false }
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView>
        <View style={styles.mainContainer}>
          <Text style={styles.title}>Resumen del Servicio</Text>

          <View style={styles.inputAndTextContainer}>
            <View style={styles.fromToContainer}>
              <Text style={styles.titleFromTo}>Remitente</Text>
              <Text>
                {remitente.name} {remitente.surname}
              </Text>
            </View>

            <TouchableOpacity
              style={styles.fromToContainer}
              onPress={() => navigation.navigate("toData")}
            >
              <View style={styles.superiorTextAndIcon}>
                <Text style={styles.titleFromTo}>Destinatario</Text>
                <FontAwesomeIcon
                  icon={faChevronRight}
                  size={14}
                  color={"#000000"}
                />
              </View>
              <Text>
                {name} {surname}
              </Text>
            </TouchableOpacity>

            <View style={styles.fobContainer}>
              <Text style={styles.titleFromTo}>Valor declarado</Text>
              <Text>$ {declaredValueDian.toFixed(2)}</Text>
            </View>
          </View>

          <Text style={styles.titleTable}>Costos de importacion</Text>

          {/* tabla de precios */}
          <View style={styles.mainContainerTable}>
            <View style={styles.containerRow}>
              <View style={styles.containerVertical}>
                <Text style={styles.titleTableStyleLeft}>Importacion</Text>
              </View>

              <View style={styles.containerVertical}>
                <Text style={styles.titleTableStyleRight}>
                  $ {airCostValue}
                </Text>
              </View>
            </View>

            <View style={styles.containerRow}>
              <View style={styles.firstColumStyle}>
                <Text style={styles.titleTableStyleLeft}>IVA</Text>
              </View>

              <View style={styles.firstColumStyle}>
                <Text style={styles.titleTableStyleRight}>$ {iva}</Text>
              </View>
            </View>

            <View style={styles.containerRow}>
              <View style={styles.firstColumStyle}>
                <Text style={styles.titleTableStyleLeft}>Arancel</Text>
              </View>

              <View style={styles.firstColumStyle}>
                <Text style={styles.titleTableStyleRight}>$ {arancel}</Text>
              </View>
            </View>

            <View style={styles.containerRow}>
              <View style={styles.firstColumStyle}>
                <Text style={styles.titleTableStyleLeft}>
                  Entrega en Colombia
                </Text>
              </View>

              <View style={styles.firstColumStyle}>
                <Text style={styles.titleTableStyleRight}>
                  $ {envioNacionaldollars}
                </Text>
              </View>
            </View>

            <View style={styles.containerRow}>
              <View style={styles.firstColumStyle}>
                <Text style={styles.titleTableStyleLeft}>Descuentos</Text>
              </View>

              <View style={styles.firstColumStyle}>
                <Text style={styles.titleTableStyleRight}>$0</Text>
              </View>
            </View>

            <View style={styles.totalContainerRow}>
              <View style={styles.lastColumStyle}>
                <Text style={styles.totalTitle}>Valor total</Text>
              </View>

              <View style={styles.lastColumStyle}>
                <Text style={styles.totalValue}>$ {totalValue}</Text>
              </View>
            </View>
          </View>

          <CheckBox
            checked={isChecked}
            onPress={handleCheckboxPress}
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            containerStyle={styles.checkboxContainer}
            textStyle={styles.checkboxText}
            // title="Hacer importacion como pendiente de pago"
            title="Pagar cuando llegue a Colombia"
            checkedColor="blue"
            uncheckedColor="black"
          />

          {isChecked ? (
            <TouchableOpacity
              style={styles.buttonStyles}
              onPress={payWithOutCreditCard}
              disabled={loading}
            >
              {/* <Text style={styles.textButtonStyles}>Continuar</Text> */}
              {isLoading ? (
              <ActivityIndicator size="large" color="#fff" />
            ) : (
             <Text style={styles.textButtonStyles}>
              Continuar
            </Text>         )}
            </TouchableOpacity>
          ) : (
            <StripeProvider publishableKey={EXPO_PUBLIC_API_STRIPE_PUBLISHABLE}>
              <TouchableOpacity
                style={styles.buttonStyles}
                onPress={buy}
                disabled={loading || !ready}
              >
                <Text style={styles.textButtonStyles}>Continuar</Text>
              </TouchableOpacity>
            </StripeProvider>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default PaymentResumeScreen;

//STYLES
const styles = StyleSheet.create({
  input: {
    width: "100%",
    height: 46,
    borderColor: "#fff",
    borderWidth: 2,
    borderWidth: 2,
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    backgroundColor: "#ffffff",
    marginBottom: 20,
    fontSize: 16,
  },
  link: {
    color: "blue",
    textDecorationLine: "underline",
  },
  fromToContainer: {
    backgroundColor: "#ffffff",
    padding: 10,
    borderRadius: 5,
    gap: 5,
    height: 60,
  },
  fobContainer: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    padding: 10,
    borderRadius: 5,
    justifyContent: "space-between",
    alignItems: "center",
    height: 50,
  },
  mainContainer: {
    backgroundColor: "#C4C4C4",
    flex: 1,
    fontSize: 14,
    padding: 15,
    alignItems: "flex-center",
    // backgroundColor: "red"
  },
  inputAndTextContainer: {
    justifyContent: "center",
    width: "100%",
    gap: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subTitle: {
    fontSize: 14,
    marginVertical: 15,
  },
  titleTable: {
    fontWeight: "bold",
    marginVertical: 10,
  },
  mainContainerTable: {
    backgroundColor: "white",
    borderRadius: 5,
  },
  titleFromTo: {
    fontWeight: "bold",
  },
  containerRow: {
    flexDirection: "row",
  },
  totalContainerRow: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "gray",
    marginVertical: 10,
  },
  firstColumStyle: {
    width: "50%",
    marginBottom: 10,
  },
  lastColumStyle: {
    width: "50%",
  },
  containerVertical: {
    width: "50%",
    marginVertical: 10,
  },
  safeArea: {
    backgroundColor: "#C4C4C4",
    flex: 1,
  },
  totalTitle: {
    backgroundColor: "white",
    textAlign: "left",
    marginLeft: 10,
    marginTop: 10,
    color: "#0038FF",
    fontWeight: "bold",
  },
  totalValue: {
    backgroundColor: "white",
    color: "#0038FF",
    fontWeight: "bold",
    textAlign: "right",
    marginRight: 10,
    marginTop: 10,
  },
  titleTableStyleRight: {
    backgroundColor: "white",
    textAlign: "right",
    marginRight: 10,
  },
  titleTableStyleLeft: {
    backgroundColor: "white",
    textAlign: "left",
    marginLeft: 10,
  },
  superiorTextAndIcon: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  buttonStyles: {
    backgroundColor: "blue",
    padding: 10,
    height: 48,
    borderRadius: 5,
    width: "98%",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    // marginTop: 10,
    marginBottom: 18,
  },
  textButtonStyles: {
    color: "white",
    fontWeight: "bold",
    fontSize: 25,
  },
  checkboxContainer: {
    backgroundColor: "#C4C4C4",
    paddingTop: 10,
    paddingBottom: 15,
    // backgroundColor: "red",
    width: "95%",
    // justifyContent: "flex-start"
  },
  checkboxText: {
    fontSize: 15,
  },
});
