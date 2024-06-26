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
import React, { useCallback, useMemo } from "react";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetFlatList,
} from "@gorhom/bottom-sheet";
import { ListItem } from "@rneui/themed";
import { fetchMorePostsOnSnapshot } from "../apiServices";
import { fetchPostsOnSnapshot } from "../apiServices";
import AsyncStorage from "@react-native-async-storage/async-storage";

const WarehouseScreen = ({ navigation }) => {
  const [posts, setPosts] = React.useState([]);
  const [startAfter, setStartAfter] = React.useState(null);
  const [postsPerLoad] = React.useState(5);
  const [lastPost, setLastPost] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const [uid, setUid] = React.useState(null);

  //modal breakpoints
  const snapPoints = React.useMemo(() => ["50%", "65%"], []);

  //modal state with ref
  const bottomSheetRef = React.useRef(null);

  //modal function
  const snapeToIndex = (index) => bottomSheetRef.current.snapToIndex(index);
  const handleClosePress = () => bottomSheetRef.current.close();

  //modal shade that appears when the modal is open
  const renderBackdrop = React.useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    []
  );

  const data = useMemo(
    () => [
      {
        id: 1,
        titulo: "Consolidar",
        descripcion: "Unir diferentes elementos en uno solo.",
        imagen: require("../assets/consolidar.png"),
        navigationPath: "Consolidate",
      },
      {
        id: 2,
        titulo: "Dividir",
        descripcion: "Separar un elemento en varias partes.",
        imagen: require("../assets/divide.png"),
        navigationPath: "Divide",
      },
      {
        id: 3,
        titulo: "Pagar",
        descripcion: "Realizar un pago por bienes o servicios.",
        imagen: require("../assets/payment.png"),
        navigationPath: "StartTransport",
      },
      // {
      //   id: 4,
      //   titulo: "Reempacar",
      //   descripcion: "Empacar nuevamente productos o elementos.",
      //   imagen: require("../assets/consolidar.png"),
      //   navigationPath: "Repack",
      // },
      // {
      //   id: 5,
      //   titulo: "In and out",
      //   descripcion: "Proceso de entrada y salida de elementos.",
      //   imagen: require("../assets/consolidar.png"),
      //   navigationPath: "InAndOut",
      // },
      // {
      //   id: 6,
      //   titulo: "Eliminar",
      //   descripcion: "Remover o borrar un elemento.",
      //   imagen: require("../assets/consolidar.png"),
      //   navigationPath: "DeleteTracking",
      // },
      {
        id: 7,
        titulo: "Ver guía",
        descripcion: "Consultar una guía o manual.",
        imagen: require("../assets/consolidar.png"),
        navigationPath: "ViewDetails",
      },
    ],
    []
  );

  React.useEffect(() => {
    const getMyStringValue = async () => {
      try {
        const value = await AsyncStorage.getItem("key");
        if (value) {
          setUid(value);
        }
      } catch (e) {
        console.log("Something went wrong identifying user storage", e);
      }
    };
    getMyStringValue();
  }, []);

  //MODAL CONTENT
  const renderItem = useCallback(
    ({ item }) => (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={async () => {
          await handleClosePress();
          navigation.navigate(item.navigationPath, { uid: uid });
        }}
      >
        <Image source={item.imagen} style={styles.itemImage} />
        <View style={styles.itemContainerIntern}>
          <Text style={styles.itemTitle}>{item.titulo}</Text>
          <Text style={styles.itemDescription}>{item.descripcion}</Text>
        </View>
      </TouchableOpacity>
    ),
    []
  );

  //GET POSTS
  React.useEffect(() => {
    try {
      const unsubscribe = fetchPostsOnSnapshot(
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

  //GET MORE POSTS
  const getMorePosts = () => {
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

  // SCREEN CONTENT
  function renderPosts({ item }) {
    const createdAtDate = new Date(item.createdAt.seconds * 1000);
    const formattedDate = createdAtDate.toLocaleString("es-ES");
    const descriptionInUpperCase = item.description.toUpperCase();

    return (
      <TouchableOpacity onPress={() => snapeToIndex(0)}>
        <ListItem key={item.postId}>
          <ListItem.Content style={styles.itemContent}>
            <ListItem.Title style={styles.shippingNumber}>
              {item.postId}
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
      {/* <Button title="snap to 0" onPress={() => snapeToIndex(0)} /> */}

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

      {/* Modal */}
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        backdropComponent={renderBackdrop}
      >
        <BottomSheetFlatList
          data={data}
          keyExtractor={(i) => i.id}
          renderItem={renderItem}
          contentContainerStyle={styles.contentContainer}
        />
      </BottomSheet>
    </View>
  );
};

export default WarehouseScreen;

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
});
