import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button, TouchableOpacity } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [barcodeBounds, setBarcodeBounds] = useState(null);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ bounds, cornerPoints, data, type }) => {
    setScanned(true);
    setBarcodeBounds(bounds);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  const renderBarcodeBounds = () => {
    if (!barcodeBounds) return null;
    const { origin, size } = barcodeBounds;
    return (
      <View
        style={[
          styles.bounds,
          {
            left: origin.x,
            top: origin.y,
            width: size.width,
            height: size.height,
          },
        ]}
      />
    );
  };

  const handleTap = (event) => {
    if (!scanned) {
      const { locationX, locationY } = event.nativeEvent;
      const bounds = {
        origin: { x: locationX - 50, y: locationY - 50 }, // Ajusta el valor de 50 según lo necesites
        size: { width: 100, height: 100 }, // Tamaño del cuadro delimitador
      };
      setBarcodeBounds(bounds);
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={StyleSheet.absoluteFill}
        onPress={handleTap}
        activeOpacity={1}
      >
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
        {renderBarcodeBounds()}
      </TouchableOpacity>
      {scanned && (
        <Button title={"Tap to Scan Again"} onPress={() => setScanned(false)} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  bounds: {
    position: "absolute",
    borderWidth: 2,
    borderColor: "red",
  },
});
