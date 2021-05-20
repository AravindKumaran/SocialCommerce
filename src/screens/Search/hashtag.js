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
  ScrollView,
} from 'react-native';
import {API, graphqlOperation, Auth} from 'aws-amplify';
import {listPosts} from '../../graphql/queries';

import HashTagVideo from './hashtagVideo';
import FullScreenVideo from './fullScreenVideo';

const vpHeight = Dimensions.get('window').height;
const vpWidth = Dimensions.get('window').width;

const HashTag = ({category, searchedData}) => {
  const [uris, setUris] = useState([]);
  const [nextToken, setNextToken] = useState(undefined);
  const [curLimit, setCurLimit] = useState(12);
  const [isLoader, setLoader] = useState(false);

  console.log('Category', category);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await API.graphql(
          graphqlOperation(
            listPosts,
            category !== ''
              ? {
                  limit: curLimit,
                  filter: {
                    category: {eq: category},
                  },
                }
              : {
                  limit: curLimit,
                },
          ),
        );
        const allItems = response.data.listPosts.items;
        // const sortedItems = allItems.sort(
        //   (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
        // );
        //Sort Items
        let sortedItems = allItems
          .filter((item) => item.likes)
          .sort((a, b) => b.likes.length - a.likes.length);

        console.log(
          'sortedItems',
          sortedItems.map((item) => item?.likes?.length),
        );
        //console.log('sortedItems', response.data.listPosts.nextToken);
        setNextToken(response.data.listPosts.nextToken);

        //Append undefined likes to sortedItems
        setUris(
          sortedItems.concat(allItems.filter((item) => item.likes === null)),
        );
      } catch (e) {
        console.log('Caledd');
        console.error(e);
      }
    };

    fetchPost();
  }, [category]);

  const getMorePosts = async () => {
    try {
      if (nextToken) {
        setLoader(true);
        const response = await API.graphql(
          graphqlOperation(
            listPosts,
            category !== ''
              ? {
                  limit: curLimit + 15,
                  filter: {
                    category: {eq: category},
                  },
                  nextToken,
                }
              : {
                  limit: curLimit + 15,
                  nextToken,
                },
          ),
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
    <HashTagVideo
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
        }}>
        {isLoader ? (
          <ActivityIndicator size={'large'} animating color="white" />
        ) : null}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.hashTag}>#Music</Text>
        <Text style={styles.trending}>Trending Hashtag</Text>
        <Text style={styles.views}>24.2M Views</Text>

        <FlatList
          nestedScrollEnabled={true}
          data={uris}
          horizontal={true}
          renderItem={_renderItem}
          onEndReached={getMorePosts}
          onEndReachedThreshold={0.5}
          keyExtractor={(item) => item.id.toString()}
          style={{height: Dimensions.get('window').height}}
          ListFooterComponent={renderFooter}
        />
      </View>

      <View style={{bottom: '34%'}}>
        <Text style={styles.hashTag}>#Gaming</Text>
        <Text style={styles.trending}>Trending Hashtag</Text>
        <Text style={styles.views}>32M Views</Text>

        <FlatList
          nestedScrollEnabled={true}
          data={uris}
          horizontal={true}
          renderItem={_renderItem}
          onEndReached={getMorePosts}
          onEndReachedThreshold={0.5}
          keyExtractor={(item) => item.id.toString()}
          style={{height: Dimensions.get('window').height}}
          ListFooterComponent={renderFooter}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 10,
  },
  hashTag: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontFamily: 'Proxima Nova',
    fontSize: 18,
    textAlign: 'left',
  },
  trending: {
    color: '#FFFFFF',
    fontWeight: '400',
    fontFamily: 'Proxima Nova',
    fontSize: 12,
    textAlign: 'left',
  },
  views: {
    color: '#FFFFFF',
    fontWeight: '400',
    fontFamily: 'Proxima Nova',
    fontSize: 12,
    textAlign: 'right',
    bottom: 25,
    marginRight: 10,
  },
});

export default HashTag;
