import {
  FlatList,
  View,
  Text,
  ActivityIndicator,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  RefreshControl,
  Alert,
} from "react-native";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchFavoritesOnSnapshot } from "../apiServices";
import { fetchMoreFavoritesOnSnapshot } from "../apiServices";
import { deleteFavoriteAddress } from "../apiServices";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faBolt } from "@fortawesome/free-solid-svg-icons/faBolt";


const DeleteFavoriteScreen = ({ navigation }) => {
  const [posts, setPosts] = React.useState([]);
  const [startAfter, setStartAfter] = React.useState(null);
  const [postsPerLoad] = React.useState(5);
  const [lastPost, setLastPost] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const [uid, setUid] = React.useState(null);

  // GET UID ASYNCSTORAGE
  React.useEffect(() => {
    const getMyDefaultValue = async () => {
      try {
        const value = await AsyncStorage.getItem("key");
        if (value) {
          setUid(value);
        }
      } catch (e) {
        console.log("Something went wrong identifying user storage", e);
      }
    };
    getMyDefaultValue();
  }, []);

  //GET FAVORITES ADDRESSES
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

  //DELETE  FAVORITES
  const deleteFavorite = async (idDocument) => {
    const uid = await AsyncStorage.getItem("key");
    if (uid) {
      try {
        deleteFavoriteAddress(uid, idDocument);
      } catch (error) {
        console.error(error);
      }
    } else {
      setIsLoading(false);
    }
  };



  // Handle delete with confirmation
  const confirmDelete = (idDocument) => {
    Alert.alert(
      "Confirmar",
      "Desea eliminar este item?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancelar",
        },
        {
          text: "Eliminar",
          onPress: () => deleteFavorite(idDocument),
        },
      ],
      { cancelable: false }
    );
  };

  // FAVORITES SCROLL SECTION
  function renderPosts({ item }) {
    return (
      <TouchableOpacity
        style={styles.defaultMainContainer}
        onPress={() => confirmDelete(item.postId)}
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

<>


{posts.length > 0 && (
  <View style={styles.container}>
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
)}


{posts.length === 0 && (
  <View style={styles.noDataContainer}>
    {/* <FontAwesomeIcon icon={faBolt} size={54} color={"#ffffff"} /> */}
    <Text style={styles.noDataText}>No tienes direcciones favoritas</Text>
  </View>
)}
</>
  );
};

export default DeleteFavoriteScreen;

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



  noDataContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  noDataText: {
    paddingTop: 10,
    fontSize: 16,
    color: "#000000",
  },
});

