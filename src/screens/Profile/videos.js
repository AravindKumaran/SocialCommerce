import React from 'react';
import {StyleSheet, View, FlatList, Dimensions} from 'react-native';
import TrendingVideo from '../Search/trendingVideo';

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

const Videos = ({post}) => {
  const _renderItem = ({item, index}) => (
    <TrendingVideo
      videoUri={item.videoUri}
      idx={index}
      item={item}
      isProfile={true}
      data={post}
      // height={item.height}
      // width={item.width}
    />
  );

  const Item = (dataItem, key) => {
    return <TrendingVideo key={key} videoUri={dataItem.uri} />;
  };
  return (
    <View style={styles.container}>
      <FlatList
        nestedScrollEnabled={true}
        data={post}
        numColumns={3}
        renderItem={_renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
  },
});

export default Videos;
