import { StripeProvider, usePaymentSheet } from "@stripe/stripe-react-native";
import React, {useEffect, useState} from 'react'
import { Button, Image, Text, View, Alert, StyleSheet } from "react-native";

const App  = () => {

const [ ready, setReady] = useState(false)
const {initPaymentSheet, presentPaymentSheet, loading} = usePaymentSheet();


useEffect(() => {
initialisePaymentSheet();
}, []);

const initialisePaymentSheet = async  () => {
  const {paymentIntent, ephemeralKey, customer} = 
  await fetchPaymentSheetParams();


  const {error} = await  initPaymentSheet({
    customerId: customer,
    customerEphemeralKeySecret: ephemeralKey,
    paymentIntentClientSecret: paymentIntent,
    merchantDisplayName: 'Example Inc.',
    allowsDelayedPaymentMethods: true,
    returnURL: 'stripe-example://stripe-redirect',
  })
  if (error) {
    console.log(`error code: ${error.code}`, error.message);
  } else {
    setReady(true)
  }
}


const fetchPaymentSheetParams = async () => {
  const response = await fetch( 'https://app-zrcl5qd7da-uc.a.run.app/payment-sheet', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    }
  });
  const {paymentIntent, ephemeralKey, customer} = await response.json() 

  return {
    paymentIntent,
    ephemeralKey,
    customer
  };
}

  async function buy () {
    const {error } = await presentPaymentSheet();
    if (error ) {
      console.log(`Error code: ${error.code}`, error.message)
    } else  {
      Alert.alert('Success', 'The payment was confimed successfully');
      setReady(false)
    }
  }
  return (
    <View style={styles.container}> 
      <StripeProvider
        publishableKey={'pk_test_51JmPS8GALVCY5K55NevtjIZQTNsBbopWyplDUf9ll3JDxsiSF8puo6aYtS9FndKcvpEPC7rxaf9Yyv220NtU1BfO00wF9cQenJ'}>
      <Text>1 kg of sweet potatoes</Text>
      <Image source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUDLtMs0CiKCrFvzIkPpHWSSChvlaq55k-Lg&s' }} style={styles.image}/>
      <Button title={'Buy'} onPress={buy} disabled={loading || !ready}/>
      </StripeProvider>
    </View>
  )
}
export default App

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 100,
  },
  image: {
    height: 150, 
    width: 250,
  }
})
















// import React from "react";
// import {
//   Image,
//   Text,
//   StyleSheet,
//   View,
//   TouchableOpacity,
//   TextInput,
//   SafeAreaView,
//   ScrollView,
//   Alert,
// } from "react-native";

// const PaymentResumeScreen = ({ navigation }) => {
//   const [values, setValue] = React.useState("");
//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <ScrollView>
//         <View style={styles.mainContainer}>
//           <Text style={styles.title}>Resumen del Servicio</Text>

//           <View style={styles.inputAndTextContainer}>
//             <View style={styles.fromToContainer}>
//               <Text style={styles.titleFromTo}>De</Text>
//               <Text>Juan Camilo Rivas Molina</Text>
//             </View>

//             <View style={styles.fromToContainer}>
//               <Text style={styles.titleFromTo}>Para</Text>
//               <Text>Juan Camilo Rivas Molina</Text>
//             </View>
//             <View style={styles.fobContainer}>
//               <Text style={styles.titleFromTo}>FOB</Text>
//               <Text>US63.99</Text>
//             </View>
//           </View>

//           <Text style={styles.titleTable}>Costos de importacion</Text>

//           {/* tabla de precios */}
//           <View style={styles.mainContainerTable}>
//             <View style={styles.containerRow}>
//               <View style={styles.containerVertical}>
//                 <Text style={styles.titleTableStyleLeft}>Importacion</Text>
//               </View>

//               <View style={styles.containerVertical}>
//                 <Text style={styles.titleTableStyleRight}>$127.000</Text>
//               </View>
//             </View>

//             <View style={styles.containerRow}>
//               <View style={styles.firstColumStyle}>
//                 <Text style={styles.titleTableStyleLeft}>IVA</Text>
//               </View>

//               <View style={styles.firstColumStyle}>
//                 <Text style={styles.titleTableStyleRight}>$0</Text>
//               </View>
//             </View>

//             <View style={styles.containerRow}>
//               <View style={styles.firstColumStyle}>
//                 <Text style={styles.titleTableStyleLeft}>Arancel</Text>
//               </View>

//               <View style={styles.firstColumStyle}>
//                 <Text style={styles.titleTableStyleRight}>$0</Text>
//               </View>
//             </View>

//             <View style={styles.containerRow}>
//               <View style={styles.firstColumStyle}>
//                 <Text style={styles.titleTableStyleLeft}>
//                   Entrega en Colombia
//                 </Text>
//               </View>

//               <View style={styles.firstColumStyle}>
//                 <Text style={styles.titleTableStyleRight}>$14.200</Text>
//               </View>
//             </View>

//             <View style={styles.containerRow}>
//               <View style={styles.firstColumStyle}>
//                 <Text style={styles.titleTableStyleLeft}>Descuentos</Text>
//               </View>

//               <View style={styles.firstColumStyle}>
//                 <Text style={styles.titleTableStyleRight}>$0</Text>
//               </View>
//             </View>

//             <View style={styles.totalContainerRow}>
//               <View style={styles.lastColumStyle}>
//                 <Text style={styles.totalTitle}>Valor total</Text>
//               </View>

//               <View style={styles.lastColumStyle}>
//                 <Text style={styles.totalValue}>$141.200</Text>
//               </View>
//             </View>
//           </View>

//           <TouchableOpacity
//             style={styles.buttonStyles}
//             onPress={() => navigation.navigate("LocalCarrierInsurance")}
//           >
//             <Text style={styles.textButtonStyles}>Continuar</Text>
//           </TouchableOpacity>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default PaymentResumeScreen;

// //STYLES
// const styles = StyleSheet.create({
//   input: {
//     width: "100%",
//     height: 46,
//     borderColor: "#fff",
//     borderWidth: 2,
//     borderWidth: 2,
//     borderRadius: 5,
//     padding: 10,
//     marginVertical: 10,
//     backgroundColor: "#ffffff",
//     marginBottom: 20,
//     fontSize: 16,
//   },
//   link: {
//     color: "blue",
//     textDecorationLine: "underline",
//   },
//   fromToContainer: {
//     backgroundColor: "#ffffff",
//     padding: 10,
//     borderRadius: 5,
//     gap: 5,
//     height: 60,
//   },
//   fobContainer: {
//     flexDirection: "row",
//     backgroundColor: "#ffffff",
//     padding: 10,
//     borderRadius: 5,
//     justifyContent: "space-between",
//     alignItems: "center",
//     height: 60,
//   },
//   mainContainer: {
//     backgroundColor: "#C4C4C4",
//     flex: 1,
//     fontSize: 14,
//     padding: 15,
//     alignItems: "flex-start",
//   },
//   buttonStyles: {
//     backgroundColor: "blue",
//     padding: 10,
//     height: 48,
//     borderRadius: 5,
//     width: "98%",
//     justifyContent: "center",
//     alignItems: "center",
//     alignSelf: "center",
//     marginTop: 20,
//     marginBottom: 18,
//   },
//   textButtonStyles: {
//     color: "white",
//     fontWeight: "bold",
//     fontSize: 25,
//   },
//   inputAndTextContainer: {
//     justifyContent: "center",
//     width: "100%",
//     gap: 10,
//     marginBottom: 10,
//   },
//   title: {
//     fontSize: 25,
//     fontWeight: "bold",
//     marginBottom: 10,
//   },
//   subTitle: {
//     fontSize: 14,
//     marginVertical: 15,
//   },
//   titleTable: {
//     fontWeight: "bold",
//     marginVertical: 10,
//   },
//   mainContainerTable: {
//     backgroundColor: "white",
//     borderRadius: 5,
//   },
//   titleFromTo: {
//     fontWeight: "bold",
//   },
//   containerRow: {
//     flexDirection: "row",
//   },
//   totalContainerRow: {
//     flexDirection: "row",
//     borderTopWidth: 1,
//     borderTopColor: "gray",
//     marginVertical: 10,
//   },
//   firstColumStyle: {
//     width: "50%",
//     marginBottom: 10,
//   },
//   lastColumStyle: {
//     width: "50%",
//   },
//   containerVertical: {
//     width: "50%",
//     marginVertical: 10,
//   },
//   safeArea: {
//     backgroundColor: "#C4C4C4",
//     flex: 1,
//   },
//   totalTitle: {
//     backgroundColor: "white",
//     textAlign: "left",
//     marginLeft: 10,
//     marginTop: 10,
//     color: "#0038FF",
//     fontWeight: "bold",
//   },
//   totalValue: {
//     backgroundColor: "white",
//     color: "#0038FF",
//     fontWeight: "bold",
//     textAlign: "right",
//     marginRight: 10,
//     marginTop: 10,
//   },
//   titleTableStyleRight: {
//     backgroundColor: "white",
//     textAlign: "right",
//     marginRight: 10,
//   },
//   titleTableStyleLeft: {
//     backgroundColor: "white",
//     textAlign: "left",
//     marginLeft: 10,
//   },
// });