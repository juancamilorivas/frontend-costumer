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
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { fetchPost } from "../apiServices";

const PaymentResumeScreen = () => {
  const [ready, setReady] = useState(false);
  const { initPaymentSheet, presentPaymentSheet, loading } = usePaymentSheet();
  const navigation = useNavigation();
  const [dataa, setDataa] = React.useState([]);
  const [shipmentData, setShipmentData] = useState(null);
  const [formatedValue, setFormatedValue] = useState(null);
  

  //recuera el valor shipping number de redux
  const { shipmentNumber, name, surname, declaredValue } = useSelector(
    (state) => state.receiver
  );

  useEffect(() => {
    const data = fetchPost(shipmentNumber);
    setShipmentData(data);
    console.log(shipmentData);
  }, [shipmentNumber]);

  // // PACKEAGE DATA FROM FIREBASE
  // const requestBody = {
  //   originLocationCode: "05001000", este dato siempre es el mismo, es bogota
  //   destinyLocationCode: "05001000", este dato viene de redux
  //   height: 14, este dato viene de firebase
  //   width: 25, este dato viene de firebase
  //   length: 35, este dato viene de firebase
  //   weight: 3, este dato viene de firebase
  //   quantity: 1, este dato siempre es el mismo, osea 1
  //   declaredValue: 200000, este dato viene de redux
  //   saleValue: 200000, este dato no es obligatorio
  // };

  // MI PAQUETE SHIPPING QUOTIZATION
  useEffect(() => {
    const requestBody = {
      originLocationCode: "05001000",
      destinyLocationCode: "05001000",
      height: 14,
      width: 25,
      length: 35,
      weight: 3,
      quantity: 1,
      declaredValue: 200000,
      saleValue: 200000,
    };
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api-v2.dev.mpr.mipaquete.com/quoteShipping",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              apikey:
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDMwODhlMzRkYWJkMjVlZTRlM2U2NjQiLCJuYW1lIjoiVGVzdC1taS1wYXF1ZXRlLXJlYWwiLCJzdXJuYW1lIjoiSnVuaW9yIiwiZW1haWwiOiJ0ZXN0QGdtYWlsLmNvbSIsImNlbGxQaG9uZSI6IjMxNDY1NzEyMzMiLCJjcmVhdGVkQXQiOiIyMDE5LTA3LTE4VDE0OjU3OjM5LjA0NFoiLCJkYXRlIjoiMjAyNC0wNy0wMSAxNjozNjozMiIsImlhdCI6MTcxOTg2OTc5Mn0.2FJvgfX1hWZOe0dY_jI3bHnRDL--VXBzLA__gWHS31w",
              "session-tracker": "a0c96ea6-b22d-4fb7-a278-850678d5429c",
            },
            body: JSON.stringify(requestBody),
          }
        );
        const result = await response.json();
        setDataa(result);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  // INTIALIZATION OF PAYMENTSHEET
  useEffect(() => {
    initialisePaymentSheet();
  }, []);

  // PAYMENT SHEET STRIPE
  const initialisePaymentSheet = async () => {
    const { paymentIntent, ephemeralKey, customer } =
      await fetchPaymentSheetParams();

    const { error } = await initPaymentSheet({
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,
      merchantDisplayName: "Example Inc.",
      allowsDelayedPaymentMethods: true,
      returnURL: "stripe-example://stripe-redirect",
    });
    if (error) {
      console.log(`error code: ${error.code}`, error.message);
    } else {
      setReady(true);
    }
  };

  //FETCH CLOUD FUNCTION STRIPE
  //enviar en el cuerpo de esta llamada a la api el queri, traerlo de el storage, hay que crear un nuevo usuario y usar el customerId creado en stripe creado al crear la cuenta
  // const fetchPaymentSheetParams = async () => {
  //   const response = await fetch(
  //     "https://app-zrcl5qd7da-uc.a.run.app/payment-sheet",
  //     {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     }
  //   );
  //   const { paymentIntent, ephemeralKey, customer } = await response.json();

  //   return {
  //     paymentIntent,
  //     ephemeralKey,
  //     customer,
  //   };
  // };

  const fetchPaymentSheetParams = async () => {
    const response = await fetch(
      "https://app-zrcl5qd7da-uc.a.run.app/payment-sheet",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customer: "cus_QOBvgKuY44y0KT",
          weight: 10,
        }),
      }
    );

    const { paymentIntent, ephemeralKey, customer } = await response.json();

    return {
      paymentIntent,
      ephemeralKey,
      customer,
    };
  };

  async function buy() {
    const { error } = await presentPaymentSheet();
    if (error) {
      console.log(`Error code: ${error.code}`, error.message);
    } else {
      setReady(false);
      // Alert.alert('Success', 'The payment was confimed successfully');
      Alert.alert("Success", "The payment was confirmed successfully", [
        {
          text: "OK",
          onPress: () => navigation.navigate("Bodega", { screen: "Warehouse" }),
        },
      ]);
    }
  }



useEffect(() => {
  const formatValue = (declaredValue) => {
    let cleaned = declaredValue.replace(/[^\d.]/g, ''); // Remove non-numeric characters except for the period
    let match = cleaned.match(/^(\d+)?(\.\d{0,2})?/); // Allow up to two decimal places
    let formatted = match ? match[0] : '';
    setFormatedValue(formatted)
    // return `USD ${formatted}`;
    formatValue()
  };
}, [formatedValue])

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView>
        <View style={styles.mainContainer}>
          <Text style={styles.title}>Resumen del Servicio</Text>

          <View style={styles.inputAndTextContainer}>
            <TouchableOpacity
              style={styles.fromToContainer}
              onPress={() => navigation.navigate("fromData")}
            >
              <Text style={styles.titleFromTo}>De</Text>
              <Text>Juan Camilo Rivas Molina</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.fromToContainer}
              onPress={() => navigation.navigate("toData")}
            >
              <Text style={styles.titleFromTo}>Para</Text>
              <Text>
                {name} {surname}
              </Text>
            </TouchableOpacity>

            <View style={styles.fobContainer}>
              <Text style={styles.titleFromTo}>FOB</Text>
              <Text>{formatedValue}</Text>
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
                <Text style={styles.titleTableStyleRight}>$127.000</Text>
              </View>
            </View>

            <View style={styles.containerRow}>
              <View style={styles.firstColumStyle}>
                <Text style={styles.titleTableStyleLeft}>IVA</Text>
              </View>

              <View style={styles.firstColumStyle}>
                <Text style={styles.titleTableStyleRight}>$0</Text>
              </View>
            </View>

            <View style={styles.containerRow}>
              <View style={styles.firstColumStyle}>
                <Text style={styles.titleTableStyleLeft}>Arancel</Text>
              </View>

              <View style={styles.firstColumStyle}>
                <Text style={styles.titleTableStyleRight}>$0</Text>
              </View>
            </View>

            <View style={styles.containerRow}>
              <View style={styles.firstColumStyle}>
                <Text style={styles.titleTableStyleLeft}>
                  Entrega en Colombia
                </Text>
              </View>

              <View style={styles.firstColumStyle}>
                <Text style={styles.titleTableStyleRight}>$14.200</Text>
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
                <Text style={styles.totalValue}>$141.200</Text>
              </View>
            </View>
          </View>

          <StripeProvider
            publishableKey={
              "pk_test_51JmPS8GALVCY5K55NevtjIZQTNsBbopWyplDUf9ll3JDxsiSF8puo6aYtS9FndKcvpEPC7rxaf9Yyv220NtU1BfO00wF9cQenJ"
            }
          >
            {/* <Button title={'Buy'} onPress={buy} disabled={loading || !ready}/> */}

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
    height: 60,
  },
  mainContainer: {
    backgroundColor: "#C4C4C4",
    flex: 1,
    fontSize: 14,
    padding: 15,
    alignItems: "flex-start",
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
    marginTop: 20,
    marginBottom: 18,
  },
  textButtonStyles: {
    color: "white",
    fontWeight: "bold",
    fontSize: 25,
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
});
