import React, {useState} from 'react';

import {StyleSheet, View, Text} from 'react-native';
import Video from 'react-native-video';
import DoubleClick from 'react-native-double-tap';
import convertToProxyURL from 'react-native-video-cache';

const TrendingVideo = ({videoUri, idx}) => {
  const [paused, setPaused] = useState(false);

  const handleClick = () => {
    setPaused(!paused);
  };

  return (
    <View>
      <Text>Helo</Text>
      {/* <DoubleClick singleTap={handleClick}>
        <Video
          //   ref={(ref) => (vidRef.current = ref)}
          source={{uri: convertToProxyURL(videoUri)}}
          style={[styles.video, idx % 2 !== 0 && {height: 200}]}
          resizeMode={'cover'}
          //   repeat={props.currentIndex === 0}
          paused={paused}
          //   muted={muted}
          // controls={true}
        />
      </DoubleClick> */}
    </View>
  );
};

const styles = StyleSheet.create({
  video: {
    width: 150,
    height: 100,
    // marginTop: 10,
  },
});

export default TrendingVideo;
