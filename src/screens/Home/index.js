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
} from 'react-native';
import Post from '../../components/Post';
import {API, graphqlOperation, Auth} from 'aws-amplify';
import {listPosts} from '../../graphql/queries';
import Feather from 'react-native-vector-icons/Feather';
import LoadingIndicator from '../../components/Common/LoadingIndicator';
import {c} from '../../navigation/homeBottomTabNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

const Home = ({navigation, route}) => {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [currentVisibleIndex, setCurrentVisibleIndex] = useState(0);
  const [nextToken, setNextToken] = useState(undefined);
  const [curLimit, setCurLimit] = useState(10);
  const flatListRef = useRef(null);

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
                    : `https://tiktok23f096015e564dd1964361d5c47fb832221214-demo.s3.us-east-2.amazonaws.com/public/${value}`,
                }}
                size={25}
                style={{
                  bottom: 2,
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
        console.log('sortedItems', sortedItems.length);
        setNextToken(response.data.listPosts.nextToken);
        setPosts(sortedItems);
        setLoading(false);
      } catch (e) {
        console.error(e);
        setLoading(false);
      }
    };

    fetchPost();
  }, [navigation]);

  const getMorePosts = async () => {
    try {
      if (nextToken) {
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
      }
    } catch (error) {
      console.log('Pagination Error', error);
    }
  };

  const handleRefresh = async () => {
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
    />
  );

  const _viewabilityConfig = useRef({
    viewAreaCoveragePercentThreshold: 75,
  });

  const _onViewableItemsChanged = useRef(({viewableItems, changed}) => {
    if (viewableItems && viewableItems.length > 0) {
      setCurrentVisibleIndex(viewableItems[0].index);
    }
  });

  return (
    <View style={styles.mainContainer}>
      {loading && <LoadingIndicator visible={loading} />}
      <Image
        source={require('../../assets/images/Logo13.png')}
        size={15}
        style={styles.img1}
      />
      <Text style={styles.text}>Livebox</Text>

      <TouchableOpacity style={styles.cart}>
        <Feather name={'shopping-cart'} size={20} color="transparent" />
      </TouchableOpacity>

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
        snapToInterval={Dimensions.get('window').height + 45}
        borderRadius={50}
        viewabilityConfig={_viewabilityConfig.current}
        onViewableItemsChanged={_onViewableItemsChanged.current}
        onEndReached={getMorePosts}
        onEndReachedThreshold={0.5}
        keyExtractor={(item) => item.id.toString()}
        refreshing={refreshing}
        onRefresh={handleRefresh}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    position: 'absolute',
    padding: 10,
    width: '100%',
    height: '100%',
    top: 34,
    paddingTop: 0,
    paddingLeft: 4,
    paddingRight: 4,
    paddingBottom: 0,
    marginRight: 4,
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
});

export default Home;
