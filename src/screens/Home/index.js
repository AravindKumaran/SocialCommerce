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
import {API, graphqlOperation} from 'aws-amplify';
import {listPosts} from '../../graphql/queries';
import Feather from 'react-native-vector-icons/Feather';

// import Product from '../../screens/Product/index';
// import { Viewport } from '@skele/components';
// import {inViewPort} from 'react-native-inviewport';

const Home = ({navigation}) => {
  const [posts, setPosts] = useState([]);

  const [currentVisibleIndex, setCurrentVisibleIndex] = useState(0);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await API.graphql(graphqlOperation(listPosts));
        // console.log('Ress', response.data.listPosts.items[0]);
        const allItems = response.data.listPosts.items;
        const sortedItems = allItems.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
        );
        console.log('sortedItems', sortedItems[0]);
        setPosts(sortedItems);
      } catch (e) {
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
    />
  );

  const _viewabilityConfig = useRef({
    // waitForInteraction: true,
    viewAreaCoveragePercentThreshold: 75,
    // itemVisiblePercentThreshold: 85,
  });

  const _onViewableItemsChanged = useRef(({viewableItems, changed}) => {
    // console.log('viewableItems', viewableItems);
    // console.log('changed', changed);
    if (viewableItems && viewableItems.length > 0) {
      setCurrentVisibleIndex(viewableItems[0].index);
    }
  });

  return (
    <View style={styles.mainContainer}>
      <Image
        source={require('../../assets/images/Logo12.png')}
        size={15}
        style={styles.img1}
      />
      <Text style={styles.text}>Livebox</Text>

      <Feather style={styles.cart} name={'shopping-cart'} size={20} />

      <FlatList
        data={posts}
        renderItem={_renderItem}
        showsVerticalScrollIndicator={false}
        snapToAlignment={'start'}
        decelerationRate={'fast'}
        snapToInterval={Dimensions.get('window').height}
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
    // bottom: 55,
    paddingTop: -10,
    paddingLeft: 4,
    paddingRight: 4,
    marginRight: 4,
    paddingBottom: 30,
    backgroundColor: '#292929',
  },

  img1: {
    overlayColor: '#292929',
    backgroundColor: '#292929',
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
