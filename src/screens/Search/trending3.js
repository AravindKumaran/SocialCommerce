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

const Trending = ({category, searchedData}) => {
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
                    isDeleted: {ne: true},
                  },
                }
              : {
                  limit: curLimit,
                  filter: {isDeleted: {ne: true}},
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

        // console.log(
        //   'sortedItems',
        //   sortedItems.map((item) => item?.likes?.length),
        // );
        //console.log('sortedItems', response.data.listPosts.nextToken);
        setNextToken(response.data.listPosts.nextToken);

        //Append undefined likes to sortedItems
        setUris(
          sortedItems.concat(allItems.filter((item) => item.likes === null)),
        );
        console.log('sorted Items', sortedItems[0])
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
                    isDeleted: {ne: true},
                  },
                  nextToken,
                }
              : {
                  limit: curLimit + 15,
                  filter: {isDeleted: {ne: true}},
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
      {searchedData == null ? (
        <View>
          <Text style={styles.text2}>Top Trending</Text>
          <FlatList
            nestedScrollEnabled={true}
            showsVerticalScrollIndicator={false}
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
      ) : (
        <View>
          <FlatList
            nestedScrollEnabled={true}
            data={searchedData}
            numColumns={3}
            renderItem={_renderItem}
            //onEndReached={}
            onEndReachedThreshold={0.5}
            keyExtractor={(item) => item.id.toString()}
            style={{height: Dimensions.get('window').height}}
            ListFooterComponent={renderFooter}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    bottom: 10,
  },
  text2: {
    marginBottom: 30,
    color: '#FFFFFF',
    fontWeight: '700',
    textAlign: 'center',
    fontFamily: 'Proxima Nova',
    fontSize: 14,
    top: 15,
  },
});

export default Trending;
