import React, {useState} from 'react';

import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import Video from 'react-native-video';
import DoubleClick from 'react-native-double-tap';
import convertToProxyURL from 'react-native-video-cache';

const vpHeight = Dimensions.get('window').height;
const vpWidth = Dimensions.get('window').width;

function randomIntFromInterval(min, max) {
  //  const   width = parseInt(Math.max(0.3, Math.random()) * vpHeight),
  //  const height = parseInt(Math.max(0.3, Math.random()) * vpWidth),
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const TrendingVideo = ({videoUri, idx, height, poster, width, style}) => {
  const [paused, setPaused] = useState(true);

  const handleClick = () => {
    console.log('Clicked');
    setPaused(!paused);
  };

  return (
    <DoubleClick singleTap={handleClick}>
      <Video
        source={{uri: convertToProxyURL(videoUri)}}
        style={[
          {
            width: width || vpWidth * 0.5 - 15,
            height: height,
            margin: 3,
            elevation: 5,
            borderRadius: 5,
          },
          style,
        ]}
        resizeMode={'cover'}
        poster={
          poster
            ? poster
            : 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Big_Buck_Bunny_thumbnail_vlc.png/320px-Big_Buck_Bunny_thumbnail_vlc.png'
        }
        posterResizeMode="cover"
        repeat={idx === 0}
        paused={idx === 0 ? false : paused}
        muted={false}
        muted={idx === 0}
      />
    </DoubleClick>
  );
};

const styles = StyleSheet.create({
  video: {
    width: 143.5,
    height: 150,
    margin: 3,
  },
});

export default TrendingVideo;
