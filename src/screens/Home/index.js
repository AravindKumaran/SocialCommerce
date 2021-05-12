import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  FlatList,
  Dimensions,
  Image,
  Text,
  ImageOverlay,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  ImageBackground,
} from 'react-native';
import Post from '../../components/Post';
import {API, graphqlOperation, Auth} from 'aws-amplify';
import {listPosts} from '../../graphql/queries';
import Feather from 'react-native-vector-icons/Feather';
import LoadingIndicator from '../../components/Common/LoadingIndicator';
import {c} from '../../navigation/homeBottomTabNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Header} from 'react-native-elements';

const vpHeight = Dimensions.get('window').height;
const vpWidth = Dimensions.get('window').width;

const ActiveStyle = () => (
  <>
    <Image
      style={{
        position: 'absolute',
        bottom: 13,
      }}
      source={require('../..//assets/images/blur.png')}
      width={15}
      height={15}
      // tintColor={color}
    />
    <View
      style={{
        width: 27,
        height: 4,
        borderRadius: 14,
        position: 'absolute',
        bottom: 10,
        borderBottomColor: '#21FFFC',
        borderBottomWidth: 4,
      }}></View>
  </>
);

const options = {
  taskName: 'Example',
  taskTitle: 'ExampleTask title',
  taskDesc: 'ExampleTask description',
  taskIcon: {
    name: 'ic_launcher',
    type: 'mipmap',
  },
  color: '#ff00ff',
  // linkingURI: 'yourSchemeHere://chat/jane', // See Deep Linking for more info
  parameters: {
    delay: 1000,
  },
};

const Home = ({navigation, route}) => {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [isLoader, setLoader] = useState(false);
  const [currentVisibleIndex, setCurrentVisibleIndex] = useState(0);
  const [nextToken, setNextToken] = useState(undefined);
  const [curLimit, setCurLimit] = useState(10);
  const [muteAll, setMuteAll] = useState(false);
  const flatListRef = useRef(null);

  const [followRerender, setFollowRerender] = useState(false);

  useEffect(() => {
    const setUserIcon = async () => {
      const value = await AsyncStorage.getItem('userImg');
      if (value) {
        c.setOptions({
          tabBarIcon: ({focused, tintColor}) => (
            <>
              <Image
                // source={require('../assets/images/Profile_icon.png')}
                source={{
                  uri: value?.startsWith('https')
                    ? value
                    : `https://liveboxc7d791528cf44cb0b92efd2c8b1c077762739-staging.s3.ap-south-1.amazonaws.com/public/${value}`,
                }}
                size={25}
                style={{
                  bottom: 5,
                  width: 25,
                  height: 25,
                  borderRadius: 12,
                }}
              />
              {focused && <ActiveStyle />}
            </>
          ),
        });
      }
    };
    setUserIcon();
  }, []);

  useEffect(() => {
    if (route?.params?.idx) {
      console.log('Routeeitem');
      // setPosts((post) => [route?.params?.item, ...post]);

      flatListRef.current.scrollToIndex({index: route?.params?.idx});
      setCurrentVisibleIndex(route?.params?.idx);
    }
  }, [route?.params?.idx]);

  useEffect(() => {
    if (route?.params?.idx) {
      console.log('Routeeitem');
      // setPosts((post) => [route?.params?.item, ...post]);

      flatListRef.current.scrollToIndex({index: route?.params?.idx});
      setCurrentVisibleIndex(route?.params?.idx);
    }
  }, [route?.params?.idx]);

  useEffect(() => {
    //console.log('home useeffect')
    const fetchPost = async () => {
      try {
        setLoading(true);
        const response = await API.graphql(
          graphqlOperation(listPosts, {
            limit: curLimit,
          }),
        );
        const allItems = response.data.listPosts.items;
        const sortedItems = allItems.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
        );
        console.log('sortedItemsInside', sortedItems.length, sortedItems[0]);
        setNextToken(response.data.listPosts.nextToken);
        // if (route?.params?.newPost) {
        //   setPosts([route?.params?.newPost, ...sortedItems]);
        // } else {
        // }
        setPosts(sortedItems);
        setLoading(false);
      } catch (e) {
        console.error(e);
        setLoading(false);
      }
    };

    fetchPost();
  }, [navigation, route?.params?.newPost]);

  useEffect(() => {
    //console.log('home useeffect')
    const fetchPost = async () => {
      try {
        //setLoading(true);
        const response = await API.graphql(
          graphqlOperation(listPosts, {
            limit: curLimit,
          }),
        );
        const allItems = response.data.listPosts.items;
        const sortedItems = allItems.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
        );
        console.log('sortedItemsInside', sortedItems.length, sortedItems[0]);
        setNextToken(response.data.listPosts.nextToken);
        // if (route?.params?.newPost) {
        //   setPosts([route?.params?.newPost, ...sortedItems]);
        // } else {
        // }
        setPosts(sortedItems);
        //setLoading(false);
      } catch (e) {
        console.error(e);
        //setLoading(false);
      }
    };
    if(followRerender){
      fetchPost();
    }    
  }, [followRerender]);

  const getMorePosts = async () => {
    try {
      setLoader(true);
      if (nextToken) {
        console.log('loader is true', nextToken);
        const response = await API.graphql(
          graphqlOperation(listPosts, {
            limit: curLimit + 10,
            nextToken,
          }),
        );
        // console.log('AllItems', curLimit);
        setCurLimit((lim) => lim + 10);
        setNextToken(response.data.listPosts.nextToken);
        setPosts((post) => [...post, ...response.data.listPosts.items]);
        setLoader(false);
      }
    } catch (error) {
      console.log('Pagination Error', error);
      setLoader(false);
    }
  };

  const handleRefresh = async () => {
    console.log('refresh call')
    try {
      setRefreshing(true);
      const response = await API.graphql(
        graphqlOperation(listPosts, {
          limit: 10,
        }),
      );

      const allItems = response.data.listPosts.items;
      const sortedItems = allItems.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
      );
      console.log('sortedItems Refreshh', sortedItems.length);
      setCurLimit(10);
      setNextToken(response.data.listPosts.nextToken);
      setPosts(sortedItems);
      setRefreshing(false);
    } catch (e) {
      console.error(e);
      setRefreshing(false);
    }
  };

  const _renderItem = ({item, index}) => (
    <Post
      post={item}
      currentIndex={index}
      currentVisibleIndex={currentVisibleIndex}
      user={user}
      navigation={navigation}
      muteAll={muteAll}
      setMuteAll={setMuteAll}
      setFollowRerender={setFollowRerender}
    />
  );

  const _viewabilityConfig = useRef({
    viewAreaCoveragePercentThreshold: 75,
  });

  const _onViewableItemsChanged = useRef(({viewableItems, changed}) => {
    setLoading(true);
    if (viewableItems && viewableItems.length > 0) {
      setCurrentVisibleIndex(viewableItems[0].index);
      setLoading(false);
    }
  });

  const renderFooter = () => {
    return (
      <View
        style={{
          position: 'relative',
          width: vpWidth,
          height: 50,
          bottom: 120,
          // paddingVertical: 0,
          // marginTop: 0,
          // marginBottom: 0,
        }}>
        {isLoader ? (
          <ActivityIndicator size={'large'} animating color="white" />
        ) : null}
      </View>
    );
  };

  const MyCustomLeftComponent = () => {
    return (
      <TouchableOpacity>
        <Text
          style={{
            fontSize: 23,
            fontFamily: 'LilyScriptOne-Regular',
            width: 200,
          }}>
          Livebox
        </Text>
      </TouchableOpacity>
    );
  };

  // const MyCustomRightComponent = () => {
  //   return (
  //     <TouchableOpacity>
  //       <Feather name={'shopping-cart'} size={25} color="white" />
  //     </TouchableOpacity>
  //   );
  // };

  return (
    <ImageBackground
      source={require('../../assets/images/Background2.png')}
      style={styles.container}>
      <View style={styles.container}>
        {loading && <LoadingIndicator visible={loading} />}
        <Header
          leftComponent={<MyCustomLeftComponent />}
          // rightComponent={<MyCustomRightComponent />}
          containerStyle={{
            backgroundColor: '#20232A',
            borderColor: '#20232A',
          }}
        />
        {/* <Image
        source={require('../../assets/images/Logo13.png')}
        size={15}
        style={styles.img1}
      />
      <Text style={styles.text}>Livebox</Text> */}

        {/* <TouchableOpacity style={styles.cart}>
        <Feather name={'shopping-cart'} size={20} color="transparent" />
      </TouchableOpacity> */}

        <FlatList
          data={posts}
          ref={flatListRef}
          // getItemLayout={(data, index) => ({
          //   length: vpHeight + 10,
          //   offset: vpHeight * 1.07 * index,
          //   index,
          // })}
          renderItem={_renderItem}
          showsVerticalScrollIndicator={false}
          snapToAlignment={'start'}
          decelerationRate={'fast'}
          snapToInterval={Dimensions.get('window').height + 40}
          borderRadius={50}
          viewabilityConfig={_viewabilityConfig.current}
          onViewableItemsChanged={_onViewableItemsChanged.current}
          onEndReached={getMorePosts}
          onEndReachedThreshold={0.5}
          keyExtractor={(item) => item.id.toString()}
          refreshing={refreshing}
          onRefresh={handleRefresh}
          ListFooterComponent={renderFooter}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    // padding: 10,
    // top: 34,
    // paddingTop: 0,
    // paddingLeft: 4,
    // paddingRight: 4,
    // paddingBottom: 0,
    // marginRight: 4,
    backgroundColor: '#20232A',
  },

  img1: {
    overlayColor: '#20232A',
    backgroundColor: '#20232A',
    right: 0,
    left: 0,
    paddingLeft: 4,
    paddingRight: 4,
    height: 65,
    width: '103%',
    top: -48,
    position: 'absolute',
    borderBottomRightRadius: 0,
  },

  img2: {
    right: 0,
    left: 18.5,
    paddingLeft: 0,
    paddingRight: 0,
    height: 20,
    width: 90,
    top: -33,
    position: 'absolute',
  },

  img3: {
    right: 0,
    left: 357.5,
    paddingLeft: 4,
    paddingRight: 4,
    height: 15,
    width: 19,
    top: -30,
    position: 'absolute',
  },

  text: {
    fontWeight: '400',
    fontSize: 26,
    top: -25,
    left: 20,
    position: 'absolute',
    fontFamily: 'LilyScriptOne-Regular',
  },

  cart: {
    bottom: 18,
    left: 350,
  },
  footer: {
    marginTop: 10,
    alignItems: 'center',
    zIndex: 1,
  },
});

export default Home;
