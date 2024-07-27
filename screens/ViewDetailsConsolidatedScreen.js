import React, { useEffect } from "react";
import { SafeAreaView, StyleSheet, Text, View, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchShipmentDetail } from "../apiServices";

// import { useSelector } from "react-redux";

const ViewDetailsHistoryScreen = ({route}) => {
  const [form, setForm] = React.useState({
    createdAt: "",
    description: "",
    height: "",
    lengthValue: "",
    partidaArancelariaImpuestos: "",
    shipmentNumber: "",
    weight: "",
    width: "",
    trackingNumber: "",
    localTransporterName: "",
    shipmentNumberTransportadora: "",
  });

//   const { shipmentNumber } = useSelector((state) => state.receiver);
  const { shipmentNumber } = route.params;



  React.useEffect(() => {
    const getMyDefaultValue = async () => {
      try {
        if (shipmentNumber) {
          const shipmentDetails = await fetchShipmentDetail(shipmentNumber);

          // Convert Firestore Timestamp to Date string if it exists
          const createdAt = new Date(
            shipmentDetails.createdAt.seconds * 1000
          ).toLocaleDateString();

          setForm({
            createdAt: createdAt,
            description: shipmentDetails.description,
            height: shipmentDetails.height,
            lengthValue: shipmentDetails.lengthValue,
            partidaArancelariaImpuestos:
              shipmentDetails.partidaArancelariaImpuestos,
            shipmentNumber: shipmentDetails.shipmentNumber,
            weight: shipmentDetails.weight,
            width: shipmentDetails.width,
            trackingNumber: shipmentDetails.trackingNumber,
            localTransporterName: shipmentDetails.localTransporterName,
            shipmentNumberTransportadora:
              shipmentDetails.shipmentNumberTransportadora,
          });
        }
      } catch (e) {
        console.log("Something went wrong identifying user storage", e);
      }
    };
    getMyDefaultValue();
  }, [shipmentNumber]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.title}>Detalle del envio</Text>

          <View style={styles.section}>
            <Text style={styles.titleSection}>
              Fecha de ingreso a bodega Miami
            </Text>
            <Text style={styles.textSection}>{form.createdAt}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.titleSection}>Numero de guia</Text>
            <Text style={styles.textSection}>{form.shipmentNumber}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.titleSection}>Tracking number</Text>
            <Text style={styles.textSection}>{form.trackingNumber}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.titleSection}>Partida arancelaria</Text>
            <Text style={styles.textSection}>
              {form.partidaArancelariaImpuestos}
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.titleSection}>Peso - libras</Text>
            <Text style={styles.textSection}>{form.weight}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.titleSection}>Altura</Text>
            <Text style={styles.textSection}>{form.height}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.titleSection}>Ancho</Text>
            <Text style={styles.textSection}>{form.width}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.titleSection}>Largo</Text>
            <Text style={styles.textSection}>{form.lengthValue}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.titleSection}>Transportadora en Colombia</Text>
            <Text style={styles.textSection}>{form.localTransporterName}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.titleSection}>
              Numrero de remesa transportadora
            </Text>
            <Text style={styles.textSection}>
              {form.shipmentNumberTransportadora}
            </Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.titleSection}>Descripcion</Text>
            <Text style={styles.textSection}>{form.description}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ViewDetailsHistoryScreen;


const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#C4C4C4",
  },
  container: {
    flex: 1,
    padding: 15,
  },
  section: {
    width: "100%",
    backgroundColor: "white",
    paddingLeft: 10,
    paddingVertical: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    marginVertical: 20,
  },
  titleSection: {
    fontSize: 16,
    fontWeight: "bold",
    paddingBottom: 5,
  },
  textSection: {
    fontSize: 16,
  },
});
