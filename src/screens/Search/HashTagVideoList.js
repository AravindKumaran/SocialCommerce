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
import {listPosts, listPostHashTags} from '../../graphql/queries';
import HashTagVideo from './hashtagVideo';

const vpHeight = Dimensions.get('window').height;
const vpWidth = Dimensions.get('window').width;

function HashTagVideoList({hashTagId, hashTagName}) {
  console.log(hashTagId);
  const [uris, setUris] = useState([]);
  const [nextToken, setNextToken] = useState(undefined);
  const [curLimit, setCurLimit] = useState(12);
  const [isLoader, setLoader] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await API.graphql(
          graphqlOperation(listPostHashTags, {
            filter: {
              hashTagID: {
                eq: hashTagId,
              },
            },
            limit: curLimit,
          }),
        );
        const allItems = response.data.listPostHashTags.items;
        console.log('HashTagVideoList', allItems);

        const keys_to_keep = ['post'];

        //to remove hashtag in all items
        const redux = (array) =>
          array.map((o) =>
            keys_to_keep.reduce((acc, curr) => {
              acc[curr] = o[curr];
              return acc.post;
            }, {}),
          );

        const sortedItems = redux(allItems);

        setUris(sortedItems);

        // const sortedItems = allItems.sort(
        //   (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
        // );
        //Sort Items
        // let sortedItems = allItems
        //   .filter((item) => item.likes)
        //   .sort((a, b) => b.likes.length - a.likes.length);

        // console.log(
        //   'sortedItems',
        //   sortedItems.map((item) => item?.likes?.length),
        // );
        //console.log('sortedItems', response.data.listPosts.nextToken);
        // setNextToken(response.data.listPostHashTags.nextToken);

        //Append undefined likes to sortedItems
        // setUris(
        //   sortedItems
        //   //sortedItems.concat(allItems.filter((item) => item.likes === null)),
        // );
      } catch (e) {
        console.log('hashtag fetchpost error');
        console.error(e);
      }
    };

    fetchPost();
  }, []);

  const getMorePosts = async () => {
    try {
      if (nextToken) {
        setLoader(true);
        const response = await API.graphql(
          graphqlOperation(listPostHashTags, {
            filter: {
              hashTagID: {
                eq: hashTagId,
              },
            },
            limit: curLimit + 15,
            nextToken,
          }),
        );
        console.log('AllItems', curLimit);
        setCurLimit((lim) => lim + 15);
        setNextToken(response.data.listPostHashTags.nextToken);
        setUris((post) => [...post, ...response.data.listPostHashTags.items]);
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
    <View style={{height: 220}}>
      <FlatList
        showsHorizontalScrollIndicator={false}
        key={hashTagName}
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
  );
}

export default HashTagVideoList;
