import React from "react";
import {
  Image,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  ScrollView,
  Alert,
} from "react-native";

const PaymentResumeScreen = ({ navigation }) => {
  const [values, setValue] = React.useState("");
  return (
    <SafeAreaView style={styles.safeArea}>
    <ScrollView>
    <View style={styles.mainContainer}>
      <Text style={styles.title}>Resumen del Servicio</Text>

      <View style={styles.inputAndTextContainer}>
        <View style={styles.fromToContainer}>
          <Text style={styles.titleFromTo}>De</Text>
          <Text>Juan Camilo Rivas Molina</Text>
        </View>

        <View style={styles.fromToContainer}>
          <Text style={styles.titleFromTo}>Para</Text>
          <Text>Juan Camilo Rivas Molina</Text>
        </View>
        <View style={styles.fobContainer}>
          <Text style={styles.titleFromTo}>FOB</Text>
          <Text>US63.99</Text>
        </View>
      </View>

      <Text style={styles.titleTable}>Costos de importacion</Text>

      {/* tabla de precios */}
      <View style={styles.mainContainerTable}>
        <View style={styles.containerRow}>
          <View style={styles.containerVertical}>
            <Text
              style={{
                backgroundColor: "white",
                textAlign: "left",
                marginLeft: 10,
              }}
            >
              Importacion
            </Text>
          </View>

          <View style={styles.containerVertical}>
            <Text
              style={{
                backgroundColor: "white",
                textAlign: "right",
                marginRight: 10,
              }}
            >
              $127.000
            </Text>
          </View>
        </View>

        <View style={styles.containerRow}>
          <View style={styles.firstColumStyle}>
            <Text
              style={{
                backgroundColor: "white",
                textAlign: "left",
                marginLeft: 10,
              }}
            >
              IVA
            </Text>
          </View>

          <View style={styles.firstColumStyle}>
            <Text
              style={{
                backgroundColor: "white",
                textAlign: "right",
                marginRight: 10,
              }}
            >
              $0
            </Text>
          </View>
        </View>

        <View style={styles.containerRow}>
          <View style={styles.firstColumStyle}>
            <Text
              style={{
                backgroundColor: "white",
                textAlign: "left",
                marginLeft: 10,
              }}
            >
              Arancel
            </Text>
          </View>

          <View style={styles.firstColumStyle}>
            <Text
              style={{
                backgroundColor: "white",
                textAlign: "right",
                marginRight: 10,
              }}
            >
              $0
            </Text>
          </View>
        </View>

        <View style={styles.containerRow}>
          <View style={styles.firstColumStyle}>
            <Text
              style={{
                backgroundColor: "white",
                textAlign: "left",
                marginLeft: 10,
              }}
            >
              Entrega en Colombia
            </Text>
          </View>

          <View style={styles.firstColumStyle}>
            <Text
              style={{
                backgroundColor: "white",
                textAlign: "right",
                marginRight: 10,
              }}
            >
              $14.200
            </Text>
          </View>
        </View>

        <View style={styles.containerRow}>
          <View style={styles.firstColumStyle}>
            <Text
              style={{
                backgroundColor: "white",
                textAlign: "left",
                marginLeft: 10,
              }}
            >
              Descuentos
            </Text>
          </View>

          <View style={styles.firstColumStyle}>
            <Text
              style={{
                backgroundColor: "white",
                textAlign: "right",
                marginRight: 10,
              }}
            >
              $0
            </Text>
          </View>
        </View>






        <View style={styles.totalContainerRow}>
          <View style={styles.lastColumStyle}>
            <Text
              style={styles.totalTitle}
            >
              Valor total
            </Text>
          </View>

          <View style={styles.lastColumStyle}>
            <Text
              style={styles.totalValue}
            >
              $141.200
            </Text>
          </View>
        </View>




      </View>

      <TouchableOpacity
        style={styles.buttonStyles}
        onPress={() => navigation.navigate("LocalCarrierInsurance")}
      >
        <Text style={styles.textButtonStyles}>Continuar</Text>
      </TouchableOpacity>
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
    marginVertical: 10
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
  }
});
