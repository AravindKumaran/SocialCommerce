import React, {useRef, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {ProcessingManager} from 'react-native-video-processing';

import styles from './styles';
import {useNavigation} from '@react-navigation/native';
import LoadingIndicator from '../../components/Common/LoadingIndicator';
import Feather from 'react-native-vector-icons/Feather';

const Camera = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [compressing, setCompressing] = useState(false);
  const camera = useRef();

  const navigation = useNavigation();

  const onRecord = async () => {
    if (isRecording) {
      camera.current.stopRecording();
    } else {
      const data = await camera.current.recordAsync();
      ProcessingManager.getVideoInfo(data.uri).then((stats) =>
        console.log('Before', stats),
      );
      const options = {width: 360, height: 480};
      setCompressing(true);
      ProcessingManager.compress(data.uri, options).then((d) => {
        ProcessingManager.getVideoInfo(d.source).then((stats) =>
          console.log('After', stats),
        );
        console.log('data2', d.source);
        setCompressing(false);
        navigation.navigate('CreatePost', {
          videoUri: d.source,
        });
      });
    }
  };

  return (
    <View style={styles.container}>
      {compressing && <LoadingIndicator visible={compressing} />}
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
