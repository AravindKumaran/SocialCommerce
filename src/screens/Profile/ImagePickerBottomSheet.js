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
  ToastAndroid,
  ScrollView,
} from 'react-native';

import RBSheet from 'react-native-raw-bottom-sheet';
import Feather from 'react-native-vector-icons/Feather';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import AppText from '../../components/Common/AppText';
import AppButton from '../../components/Common/AppButton';

const ImagePickerBottomSheet = ({
  imageUri,
  onChangeImage,
  title,
  cStyle,
  tStyle,
}) => {
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
    });
    refRBSheet.current.close();
  };

  const handlePress = () => {
    refRBSheet.current.open();
  };

  return (
    <View style={{}}>
      <View style={[styles.container, cStyle]}>
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
        {!title && (
          <Feather name={'edit'} size={15} style={{marginRight: 10}} />
        )}
        {title && (
          <Feather
            name={'camera'}
            size={25}
            style={{marginRight: 10, color: 'white'}}
          />
        )}
        <Text
          style={[
            {
              color: '#FFFFFF',
              fontFamily: 'Proxima Nova',
              fontWeight: '400',
              fontSize: 14,
            },
            tStyle,
          ]}>
          {title ? title : 'Edit Profile Picture'}
        </Text>
      </TouchableOpacity>

      <RBSheet
        ref={refRBSheet}
        height={300}
        animationType="fade"
        closeOnDragDown={false}
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
        {/* <ScrollView showsVerticalScrollIndicator={false}> */}
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            margin: 30,
            bottom: 0,
          }}>
          <AppText style={{fontSize: 22, top: 15}}>Upload Image</AppText>
          <View
            style={{
              alignSelf: 'center',
              alignItems: 'center',
              alignContent: 'center',
            }}>
            <AppButton
              title="Take Photo"
              iconName="camera"
              txtStyle={{textAlign: 'center', width: '-100%'}}
              onPress={openCamera}
            />
            <View
              style={{
                bottom: 20,
              }}>
              <AppButton
                title="Choose From Library"
                iconName="image"
                txtStyle={{textAlign: 'center', width: '-100%'}}
                onPress={openImageLibrary}
              />
            </View>
            <View
              style={{
                bottom: 40,
              }}>
              <AppButton
                title="Cancel"
                iconName="x"
                onPress={() => refRBSheet.current.close()}
              />
            </View>
          </View>
        </View>
        {/* </ScrollView> */}
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
