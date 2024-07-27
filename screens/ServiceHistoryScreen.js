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
import React from "react";
import { ListItem } from "@rneui/themed";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchServicesOnSnapshot } from "../apiServices";
import { fetchMoreServicesOnSnapshot } from "../apiServices";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faBolt } from "@fortawesome/free-solid-svg-icons/faBolt";
import { useFocusEffect } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { setImportServiceHistory } from "../reducers/importServiceHistory/importServiceHistorySlice";
import { setConsolidatedServiceHistory } from "../reducers/consolidatedServiceHistory/consolidatedServiceHistorySlice";
import { setDividedServiceHistory } from "../reducers/dividedServiceHistory/dividedServiceHistorySlice";

const ServiceHistoryScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const [posts, setPosts] = React.useState([]);
  const [startAfter, setStartAfter] = React.useState(null);
  const [postsPerLoad] = React.useState(5);
  const [lastPost, setLastPost] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isLoading2, setIsLoading2] = React.useState(true);
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const [uid, setUid] = React.useState(null);

  // // Effect to reset data when screen gets focus
  useFocusEffect(
    React.useCallback(() => {
      const getMyStringValue = async () => {
        try {
          const value = await AsyncStorage.getItem("key");
          if (value) {
            setUid(value);
          } else {
            navigation.navigate("LoginCreate");
          }
        } catch (e) {
          console.log("Something went wrong identifying user storage", e);
        }
      };
      getMyStringValue();
    }, [])
  );

  //GET SERVICES
  React.useEffect(() => {
    try {
      const unsubscribe = fetchServicesOnSnapshot(
        postsPerLoad,
        (data) => {
          setIsLoading(false);
          setIsLoading2(false);
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

  //GET MORE SERVICES
  const getMorePosts = () => {
    if (!lastPost && startAfter) {
      setIsLoading(true);
      fetchMoreServicesOnSnapshot(
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

  // Function to determine the background color based on currentState
  const getCurrentStateStyle = (currentState) => {
    switch (currentState) {
      //primer estado que se pone cuando pagan
      case "Pagado":
        return { backgroundColor: "#F9B857" };
      //segundo estado que se pone cuando el operador de bodega elige el servicio para hcerlo
      case "En proceso":
        return { backgroundColor: "#25BD50" };
       //tercer estado que se asigna a una AWB
      case "Asignado":
        return { backgroundColor: "#25BD50" };
      //cuarto estado que se pone cuando se cierra el correo
      case "Aerolinea":
        return { backgroundColor: "#c4c4c4" };
      //quinto estado que llega a bodega
      case "En bodega":
        return { backgroundColor: "#18A0FB" };
      //sexto y ultimo cuando se envia por transportador mipaquete.com o se entrega al cliente
      case "Finalizado":
        return { backgroundColor: "#000000" };
      case "Cancelado":
        return { backgroundColor: "#FF4949" };
      case "Reajuste":
        return { backgroundColor: "#F9B857" };
      default:
        return { backgroundColor: "gray" };
    }
  };

  // SCREEN CONTENT
  function renderPosts({ item }) {
    const createdAtDate = new Date(item.createdAt.seconds * 1000);
    const formattedDate = createdAtDate.toLocaleString("es-ES");

    const navigateToDetailScreen = () => {
      switch (item.serviceName) {
        case "Importacion":
          dispatch(setImportServiceHistory({ docId: item.postId }));
          navigation.navigate("ImportServiceDetails", {
            docId: item.postId,
          });
          break;
        case "Division":
          dispatch(setDividedServiceHistory({ docId: item.postId }));
          navigation.navigate("DivisionServiceDetails", {
            docId: item.postId,
          });
          break;
        case "Consolidacion":
          dispatch(setConsolidatedServiceHistory({ docId: item.postId }));
          navigation.navigate("ImportConsolidatedServiceDetails", {
            docId: item.postId,
          });
          break;
        default:
          console.warn("Unknown serviceName:", item.postId);
      }
    };

    return (
      <TouchableOpacity onPress={navigateToDetailScreen}>
        <ListItem key={item.postId}>
          <ListItem.Content style={styles.itemContent}>
            <ListItem.Content style={styles.orderNumberAndTotalPaid}>
              <ListItem.Title
                numberOfLines={1}
                ellipsizeMode="tail"
                style={styles.orderNumber}
              >
                {item.serviceName}
              </ListItem.Title>
              <ListItem.Content style={styles.paidContainer}>
                <ListItem.Title style={styles.totalPaid}>
                  ${item.totalPaid}
                </ListItem.Title>
              </ListItem.Content>
            </ListItem.Content>

            <ListItem.Content style={styles.dateAndCurrentState}>
              <ListItem.Subtitle style={styles.dateText}>
                {formattedDate}
              </ListItem.Subtitle>

              <ListItem.Content
                style={[
                  styles.currentStateContainer,
                  getCurrentStateStyle(item.currentState),
                ]}
              >
                <ListItem.Subtitle style={styles.currentText}>
                  {item.currentState}
                </ListItem.Subtitle>
              </ListItem.Content>
            </ListItem.Content>
          </ListItem.Content>
        </ListItem>
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
      {isLoading2 ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#aaa" />
        </View>
      ) : (
        <>
          {posts.length > 0 && (
            <SafeAreaView style={styles.mainContainer}>
              <View style={styles.containerSafeArea}>
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
              </View>
            </SafeAreaView>
          )}
          {posts.length === 0 && (
            <View style={styles.noDataContainer}>
              <FontAwesomeIcon icon={faBolt} size={54} color={"#9e9e9e"} />
              <Text style={styles.noDataText}>
                Aun no tienes servicios para mostrar
              </Text>
            </View>
          )}
        </>
      )}
    </>
  );
};

export default ServiceHistoryScreen;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "white",
    flex: 1,
    // paddingTop: 30
  },
  containerSafeArea: {
    backgroundColor: "white",
    flex: 1,
  },
  itemContent: {
    flexDirection: "column",
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
  },
  orderNumberAndTotalPaid: {
    justifyContent: "space-between",
    flexDirection: "row",
    width: "100%",
  },
  dateAndCurrentState: {
    justifyContent: "space-between",
    flexDirection: "row",
    width: "100%",
    alignItems: "flex-end",
    paddingTop: 8,
  },
  dateText: {
    fontStyle: "italic",
    width: "60%",
  },
  orderNumber: {
    width: "60%",
    fontWeight: "bold",
  },
  currentText: {
    color: "#ffffff",
  },
  currentStateContainer: {
    padding: 4,
    borderRadius: 5,
    alignItems: "center",
  },
  totalPaid: {
    justifyContent: "center",
    alignItems: "center",
  },
  paidContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "40%",
  },
  mainTitle: {
    fontSize: 45,
  },
  mainTitleContainer: {
    paddingLeft: 10,
    paddingTop: 60,
    paddingBottom: 30,
  },

  noDataContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000000",
  },
  noDataText: {
    paddingTop: 10,
    fontSize: 16,
    color: "#9e9e9e",
  },

  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
});
