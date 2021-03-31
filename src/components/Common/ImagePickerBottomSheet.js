import React, {useRef, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  PermissionsAndroid,
  TouchableWithoutFeedback,
  Image,
  Alert,
  TouchableOpacity,
} from 'react-native';

import RBSheet from 'react-native-raw-bottom-sheet';
import Feather from 'react-native-vector-icons/Feather';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import AppText from './AppText';
import AppButton from './AppButton';

const ImagePickerBottomSheet = ({imageUri, onChangeImage}) => {
  const refRBSheet = useRef();

  const openCamera = async () => {
    const results = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.CAMERA,
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    ]);
    if (
      results['android.permission.CAMERA'] &&
      results['android.permission.WRITE_EXTERNAL_STORAGE'] === 'granted'
    ) {
      const options = {
        mediaType: 'photo',
        // saveToPhotos: true,
        // quality: 0.5,
        // maxWidth: 300,
        // maxHeight: 300,
      };
      launchCamera(options, (res) => {
        console.log('Res', res);
        if (res.didCancel) return;
        if (res.errorMessage) {
          console.log('Error in Picking Image', res.errorMessage);
          return;
        }
        console.log(res.uri);
        onChangeImage(res.uri);

        // if (res.fileSize <= 1000000) {
        //   console.log(res.uri);
        //   onChangeImage(res.uri);
        // } else {
        //   alert('Please select image of size less than 1mb');
        // }
      });
    } else {
      console.log('Please Provide Permissions ');
    }

    refRBSheet.current.close();
  };

  const openImageLibrary = () => {
    const options = {
      mediaType: 'photo',
    };
    launchImageLibrary(options, (res) => {
      if (res.didCancel) return;

      if (res.errorMessage) {
        console.log('Error in Picking Image', res.errorMessage);
        return;
      }

      console.log(res.uri);
      onChangeImage(res.uri);
      // if (res.fileSize <= 1000000) {
      //   console.log(res.uri);
      //   onChangeImage(res.uri);
      // } else {
      //   alert('Please select image of size less than 1mb');
      // }
    });
    refRBSheet.current.close();
  };

  const handlePress = () => {
    refRBSheet.current.open();
  };

  return (
    <View>
      <View style={styles.container}>
        {imageUri && (
          <Image
            source={{uri: imageUri}}
            style={styles.image}
            resizeMode="cover"
          />
        )}
      </View>

      <TouchableOpacity
        onPress={handlePress}
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 15,
        }}>
        <Feather name={'edit'} size={15} style={{marginRight: 10}} />
        <Text
          style={{
            color: '#FFFFFF',
            fontFamily: 'Proxima Nova',
            fontWeight: '400',
            fontSize: 14,
          }}>
          Edit Profile Picture
        </Text>
      </TouchableOpacity>

      <RBSheet
        ref={refRBSheet}
        height={300}
        animationType="fade"
        closeOnDragDown={true}
        customStyles={{
          wrapper: {
            backgroundColor: 'rgba(0,0,0,.6)',
          },
          draggableIcon: {
            backgroundColor: '#000',
          },
          container: {
            backgroundColor: '#fff',
            borderTopRightRadius: 25,
            borderTopLeftRadius: 25,
          },
        }}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginHorizontal: 20,
            marginBottom: 10,
          }}>
          <AppText style={{marginVertical: 15, fontSize: 22}}>
            Upload Image
          </AppText>
          <AppButton
            title="Take Photo"
            iconName="camera"
            txtStyle={{textAlign: 'center', width: '-100%'}}
            onPress={openCamera}
          />
          <AppButton
            title="Choose From Library"
            iconName="image"
            txtStyle={{textAlign: 'center', width: '-100%'}}
            onPress={openImageLibrary}
          />
          <AppButton
            title="Cancel"
            onPress={() => refRBSheet.current.close()}
          />
        </View>
      </RBSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 75,
    justifyContent: 'center',
    alignItems: 'center',
    height: 140,
    overflow: 'hidden',
    width: 140,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default ImagePickerBottomSheet;
