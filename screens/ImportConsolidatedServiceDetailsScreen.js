import React from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getServiceData } from "../apiServices";
import { useSelector } from "react-redux";

const PaymentResumeConsolidationScreen = () => {
  const navigation = useNavigation();
  const [serviceData, setServiceData] = React.useState({
    shipmentNumber: "",
    createdAt: "",
    shipmentNumbers: [],
    totalPaid: "",
  });

  const [loading, setLoading] = React.useState(true);


  const { docId } = useSelector((state) => state.consolidatedServiceHistory);

  React.useEffect(() => {
    if (!docId) {
      navigation.goBack();
      return;
    }

    const fetchData = async () => {
      setLoading(true);

      try {
        const data = await getServiceData(docId);
        if (data) {
          const createdAt = new Date(
            data.createdAt.seconds * 1000
          ).toLocaleDateString();
          setServiceData({
            shipmentNumber: data.shipmentNumber,
            createdAt: createdAt,
            shipmentNumbers: data.shipmentNumbers,
            totalPaid: data.totalPaid,
          });
        } else {
          console.log("No se encontraron datos para el documento:", docId);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error al obtener los datos del servicio:", error);
      } finally {
        setLoading(false);

      }
    };

    fetchData();
  }, [docId]);




  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    );
  }



  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView>
        <View style={styles.mainContainer}>
          <Text style={styles.title}>Consolidacion</Text>

          <View style={styles.inputAndTextContainer}>
            <Text style={styles.titleFromTo}>Fecha del pago</Text>
            <Text>{serviceData.createdAt}</Text>
          </View>

          <View style={styles.inputAndTextContainer}>
            <Text style={styles.titleFromTo}>Service #</Text>
            <Text>{docId}</Text>
          </View>

          <TouchableOpacity
            style={styles.fobContainer}
            onPress={() =>
              navigation.navigate("ViewDetailsConsolidated", {
                shipmentNumber: serviceData.shipmentNumber,
              })
            }
          >
            <Text style={styles.titleFromTo}>Nueva guia</Text>
            <Text style={styles.shipmentNumberStyle}>
              {serviceData.shipmentNumber}
            </Text>
          </TouchableOpacity>

          <Text style={styles.titleTable}>Guias consolidadas</Text>

          {serviceData.shipmentNumbers.map((numero, index) => (
            <TouchableOpacity
              style={styles.shipmentNumberContainer}
              key={index}
              onPress={() =>
                navigation.navigate("ViewDetailsConsolidated", {
                  shipmentNumber: numero,
                })
              }
            >
              <Text  style={styles.shipmentConsolidatedStyle}>
                {numero}
              </Text>
            </TouchableOpacity>
          ))}


          


          <Text style={styles.titleTable}>Costos de importacion</Text>

          {/* tabla de precios */}
          <View style={styles.mainContainerTable}>
            <View style={styles.containerRow}>
              <View style={styles.containerVertical}>
                <Text style={styles.titleTableStyleLeft}>Consolidacion</Text>
              </View>

              <View style={styles.containerVertical}>
                <Text style={styles.titleTableStyleRight}>
                  ${serviceData.totalPaid}
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
                <Text style={styles.totalValue}>${serviceData.totalPaid}</Text>
              </View>
            </View>
          </View>
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
    width: "100%",
    marginBottom: 10,
  },
  mainContainer: {
    backgroundColor: "#C4C4C4",
    flex: 1,
    fontSize: 14,
    padding: 15,
    alignItems: "flex-center",
  },
  inputAndTextContainer: {
    justifyContent: "center",
    width: "100%",
    marginBottom: 10,
    backgroundColor: "#ffffff",
    paddingHorizontal: 10,
    borderRadius: 5,
    gap: 5,
    height: 60,
  },
  shipmentNumberContainer: {
    justifyContent: "center",
    width: "50%",
    marginBottom: 10,
    backgroundColor: "#ffffff",
    paddingHorizontal: 10,
    borderRadius: 5,
    gap: 5,
    height: 50,
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
    width: "95%",
  },
  checkboxText: {
    fontSize: 15,
  },
  fromToContainer: {
    backgroundColor: "#ffffff",
    padding: 10,
    borderRadius: 5,
    gap: 5,
    height: 60,
  },
  titleFromTo: {
    fontWeight: "bold",
  },
  // fobContainer: {
  //   flexDirection: "row",
  //   backgroundColor: "#ffffff",
  //   padding: 10,
  //   borderRadius: 5,
  //   justifyContent: "space-between",
  //   alignItems: "center",
  //   height: 50,
  // },
  shipmentNumberStyle: {
    fontSize: 20,
    color: "#0038FF",
    fontWeight: "bold",
  },
  shipmentConsolidatedStyle: {
    fontSize: 18,
    color: "#0038FF",
    fontWeight: "bold",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
});
