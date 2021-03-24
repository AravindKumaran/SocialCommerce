import React from 'react';

import {StyleSheet, View, Text, FlatList, Dimensions} from 'react-native';
import TrendingVideo from '../Search/trendingVideo';
import Masonry from 'react-native-infinite-masonry';
import {Col, Row, Grid} from 'react-native-easy-grid';

const vpHeight = Dimensions.get('window').height;
const vpWidth = Dimensions.get('window').width;

// const uris = [
//   {
//     key: 1,
//     uri:
//       'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
//     height: parseInt(Math.max(0.3, Math.random()) * vpWidth),
//   },
//   {
//     key: 2,
//     uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
//     height: parseInt(Math.max(0.3, Math.random()) * vpWidth),
//   },
//   {
//     key: 3,
//     uri:
//       'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
//     height: parseInt(Math.max(0.3, Math.random()) * vpWidth),
//   },
//   {
//     key: 4,
//     uri:
//       'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
//     height: parseInt(Math.max(0.3, Math.random()) * vpWidth),
//   },
//   {
//     key: 5,
//     uri:
//       'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
//     height: parseInt(Math.max(0.3, Math.random()) * vpWidth),
//   },
//   {
//     key: 6,
//     uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
//     height: parseInt(Math.max(0.3, Math.random()) * vpWidth),
//   },
//   {
//     key: 7,
//     uri:
//       'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
//     height: parseInt(Math.max(0.3, Math.random()) * vpWidth),
//   },
//   {
//     key: 7,
//     uri:
//       'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4',
//     height: parseInt(Math.max(0.3, Math.random()) * vpWidth),
//   },
//   {
//     key: 9,
//     uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
//     height: parseInt(Math.max(0.3, Math.random()) * vpWidth),
//   },
//   {
//     key: 7,
//     uri:
//       'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
//     height: parseInt(Math.max(0.3, Math.random()) * vpWidth),
//   },
//   {
//     key: 11,
//     uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
//     height: parseInt(Math.max(0.3, Math.random()) * vpWidth),
//   },
//   {
//     key: 12,
//     uri:
//       'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
//     height: parseInt(Math.max(0.3, Math.random()) * vpWidth),
//   },
//   {
//     key: 13,
//     uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
//     height: parseInt(Math.max(0.3, Math.random()) * vpWidth),
//   },
//   {
//     key: 14,
//     uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
//     height: parseInt(Math.max(0.3, Math.random()) * vpWidth),
//   },
//   {
//     key: 15,
//     uri:
//       'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
//     height: parseInt(Math.max(0.3, Math.random()) * vpWidth),
//   },
//   {
//     key: 16,
//     uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
//     height: parseInt(Math.max(0.3, Math.random()) * vpWidth),
//   },
//   {
//     key: 17,
//     uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
//     height: parseInt(Math.max(0.3, Math.random()) * vpWidth),
//   },
//   {
//     key: 17,
//     uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
//     height: parseInt(Math.max(0.3, Math.random()) * vpWidth),
//   },
//   {
//     key: 19,
//     uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
//     height: parseInt(Math.max(0.3, Math.random()) * vpWidth),
//   },
//   {
//     key: 20,
//     uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
//     height: parseInt(Math.max(0.3, Math.random()) * vpWidth),
//   },
//   {
//     key: 21,
//     uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
//     height: parseInt(Math.max(0.3, Math.random()) * vpWidth),
//   },
//   {
//     key: 22,
//     uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
//     height: parseInt(Math.max(0.3, Math.random()) * vpWidth),
//   },
//   {
//     key: 23,
//     uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
//     height: parseInt(Math.max(0.3, Math.random()) * vpWidth),
//   },
//   {
//     key: 24,
//     uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
//     height: parseInt(Math.max(0.3, Math.random()) * vpWidth),
//   },
//   {
//     key: 25,
//     uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
//     height: parseInt(Math.max(0.3, Math.random()) * vpWidth),
//   },
//   {
//     key: 26,
//     uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
//     height: parseInt(Math.max(0.3, Math.random()) * vpWidth),
//   },
//   {
//     key: 27,
//     uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
//     height: parseInt(Math.max(0.3, Math.random()) * vpWidth),
//   },
//   {
//     key: 27,
//     uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
//     height: parseInt(Math.max(0.3, Math.random()) * vpWidth),
//   },
//   {
//     key: 29,
//     uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
//     height: parseInt(Math.max(0.3, Math.random()) * vpWidth),
//   },
// {
//   key: 30,
//   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
//   height: parseInt(Math.max(0.3, Math.random()) * vpWidth),
// },
// {
//   key: 31,
//   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
//   height: parseInt(Math.max(0.3, Math.random()) * vpWidth),
// },
// {
//   key: 32,
//   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
//   height: parseInt(Math.max(0.3, Math.random()) * vpWidth),
// },
// {
//   key: 33,
//   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
//   height: parseInt(Math.max(0.3, Math.random()) * vpWidth),
// },
// {
//   key: 34,
//   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
//   height: parseInt(Math.max(0.3, Math.random()) * vpWidth),
// },
// {
//   key: 35,
//   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
//   height: parseInt(Math.max(0.3, Math.random()) * vpWidth),
// },
// {
//   key: 36,
//   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
//   height: parseInt(Math.max(0.3, Math.random()) * vpWidth),
// },
// {
//   key: 37,
//   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
//   height: parseInt(Math.max(0.3, Math.random()) * vpWidth),
// },
// {
//   key: 37,
//   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
//   height: parseInt(Math.max(0.3, Math.random()) * vpWidth),
// },
// {
//   key: 39,
//   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
//   height: parseInt(Math.max(0.3, Math.random()) * vpWidth),
// },
// {
//   key: 40,
//   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
//   height: parseInt(Math.max(0.3, Math.random()) * vpWidth),
// },
// {
//   key: 41,
//   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
//   height: parseInt(Math.max(0.3, Math.random()) * vpWidth),
// },
// {
//   key: 42,
//   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
//   height: parseInt(Math.max(0.3, Math.random()) * vpWidth),
// },
// {
//   key: 43,
//   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
//   height: parseInt(Math.max(0.3, Math.random()) * vpWidth),
// },
// {
//   key: 44,
//   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
//   height: parseInt(Math.max(0.3, Math.random()) * vpWidth),
// },
// {
//   key: 45,
//   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
//   height: parseInt(Math.max(0.3, Math.random()) * vpWidth),
// },
// {
//   key: 46,
//   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
//   height: parseInt(Math.max(0.3, Math.random()) * vpWidth),
// },
// {
//   key: 47,
//   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
//   height: parseInt(Math.max(0.3, Math.random()) * vpWidth),
// },
// {
//   key: 47,
//   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
//   height: parseInt(Math.max(0.3, Math.random()) * vpWidth),
// },
// {
//   key: 49,
//   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
//   height: parseInt(Math.max(0.3, Math.random()) * vpWidth),
// },
// {
//   key: 50,
//   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
//   height: parseInt(Math.max(0.3, Math.random()) * vpWidth),
// },
// {
//   key: 51,
//   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
//   height: parseInt(Math.max(0.3, Math.random()) * vpWidth),
// },
// {
//   key: 52,
//   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
//   height: parseInt(Math.max(0.3, Math.random()) * vpWidth),
// },
// {
//   key: 53,
//   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
//   height: parseInt(Math.max(0.3, Math.random()) * vpWidth),
// },
// {
//   key: 54,
//   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
//   height: parseInt(Math.max(0.3, Math.random()) * vpWidth),
// },
// {
//   key: 55,
//   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
//   height: parseInt(Math.max(0.3, Math.random()) * vpWidth),
// },
// {
//   key: 56,
//   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
//   height: parseInt(Math.max(0.3, Math.random()) * vpWidth),
// },
// {
//   key: 57,
//   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
//   height: parseInt(Math.max(0.3, Math.random()) * vpWidth),
// },
// {
//   key: 57,
//   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
//   height: parseInt(Math.max(0.3, Math.random()) * vpWidth),
// },
// {
//   key: 59,
//   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
//   height: parseInt(Math.max(0.3, Math.random()) * vpWidth),
// },
// {
//   key: 60,
//   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
//   height: parseInt(Math.max(0.3, Math.random()) * vpWidth),
// },
// {
//   key: 61,
//   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
//   height: parseInt(Math.max(0.3, Math.random()) * vpWidth),
// },
// {
//   key: 62,
//   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
//   height: parseInt(Math.max(0.3, Math.random()) * vpWidth),
// },
// {
//   key: 63,
//   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
//   height: parseInt(Math.max(0.3, Math.random()) * vpWidth),
// },
// {
//   key: 64,
//   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
//   height: parseInt(Math.max(0.3, Math.random()) * vpWidth),
// },
// {
//   key: 65,
//   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
//   height: parseInt(Math.max(0.3, Math.random()) * vpWidth),
// },
// {
//   key: 66,
//   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
//   height: parseInt(Math.max(0.3, Math.random()) * vpWidth),
// },
// {
//   key: 67,
//   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
//   height: parseInt(Math.max(0.3, Math.random()) * vpWidth),
// },
// {
//   key: 67,
//   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
//   height: parseInt(Math.max(0.3, Math.random()) * vpWidth),
// },
// {
//   key: 69,
//   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
//   height: parseInt(Math.max(0.3, Math.random()) * vpWidth),
// },
// {
//   key: 70,
//   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
//   height: parseInt(Math.max(0.3, Math.random()) * vpWidth),
// },
// {
//   key: 71,
//   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
//   height: parseInt(Math.max(0.3, Math.random()) * vpWidth),
// },
// {
//   key: 72,
//   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
//   height: parseInt(Math.max(0.3, Math.random()) * vpWidth),
// },
// {
//   key: 73,
//   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
//   height: parseInt(Math.max(0.3, Math.random()) * vpWidth),
// },
// {
//   key: 74,
//   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
//   height: parseInt(Math.max(0.3, Math.random()) * vpWidth),
// },
// {
//   key: 75,
//   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
//   height: parseInt(Math.max(0.3, Math.random()) * vpWidth),
// },
// {
//   key: 76,
//   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
//   height: parseInt(Math.max(0.3, Math.random()) * vpWidth),
// },
// {
//   key: 77,
//   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
//   height: parseInt(Math.max(0.3, Math.random()) * vpWidth),
// },
// {
//   key: 77,
//   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
//   height: parseInt(Math.max(0.3, Math.random()) * vpWidth),
// },
// {
//   key: 79,
//   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
//   height: parseInt(Math.max(0.3, Math.random()) * vpWidth),
// },
// {
//   key: 70,
//   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
//   height: parseInt(Math.max(0.3, Math.random()) * vpWidth),
// },
// {
//   key: 71,
//   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
//   height: parseInt(Math.max(0.3, Math.random()) * vpWidth),
// },
// {
//   key: 72,
//   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
//   height: parseInt(Math.max(0.3, Math.random()) * vpWidth),
// },
// {
//   key: 73,
//   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
//   height: parseInt(Math.max(0.3, Math.random()) * vpWidth),
// },
// {
//   key: 74,
//   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
//   height: parseInt(Math.max(0.3, Math.random()) * vpWidth),
// },
// {
//   key: 75,
//   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
//   height: parseInt(Math.max(0.3, Math.random()) * vpWidth),
// },
// {
//   key: 76,
//   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
//   height: parseInt(Math.max(0.3, Math.random()) * vpWidth),
// },
// {
//   key: 77,
//   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
//   height: parseInt(Math.max(0.3, Math.random()) * vpWidth),
// },
// {
//   key: 77,
//   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
//   height: parseInt(Math.max(0.3, Math.random()) * vpWidth),
// },
// {
//   key: 79,
//   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
//   height: parseInt(Math.max(0.3, Math.random()) * vpWidth),
// },
// {
//   key: 90,
//   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
//   height: parseInt(Math.max(0.3, Math.random()) * vpWidth),
// },
// {
//   key: 91,
//   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
//   height: parseInt(Math.max(0.3, Math.random()) * vpWidth),
// },
// {
//   key: 92,
//   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
//   height: parseInt(Math.max(0.3, Math.random()) * vpWidth),
// },
// {
//   key: 93,
//   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
//   height: parseInt(Math.max(0.3, Math.random()) * vpWidth),
// },
// {
//   key: 94,
//   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
//   height: parseInt(Math.max(0.3, Math.random()) * vpWidth),
// },
// {
//   key: 95,
//   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
//   height: parseInt(Math.max(0.3, Math.random()) * vpWidth),
// },
// {
//   key: 96,
//   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
//   height: parseInt(Math.max(0.3, Math.random()) * vpWidth),
// },
// {
//   key: 97,
//   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
//   height: parseInt(Math.max(0.3, Math.random()) * vpWidth),
// },
// {
//   key: 97,
//   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
//   height: parseInt(Math.max(0.3, Math.random()) * vpWidth),
// },
// {
//   key: 99,
//   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
//   height: parseInt(Math.max(0.3, Math.random()) * vpWidth),
// },
// {
//   key: 70,
//   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
//   height: parseInt(Math.max(0.3, Math.random()) * vpWidth),
// },
// {
//   key: 71,
//   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
//   height: parseInt(Math.max(0.3, Math.random()) * vpWidth),
// },
// ];

const uris = [
  {
    key: 1,
    uri:
      'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
  },
  {
    key: 2,
    uri:
      'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
  },
  {
    key: 3,
    uri:
      'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
  },
  {
    key: 4,
    uri:
      'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
  },
  {
    key: 5,
    uri:
      'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
  },
  {
    key: 6,
    uri:
      'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
  },
  {
    key: 7,
    uri:
      'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4',
  },
  {
    key: 7,
    uri:
      'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
  },
  {
    key: 9,
    uri:
      'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
  },
  {
    key: 7,
    uri:
      'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
  },
  {
    key: 11,
    uri:
      'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
  },
  {
    key: 12,
    uri:
      'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4',
  },
  {
    key: 13,
    uri:
      'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
  },
  {
    key: 14,
    uri:
      'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
  },
  {
    key: 15,
    uri:
      'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
  },
  {
    key: 16,
    uri:
      'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
  },
  {
    key: 17,
    uri:
      'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
  },
  {
    key: 17,
    uri:
      'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
  },
  {
    key: 19,
    uri:
      'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4',
  },
  {
    key: 20,
    uri:
      'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
  },
  {
    key: 21,
    uri:
      'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
  },
  {
    key: 22,
    uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
  },
  {
    key: 23,
    uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
  },
  {
    key: 24,
    uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
  },
  {
    key: 25,
    uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
  },
  {
    key: 26,
    uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
  },
  {
    key: 27,
    uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
  },
  {
    key: 27,
    uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
  },
  {
    key: 29,
    uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
  },
  {
    key: 30,
    uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
  },
];

const Videos = () => {
  const _renderItem = ({item, index}) => (
    <TrendingVideo
      videoUri={item.uri}
      idx={index}
      height={item.height}
      // poster="https://i.picsum.photos/id/766/175/300.jpg?hmac=rcadCENKh4rD6MAp6V_ma-AyWv641M4iiOpe1RyFHeI"
    />
  );

  const Item = (dataItem, key) => {
    return (
      <TrendingVideo
        key={key}
        videoUri={dataItem.uri}
        // idx={key}
        height={dataItem.height}
        // poster="https://i.picsum.photos/id/766/175/300.jpg?hmac=rcadCENKh4rD6MAp6V_ma-AyWv641M4iiOpe1RyFHeI"
      />
      // <View
      //   key={key}
      //   style={{
      //     height: dataItem.height,
      //   }}>
      //   {/* <Image style={styles.img} source={{uri: dataItem.image_url}} /> */}
      //   <Text>Hello</Text>

      // </View>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.topVideos}>
        {/* <TrendingVideo videoUri={uris[0].uri} idx={0} height={175} /> */}

        <TrendingVideo
          videoUri={uris[0].uri}
          idx={0}
          height={175}
          width="33.33%"
          //   style={{marginBottom: 7, margin: 7, borderRadius: 0}}
        />
        <TrendingVideo
          videoUri={uris[1].uri}
          idx={1}
          height={175}
          width="33.33%"
          //   style={{marginBottom: 7, margin: 7, borderRadius: 0}}
        />
        <TrendingVideo
          videoUri={uris[2].uri}
          idx={2}
          height={175}
          width="33.33%"
          //   style={{marginBottom: 7, margin: 7, borderRadius: 0}}
        />
        <TrendingVideo
          videoUri={uris[3].uri}
          idx={3}
          height={175}
          width="33.33%"
          //   style={{marginBottom: 7, margin: 7, borderRadius: 0}}
        />
        <TrendingVideo
          videoUri={uris[4].uri}
          idx={4}
          height={175}
          width="33.33%"
          //   style={{marginBottom: 7, margin: 7, borderRadius: 0}}
        />
        <TrendingVideo
          videoUri={uris[5].uri}
          idx={5}
          height={175}
          width="33.33%"
          //   style={{marginBottom: 7, margin: 7, borderRadius: 0}}
        />
        <TrendingVideo
          videoUri={uris[6].uri}
          idx={6}
          height={175}
          width="33.33%"
          //   style={{marginBottom: 7, margin: 7, borderRadius: 0}}
        />
        <TrendingVideo
          videoUri={uris[7].uri}
          idx={7}
          height={175}
          width="33.33%"
          //   style={{marginBottom: 7, margin: 7, borderRadius: 0}}
        />
        <TrendingVideo
          videoUri={uris[7].uri}
          idx={7}
          height={175}
          width="33.33%"
          //   style={{marginBottom: 7, margin: 7, borderRadius: 0}}
        />
        <TrendingVideo
          videoUri={uris[9].uri}
          idx={9}
          height={175}
          width="33.33%"
          //   style={{marginBottom: 7, margin: 7, borderRadius: 0}}
        />
        <TrendingVideo
          videoUri={uris[7].uri}
          idx={9}
          height={175}
          width="33.33%"
          //   style={{marginBottom: 7, margin: 7, borderRadius: 0}}
        />
        <TrendingVideo
          videoUri={uris[11].uri}
          idx={7}
          height={175}
          width="33.33%"
          //   style={{marginBottom: 7, margin: 7, borderRadius: 0}}
        />
        <TrendingVideo
          videoUri={uris[12].uri}
          idx={9}
          height={175}
          width="33.33%"
          //   style={{marginBottom: 7, margin: 7, borderRadius: 0}}
        />
        <TrendingVideo
          videoUri={uris[13].uri}
          idx={9}
          height={175}
          width="33.33%"
          //   style={{marginBottom: 7, margin: 7, borderRadius: 0}}
        />
        <TrendingVideo
          videoUri={uris[14].uri}
          idx={7}
          height={175}
          width="33.33%"
          //   style={{marginBottom: 7, margin: 7, borderRadius: 0}}
        />

        {/* <Grid>
          <Col>
            <Row>
              <TrendingVideo
                videoUri={uris[1].uri}
                idx={1}
                height={70}
                style={{marginVertical: 3}}
                width={90}
                poster="https://i.picsum.photos/id/766/175/300.jpg?hmac=rcadCENKh4rD6MAp6V_ma-AyWv641M4iiOpe1RyFHeI"
              />
            </Row>
            <Row>
              <TrendingVideo
                videoUri={uris[2].uri}
                idx={2}
                height={70}
                style={{marginVertical: 3}}
                width={90}
                poster="https://i.picsum.photos/id/766/175/300.jpg?hmac=rcadCENKh4rD6MAp6V_ma-AyWv641M4iiOpe1RyFHeI"
              />
            </Row>
          </Col>
          <Col>
            <Row>
              <TrendingVideo
                videoUri={uris[3].uri}
                idx={3}
                height={70}
                style={{marginVertical: 3}}
                width={70}
                poster="https://i.picsum.photos/id/766/175/300.jpg?hmac=rcadCENKh4rD6MAp6V_ma-AyWv641M4iiOpe1RyFHeI"
              />
            </Row>
            <Row>
              <TrendingVideo
                videoUri={uris[4].uri}
                idx={4}
                height={70}
                style={{marginVertical: 3}}
                width={70}
                poster="https://i.picsum.photos/id/766/175/300.jpg?hmac=rcadCENKh4rD6MAp6V_ma-AyWv641M4iiOpe1RyFHeI"
              />
            </Row>
          </Col>
        </Grid> */}
      </View>
      {/* <FlatList
        nestedScrollEnabled
        style={styles.list}
        data={uris}
        numColumns={2}
        renderItem={_renderItem}
        keyExtractor={(item) => item.key.toString()}
      /> */}
      {/* <Masonry
        itemsProvider={(pageSize = 7) => uris.slice(6, pageSize)}
        renderItem={Item}
        pageSize={7}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // paddingBottom: 20,
    // paddingTop: 20,
    // paddingLeft: 7,
    // margin: -25
    // left: 5,
    flex: 1,
    padding: 5,
  },
  topVideos: {
    // flexDirection: 'row',
    // flexWrap: 'wrap',
    // flex: 1,
    // alignItems: 'center',
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 0,
  },
});

export default Videos;
