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
  savePaymentConsolidated,
  fetchPartidaArancelariaGeneral,
  changeShipmentdateConsolidated,
} from "../apiServices";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { db } from "../firebase";
import { collection, addDoc, doc, runTransaction } from "firebase/firestore";

const sfDocRef = doc(db, "/shipmentNumberCount", "config");

const PaymentResumeConsolidationScreen = () => {
  const navigation = useNavigation();

  const [consolidationValue] = useState(0);
  const [totalValue] = useState(0.0);
  const [uid, setUid] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [lockerNumber, setLockerNumber] = React.useState("");

  //recuera el valor shipping number de redux
  const { shipmentNumbers } = useSelector((state) => state.consolidation);

  // Initialization of PaymentSheet
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const value = await AsyncStorage.getItem("key");
        setUid(value);
        const jsonData = await AsyncStorage.getItem("userData");
        if (jsonData !== null) {
          const userData = JSON.parse(jsonData);
          setLockerNumber(userData.locker);
        } else {
          console.log("No se encontró ningún userData en el storage");
        }
      } catch (error) {
        console.log("Error fetching user data from AsyncStorage", error);
      }
    };
    fetchUserData();
  }, []);


  
  //ALERT PARA INCIAR CONSOLIDACION
  async function payWithOutCreditCard() {
    Alert.alert(
      "Confirmar",
      "¿Desea iniciar la consolidacion de estos items?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Si",
          onPress: async () => {
            setIsLoading(true);

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
                  transaction.update(sfDocRef, {
                    guiaActual: newNumber.toString(),
                  });
                  transaction.update(sfDocRef, { isUpdating: false });
                  return newNumber;
                } else {
                  setIsLoading(false);
                  return null;
                }
              };

              try {
                const newNumber = await runTransaction(
                  db,
                  async (transaction) => {
                    return await transactionFunction(transaction);
                  }
                );

                if (newNumber !== null) {
                  let locker = newNumber.toString();
                  return locker; // Devuelve el valor de locker
                }
              } catch {
                if (
                  error.code === "failed-precondition" &&
                  retries < MAX_RETRIES
                ) {
                  retries++;
                  setIsLoading(false);
                  await incrementNumber(); // Reintentar la transacción
                } else {
                  setIsLoading(false);
                  await incrementNumber(); // Reintentar la transacción
                }
              }
            };

            const newShipmentNumber = await incrementNumber();

            async function processShipments(shipmentNumbers) {
              for (const shipment of shipmentNumbers) {
                await changeShipmentdateConsolidated(
                  shipment,
                  newShipmentNumber
                );
              }
            }

            processShipments(shipmentNumbers);


            const partidaArancelariaGeneral = await fetchPartidaArancelariaGeneral();


            //crear guia nueva con valores no asignados
            await addDoc(collection(db, "shipments"), {
              createdAt: new Date(),
              description: "n/a",
              height: "n/a",
              lengthValue: "n/a",
              localTransporterName: "n/a",
              partidaArancelariaImpuestos: partidaArancelariaGeneral,
              shipmentNumber: newShipmentNumber,
              shipmentNumberTransportadora: "n/a",
              show: false,
              locker: lockerNumber,
              trackingNumber: "n/a",
              weight: "n/a",
              width: "n/a",
              warehouseLocation: "n/a",
              imei: "n/a",
              serial: "n/a",
            });

            let paymentState = "Pagado";
            savePaymentConsolidated(
              totalValue,
              uid,
              newShipmentNumber,
              paymentState,
              shipmentNumbers
            );

            setIsLoading(false);
            Alert.alert("Success", "The payment was confirmed successfully", [
              {
                text: "OK",
                onPress: () =>
                  navigation.navigate("Bodega", { screen: "Warehouse" }),
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

          <Text style={styles.titleTable}>Guias a consolidar</Text>
          <View style={styles.inputAndTextContainer}>
            {shipmentNumbers.map((numero, index) => (
              <Text key={index} style={styles.numeroText}>
                {numero}
              </Text>
            ))}
          </View>

          <Text style={styles.titleTable}>Costos de importacion</Text>

          {/* tabla de precios */}
          <View style={styles.mainContainerTable}>
            <View style={styles.containerRow}>
              <View style={styles.containerVertical}>
                <Text style={styles.titleTableStyleLeft}>Consolidacion</Text>
              </View>

              <View style={styles.containerVertical}>
                <Text style={styles.titleTableStyleRight}>
                  ${consolidationValue}
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

          <Text>(Este servicio no tiene costo)</Text>

          <TouchableOpacity
            style={styles.buttonStyles}
            onPress={payWithOutCreditCard}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator size="large" color="#fff" />
            ) : (
              <Text style={styles.textButtonStyles}>Pagar</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default PaymentResumeConsolidationScreen;

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
    marginBottom: 10,
    backgroundColor: "#ffffff",
    padding: 10,
    borderRadius: 5,
    gap: 5,
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
    marginBottom: 10,
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
    marginTop: 15,
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
