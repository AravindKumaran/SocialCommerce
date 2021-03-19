import React, {useRef, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {RNCamera} from 'react-native-camera';
import RNVideoHelper from 'react-native-video-helper';
import {ProcessingManager} from 'react-native-video-processing';

import styles from './styles';
import awaitAsyncGenerator from '@babel/runtime/helpers/esm/awaitAsyncGenerator';
import {useNavigation} from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';

const Camera = () => {
  const [isRecording, setIsRecording] = useState(false);
  const camera = useRef();

  const navigation = useNavigation();

  const onRecord = async () => {
    if (isRecording) {
      camera.current.stopRecording();
    } else {
      const data = await camera.current.recordAsync();
      console.log('Data', data);
      navigation.navigate('CreatePost', {videoUri: data.uri});
      // ProcessingManager.getVideoInfo(data.uri).then((stats) =>
      //   console.log('Before', stats),
      // );
      // const options = {width: 720, height: 1280, bitrateMultiplier: 3};
      // const lat = '';
      // ProcessingManager.compress(data.uri, options) // like VideoPlayer compress options
      //   .then((data) => {
      //     navigation.navigate('CreatePost', {videoUri: data.source});
      //     ProcessingManager.getVideoInfo(data.source).then((stats) =>
      //       console.log('After', stats),
      //     );
      //     console.log(data);
      //   });
    }
  };

  return (
    <View style={styles.container}>
      <RNCamera
        ref={camera}
        onRecordingStart={() => setIsRecording(true)}
        onRecordingEnd={() => setIsRecording(false)}
        style={styles.preview}
      />
      <TouchableOpacity
        onPress={onRecord}
        style={isRecording ? styles.buttonStop : styles.buttonRecord}
      />
      <TouchableOpacity style={styles.gallery}>
        <Feather name="image" size={30} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

export default Camera;
