import {
  FlatList,
  Button,
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
// import { useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";


const WarehouseScreen = ({ navigation}) => {
  const [posts, setPosts] = React.useState([]);
  const [startAfter, setStartAfter] = React.useState(null);
  const [postsPerLoad] = React.useState(5);
  const [lastPost, setLastPost] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const [uid, setUid] = React.useState(null);


  //modal breakpoints
  const snapPoints = React.useMemo(() => ["53%", "70%"], []);

  //modal state with ref
  const bottomSheetRef = React.useRef(null);

  //modal function
  const snapeToIndex = (index) => bottomSheetRef.current.snapToIndex(index);

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
        navigationPath: "PayTransport",
      },
      {
        id: 4,
        titulo: "Reempacar",
        descripcion: "Empacar nuevamente productos o elementos.",
        imagen: require("../assets/consolidar.png"),
        navigationPath: "Repack",
      },
      {
        id: 5,
        titulo: "In and out",
        descripcion: "Proceso de entrada y salida de elementos.",
        imagen: require("../assets/consolidar.png"),
        navigationPath: "InAndOut",
      },
      {
        id: 6,
        titulo: "Eliminar",
        descripcion: "Remover o borrar un elemento.",
        imagen: require("../assets/consolidar.png"),
        navigationPath: "DeleteTracking",
      },
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
        const value = await AsyncStorage.getItem('key');
        console.log('userId stored in storage:', value);
        setUid(value);
        if (value) {
          console.log("esta es el uid", value)
        } 
      } catch (e) {
        console.log('Something went wrong identifying user storage', e);
      }
    };
    getMyStringValue()
  }, []);


  //modal content
  const renderItem = useCallback(
    ({ item }) => (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => navigation.navigate(item.navigationPath)}
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
          console.error("Error fetching posts:", error);
          unsubscribe();
        },
        console.log("aqui estoy como uid -------", uid),
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



  

  function renderPosts({ item }) {
    return (
      <ListItem key={item.postId}>
        <ListItem.Content style={styles.itemContent}>
          <ListItem.Title style={styles.titlee}>
            {item.postTitle}
          </ListItem.Title>
          <ListItem.Subtitle>
          ID: {item.postId}
        </ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
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
      <Button title="snap to 0" onPress={() => snapeToIndex(0)} />

      <SafeAreaView style={styles.container}>
        <FlatList
          data={posts}
          renderItem={ renderPosts}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          onEndReached={getMorePosts}
          onEndReachedThreshold={0.01}
          scrollEventThrottle={150}
          ListFooterComponent={ renderLoader}
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
  titlee: {
    color: "red",
  },
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  itemContent: {
    backgroundColor: "gray",
    height: 100,
    padding: 10,
    justifyContent: "flex-start",
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
    paddingRight: 10,
    paddingLeft: 10,
  },
  itemContainer: {
    margin: 6,
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    height: 80,
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
});
