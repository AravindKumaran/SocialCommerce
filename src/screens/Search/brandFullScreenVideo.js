import React, {useEffect, useRef, useState} from 'react';

import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Dimensions,
  Modal,
} from 'react-native';

import TrendingVideo from './trendingVideo';
import AppButton from '../../components/Common/AppButton';

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

const vpHeight = Dimensions.get('window').height;
const vpWidth = Dimensions.get('window').width;

const BrandFullScreenVideo = ({fullScreen, handleFullScreen, idx}) => {
  const flatListRef = useRef(null);
  useEffect(() => {
    console.log('I am called', idx);
    flatListRef.current.scrollToIndex({index: idx});
  }, [idx]);

  const _renderItem = ({item, index}) => (
    <TrendingVideo
      videoUri={item.uri}
      idx={index}
      height={item.height}
      fullScreen={fullScreen}
      onFullScreen={handleFullScreen}
      curIdx={idx}
    />
  );

  return (
    <View>
      <AppButton
        btnStyle={{margin: 20, width: 300}}
        title="Close"
        onPress={() => handleFullScreen(1, true)}
      />
      <FlatList
        ref={flatListRef}
        getItemLayout={(data, index) => ({
          length: vpHeight - 80,
          offset: vpHeight * 0.9 * index,
          index,
        })}
        nestedScrollEnabled={true}
        data={uris}
        renderItem={_renderItem}
        keyExtractor={(item) => item.key.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default BrandFullScreenVideo;
