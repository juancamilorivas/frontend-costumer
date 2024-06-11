import React from "react";
import {
  FlatList,
  View,
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  // RefreshControl,
} from "react-native";
import { ListItem } from "@rneui/themed";
import { fetchMorePostsOnSnapshot } from "../apiServices";
import { fetchPostsOnSnapshot } from "../apiServices";
import HeaderArrowBack from "../components/HeaderArrowBack";
import { useNavigation } from '@react-navigation/native';


const ServicesScreen = () => {
  const [posts, setPosts] = React.useState([]);
  const [startAfter, setStartAfter] = React.useState(null);
  const [postsPerLoad] = React.useState(5);
  const [lastPost, setLastPost] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  // const [isRefreshing, setIsRefreshing] = React.useState(false);
  
  const navigation = useNavigation();


  //GET POSTS
  React.useEffect(() => {
   try {
    const unsubscribe = fetchPostsOnSnapshot(
      postsPerLoad,
      (data) => {
        setIsLoading(false);
        if (data.posts.length == 0) {
          return () => {
            null;
          };
        }
        setPosts([...data.posts]);
        setStartAfter(data.lastVisible); // Set last visible post
        // setIsRefreshing(false); // Importante para detener el RefreshControl
      },

      (error) => {
        console.error("Error fetching posts:", error);
        unsubscribe();
      }
    );
   } catch (error) {
    console.error(e);
    unsubscribee();
   }
  }, []);
// }, [isRefreshing]);




  // const onRefresh = () => {
  //   setIsRefreshing(true); // Activa el estado de refresco
  // };



  const getMorePosts = () => {
    setIsLoading(true);
   try {
    if (!lastPost) {
      const unsubscribee = fetchMorePostsOnSnapshot(
        postsPerLoad,
        startAfter,
        (dataa) => {
          setIsLoading(false);
          if (dataa.posts.length == 0) {
            return () => {
              setLastPost(true);
            };
          }
          setPosts([...posts, ...dataa.posts]);
          setStartAfter(dataa.lastVisible); // Set last visible post
        },
        (error) => {
          return () => {
            console.error("Error fetching posts:", error);
            unsubscribee();
          };
        }
      );
    } else {
      console.log("No hay mas Posts");
    }
   } catch (e) {
    console.error(e);
    unsubscribee();
   }
  };

  function renderPosts({ item }) {
    return (
      <ListItem key={item.postId}>
        <ListItem.Content style={styles.itemContent}>
          <ListItem.Title style={styles.titlee}>
            {item.postTitle}
          </ListItem.Title>
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
    <SafeAreaView style={styles.container}>
        <HeaderArrowBack text="Historial de servicios" navigation={navigation}/>
      <FlatList
        data={posts}
        renderItem={renderPosts}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        onEndReached={getMorePosts}
        onEndReachedThreshold={0.01}
        scrollEventThrottle={150}
        ListFooterComponent={isLoading && renderLoader()}
        // refreshControl={
        //   <RefreshControl
        //     refreshing={isRefreshing}
        //     onRefresh={onRefresh}
        //     colors={["#aaa"]}
        //     tintColor={"#aaa"}
        //   />
        // }
      />
    </SafeAreaView>
  );
};

export default ServicesScreen;

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
});
