import React, {useState} from 'react';

import {StyleSheet, View, Text, TouchableWithoutFeedback} from 'react-native';
import Video from 'react-native-video';
import DoubleClick from 'react-native-double-tap';
import convertToProxyURL from 'react-native-video-cache';

const TrendingVideo = ({videoUri, idx}) => {
  const [paused, setPaused] = useState(true);

  const handleClick = () => {
    console.log('Clicked');
    setPaused(!paused);
  };

  return (
    <DoubleClick singleTap={handleClick}>
      <Video
        //   ref={(ref) => (vidRef.current = ref)}
        source={{uri: convertToProxyURL(videoUri)}}
        style={styles.video}
        resizeMode={'cover'}
        poster="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Big_Buck_Bunny_thumbnail_vlc.png/320px-Big_Buck_Bunny_thumbnail_vlc.png"
        posterResizeMode="cover"
        //   repeat={props.currentIndex === 0}
        paused={paused}
        muted={false}

        //   muted={muted}
        // controls={true}
      />
    </DoubleClick>
  );
};

const styles = StyleSheet.create({
  video: {
    width: 123.5,
    height: 150,
    margin: 3,
    left: 2,
    marginBottom: 5,
    // marginEnd: -5
    // zIndex: -1
  },
});

export default TrendingVideo;
