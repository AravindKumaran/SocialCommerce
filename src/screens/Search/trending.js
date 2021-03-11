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

const videoUris = [
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
];

const Trending = () => {
  const [paused, setPaused] = useState(false);
  const onPlayPausePress = () => {
    setPaused(!paused);
  };

  const _renderItem = ({item, index}) => (
    <TrendingVideo videoUri={item.uri} idx={index} />
  );

  return (
    <View >
      <View
        style={{
          flex: -1,
          top: 150,
          backgroundColor: '#20232A',
        }}>
        <View style={{left: 5, top: 5}}>
          <View
            style={{
              // flex: 1,
              width: 166,
              height: 257,
              position: 'absolute',
            }}>
            <Video
              muted={true}
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
          <View
            style={{
              // flex: 1,
              width: 166,
              height: 173,
              top: 262,
              position: 'absolute',
            }}>
            <Video
              muted={true}
              source={{
                uri: convertToProxyURL(
                  'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
                ),
              }}
              resizeMode="cover"
              style={StyleSheet.absoluteFill}
            />
          </View>

          <View
            style={{
              // flex: 1,
              width: 166,
              height: 120,
              top: 442,
              position: 'absolute',
            }}>
            <Video
              muted={true}
              source={{
                uri: convertToProxyURL(
                  'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
                ),
              }}
              resizeMode="cover"
              style={StyleSheet.absoluteFill}
            />
          </View>

        </View>

        <View style={{right: -5, top: 5}}>
          <View
            style={{
              // flex: 1,
              width: 103,
              height: 108,
              left: 171,
              position: 'absolute',
            }}>
            <Video
              muted={true}
              source={{
                uri: convertToProxyURL(
                  'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
                ),
              }}
              resizeMode="cover"
              style={StyleSheet.absoluteFill}
            />
          </View>

          <View
            style={{
              // flex: 1,
              width: 103,
              height: 108,
              left: 280,
              position: 'absolute',
            }}>
            <Video
              muted={true}
              source={{
                uri: convertToProxyURL(
                  'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
                ),
              }}
              resizeMode="cover"
              style={StyleSheet.absoluteFill}
            />
          </View>

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
              muted={true}
              source={{
                uri: convertToProxyURL(
                  'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
                ),
              }}
              resizeMode="cover"
              style={StyleSheet.absoluteFill}
            />
          </View>

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
              muted={true}
              source={{
                uri: convertToProxyURL(
                  'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
                ),
              }}
              resizeMode="cover"
              style={StyleSheet.absoluteFill}
            />
          </View>

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
              muted={true}
              source={{
                uri: convertToProxyURL(
                  'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
                ),
              }}
              resizeMode="cover"
              style={StyleSheet.absoluteFill}
            />
          </View>

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
              muted={true}
              source={{
                uri: convertToProxyURL(
                  'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
                ),
              }}
              resizeMode="cover"
              style={StyleSheet.absoluteFill}
            />
          </View>
        </View>

        <View style={{top: 700}}>
          <FlatList
            data={videoUris}
            renderItem={_renderItem}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
      </View>
    </View>
  );
};

export default Trending;