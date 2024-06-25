import {
  FlatList,
  View,
  Text,
  ActivityIndicator,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  RefreshControl,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons/faUser";
import { faWarehouse } from "@fortawesome/free-solid-svg-icons/faWarehouse";
import { faStar } from "@fortawesome/free-solid-svg-icons/faStar";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchFavoritesOnSnapshot } from "../apiServices";
import { fetchMoreFavoritesOnSnapshot } from "../apiServices";
import { fetchPersonalDataOnSnapshot } from "../apiServices";
import { fetchPersonalData } from "../apiServices";
import { fetchFavoriteData } from "../apiServices";
import { useDispatch } from "react-redux";
import { setReceiver } from "../reducers/receiver/receiverSlice";

const RecipientScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const [posts, setPosts] = React.useState([]);
  const [startAfter, setStartAfter] = React.useState(null);
  const [postsPerLoad] = React.useState(5);
  const [lastPost, setLastPost] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const [uid, setUid] = React.useState(null);
  const [nameDefault, setNameDefault] = React.useState("");
  const [destinationAddressDefault, setdestinationAddressDefault] =
    React.useState("");
  const [surNameDefault, setSurNameDefault] = React.useState("");

  //GET DEFAULT DATA ONSNAPSHOT SOLO SE EJECUTA AL PRESIONAR EL BOTON DE LOS DEFAULT
  const getMyStringValue = async () => {
    try {
      const value = await AsyncStorage.getItem("key");
      if (value) {
        // Llama a fetchPersonalDataOnSnapshot con el uid obtenido y actualiza el estado del formulario
        const unsubscribe = fetchPersonalDataOnSnapshot(value, (userData) => {
          if (userData) {
            // Verifica si alguno de los campos requeridos está vacío
            if (
              !userData.name ||
              !userData.surname ||
              !userData.cellPhone ||
              !userData.nit ||
              !userData.destinationAddress ||
              !userData.destinyDaneCode ||
              !userData.email
            ) {
              // Al menos uno de los campos está vacío, redirige a la pantalla "PersonalData"
              navigation.navigate("PersonalData");
            } else {
              dispatch(
                setReceiver({
                  name: userData.name,
                  surname: userData.surname,
                  cellPhone: userData.cellPhone,
                  email: userData.email,
                  nit: userData.nit,
                  destinyDaneCode: userData.destinyDaneCode,
                  destinationAddress: userData.destinationAddress,
                })
              );
              // Ningún campo está vacío, redirige a la pantalla "DeclaredValue"
              navigation.navigate("LocalCarrierInsurance");
            }
          }
        });

        // Limpia la suscripción cuando el componente se desmonta
        return () => unsubscribe();
      }
    } catch (e) {
      console.log("Something went wrong identifying user storage", e);
    }
  };

  //GET DATA PARA RECOGER EN BODEGA BOGOTA
  const sendToWarehouse = async () => {
    try {
      const value = await AsyncStorage.getItem("key");
      if (value) {
        const userData = await fetchPersonalData(value);
        if (userData) {
          dispatch(
            setReceiver({
              name: userData.name,
              surname: userData.surname,
              cellPhone: userData.cellPhone,
              email: userData.email,
              nit: userData.nit,
              destinyDaneCode: "Bogota",
              destinationAddress: "Calle 24c # 84 - 84 bodega 34",
            })
          );
          navigation.navigate("DeclaredValue");
        }
      }
    } catch (e) {
      console.log("Something went wrong identifying user storage", e);
    }
  };



























  // //GET DATA PARA RECOGER EN BODEGA BOGOTA
  // const sendToFavorite = async () => {
  //   try {
  //     const value = await AsyncStorage.getItem("key");
  //     if (value) {
  //       const userData = await fetchFavoriteData(value);
  //       if (userData) {
  //         console.log(userData)
  //         dispatch(
  //           setReceiver({
  //             name: userData.name,
  //             surname: userData.surname,
  //             cellPhone: userData.cellPhone,
  //             email: userData.email,
  //             nit: userData.nit,
  //             destinyDaneCode: userData.destinyDaneCode,
  //             destinationAddress: userData.destinationAddress,
  //           })
  //         );
  //         navigation.navigate("LocalCarrierInsurance");

  //       }
  //     }
  //   } catch (e) {
  //     console.log("Something went wrong identifying user storage", e);
  //   }
  // };





  const sendToFavorite = async () => {

    try {
      const value = await AsyncStorage.getItem("key");
      if (value) {
        const userData = await fetchFavoriteData(value);
        if (userData && userData.length > 0) {
          // Assuming you want to use the first favorite address for now
          const firstFavoriteAddress = userData[0];
          console.log(firstFavoriteAddress);
          dispatch(
            setReceiver({
              name: firstFavoriteAddress.name,
              surname: firstFavoriteAddress.surname,
              cellPhone: firstFavoriteAddress.cellPhone,
              email: firstFavoriteAddress.email,
              nit: firstFavoriteAddress.nit,
              destinyDaneCode: firstFavoriteAddress.destinyDaneCode,
              destinationAddress: firstFavoriteAddress.destinationAddress,
            })
          );
          navigation.navigate("LocalCarrierInsurance");
        }
      }
    } catch (e) {
      console.log("Something went wrong identifying user storage", e);
    }
  };





























  // // GET DEFAULT NAME Y ADDRESS SE EJECUTA EN LA PRIEMRA CARGA
  React.useEffect(() => {
    const getMyDefaultValue = async () => {
      try {
        const value = await AsyncStorage.getItem("key");
        if (value) {
          setUid(value);
          const unsubscribe = fetchPersonalDataOnSnapshot(value, (userData) => {
            if (userData) {
              setNameDefault(userData.name);
              setSurNameDefault(userData.surname);
              setdestinationAddressDefault(userData.destinationAddress);
            }
          });
          return () => unsubscribe();
        }
      } catch (e) {
        console.log("Something went wrong identifying user storage", e);
      }
    };
    getMyDefaultValue();
  }, []);

  //GET FAVORITES
  React.useEffect(() => {
    try {
      const unsubscribe = fetchFavoritesOnSnapshot(
        postsPerLoad,
        (data) => {
          setIsLoading(false);
          if (data.posts.length == 0) {
            setLastPost(true);
          }
          setPosts([...data.posts]);
          setStartAfter(data.lastVisible);
          setIsRefreshing(false); // Importante para detener el RefreshControl
          setLastPost(false);
        },
        (error) => {
          unsubscribe();
        },
        uid
      );
    } catch (error) {
      console.error(error);
    }
    // }, []);
  }, [isRefreshing, uid]);

  const onRefresh = () => {
    setIsRefreshing(true); // Activa el estado de refresco
  };

  //GET MORE FAVORITES
  const getMorePosts = () => {
    if (!lastPost && startAfter) {
      setIsLoading(true);
      fetchMoreFavoritesOnSnapshot(
        postsPerLoad,
        startAfter,
        (dataa) => {
          setIsLoading(false);
          if (dataa.posts.length === 0) {
            setLastPost(true);
            return;
          }
          setPosts([...posts, ...dataa.posts]);
          setStartAfter(dataa.lastVisible);
        },
        (error) => {
          console.error("Error fetching more posts:", error);
          setIsLoading(false);
        },
        uid
      );
    } else {
      setIsLoading(false);
    }
  };







































  // FAVORITES SCROLL SECTION
  function renderPosts({ item }) {
    return (
      <TouchableOpacity
        style={styles.defaultMainContainer}
        // onPress={() => {
        //   navigation.navigate("LocalCarrierInsurance");
        // }}

        onPress={async () => {
          await sendToFavorite();
        }}
      >
        <View style={styles.containerIconTexts}>
          <View style={styles.containerDefaultTexts}>
            <Text style={styles.favoriteDefaultName}>
              {item.name} {item.surname}
            </Text>
            <Text numberOfLines={1} ellipsizeMode="tail">
              {item.destinationAddress}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }



  































  const renderLoader = () => {
    return isLoading ? (
      <View>
        <ActivityIndicator size="large" color="#aaa" />
      </View>
    ) : null;
  };

  return (
    <View style={styles.container}>
      <View>
        {/* enviar a otra persona */}
        <TouchableOpacity
          style={styles.itemContainer}
          onPress={() => {
            navigation.navigate("SendToAnotherPerson");
          }}
        >
          <View style={styles.itemContainerIntern}>
            <FontAwesomeIcon icon={faUser} size={20} color="gray" />
            <Text style={styles.itemTitle}>Enviar a otra persona</Text>
          </View>
        </TouchableOpacity>

        {/* recoger en bodega */}
        <TouchableOpacity
          style={styles.itemContainerRecogerEnBodega}
          onPress={async () => {
            await sendToWarehouse();
          }}
        >
          <View style={styles.itemContainerIntern}>
            <FontAwesomeIcon icon={faWarehouse} size={20} color="gray" />
            <Text style={styles.itemTitle}>Recoger en bodega Bogota</Text>
          </View>
        </TouchableOpacity>

        {/* bloque estatico */}
        <View style={styles.itemContainerFavorite}>
          <View style={styles.itemContainerInternFavorite}>
            <Text style={styles.itemTitleFavorite}>Mis Favoritos</Text>
          </View>
        </View>

        {/* enviar a default data del user */}
        <TouchableOpacity
          style={styles.defaultMainContainer}
          onPress={async () => {
            await getMyStringValue();
          }}
        >
          <View style={styles.containerIconTextsDefault}>
            <FontAwesomeIcon icon={faStar} size={15} color="gray" />
            <View style={styles.containerDefaultTexts}>
              <Text style={styles.favoriteDefaultName}>
                {nameDefault} {surNameDefault}
              </Text>
              <Text numberOfLines={1} ellipsizeMode="tail">
                {destinationAddressDefault
                  ? destinationAddressDefault
                  : "Igresa tu direccion"}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>

      {/* flat list favorites section */}
      <SafeAreaView style={styles.container}>
        <FlatList
          data={posts}
          renderItem={renderPosts}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          onEndReached={getMorePosts}
          onEndReachedThreshold={0.01}
          scrollEventThrottle={150}
          ListFooterComponent={renderLoader}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={onRefresh}
              colors={["#aaa"]}
              tintColor={"#aaa"}
            />
          }
        />
      </SafeAreaView>
    </View>
  );
};

export default RecipientScreen;

const styles = StyleSheet.create({
  shippingNumber: {
    fontWeight: "bold",
    fontSize: 18,
  },
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  itemContent: {
    backgroundColor: "white",
    height: 100,
    padding: 10,
    width: "100%",
    justifyContent: "flex-start",
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    gap: 8,
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "left",
    marginBottom: 15,
    marginLeft: 15,
    marginTop: Platform.OS === "android" ? 25 : 15,
  },
  descriptionAndWeight: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  descriptionText: {
    fontWeight: "bold",
    fontSize: 13,
  },
  weightText: {
    fontWeight: "bold",
  },
  weightText: {
    fontWeight: "bold",
    color: "#5E17EB",
    paddingRight: 20,
    fontSize: 18,
  },
  dateText: {
    fontStyle: "italic",
  },
  itemContainer: {
    height: 62,
    width: "100%",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "gray",
  },
  itemContainerRecogerEnBodega: {
    height: 62,
    width: "100%",
    justifyContent: "center",
  },
  itemContainerIntern: {
    flexDirection: "row",
    gap: 10,
    alignItems: "flex-end",
    justifyContent: "flex-start",
    marginLeft: 40,
  },
  itemTitle: {
    fontWeight: "bold",
    fontSize: 16,
  },

  itemContainerFavorite: {
    height: 48,
    width: "100%",
    backgroundColor: "#C4C4C4",
    justifyContent: "center",
  },
  itemContainerInternFavorite: {
    flexDirection: "row",
    gap: 10,
    alignItems: "flex-end",
    justifyContent: "flex-start",
    marginLeft: 25,
  },
  itemTitleFavorite: {
    fontWeight: "bold",
    fontSize: 20,
  },
  defaultMainContainer: {
    height: 68,
    width: "100%",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "gray",
  },
  containerIconTextsDefault: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginLeft: 25,
    marginRight: 25,
  },
  containerIconTexts: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginLeft: 35,
    marginRight: 25,
  },
  favoriteDefaultName: {
    fontWeight: "bold",
    fontSize: 16,
  },
  containerDefaultTexts: {
    flexDirection: "colum",
    gap: 8,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    marginLeft: 15,
  },
});
