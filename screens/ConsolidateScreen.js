import {
  FlatList,
  View,
  Image,
  Text,
  ActivityIndicator,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  RefreshControl,
} from "react-native";
import React from "react";

import { ListItem } from "@rneui/themed";
import { fetchMorePostsOnSnapshot } from "../apiServices";
import { fetchPostsOnSnapshot, fetchPartidaArancelariaComputadores, fetchPartidaArancelariaCelulares } from "../apiServices";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faWarehouse } from "@fortawesome/free-solid-svg-icons/faWarehouse";
import { useFocusEffect } from "@react-navigation/native";
import { CheckBox } from "@rneui/themed";
import { setConsolidation } from "../reducers/consolidation/consolidationSlice";


const ConsolidateScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [posts, setPosts] = React.useState([]);
  const [startAfter, setStartAfter] = React.useState(null);
  const [postsPerLoad] = React.useState(5);
  const [lastPost, setLastPost] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isLoading2, setIsLoading2] = React.useState(true);
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const [uid, setUid] = React.useState(null);
  const [selectedItems, setSelectedItems] = React.useState([]);



  React.useEffect(() => {
    dispatch(setConsolidation({shipmentNumbers: selectedItems}));
  }, [selectedItems, dispatch]);





  // // Effect to reset data when screen gets focus
    React.useEffect(() => {
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


    // //aqui
    // React.useEffect(() => {
    //   const getMyPartida = async () => {
    //     try {
    //       const valueCompu = await fetchPartidaArancelariaComputadores();
    //       const valueCelu = await fetchPartidaArancelariaCelulares();
    //       const partidaArancelariaCompu = valueCompu.partidaArancelaria
    //       const partidaArancelariaCelu = valueCelu.partidaArancelaria
    //       setPartidaArancelariaComputadores(partidaArancelariaCompu)
    //       setPartidaArancelariaCelulares(partidaArancelariaCelu)
    //     } catch (e) {
    //       console.log("Something went wrong identifying user storage", e);
    //     }
    //   };
    //   getMyPartida();
    // }, [])


  // //GET POSTS
  // React.useEffect(() => {
  //   try {
  //     const unsubscribe = fetchPostsOnSnapshot(
  //       postsPerLoad,
  //       (data) => {
  //         setIsLoading(false);
  //         setIsLoading2(false);
  //         if (data.posts.length == 0) {
  //           setLastPost(true);
  //         }
  //         setPosts([...data.posts]);
  //         setStartAfter(data.lastVisible);
  //         setIsRefreshing(false); // Importante para detener el RefreshControl
  //         setLastPost(false);
  //       },
  //       (error) => {
  //         unsubscribe();
  //       },
  //       uid
  //     );
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }, [isRefreshing, uid]);

  // const onRefresh = () => {
  //   setIsRefreshing(true);
  // };

  
  // //GET MORE POSTS
  // const getMorePosts = () => {
  //   if (!lastPost && startAfter) {
  //     setIsLoading(true);
  //     fetchMorePostsOnSnapshot(
  //       postsPerLoad,
  //       startAfter,
  //       (dataa) => {
  //         setIsLoading(false);
  //         if (dataa.posts.length === 0) {
  //           setLastPost(true);
  //           return;
  //         }
  //         setPosts([...posts, ...dataa.posts]);
  //         setStartAfter(dataa.lastVisible);
  //       },
  //       (error) => {
  //         console.error("Error fetching more posts:", error);
  //         setIsLoading(false);
  //       },
  //       uid
  //     );
  //   } else {
  //     setIsLoading(false);
  //   }
  // };


  //GET POSTS
React.useEffect(() => {
  const fetchPosts = async () => {
    const valueCompu = await fetchPartidaArancelariaComputadores();
    const valueCelu = await fetchPartidaArancelariaCelulares();
    const partidaArancelariaCompu = valueCompu.partidaArancelaria
    const partidaArancelariaCelu = valueCelu.partidaArancelaria
    try {
      const unsubscribe = fetchPostsOnSnapshot(
        postsPerLoad,
        (data) => {
          setIsLoading(false);
          setIsLoading2(false);
          if (data.posts.length == 0) {
            setLastPost(true);
          }
          const filteredPosts = data.posts.filter(post => {
            return (
              post.partidaArancelariaImpuestos !== partidaArancelariaCompu &&
              post.partidaArancelariaImpuestos !== partidaArancelariaCelu
            );
          });
          setPosts(filteredPosts);
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
  };

  if (uid) {
    fetchPosts();
  }
}, [isRefreshing, uid]);

const onRefresh = () => {
  setIsRefreshing(true);
};

//GET MORE POSTS
const getMorePosts = async () => {
  const valueCompu = await fetchPartidaArancelariaComputadores();
  const valueCelu = await fetchPartidaArancelariaCelulares();
  const partidaArancelariaCompu = valueCompu.partidaArancelaria
  const partidaArancelariaCelu = valueCelu.partidaArancelaria
  if (!lastPost && startAfter) {
    setIsLoading(true);
    fetchMorePostsOnSnapshot(
      postsPerLoad,
      startAfter,
      (dataa) => {
        setIsLoading(false);
        if (dataa.posts.length === 0) {
          setLastPost(true);
          return;
        }
        const filteredPosts = dataa.posts.filter(post => {
          return (
            post.partidaArancelariaImpuestos !== partidaArancelariaCompu &&
            post.partidaArancelariaImpuestos !== partidaArancelariaCelu
          );
        });
        setPosts([...posts, ...filteredPosts]);
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







  const toggleSelection = (item) => {
    setSelectedItems((prevSelectedItems) => {
      if (prevSelectedItems.includes(item.shipmentNumber)) {
        return prevSelectedItems.filter((id) => id !== item.shipmentNumber);
      } else {
        return [...prevSelectedItems, item.shipmentNumber];
      }
    });
  };

  // SCREEN CONTENT
  const renderPosts = ({ item }) => {
    const createdAtDate = new Date(item.createdAt.seconds * 1000);
    const formattedDate = createdAtDate.toLocaleString("es-ES");
    const descriptionInUpperCase = item.description.toUpperCase();
    const isSelected = selectedItems.includes(item.shipmentNumber);
    return (
      <CheckBox
      checkedIcon="dot-circle-o"
      uncheckedIcon="circle-o"
        title={
          <View style={{ flex: 1 }}>
            <ListItem key={item.postId} containerStyle={{ padding: 0 }}>
              <ListItem.Content style={styles.itemContent}>
                <ListItem.Title style={styles.shippingNumber}>
                  {item.shipmentNumber}
                </ListItem.Title>
                <ListItem.Subtitle style={styles.dateText}>
                  {formattedDate}
                </ListItem.Subtitle>
                <View style={styles.descriptionAndWeight}>
                  <Text style={styles.descriptionText}>
                    {descriptionInUpperCase}
                  </Text>
                  <Text style={styles.weightText}>{item.weight} LB</Text>
                </View>
              </ListItem.Content>
            </ListItem>
          </View>
        }
        checked={isSelected}
        onPress={() => toggleSelection(item)}
      />
    );
  };

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
            <SafeAreaView style={styles.container}>
              <View style={styles.container}>
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
              <FontAwesomeIcon icon={faWarehouse} size={54} color={"#212020"} />
              <Text style={styles.noDataText}>
                No hay paquetes en tu casillero
              </Text>
            </View>
          )}
        </>
      )}
    </>
  );
};

export default ConsolidateScreen;

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
    paddingHorizontal: 10,
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
  contentContainer: {
    alignItems: "start",
    marginRight: 10,
    marginLeft: 10,
    alignItems: "center",
  },
  itemContainer: {
    margin: 6,
    flexDirection: "row",
    alignItems: "center",
    height: 80,
    gap: 15,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
  },
  itemContainerIntern: {
    flexDirection: "column",
    width: "80%",
    gap: 5,
  },
  itemDescription: {
    fontSize: 15,
  },
  itemTitle: {
    fontWeight: "bold",
    fontSize: 18,
  },
  itemImage: {
    height: 45,
    width: 45,
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

  noDataContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000000",
  },
  noDataText: {
    paddingTop: 10,
    fontSize: 16,
    color: "#565555",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
});
