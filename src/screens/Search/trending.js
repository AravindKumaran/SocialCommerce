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
    <View>
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
              paused={true}
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

          <View
            style={{
              // flex: 1,
              width: 166,
              height: 218,
              top: 442,
              position: 'absolute',
            }}>
            <Video
              muted={true}
              paused={true}
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
              paused={true}
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
              paused={true}
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
              paused={true}
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
              paused={true}
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
              paused={true}
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
              paused={true}
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
        </View>

        <View style={{top: 670}}>
          <FlatList
            data={videoUris}
            numColumns={3}
            renderItem={_renderItem}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
      </View>
    </View>
  );
};

export default Trending;
