import React, {useRef, useState} from 'react';
import {View, Text, TouchableOpacity, Image, ToastAndroid} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {ProcessingManager} from 'react-native-video-processing';
import RNFS from 'react-native-fs';

import styles from './styles';
import {useNavigation} from '@react-navigation/native';
import LoadingIndicator from '../../components/Common/LoadingIndicator';
import Feather from 'react-native-vector-icons/Feather';
import {createThumbnail} from 'react-native-create-thumbnail';

import ImagePicker from 'react-native-image-crop-picker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const Camera = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [compressing, setCompressing] = useState(false);
  const camera = useRef();
  const gallery = useRef();

  const navigation = useNavigation();

  const [message] = useState('Please select video of size less than 5mb');

  const onRecord = async () => {
    if (isRecording) {
      camera.current.stopRecording();
    } else {
      const data = await camera.current.recordAsync();
      ProcessingManager.getVideoInfo(data.uri).then((stats) =>
        console.log('Before', stats),
      );
      const options = {width: 300, height: 400};
      setCompressing(true);
      ProcessingManager.compress(data.uri, options).then((d) => {
        ProcessingManager.getVideoInfo(d.source).then((stats) =>
          console.log('After', stats),
        );
        console.log('data2', d.source);
        createThumbnail({
          url: d.source,
          timeStamp: 10000,
        })
          .then((response) => {
            console.log({response});
            setCompressing(false);
            navigation.navigate('CreatePost', {
              videoUri: d.source,
              thumbnailUri: response.path,
            });
          })
          .catch((err) => {
            setCompressing(false);
            console.log({err});
          });
      });
    }
  };

  const openImageLibrary = () => {
    const options = {
      mediaType: 'video',
      videoQuality: 'low',
      maxWidth: 300,
      maxHeight: 400,
    };
    launchImageLibrary(options, async (res) => {
      if (res.fileSize <= 555000000) {
        // console.log('Res', res.uri.replace('content://', 'file:///'));
        const checkIfExists = await RNFS.exists(
          `${RNFS.CachesDirectoryPath}/${res.fileName}`,
        );
        if (!checkIfExists) {
          await RNFS.copyFile(
            res.uri,
            `${RNFS.CachesDirectoryPath}/${res.fileName}`,
          );
        }
        createThumbnail({
          url:
            Platform.OS === 'android'
              ? `file:///${RNFS.CachesDirectoryPath}/${res.fileName}`
              : res.uri,
          timeStamp: 10000,
        })
          .then((response) => {
            console.log({response});
            setCompressing(false);
            navigation.navigate('CreatePost', {
              videoUri: res.uri,
              thumbnailUri: response.path,
            });
          })
          .catch((err) => {
            setCompressing(false);
            console.log({err});
          });
      } else {
        setTimeout(() => {
          ToastAndroid.show(message, ToastAndroid.SHORT);
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
        style={{position: 'absolute', marginTop: '5%', marginLeft: '3%'}}>
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
