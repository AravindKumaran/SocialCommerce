import React, {useState, useEffect} from 'react';
import {StyleSheet, View, FlatList, Dimensions} from 'react-native';
import TrendingVideo from '../Search/trendingVideo';
import {API, graphqlOperation, Auth} from 'aws-amplify';
import {listPosts} from '../../graphql/queries';
import Feather from 'react-native-vector-icons/Feather';
import LoadingIndicator from '../../components/Common/LoadingIndicator';

const vpHeight = Dimensions.get('window').height;
const vpWidth = Dimensions.get('window').width;

const uris = [
  {
    key: 1,
    uri:
      'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    height: 200,
    width: '33.33%',
  },
  {
    key: 2,
    uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
    height: 200,
    width: '33.33%',
  },
  {
    key: 3,
    uri:
      'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    height: 200,
    width: '33.33%',
  },
  {
    key: 4,
    uri:
      'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    height: 200,
    width: '33.33%',
  },
  {
    key: 5,
    uri:
      'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    height: 200,
    width: '33.33%',
  },
  {
    key: 6,
    uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
    height: 200,
    width: '33.33%',
  },
  {
    key: 7,
    uri:
      'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    height: 200,
    width: '33.33%',
  },
  {
    key: 8,
    uri:
      'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4',
    height: 200,
    width: '33.33%',
  },
  {
    key: 9,
    uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
    height: 200,
    width: '33.33%',
  },
  {
    key: 10,
    uri:
      'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    height: 200,
    width: '33.33%',
  },
  {
    key: 11,
    uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
    height: 200,
    width: '33.33%',
  },
  {
    key: 12,
    uri:
      'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    height: 200,
    width: '33.33%',
  },
  {
    key: 13,
    uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
    height: 200,
    width: '33.33%',
  },
  {
    key: 14,
    uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
    height: 200,
    width: '33.33%',
  },
  {
    key: 15,
    uri:
      'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    height: 200,
    width: '33.33%',
  },
];

const Videos = ({userId}) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [curLimit, setCurLimit] = useState(15);
  const [nextToken, setNextToken] = useState(undefined);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const response = await API.graphql(
          graphqlOperation(listPosts, {
            limit: curLimit,
            filter: {
              userID: {eq: userId},
            },
          }),
        );

        const allItems = response.data.listPosts.items;
        const sortedItems = allItems.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
        );
        // console.log('sortedItems', sortedItems.length);
        setNextToken(response.data.listPosts.nextToken);
        setPosts(sortedItems);
        setLoading(false);
      } catch (e) {
        console.log('Caledd');
        setLoading(false);
        console.error(e);
      }
    };

    fetchPost();
  }, [userId]);

  const getMorePosts = async () => {
    console.log('I am called');
    try {
      if (nextToken) {
        setLoading(true);
        const response = await API.graphql(
          graphqlOperation(listPosts, {
            limit: curLimit + 15,
            filter: {
              userID: {eq: userId},
            },
            nextToken,
          }),
        );
        // console.log('AllItems', curLimit);
        setCurLimit((lim) => lim + 15);
        setNextToken(response.data.listPosts.nextToken);
        setPosts((post) => [...post, ...response.data.listPosts.items]);
        setLoading(false);
      }
    } catch (error) {
      console.log('Pagination Error', error);
      setLoading(false);
    }
  };

  const _renderItem = ({item, index}) => (
    <TrendingVideo
      videoUri={item.videoUri}
      idx={index}
      item={item}
      isProfile={true}
      data={posts}
    />
  );
  return (
    <View style={styles.container}>
      {loading && <LoadingIndicator visible={loading} />}
      <FlatList
        nestedScrollEnabled={true}
        data={posts}
        numColumns={3}
        renderItem={_renderItem}
        keyExtractor={(item) => item.id.toString()}
        onEndReached={getMorePosts}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    paddingBottom: 50,
  },
});

export default Videos;
