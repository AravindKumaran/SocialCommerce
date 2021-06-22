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
import {S3_URL} from '@env';

const vpHeight = Dimensions.get('window').height;
const vpWidth = Dimensions.get('window').width;

const TrendingVideo = ({
  videoUri,
  item,
  idx,
  poster,
  style,
  isProfile,
  isCategory,
  isSeeProfile,
  data,
  muted,
  props,
}) => {
  const [paused, setPaused] = useState(true);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const navigation = useNavigation();

  const onSeeking = (currentVideoTime) => setCurrentTime(currentVideoTime);

  const handleClick = () => {
    console.log('Clicked');
    console.log('isCategory', isCategory);
    if (isProfile) {
      navigation.navigate('ProfileVideoList', {idx, item, data});
    } else if (isCategory) {
      navigation.navigate('TrendingVideoList', {idx, item, data, isCategory});
    }else if (isSeeProfile) {
      navigation.navigate('SeeProfileVideoList', {idx, item, data});
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
              : `${S3_URL}${videoUri}`,
          ),
        }}
        style={[
          {
            width: vpWidth * 0.33,
            // height: fullScreen ? vpHeight - 80 : height,
            height: 200,
            margin: 2,
            elevation: 5,
            // borderRadius: 4,
          },
          style,
        ]}
        resizeMode={'cover'}
        poster={
          poster
            ? poster.startsWith('https')
              ? poster
              : `${S3_URL}${poster}`
            : 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Big_Buck_Bunny_thumbnail_vlc.png/320px-Big_Buck_Bunny_thumbnail_vlc.png'
        }
        posterResizeMode="cover"
        repeat={idx === 0}
        paused={idx !== 0}
        muted={props?.muteAll || muted || true}
        onProgress={onProgress}
        onLoad={onLoad}
      />
    </DoubleClick>
  );
};

const styles = StyleSheet.create({
  slider: {
    marginHorizontal: 10,
  },
});

export default TrendingVideo;
