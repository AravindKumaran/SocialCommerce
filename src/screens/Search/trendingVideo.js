import React, {useState} from 'react';

import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  Dimensions,
  Modal,
  Image,
} from 'react-native';
import Video from 'react-native-video';
import DoubleClick from 'react-native-double-tap';
import convertToProxyURL from 'react-native-video-cache';
import Slider from '../../components/Post/slider';
import {useNavigation} from '@react-navigation/native';

const vpHeight = Dimensions.get('window').height;
const vpWidth = Dimensions.get('window').width;

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const TrendingVideo = ({
  videoUri,
  idx,
  height,
  poster,
  width,
  style,
  fullScreen,
  onFullScreen,
  curIdx,
}) => {
  const [paused, setPaused] = useState(true);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();
  // console.log('Video', videoUri);

  const onSeeking = (currentVideoTime) => setCurrentTime(currentVideoTime);

  const handleClick = () => {
    // console.log('Clicked');
    // setPaused(!paused);
    if (!fullScreen) {
      // onFullScreen(idx);
      navigation.navigate('Home', {idx});
    }
  };

  const onProgress = (data) => {
    if (!isLoading) {
      setCurrentTime(data.currentTime);
    }
  };

  const onLoad = (data) => {
    setDuration(Math.round(data.duration));
    setIsLoading(false);
  };

  return (
    <DoubleClick singleTap={handleClick}>
      <Video
        source={{
          uri: convertToProxyURL(
            videoUri.startsWith('https')
              ? videoUri
              : `https://tiktok23f096015e564dd1964361d5c47fb832221214-demo.s3.us-east-2.amazonaws.com/public/${videoUri}`,
          ),
        }}
        style={[
          {
            width: fullScreen ? vpWidth - 10 : vpWidth * 0.33,
            // height: fullScreen ? vpHeight - 80 : height,
            height: 200,
            margin: 2.5,
            elevation: 5,
            marginLeft: fullScreen ? 5 : 0,
            marginBottom: fullScreen ? 5 : 0,
            borderRadius: fullScreen ? 10 : 4,
            // position: 'absolute',
            // top: 0,
            // left: 0,
            // right: 0,
            // bottom: 0,
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
        repeat={!fullScreen ? idx === 0 : false}
        paused={
          fullScreen
            ? idx === curIdx
              ? !paused
              : paused
            : idx === 0
            ? false
            : paused
        }
        muted={!fullScreen ? idx === 0 : false}
        onProgress={onProgress}
        onLoad={onLoad}
      />

      <Text
        style={{
          color: '#000',
          position: 'absolute',
          top: 30,
          zIndex: 1,
        }}>
        Hello
      </Text>

      {fullScreen ? (
        <Slider
          minimumValue={0}
          maximumValue={duration}
          minimumTrackTintColor="red"
          maximumTrackTintColor="#292929"
          thumbTintColor="white"
          step={1}
          value={currentTime}
          onValueChange={onSeeking}
          style={styles.slider}
        />
      ) : null}
    </DoubleClick>
  );
};

const styles = StyleSheet.create({
  slider: {
    marginHorizontal: 10,
  },
});

export default TrendingVideo;
