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

const vpHeight = Dimensions.get('window').height;
const vpWidth = Dimensions.get('window').width;

const Home = ({navigation, route}) => {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const flatListRef = useRef(null);

  useEffect(() => {
    // console.log('I am called', route?.params?.idx);
    if (route?.params?.idx) {
      flatListRef.current.scrollToIndex({index: route?.params?.idx});
      setCurrentVisibleIndex(route?.params?.idx);
    }
  }, [route?.params?.idx]);

  const [currentVisibleIndex, setCurrentVisibleIndex] = useState(0);

  // useEffect(() => {
  //   const getUser = async () => {
  //     setLoading(true);
  //     try {
  //       const userInfo = await Auth.currentAuthenticatedUser({
  //         bypassCache: true,
  //       });
  //       console.log('UserInfio');
  //       setUser(userInfo.attributes);
  //       setLoading(false);
  //     } catch (error) {
  //       console.error('Error', error);
  //       setLoading(false);
  //     }
  //   };
  //   getUser();
  // }, [navigation]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await API.graphql(graphqlOperation(listPosts));
        // console.log('Ress', response.data.listPosts.items[0]);
        const allItems = response.data.listPosts.items;
        const sortedItems = allItems.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
        );
        setPosts(sortedItems);

        console.log('sortedItems', sortedItems[0]);
      } catch (e) {
        console.log('Caledd');
        console.error(e);
      }
    };

    fetchPost();
  }, [navigation]);

  const _renderItem = ({item, index}) => (
    <Post
      post={item}
      currentIndex={index}
      currentVisibleIndex={currentVisibleIndex}
      user={user}
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
        <Feather name={'shopping-cart'} size={20} />
      </TouchableOpacity>

      <FlatList
        data={posts}
        ref={flatListRef}
        getItemLayout={(data, index) => ({
          length: vpHeight + 45,
          offset: vpHeight * 0.83 * index,
          index,
        })}
        renderItem={_renderItem}
        showsVerticalScrollIndicator={false}
        snapToAlignment={'start'}
        decelerationRate={'fast'}
        snapToInterval={Dimensions.get('window').height + 45}
        borderRadius={50}
        viewabilityConfig={_viewabilityConfig.current}
        onViewableItemsChanged={_onViewableItemsChanged.current}
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
