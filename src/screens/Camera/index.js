import React, {useRef, useState} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {ProcessingManager} from 'react-native-video-processing';

import styles from './styles';
import {useNavigation} from '@react-navigation/native';
import LoadingIndicator from '../../components/Common/LoadingIndicator';
import Feather from 'react-native-vector-icons/Feather';

import ImagePicker from 'react-native-image-crop-picker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const Camera = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [compressing, setCompressing] = useState(false);
  const camera = useRef();
  const gallery = useRef();

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

  const openImageLibrary = () => {
    const options = {
      mediaType: 'video',
      videoQuality: 'low',
      maxWidth: 360,
      maxHeight: 480,
    };
    launchImageLibrary(options, (res) => {
      if (res.fileSize <= 555000000) {
        console.log(res.uri);
        navigation.navigate('CreatePost', {
          videoUri: res.uri,
        });
      } else {
        setTimeout(() => {
          alert('Please select video of size less than 5mb');
        }, 1000);
      }
    });
  };

  // const chooseVideoFromLibrary = async () => {
  //   ImagePicker.openPicker({
  //     mediaType: 'video',
  //   }).then((video) => {
  //     console.log(video);
  //     navigation.navigate('CreatePost', {
  //       videoUri: res.source,
  //     });
  //   });
  // };

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
        onPress={() => {
          navigation.goBack();
        }}
        style={{position: 'absolute', top: 10, left: 10}}>
        <Feather name="x" size={30} color="#fff" />
      </TouchableOpacity>
      <View style={styles.right}>
        <TouchableOpacity style={{position: 'absolute', alignItems: 'center'}}>
          <Image
            source={require('../../assets/images/flip.png')}
            size={15}
            style={{}}
          />
          <Text>Flip</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{position: 'absolute', top: 80, alignItems: 'center'}}>
          <Image
            source={require('../../assets/images/timer.png')}
            size={15}
            style={{}}
          />
          <Text>Timer</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{position: 'absolute', top: 160, alignItems: 'center'}}>
          <Feather name="zap-off" size={30} color="#fff" />
          <Text>Flash</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{position: 'absolute', top: 230, alignItems: 'center'}}>
          <Feather name="volume-2" size={30} color="#fff" />
          <Text>Volume</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={onRecord}
        style={isRecording ? styles.buttonStop : styles.buttonRecord}
      />
      <TouchableOpacity onPress={openImageLibrary} style={styles.gallery}>
        <Feather name="image" size={30} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

export default Camera;
