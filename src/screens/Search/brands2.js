import {coverer} from 'aws-amplify-react-native/dist/AmplifyUI';
import React, {Component, useState} from 'react';
import {View, Image, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import {FlatList, ScrollView, SafeAreaView} from 'react-native';
import styles from '../../components/Post/styles';
// import Video from 'react-native-af-video-player'
import VideoPlayer from 'react-native-video-player';
import Video from 'react-native-video';
import convertToProxyURL from 'react-native-video-cache';
import TrendingVideo from './trendingVideo';

const uris = [
  {
    id: 1,
    uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
  },
  {
    id: 2,
    uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
  },
  {
    id: 3,
    uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
  },
  {
    id: 4,
    uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
  },
  {
    id: 5,
    uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
  },
  {
    id: 6,
    uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
  },
  {
    id: 7,
    uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
  },
  {
    id: 8,
    uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
  },
  {
    id: 9,
    uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
  },
  {
    id: 10,
    uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
  },
  {
    id: 11,
    uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
  },
  {
    id: 12,
    uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
  },
  {
    id: 13,
    uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
  },
  {
    id: 14,
    uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
  },
  {
    id: 15,
    uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
  },
  // {
  //   id: 16,
  //   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
  // },
  // {
  //   id: 17,
  //   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
  // },
  // {
  //   id: 18,
  //   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
  // },
  // {
  //   id: 19,
  //   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
  // },
  // {
  //   id: 20,
  //   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
  // },
  // {
  //   id: 21,
  //   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
  // },
  // {
  //   id: 22,
  //   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
  // },
  // {
  //   id: 23,
  //   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
  // },
  // {
  //   id: 24,
  //   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
  // },
  // {
  //   id: 25,
  //   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
  // },
  // {
  //   id: 26,
  //   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
  // },
  // {
  //   id: 27,
  //   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
  // },
  // {
  //   id: 28,
  //   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
  // },
  // {
  //   id: 29,
  //   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
  // },
  // {
  //   id: 30,
  //   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
  // },
  // {
  //   id: 31,
  //   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
  // },
  // {
  //   id: 32,
  //   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
  // },
  // {
  //   id: 33,
  //   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
  // },
  // {
  //   id: 34,
  //   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
  // },
  // {
  //   id: 35,
  //   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
  // },
  // {
  //   id: 36,
  //   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
  // },
  // {
  //   id: 37,
  //   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
  // },
  // {
  //   id: 38,
  //   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
  // },
  // {
  //   id: 39,
  //   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
  // },
  // {
  //   id: 40,
  //   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
  // },
  // {
  //   id: 41,
  //   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
  // },
  // {
  //   id: 42,
  //   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
  // },
  // {
  //   id: 43,
  //   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
  // },
  // {
  //   id: 44,
  //   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
  // },
  // {
  //   id: 45,
  //   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
  // },
  // {
  //   id: 46,
  //   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
  // },
  // {
  //   id: 47,
  //   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
  // },
  // {
  //   id: 48,
  //   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
  // },
  // {
  //   id: 49,
  //   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
  // },
  // {
  //   id: 50,
  //   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
  // },
  // {
  //   id: 51,
  //   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
  // },
  // {
  //   id: 52,
  //   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
  // },
  // {
  //   id: 53,
  //   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
  // },
  // {
  //   id: 54,
  //   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
  // },
  // {
  //   id: 55,
  //   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
  // },
  // {
  //   id: 56,
  //   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
  // },
  // {
  //   id: 57,
  //   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
  // },
  // {
  //   id: 58,
  //   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
  // },
  // {
  //   id: 59,
  //   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
  // },
  // {
  //   id: 60,
  //   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
  // },
  // {
  //   id: 61,
  //   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
  // },
  // {
  //   id: 62,
  //   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
  // },
  // {
  //   id: 63,
  //   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
  // },
  // {
  //   id: 64,
  //   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
  // },
  // {
  //   id: 65,
  //   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
  // },
  // {
  //   id: 66,
  //   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
  // },
  // {
  //   id: 67,
  //   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
  // },
  // {
  //   id: 68,
  //   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
  // },
  // {
  //   id: 69,
  //   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
  // },
  // {
  //   id: 70,
  //   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
  // },
  // {
  //   id: 71,
  //   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
  // },
  // {
  //   id: 72,
  //   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
  // },
  // {
  //   id: 73,
  //   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
  // },
  // {
  //   id: 74,
  //   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
  // },
  // {
  //   id: 75,
  //   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
  // },
  // {
  //   id: 76,
  //   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
  // },
  // {
  //   id: 77,
  //   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
  // },
  // {
  //   id: 78,
  //   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
  // },
  // {
  //   id: 79,
  //   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
  // },
  // {
  //   id: 80,
  //   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
  // },
  // {
  //   id: 81,
  //   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
  // },
  // {
  //   id: 82,
  //   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
  // },
  // {
  //   id: 83,
  //   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
  // },
  // {
  //   id: 84,
  //   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
  // },
  // {
  //   id: 85,
  //   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
  // },
  // {
  //   id: 86,
  //   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
  // },
  // {
  //   id: 87,
  //   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
  // },
  // {
  //   id: 88,
  //   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
  // },
  // {
  //   id: 89,
  //   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
  // },
  // {
  //   id: 90,
  //   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
  // },
  // {
  //   id: 91,
  //   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
  // },
  // {
  //   id: 92,
  //   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
  // },
  // {
  //   id: 93,
  //   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
  // },
  // {
  //   id: 94,
  //   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
  // },
  // {
  //   id: 95,
  //   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
  // },
  // {
  //   id: 96,
  //   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
  // },
  // {
  //   id: 97,
  //   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
  // },
  // {
  //   id: 98,
  //   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
  // },
  // {
  //   id: 99,
  //   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
  // },
  // {
  //   id: 100,
  //   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
  // },
  // {
  //   id: 101,
  //   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
  // },
];

const Brands = () => {
  const [paused, setPaused] = useState(false);
  const [videoUris, setVideoUris] = useState(uris);
  const onPlayPausePress = () => {
    setPaused(!paused);
  };

  const _renderItem = ({item, index}) => (
    <TrendingVideo videoUri={item.uri} idx={index} />
  );

  return (
    // <SafeAreaView style={{flex: 1}}>
    //   <ScrollView >
    <View
      style={{
        flex: 1,
        width: 400,
        height: 400,
        top: 150,
        backgroundColor: '#20232A',
      }}>
      <View style={{left: 5, top: 5}}>
        {/* <TouchableWithoutFeedback onPress={onPlayPausePress}> */}
        <View
          style={{
            flex: 1,
            width: 166,
            height: 257,
            position: 'absolute',
            // backgroundColor: 'red'
          }}>
          <Video
            muted={true}
            repeat={false}
            // paused={true}
            // thumbnail={{ uri: 'https://th.bing.com/th/id/OPA.0wlIXou2gXpavQ474C474?w=160&h=220&rs=1&o=5&dpr=1.25&pid=21.1' }}
            source={{
              uri: convertToProxyURL(
                'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
              ),
            }}
            resizeMode="cover"
            style={StyleSheet.absoluteFill}
          />

          {/* <Image source={require('../../assets/images/R1.png')} />  */}
        </View>
        {/* </TouchableWithoutFeedback> */}
        <View
          style={{
            flex: 1,
            width: 166,
            height: 173,
            top: 262,
            position: 'absolute',
            // backgroundColor: 'pink'
          }}>
          <Video
            muted={true}
            source={{
              uri: convertToProxyURL(
                'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
              ),
            }}
            resizeMode="cover"
            style={StyleSheet.absoluteFill}
          />
          {/* <Image source={require('../../assets/images/R2.png')} />  */}
        </View>

        <View
          style={{
            flex: 1,
            width: 166,
            height: 120,
            top: 442,
            position: 'absolute',
            // backgroundColor: 'yellow'
          }}>
          <Video
            muted={true}
            source={{
              uri: convertToProxyURL(
                'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
              ),
            }}
            resizeMode="cover"
            style={StyleSheet.absoluteFill}
          />
          {/* <Image source={require('../../assets/images/R3.png')} />  */}
        </View>
      </View>

      <View style={{right: -5, top: 5}}>
        <View
          style={{
            flex: 1,
            width: 103,
            height: 108,
            left: 171,
            position: 'absolute',
            // backgroundColor: 'orange'
          }}>
          <Video
            muted={true}
            source={{
              uri: convertToProxyURL(
                'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
              ),
            }}
            resizeMode="cover"
            style={StyleSheet.absoluteFill}
          />
          {/* <Image source={require('../../assets/images/R4.png')} />  */}
        </View>

        <View
          style={{
            flex: 1,
            width: 103,
            height: 108,
            left: 280,
            position: 'absolute',
            // backgroundColor: 'green'
          }}>
          <Video
            muted={true}
            source={{
              uri: convertToProxyURL(
                'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
              ),
            }}
            resizeMode="cover"
            style={StyleSheet.absoluteFill}
          />
          {/* <Image source={require('../../assets/images/R5.png')} />  */}
        </View>

        <View
          style={{
            flex: 1,
            width: 103,
            height: 108,
            left: 171,
            top: 115,
            position: 'absolute',
            // backgroundColor: 'black'
          }}>
          <Video
            muted={true}
            source={{
              uri: convertToProxyURL(
                'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4',
              ),
            }}
            resizeMode="cover"
            style={StyleSheet.absoluteFill}
          />
          {/* <Image source={require('../../assets/images/R6.png')} />  */}
        </View>

        <View
          style={{
            flex: 1,
            width: 103,
            height: 108,
            left: 280,
            top: 115,
            position: 'absolute',
            // backgroundColor: 'violet'
          }}>
          <Video
            muted={true}
            source={{
              uri: convertToProxyURL(
                'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
              ),
            }}
            resizeMode="cover"
            style={StyleSheet.absoluteFill}
          />
          {/* <Image source={require('../../assets/images/R7.png')} />  */}
        </View>

        <View
          style={{
            flex: 1,
            width: 215,
            height: 257,
            left: 171,
            top: 230,
            position: 'absolute',
            // backgroundColor: 'purple'
          }}>
          <Video
            muted={true}
            source={{
              uri: convertToProxyURL(
                'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
              ),
            }}
            resizeMode="cover"
            style={StyleSheet.absoluteFill}
          />
          {/* <Image source={require('../../assets/images/R8.png')} />  */}
        </View>

        <View
          style={{
            flex: 1,
            width: 215,
            height: 166,
            left: 171,
            top: 495,
            position: 'absolute',
            // backgroundColor: 'grey'
          }}>
          <Video
            muted={true}
            source={{
              uri: convertToProxyURL(
                'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
              ),
            }}
            resizeMode="cover"
            style={StyleSheet.absoluteFill}
          />
          {/* <Image source={require('../../assets/images/R8.png')} />  */}
        </View>
      </View>
      <View style={{top: 70}}>
        <FlatList
          style={{flex: 0}}
          data={videoUris}
          numColumns={3}
          renderItem={_renderItem}
          initialNumToRender={videoUris.length}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </View>
    //   </ScrollView>
    // </SafeAreaView>
  );
};

export default Brands;
