import { StyleSheet, Text, SafeAreaView, Platform, TouchableOpacity } from 'react-native'
import React from 'react'
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons/faArrowLeft";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";


//la felcha ebe ser un opcional, se debe poder mostrar sin flecha
const HeaderArrowBack = ({text, navigation, arrow = true}) => {
  return (
    <SafeAreaView >
        {arrow && (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesomeIcon
            icon={faArrowLeft}
            size={30}
            style={styles.iconArrowLeft}
          />
        </TouchableOpacity>
      )}
      <Text style={styles.title}>{text}</Text>
    </SafeAreaView>
  )
}

export default HeaderArrowBack



const styles = StyleSheet.create({
    title: {
        fontSize: 40,
        fontWeight: "bold",
        textAlign: "left",
        marginBottom: 15,
        marginLeft: 15,
        marginTop: Platform.OS === "android" ? 25 : 15,
      },
      iconArrowLeft: {
        marginLeft: 15,
        marginTop: 30,
      },
   
})