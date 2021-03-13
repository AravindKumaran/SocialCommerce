import React from 'react';

import {StyleSheet, View, Text, FlatList, Dimensions} from 'react-native';
import TrendingVideo from './trendingVideo';
import Masonry from 'react-native-infinite-masonry';
import {Col, Row, Grid} from 'react-native-easy-grid';

const vpHeight = Dimensions.get('window').height;
const vpWidth = Dimensions.get('window').width;

const uris = [
  {
    key: 1,
    uri:
      'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    height: parseInt(Math.max(0.3, Math.random()) * vpWidth),
  },
  {
    key: 2,
    uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
    height: parseInt(Math.max(0.3, Math.random()) * vpWidth),
  },
  {
    key: 3,
    uri:
      'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    height: parseInt(Math.max(0.3, Math.random()) * vpWidth),
  },
  {
    key: 4,
    uri:
      'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    height: parseInt(Math.max(0.3, Math.random()) * vpWidth),
  },
  {
    key: 5,
    uri:
      'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    height: parseInt(Math.max(0.3, Math.random()) * vpWidth),
  },
  {
    key: 6,
    uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
    height: parseInt(Math.max(0.3, Math.random()) * vpWidth),
  },
  {
    key: 7,
    uri:
      'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    height: parseInt(Math.max(0.3, Math.random()) * vpWidth),
  },
  {
    key: 8,
    uri:
      'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4',
    height: parseInt(Math.max(0.3, Math.random()) * vpWidth),
  },
  {
    key: 9,
    uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
    height: parseInt(Math.max(0.3, Math.random()) * vpWidth),
  },
  {
    key: 10,
    uri:
      'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    height: parseInt(Math.max(0.3, Math.random()) * vpWidth),
  },
  {
    key: 11,
    uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
    height: parseInt(Math.max(0.3, Math.random()) * vpWidth),
  },
  {
    key: 12,
    uri:
      'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    height: parseInt(Math.max(0.3, Math.random()) * vpWidth),
  },
  {
    key: 13,
    uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
    height: parseInt(Math.max(0.3, Math.random()) * vpWidth),
  },
  {
    key: 14,
    uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
    height: parseInt(Math.max(0.3, Math.random()) * vpWidth),
  },
  {
    key: 15,
    uri:
      'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    height: parseInt(Math.max(0.3, Math.random()) * vpWidth),
  },
  {
    key: 16,
    uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
    height: parseInt(Math.max(0.3, Math.random()) * vpWidth),
  },
  {
    key: 17,
    uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
    height: parseInt(Math.max(0.3, Math.random()) * vpWidth),
  },
  {
    key: 18,
    uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
    height: parseInt(Math.max(0.3, Math.random()) * vpWidth),
  },
  {
    key: 19,
    uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
    height: parseInt(Math.max(0.3, Math.random()) * vpWidth),
  },
  {
    key: 20,
    uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
    height: parseInt(Math.max(0.3, Math.random()) * vpWidth),
  },
  {
    key: 21,
    uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
    height: parseInt(Math.max(0.3, Math.random()) * vpWidth),
  },
  {
    key: 22,
    uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
    height: parseInt(Math.max(0.3, Math.random()) * vpWidth),
  },
  {
    key: 23,
    uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
    height: parseInt(Math.max(0.3, Math.random()) * vpWidth),
  },
  {
    key: 24,
    uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
    height: parseInt(Math.max(0.3, Math.random()) * vpWidth),
  },
  {
    key: 25,
    uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
    height: parseInt(Math.max(0.3, Math.random()) * vpWidth),
  },
  {
    key: 26,
    uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
    height: parseInt(Math.max(0.3, Math.random()) * vpWidth),
  },
  {
    key: 27,
    uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
    height: parseInt(Math.max(0.3, Math.random()) * vpWidth),
  },
  {
    key: 28,
    uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
    height: parseInt(Math.max(0.3, Math.random()) * vpWidth),
  },
  {
    key: 29,
    uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
    height: parseInt(Math.max(0.3, Math.random()) * vpWidth),
  },
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
  //   key: 38,
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
  //   key: 48,
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
  //   key: 58,
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
  //   key: 68,
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
  //   key: 78,
  //   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
  //   height: parseInt(Math.max(0.3, Math.random()) * vpWidth),
  // },
  // {
  //   key: 79,
  //   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
  //   height: parseInt(Math.max(0.3, Math.random()) * vpWidth),
  // },
  // {
  //   key: 80,
  //   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
  //   height: parseInt(Math.max(0.3, Math.random()) * vpWidth),
  // },
  // {
  //   key: 81,
  //   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
  //   height: parseInt(Math.max(0.3, Math.random()) * vpWidth),
  // },
  // {
  //   key: 82,
  //   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
  //   height: parseInt(Math.max(0.3, Math.random()) * vpWidth),
  // },
  // {
  //   key: 83,
  //   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
  //   height: parseInt(Math.max(0.3, Math.random()) * vpWidth),
  // },
  // {
  //   key: 84,
  //   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
  //   height: parseInt(Math.max(0.3, Math.random()) * vpWidth),
  // },
  // {
  //   key: 85,
  //   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
  //   height: parseInt(Math.max(0.3, Math.random()) * vpWidth),
  // },
  // {
  //   key: 86,
  //   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
  //   height: parseInt(Math.max(0.3, Math.random()) * vpWidth),
  // },
  // {
  //   key: 87,
  //   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
  //   height: parseInt(Math.max(0.3, Math.random()) * vpWidth),
  // },
  // {
  //   key: 88,
  //   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
  //   height: parseInt(Math.max(0.3, Math.random()) * vpWidth),
  // },
  // {
  //   key: 89,
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
  //   key: 98,
  //   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
  //   height: parseInt(Math.max(0.3, Math.random()) * vpWidth),
  // },
  // {
  //   key: 99,
  //   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
  //   height: parseInt(Math.max(0.3, Math.random()) * vpWidth),
  // },
  // {
  //   key: 100,
  //   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
  //   height: parseInt(Math.max(0.3, Math.random()) * vpWidth),
  // },
  // {
  //   key: 101,
  //   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
  //   height: parseInt(Math.max(0.3, Math.random()) * vpWidth),
  // },
];

const Brands = () => {
  const _renderItem = ({item, index}) => (
    <TrendingVideo
      videoUri={item.uri}
      idx={index}
      height={item.height}
      poster="https://i.picsum.photos/id/866/200/300.jpg?hmac=rcadCENKh4rD6MAp6V_ma-AyWv641M4iiOpe1RyFHeI"
    />
  );

  const Item = (dataItem, key) => {
    return (
      <TrendingVideo
        key={key}
        videoUri={dataItem.uri}
        // idx={key}
        height={dataItem.height}
        poster="https://i.picsum.photos/id/866/200/300.jpg?hmac=rcadCENKh4rD6MAp6V_ma-AyWv641M4iiOpe1RyFHeI"
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
        <TrendingVideo videoUri={uris[0].uri} idx={0} height={200} />
        <Grid>
          <Col>
            <Row>
              <TrendingVideo
                videoUri={uris[1].uri}
                idx={1}
                height={100}
                style={{marginVertical: 3}}
                width={90}
                poster="https://i.picsum.photos/id/866/200/300.jpg?hmac=rcadCENKh4rD6MAp6V_ma-AyWv641M4iiOpe1RyFHeI"
              />
            </Row>
            <Row>
              <TrendingVideo
                videoUri={uris[2].uri}
                idx={2}
                height={100}
                style={{marginVertical: 3}}
                width={90}
                poster="https://i.picsum.photos/id/866/200/300.jpg?hmac=rcadCENKh4rD6MAp6V_ma-AyWv641M4iiOpe1RyFHeI"
              />
            </Row>
          </Col>
          <Col>
            <Row>
              <TrendingVideo
                videoUri={uris[3].uri}
                idx={3}
                height={100}
                style={{marginVertical: 3}}
                width={80}
                poster="https://i.picsum.photos/id/866/200/300.jpg?hmac=rcadCENKh4rD6MAp6V_ma-AyWv641M4iiOpe1RyFHeI"
              />
            </Row>
            <Row>
              <TrendingVideo
                videoUri={uris[4].uri}
                idx={4}
                height={100}
                style={{marginVertical: 3}}
                width={80}
                poster="https://i.picsum.photos/id/866/200/300.jpg?hmac=rcadCENKh4rD6MAp6V_ma-AyWv641M4iiOpe1RyFHeI"
              />
            </Row>
          </Col>
        </Grid>
      </View>
      {/* <FlatList
        nestedScrollEnabled
        style={styles.list}
        data={uris}
        numColumns={2}
        renderItem={_renderItem}
        keyExtractor={(item) => item.key.toString()}
      /> */}
      <Masonry
        itemsProvider={(pageSize = 10) => uris.slice(6, pageSize)}
        renderItem={Item}
        pageSize={10}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 70,
    paddingTop: 20,
    paddingLeft: 10,
  },
  topVideos: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
    // alignItems: 'center',
  },
});

export default Brands;
