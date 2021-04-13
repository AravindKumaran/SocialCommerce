import React, {useState, useCallback, useEffect} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Dimensions,
  Modal,
  Text,
  Image,
  ActivityIndicator,
} from 'react-native';
import {API, graphqlOperation, Auth} from 'aws-amplify';
import {listPosts} from '../../graphql/queries';

import TrendingVideo from './trendingVideo';
import FullScreenVideo from './fullScreenVideo';

const vpHeight = Dimensions.get('window').height;
const vpWidth = Dimensions.get('window').width;

const Trending = () => {
  const [uris, setUris] = useState([]);
  const [nextToken, setNextToken] = useState(undefined);
  const [curLimit, setCurLimit] = useState(12);
  const [isLoader, setLoader] = useState(false);

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
      setLoader(true);
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
      height={item.height}
      poster={item?.thumbnail}
      isCategory={true}
      data={uris}
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
      <Image
        style={{top: 0, left: 10}}
        source={require('../../assets/images/Line2.png')}
        size={15}
      />
      <Text style={styles.text2}>Top Trending</Text>
      <FlatList
        nestedScrollEnabled={true}
        data={uris}
        numColumns={3}
        renderItem={_renderItem}
        onEndReached={getMorePosts}
        onEndReachedThreshold={0.5}
        keyExtractor={(item) => item.id.toString()}
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
    bottom: 30,
    // marginTop: -540,
  },
  text2: {
    marginBottom: 30,
    color: '#FFFFFF',
    fontWeight: '700',
    textAlign: 'center',
    fontFamily: 'Proxima Nova',
    fontSize: 16,
    top: 15,
  },
});

export default Trending;
