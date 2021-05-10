import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import TrendingVideo from '../Search/trendingVideo';
import {API, graphqlOperation, Auth} from 'aws-amplify';
import {listPosts} from '../../graphql/queries';
import Feather from 'react-native-vector-icons/Feather';
import LoadingIndicator from '../../components/Common/LoadingIndicator';

const vpHeight = Dimensions.get('window').height;
const vpWidth = Dimensions.get('window').width;

const Videos = ({userId, postLength}) => {
  console.log('ghg', userId, postLength);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [curLimit, setCurLimit] = useState(15);
  const [nextToken, setNextToken] = useState(undefined);
  const [isLoader, setLoader] = useState(false);

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
        console.log('sortedItemsProfile', sortedItems.length, sortedItems[0]);
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
  }, [userId, postLength]);

  const getMorePosts = async () => {
    console.log('I am called222');
    try {
      if (nextToken) {
        setLoader(true);
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
        setLoader(false);
      }
    } catch (error) {
      console.log('Pagination Error', error);
      setLoader(false);
    }
  };

  const _renderItem = ({item, index}) => (
    <TrendingVideo
      videoUri={item.videoUri}
      idx={index}
      item={item}
      isProfile={true}
      data={posts}
      poster={item?.thumbnail}
    />
  );

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
        style={{height: Dimensions.get('window').height}}
        ListFooterComponent={renderFooter}
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
