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
import { savePaymentDivided, changeShipmentStatus } from "../apiServices";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { EXPO_PUBLIC_API_STRIPE_PUBLISHABLE } from "@env";

const PaymentResumeScreen = () => {
  const [ready, setReady] = useState(false);
  const { initPaymentSheet, presentPaymentSheet, loading } = usePaymentSheet();
  const navigation = useNavigation();
  const [totalValue] = useState("5.00");
  const [uid, setUid] = React.useState("");

  //recuera el valor shipping number de redux
  const { divideNumber, divideInstructions, shipmentNumber } = useSelector(
    (state) => state.divide
  );

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
          customer: userDataa.stripeCustomerId,
          amount: 500,
        }),
      }
    );

    const { paymentIntent, ephemeralKey, customer } = await responseCall.json();

    return {
      paymentIntent,
      ephemeralKey,
      customer,
    };
  };

  //ABRIR STRIPE SHEET PARA HACER EL PAGO
  async function buy() {
    const { error } = await presentPaymentSheet();
    if (error) {
      console.log(`Error code: ${error.code}`, error.message);
    } else {
      let paymentState = "Pagado";
      setReady(false);
      savePaymentDivided(
        totalValue,
        uid,
        shipmentNumber,
        paymentState,
        divideNumber,
        divideInstructions
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

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView>
        <View style={styles.mainContainer}>
          <Text style={styles.title}>Resumen del Servicio</Text>

          <View style={styles.inputAndTextContainer}>
            <View style={styles.fobContainer}>
              <Text style={styles.titleFromTo}>Dividir en:</Text>
              <Text>{divideNumber}</Text>
            </View>

            <View style={styles.fromToContainer}>
              <Text style={styles.titleFromTo}>instrucciones</Text>
              <Text>{divideInstructions}</Text>
            </View>
          </View>

          <Text style={styles.titleTable}>Costos de importacion</Text>

          {/* tabla de precios */}
          <View style={styles.mainContainerTable}>
            <View style={styles.containerRow}>
              <View style={styles.containerVertical}>
                <Text style={styles.titleTableStyleLeft}>Division</Text>
              </View>

              <View style={styles.containerVertical}>
                <Text style={styles.titleTableStyleRight}>${totalValue}</Text>
              </View>
            </View>

            <View style={styles.containerRow}>
              <View style={styles.firstColumStyle}>
                <Text style={styles.titleTableStyleLeft}>Descuentos</Text>
              </View>

              <View style={styles.firstColumStyle}>
                <Text style={styles.titleTableStyleRight}>$0.00</Text>
              </View>
            </View>

            <View style={styles.totalContainerRow}>
              <View style={styles.lastColumStyle}>
                <Text style={styles.totalTitle}>Valor total</Text>
              </View>

              <View style={styles.lastColumStyle}>
                <Text style={styles.totalValue}>${totalValue}</Text>
              </View>
            </View>
          </View>

          <StripeProvider publishableKey={EXPO_PUBLIC_API_STRIPE_PUBLISHABLE}>
            <TouchableOpacity
              style={styles.buttonStyles}
              onPress={buy}
              disabled={loading || !ready}
            >
              <Text style={styles.textButtonStyles}>Continuar</Text>
            </TouchableOpacity>
          </StripeProvider>
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
    marginBottom: 15,
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
