import {
  FlatList,
  Button,
  View,
  Text,
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import React from "react";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { ListItem } from "@rneui/themed";
import { fetchMorePostsOnSnapshot } from "../apiServices";
import { fetchPostsOnSnapshot } from "../apiServices";
import Header from "../components/Header";

const CreateGuideScreen = () => {
  const [posts, setPosts] = React.useState([]);
  const [startAfter, setStartAfter] = React.useState(null);
  const [postsPerLoad] = React.useState(5);
  const [lastPost, setLastPost] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  //modal breakpoints
  const snapPoints = React.useMemo(
    () => ["50%", "60%", "70%", "80%", "90%"],
    []
  );


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
            setStartAfter(data.lastVisible);
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
            setStartAfter(dataa.lastVisible); 
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
    <View style={styles.container}>

      <Button title="snap to 0" onPress={() => snapeToIndex(0)} />

      <SafeAreaView style={styles.container}>
      <Header text="Servicios" />
      <FlatList
        data={posts}
        renderItem={renderPosts}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        onEndReached={getMorePosts}
        onEndReachedThreshold={0.01}
        scrollEventThrottle={150}
        ListFooterComponent={isLoading && renderLoader()}
      />
    </SafeAreaView>


      

      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        backdropComponent={renderBackdrop}
      >

      <View>
        <Text>Hello world</Text>
      </View>
      </BottomSheet>
    </View>
  );
};

export default CreateGuideScreen;


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

