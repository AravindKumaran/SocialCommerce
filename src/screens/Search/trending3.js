import React, {useState, useCallback, useEffect} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Dimensions,
  Modal,
  Text,
  Image,
} from 'react-native';
import {API, graphqlOperation, Auth} from 'aws-amplify';
import {listPosts} from '../../graphql/queries';

import TrendingVideo from './trendingVideo';
import FullScreenVideo from './fullScreenVideo';

const vpHeight = Dimensions.get('window').height;
const vpWidth = Dimensions.get('window').width;

// const uris = [
//   {
//     key: 1,
//     uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
//     height: 200,
//     width: '33.33%',
//   },
//   {
//     key: 2,
//     uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
//     height: 200,
//     width: '33.33%',
//   },
//   {
//     key: 3,
//     uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
//     height: 200,
//     width: '33.33%',
//   },
//   {
//     key: 4,
//     uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
//     height: 200,
//     width: '33.33%',
//   },
//   {
//     key: 5,
//     uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
//     height: 200,
//     width: '33.33%',
//   },
//   {
//     key: 6,
//     uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
//     height: 200,
//     width: '33.33%',
//   },
//   {
//     key: 7,
//     uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
//     height: 200,
//     width: '33.33%',
//   },
//   {
//     key: 8,
//     uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
//     height: 200,
//     width: '33.33%',
//   },
//   {
//     key: 9,
//     uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
//     height: 200,
//     width: '33.33%',
//   },
//   {
//     key: 10,
//     uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
//     height: 200,
//     width: '33.33%',
//   },
//   {
//     key: 11,
//     uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
//     height: 200,
//     width: '33.33%',
//   },
//   {
//     key: 12,
//     uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
//     height: 200,
//     width: '33.33%',
//   },
//   {
//     key: 13,
//     uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
//     height: 200,
//     width: '33.33%',
//   },
//   {
//     key: 14,
//     uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
//     height: 200,
//     width: '33.33%',
//   },
//   {
//     key: 15,
//     uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
//     height: 200,
//     width: '33.33%',
//   },
// ];

const Trending = () => {
  const [uris, setUris] = useState([]);
  const [nextToken, setNextToken] = useState(undefined);
  const [curLimit, setCurLimit] = useState(10);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await API.graphql(
          graphqlOperation(listPosts, {
            limit: curLimit,
          }),
        );
        const allItems = response.data.listPosts.items;
        const sortedItems = allItems.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
        );
        console.log('sortedItems', response.data.listPosts.nextToken);
        setNextToken(response.data.listPosts.nextToken);

        setUris(sortedItems);
      } catch (e) {
        console.log('Caledd');
        console.error(e);
      }
    };

    fetchPost();
  }, []);

  const getMorePosts = async () => {
    try {
      if (nextToken) {
        const response = await API.graphql(
          graphqlOperation(listPosts, {
            limit: curLimit + 15,
            nextToken,
          }),
        );
        console.log('AllItems', curLimit);
        setCurLimit((lim) => lim + 15);
        setNextToken(response.data.listPosts.nextToken);
        setUris((post) => [...post, ...response.data.listPosts.items]);
      }
    } catch (error) {
      console.log('Pagination Error', error);
    }
  };

  const _renderItem = ({item, index}) => (
    <TrendingVideo
      videoUri={item.videoUri}
      idx={index}
      height={item.height}
      poster={item?.thumbnail}
      isCategory={true}
      data={uris}
    />
  );

  return (
    <View style={styles.container}>
      {/* <View style={{bottom: 30}}>
        <Image
          style={{top: 0, left: 10}}
          source={require('../../assets/images/Line2.png')}
          size={15}
        />
        <Text style={styles.text2}>Top Trending</Text>
      </View> */}
      <FlatList
        nestedScrollEnabled={true}
        data={uris}
        numColumns={3}
        renderItem={_renderItem}
        onEndReached={getMorePosts}
        onEndReachedThreshold={0.5}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    marginTop: -450,
  },
  text2: {
    // marginVertical: 30,
    color: '#FFFFFF',
    fontWeight: '700',
    textAlign: 'center',
    fontFamily: 'Proxima Nova',
    fontSize: 16,
    top: 15,
  },
});

export default Trending;
