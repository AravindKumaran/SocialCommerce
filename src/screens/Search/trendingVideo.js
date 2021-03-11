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
        <DoubleClick singleTap={handleClick}>
          <Video
            //   ref={(ref) => (vidRef.current = ref)}
            source={{uri: convertToProxyURL(videoUri)}}
            style={styles.video}
            resizeMode={'cover'}
            //   repeat={props.currentIndex === 0}
            paused={paused}
            //   muted={muted}
            // controls={true}
          />
        </DoubleClick>
    </View>
  );
};

const styles = StyleSheet.create({
  video: {
    width: 123.5,
    height: 150,
    margin: 3,
    left: 2,
    marginBottom: 5
    // marginEnd: -5
    // zIndex: -1
  },
});

export default TrendingVideo;
