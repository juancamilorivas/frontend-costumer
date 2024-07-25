import React from "react";
import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { getServiceData } from "../apiServices";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons/faChevronRight";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setImportServiceHistory } from "../reducers/importServiceHistory/importServiceHistorySlice";

const ImportServiceDetailsScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const { docId } = useSelector((state) => state.importServiceHistory);
  const [serviceData, setServiceData] = React.useState({
    declaredValueDian: "",
    airCost: "",
    iva: "",
    arancel: "",
    valorTransportadoraNacionalPesos: "",
    totalPaid: "",
    receiverName: "",
    receiverSurname: "",
    shipmentNumber: "",
    createdAt: "",
  });

  React.useEffect(() => {
    if (!docId) {
      navigation.goBack();
      return;
    }

    const fetchData = async () => {
      try {
        const data = await getServiceData(docId);
        if (data) {
          const createdAt = new Date(
            data.createdAt.seconds * 1000
          ).toLocaleDateString();
          setServiceData({
            declaredValueDian: data.declaredValueDian,
            airCost: data.airCost,
            iva: data.iva,
            arancel: data.arancel,
            valorTransportadoraNacionalPesos:
              data.valorTransportadoraNacionalPesos,
            totalPaid: data.totalPaid,
            receiverName: data.receiverName,
            receiverSurname: data.receiverSurname,
            shipmentNumber: data.shipmentNumber,
            createdAt: createdAt,
          });
          dispatch(
            setImportServiceHistory({
              destinationAddress: data.destinationAddress,
              cellPhone: data.cellPhone,
              locationName: data.locationName,
              country: data.country,
              receiverName: data.receiverName,
              receiverSurname: data.receiverSurname,
            })
          );
        } else {
          console.log("No se encontraron datos para el documento:", docId);
        }
      } catch (error) {
        console.error("Error al obtener los datos del servicio:", error);
      }
    };

    fetchData();
  }, [docId]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView>
        <View style={styles.mainContainer}>
          <Text style={styles.title}>Importacion</Text>

          <View style={styles.inputAndTextContainer}>
            <View style={styles.fromToContainer}>
              <Text style={styles.titleFromTo}>Fecha del pago</Text>
              <Text>{serviceData.createdAt}</Text>
            </View>

            <View style={styles.fromToContainer}>
              <Text style={styles.titleFromTo}>Service #</Text>
              <Text>{docId}</Text>
            </View>

            <View style={styles.fromToContainer}>
              <Text style={styles.titleFromTo}>Remitente</Text>
              <Text>Juan Camilo Rivas Molina</Text>
            </View>

            <TouchableOpacity
              style={styles.fromToContainer}
              onPress={() => navigation.navigate("ImportReceiverHistory")}
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
                {serviceData.receiverName} {serviceData.receiverSurname}
              </Text>
            </TouchableOpacity>

            <View style={styles.fobContainer}>
              <Text style={styles.titleFromTo}>Valor declarado</Text>
              <Text>${serviceData.declaredValueDian}</Text>
            </View>

            <TouchableOpacity
              style={styles.fobContainer}
              // onPress={() => navigation.navigate("ViewDetailsHistory")}
              onPress={() => navigation.navigate("ViewDetailsHistory", { shipmentNumber: serviceData.shipmentNumber })}

            >
              <Text style={styles.titleFromTo}>Numero de guia</Text>
              <Text style={styles.shipmentNumberStyle}>
                {serviceData.shipmentNumber}
              </Text>
            </TouchableOpacity>
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
                  ${serviceData.airCost}
                </Text>
              </View>
            </View>

            <View style={styles.containerRow}>
              <View style={styles.firstColumStyle}>
                <Text style={styles.titleTableStyleLeft}>IVA</Text>
              </View>

              <View style={styles.firstColumStyle}>
                <Text style={styles.titleTableStyleRight}>
                  ${serviceData.iva}
                </Text>
              </View>
            </View>

            <View style={styles.containerRow}>
              <View style={styles.firstColumStyle}>
                <Text style={styles.titleTableStyleLeft}>Arancel</Text>
              </View>

              <View style={styles.firstColumStyle}>
                <Text style={styles.titleTableStyleRight}>
                  ${serviceData.arancel}
                </Text>
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
                  ${serviceData.valorTransportadoraNacionalPesos}
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

export default ImportServiceDetailsScreen;

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
  titleFromTo: {
    fontWeight: "bold",
  },
  shipmentNumberStyle: {
    fontSize: 20,
    color: "#0038FF",
    fontWeight: "bold",
  },
  mainContainerDate: {
    backgroundColor: "white",
    borderRadius: 5,
    marginBottom: 10,
  },
  titleTableDate: {
    backgroundColor: "white",
    textAlign: "left",
    marginLeft: 10,
    fontWeight: "bold",
  },
});
