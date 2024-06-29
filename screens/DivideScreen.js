import { StyleSheet, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";

import React, { useEffect, useState } from "react";

const DivideScreen = () => {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [dataa, setDataa] = useState([]);
  const [locationCode, setLocationCode] = useState(null);





  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api-v2.dev.mpr.mipaquete.com/getLocations",
          {
            method: "GET",
            headers: {
              apikey:
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDMwODhlMzRkYWJkMjVlZTRlM2U2NjQiLCJuYW1lIjoiVGVzdC1taS1wYXF1ZXRlLXJlYWwiLCJzdXJuYW1lIjoiSnVuaW9yIiwiZW1haWwiOiJ0ZXN0QGdtYWlsLmNvbSIsImNlbGxQaG9uZSI6IjMxNDY1NzEyMzMiLCJjcmVhdGVkQXQiOiIyMDE5LTA3LTE4VDE0OjU3OjM5LjA0NFoiLCJkYXRlIjoiMjAyNC0wNi0yNyAxOTo0MDoyNSIsImlhdCI6MTcxOTUzNTIyNX0.qOT_feCv2pitJVEjfQUm2VY1sGSTk6tu5lvst4Y_D2g",
              "session-tracker": "a0c96ea6-b22d-4fb7-a278-850678d5429c",
            },
          }
        );
        const result = await response.json();
        const capitalize = (text) => {
          return text
            .toLowerCase()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
        };
        const transformedData = result
        .map((item) => ({
          label: `${capitalize(item.locationName)}, ${capitalize(item.departmentOrStateName)}`,
          value: item._id,
          locationCode: item.locationCode,
        }))
        .sort((a, b) => a.label.localeCompare(b.label));
        setDataa(transformedData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);







  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: "blue" }]}>
          Destino
        </Text>
      );
    }
    return null;
  };

  return (
    <View style={styles.container}>
      {renderLabel()}
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={dataa}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? "Destino" : "Elige una opcion"}
        searchPlaceholder="Search..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          setValue(item.value);
          setLocationCode(item.locationCode);
          setIsFocus(false);
        }}
        renderLeftIcon={() => (
          <AntDesign
            style={styles.icon}
            color={isFocus ? "blue" : "black"}
            name="Safety"
            size={20}
          />
        )}
      />
    </View>
  );
};

export default DivideScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingVertical: 16,
  },
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: "white"
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

