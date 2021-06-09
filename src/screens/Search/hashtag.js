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
import {listPostHashTags} from '../../graphql/queries';

import FullScreenVideo from './fullScreenVideo';
import HashTagVideoList from './HashTagVideoList';
import {log} from 'react-native-reanimated';

const vpHeight = Dimensions.get('window').height;
const vpWidth = Dimensions.get('window').width;

const hashTags = [
  {
    name: '#LockdownChef',
  },
  {
    name: '#StayhomeStayFit',
  },
  {
    name: '#Livestylist',
  },
  {
    name: '#Trendingfashion',
  },
  {
    name: '#Liveboxlivenow',
  },
];

const HashTag = () => {
  const [hashTags, setHashTags] = useState(null);
  const [isLoader, setLoader] = useState(false);

  useEffect(() => {
    const fetchHashTags = async () => {
      try {
        setLoader(true);
        const response = await API.graphql(
          graphqlOperation(listPostHashTags, {}),
        );
        const allItems = response.data.listPostHashTags.items;
        //console.log(allItems);

        //To remove hashtag data
        var hashtagResult = [];
        allItems.reduce(function (res, value) {
          //console.log('res',res)
          //console.log('value',value)

          if (!res[value.hashTag.name]) {
            res[value.hashTag.name] = {
              id: value.hashTag.id,
              name: value.hashTag.name,
              likes: 0,
            };
            hashtagResult.push(res[value.hashTag.name]);
          }
          res[value.hashTag.name].likes +=
            value.post.likes != null ? value.post.likes.length : 0;
          return res;
        }, {});

        //console.log(hashtagResult)

        // // const sortedItems = allItems.sort(
        // //   (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
        // // );
        // Sort Items
        hashtagResult = hashtagResult
          //.filter((item) => item.likes)
          .sort((a, b) => b.likes - a.likes);

        console.log('sortedItems', hashtagResult);

        setHashTags(hashtagResult);
        setLoader(false);

        // //console.log('sortedItems', response.data.listPosts.nextToken);
        // setNextToken(response.data.listPosts.nextToken);

        // //Append undefined likes to sortedItems
        // setUris(
        //   sortedItems.concat(allItems.filter((item) => item.likes === null)),
        // );
      } catch (e) {
        console.log('hashtag fetchpost error');
        console.error(e);
        setLoader(false);
      }
    };

    fetchHashTags();
  }, []);

  return (
    <View style={styles.container}>
      {isLoader ? (
        <ActivityIndicator size={'large'} animating color="white" />
      ) : null}
      {hashTags &&
        hashTags.map((h, i) => (
          <View key={`${h.name}-${i}`}>
            <Text style={styles.hashTag}>{h.name}</Text>
            <Text style={styles.trending}>Trending Hashtag</Text>
            {/* <Text style={styles.views}>24.2M Views</Text> */}

            <HashTagVideoList hashTagId={h.id} hashTagName={h.name} />
          </View>
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 10,
    marginBottom: 80,
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
    marginBottom: 20,
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
