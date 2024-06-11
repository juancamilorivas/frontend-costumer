import { StyleSheet, Text, View, Platform } from 'react-native'
import React from 'react'

const Header = ({text}) => {
  return (
    <View>
      <Text style={styles.title}>{text}</Text>
    </View>
  )
}

export default Header



const styles = StyleSheet.create({
    title: {
        fontSize: 40,
        fontWeight: "bold",
        textAlign: "left",
        marginBottom: 15,
        marginLeft: 15,
        marginTop: Platform.OS === "android" ? 35 : 20,
      },
})