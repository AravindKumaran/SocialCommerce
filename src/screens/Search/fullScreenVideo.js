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

const abc = {
  comments: {nextToken: null},
  createdAt: '2021-03-23T10:02:11.481Z',
  description: 'Test16',
  id: '7537af61-9e31-4ec7-aa2c-564f6d51fe22',
  likes: ['af629562-e685-46e9-a242-f66197fff538'],
  song: {
    createdAt: '2020-12-19T12:54:37.113Z',
    id: '20dee14b-39a9-4321-8ec7-c3380e2f5c27',
    imageUri:
      'https://influencermarketinghub.com/wiki/wp-content/uploads/2020/08/1657369265111046_c5_720x720.jpeg',
    name: 'NF - The Search',
    updatedAt: '2020-12-19T12:54:37.113Z',
  },
  songID: '20dee14b-39a9-4321-8ec7-c3380e2f5c27',
  updatedAt: '2021-03-27T06:55:46.250Z',
  user: {
    createdAt: '2021-03-22T08:42:09.167Z',
    email: 'commercesocial09@gmail.com',
    id: 'a1669e33-2bea-4d16-a7d3-ff537cf9a029',
    imageUri: 'https://hieumobile.com/wp-content/uploads/avatar-among-us-3.jpg',
    updatedAt: '2021-03-29T04:58:59.894Z',
    username: 'commercesocial09',
  },
  userID: 'a1669e33-2bea-4d16-a7d3-ff537cf9a029',
  videoUri: 'IMG_20210323_092937_039 (1).mp4',
};

const uris = [
  {
    key: 1,
    uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
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
    uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
    height: 200,
    width: '33.33%',
  },
  {
    key: 4,
    uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
    height: 200,
    width: '33.33%',
  },
  {
    key: 5,
    uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
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
    uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
    height: 200,
    width: '33.33%',
  },
  {
    key: 8,
    uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
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
    uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
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
    uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
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
    uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
    height: 200,
    width: '33.33%',
  },
];

const vpHeight = Dimensions.get('window').height;
const vpWidth = Dimensions.get('window').width;

const FullScreenVideo = ({fullScreen, handleFullScreen, idx}) => {
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
    <>
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
      />
    </>
  );
};

const styles = StyleSheet.create({});

export default FullScreenVideo;
