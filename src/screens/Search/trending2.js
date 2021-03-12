import {coverer} from 'aws-amplify-react-native/dist/AmplifyUI';
import React, {Component, useState} from 'react';
import {View, Image, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import {FlatList, ScrollView} from 'react-native';
import convertToProxyURL from 'react-native-video-cache';
import styles from '../../components/Post/styles';
// import Video from 'react-native-af-video-player'
import VideoPlayer from 'react-native-video-player';
import Video from 'react-native-video';
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

const Some = () => {
  const [paused2, setPaused2] = useState(true);
  const [paused3, setPaused3] = useState(true);
  const [paused4, setPaused4] = useState(true);
  const [paused5, setPaused5] = useState(true);
  const [paused6, setPaused6] = useState(true);
  const [paused7, setPaused7] = useState(true);
  const [paused8, setPaused8] = useState(true);
  const [paused9, setPaused9] = useState(true);
  return (
    <>
      <View>
        <View
          style={{
            // flex: 1,
            width: 166,
            height: 257,
          }}>
          <Video
            muted={true}
            loop={true}
            // paused={true}
            source={{
              uri: convertToProxyURL(
                'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
              ),
            }}
            resizeMode="cover"
            style={StyleSheet.absoluteFill}
          />
        </View>
        <TouchableWithoutFeedback onPress={() => setPaused2(!paused2)}>
          <View
            style={{
              // flex: 1,
              width: 166,
              height: 173,
              top: 262,
            }}>
            <Video
              muted={false}
              paused={paused2}
              poster="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Big_Buck_Bunny_thumbnail_vlc.png/320px-Big_Buck_Bunny_thumbnail_vlc.png"
              posterResizeMode="cover"
              source={{
                uri: convertToProxyURL(
                  'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
                ),
              }}
              resizeMode="cover"
              style={StyleSheet.absoluteFill}
            />
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => setPaused3(!paused3)}>
          <View
            style={{
              // flex: 1,
              width: 166,
              height: 218,
              top: 442,
              position: 'absolute',
            }}>
            <Video
              muted={false}
              paused={paused3}
              poster="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Big_Buck_Bunny_thumbnail_vlc.png/320px-Big_Buck_Bunny_thumbnail_vlc.png"
              posterResizeMode="cover"
              source={{
                uri: convertToProxyURL(
                  'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
                ),
              }}
              resizeMode="cover"
              style={StyleSheet.absoluteFill}
            />
          </View>
        </TouchableWithoutFeedback>
      </View>

      <View style={{right: -5, top: 5}}>
        <TouchableWithoutFeedback onPress={() => setPaused4(!paused4)}>
          <View
            style={{
              // flex: 1,
              width: 103,
              height: 108,
              left: 171,
              position: 'absolute',
            }}>
            <Video
              muted={false}
              paused={paused4}
              poster="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Big_Buck_Bunny_thumbnail_vlc.png/320px-Big_Buck_Bunny_thumbnail_vlc.png"
              posterResizeMode="cover"
              source={{
                uri: convertToProxyURL(
                  'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
                ),
              }}
              resizeMode="cover"
              style={StyleSheet.absoluteFill}
            />
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => setPaused5(!paused5)}>
          <View
            style={{
              // flex: 1,
              width: 103,
              height: 108,
              left: 280,
              position: 'absolute',
            }}>
            <Video
              muted={false}
              paused={paused5}
              poster="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Big_Buck_Bunny_thumbnail_vlc.png/320px-Big_Buck_Bunny_thumbnail_vlc.png"
              posterResizeMode="cover"
              source={{
                uri: convertToProxyURL(
                  'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
                ),
              }}
              resizeMode="cover"
              style={StyleSheet.absoluteFill}
            />
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => setPaused6(!paused6)}>
          <View
            style={{
              // flex: 1,
              width: 103,
              height: 108,
              left: 171,
              top: 115,
              position: 'absolute',
            }}>
            <Video
              muted={false}
              paused={paused6}
              poster="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Big_Buck_Bunny_thumbnail_vlc.png/320px-Big_Buck_Bunny_thumbnail_vlc.png"
              posterResizeMode="cover"
              source={{
                uri: convertToProxyURL(
                  'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
                ),
              }}
              resizeMode="cover"
              style={StyleSheet.absoluteFill}
            />
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => setPaused7(!paused7)}>
          <View
            style={{
              // flex: 1,
              width: 103,
              height: 108,
              left: 280,
              top: 115,
              position: 'absolute',
            }}>
            <Video
              muted={false}
              paused={paused7}
              poster="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Big_Buck_Bunny_thumbnail_vlc.png/320px-Big_Buck_Bunny_thumbnail_vlc.png"
              posterResizeMode="cover"
              source={{
                uri: convertToProxyURL(
                  'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
                ),
              }}
              resizeMode="cover"
              style={StyleSheet.absoluteFill}
            />
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => setPaused8(!paused8)}>
          <View
            style={{
              // flex: 1,
              width: 215,
              height: 257,
              left: 171,
              top: 230,
              position: 'absolute',
            }}>
            <Video
              muted={false}
              paused={paused8}
              poster="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Big_Buck_Bunny_thumbnail_vlc.png/320px-Big_Buck_Bunny_thumbnail_vlc.png"
              posterResizeMode="cover"
              source={{
                uri: convertToProxyURL(
                  'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
                ),
              }}
              resizeMode="cover"
              style={StyleSheet.absoluteFill}
            />
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => setPaused9(!paused9)}>
          <View
            style={{
              // flex: 1,
              width: 215,
              height: 166,
              left: 171,
              top: 495,
              position: 'absolute',
            }}>
            <Video
              muted={false}
              paused={paused9}
              poster="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Big_Buck_Bunny_thumbnail_vlc.png/320px-Big_Buck_Bunny_thumbnail_vlc.png"
              posterResizeMode="cover"
              source={{
                uri: convertToProxyURL(
                  'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
                ),
              }}
              resizeMode="cover"
              style={StyleSheet.absoluteFill}
            />
          </View>
        </TouchableWithoutFeedback>
      </View>
    </>
  );
};

const Trending = () => {
  const [videoUris, setVideoUris] = useState(uris);
  const [paused, setPaused] = useState(true);
  const [paused2, setPaused2] = useState(true);
  const [paused3, setPaused3] = useState(true);
  const [paused4, setPaused4] = useState(true);
  const [paused5, setPaused5] = useState(true);
  const [paused6, setPaused6] = useState(true);
  const [paused7, setPaused7] = useState(true);
  const [paused8, setPaused8] = useState(true);
  const [paused9, setPaused9] = useState(true);
  const onPlayPausePress = () => {
    setPaused(!paused);
  };

  // console.log('Legth', videoUris.length);
  const _renderItem = ({item, index}) => (
    <TrendingVideo videoUri={item.uri} idx={index} />
  );

  return (
    <View
      style={{
        backgroundColor: '#20232A',
      }}>
      <View style={{top: 130}}>
        <FlatList
          nestedScrollEnabled
          ListHeaderComponent={<Some />}
          style={{flex: 0}}
          data={videoUris}
          numColumns={3}
          renderItem={_renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </View>
  );
};

export default Trending;
