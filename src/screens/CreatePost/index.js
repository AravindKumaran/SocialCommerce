import React, {useEffect, useRef, useState, useCallback, useContext} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  ToastAndroid,
  StyleSheet,
  ScrollView,
  NativeModules,
} from 'react-native';
import {v4 as uuidv4, v4} from 'uuid';

const {RNVideoEditorSDK} = NativeModules;

import {Storage, API, graphqlOperation, Auth} from 'aws-amplify';
import {useRoute, useNavigation} from '@react-navigation/native';
import styles from './styles';
import {createPost} from '../../graphql/mutations';
import LoadingIndicator from '../../components/Common/LoadingIndicator';
import AppButton from '../../components/Common/AppButton';
import ImagePickerBottomSheet from '../../components/Common/ImagePickerBottomSheet';
import DropDownPicker from 'react-native-dropdown-picker';
import AppText from '../../components/Common/AppText';
import Upload from 'react-native-background-upload';

import {Context} from '../../context/Store';

import {
  VESDK,
  VideoEditorModal,
  Configuration,
  PESDK,
} from 'react-native-videoeditorsdk';

// const veryIntensiveTask = async (taskDataArguments) => {
//   // Example of an infinite loop task
//   const {delay} = taskDataArguments;
//   console.log('Delay', delay);
//   // await new Promise(async (resolve) => {
//   //   for (let i = 0; BackgroundService.isRunning(); i++) {
//   //     console.log(i);
//   //     // await sleep(delay);
//   //   }
//   // });
// };

const options = {
  taskName: 'Uploading Video',
  taskTitle: 'Uploading Video',
  taskDesc: 'Uploading Video',
  taskIcon: {
    name: 'ic_launcher',
    type: 'mipmap',
  },
  color: '#ff00ff',
  // linkingURI: 'yourSchemeHere://chat/jane', // See Deep Linking for more info
  // parameters: {
  //   delay: 1000,
  // },
};

const veryIntensiveTask = async (taskDataArguments) => {
  // Example of an infinite loop task
  const {delay} = taskDataArguments;
  console.log('Delay', delay);
  await new Promise(async (resolve) => {
    console.log('Hello');
    // for (let i = 0; BackgroundService.isRunning(); i++) {
    //   console.log(i);
    //   // await sleep(delay);
    // }
  });
};

const categoryItems = [
  {label: 'Fashion', value: 'Fashion'},
  {label: 'Jewellery', value: 'Jewellery'},
  {label: 'Fitness', value: 'Fitness'},
  {label: 'Beauty', value: 'Beauty'},
  {label: 'Travel', value: 'Travel'},
  {label: 'Food', value: 'Food'},
  {label: 'Movies & Series', value: 'Movies & Series'},
  {label: 'Sports', value: 'Sports'},
  {label: 'Finance', value: 'Finance'},
  {label: 'DIY', value: 'DIY'},
];

const brandItems = [
  {label: 'Adidas', value: 'Adidas'},
  {label: 'Armani', value: 'Armani'},
  {label: 'Beats', value: 'Beats'},
  {label: 'Bose', value: 'Bose'},
  {label: 'Hugo Boss', value: 'Hugo Boss'},
];

const CreatePost = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [description, setDescription] = useState('');
  const [thumbnail, setThumbnail] = useState(route.params.thumbnailUri);
  const [category, setCategory] = useState();
  const [brand, setBrand] = useState(user?.brand || '');
  const [videoKey, setVideoKey] = useState(null);
  const [videoUrii, setVideoUrii] = useState(route.params.videoUri);

  const [message] = useState('Please provide all details');
  const [message1] = useState('Your video has been uploaded');

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const [bgu_state, bgu_dispatch] = useContext(Context);

  const uploadToStorage = async () => {
    // console.log('gdf', videoUrii, description, category, brand);
    if (!description || !videoUrii || !thumbnail || !category ) {
      ToastAndroid.show(message, ToastAndroid.SHORT);
      return;
    }

    const fileDetails = {
      videoPath: videoUrii.replace("file://",""), //To remove "file://"
      videoName: videoUrii.split("/").pop(),
      thumbnailPath: thumbnail.replace("file://",""),
      thumbnailName: thumbnail.split("/").pop(),
    }
    
    // Upload.getFileInfo(fileDetails.videoPath).then(metadata => {

    //   const uploadVideoOpts = {
    //     url: 'https://liveboxpro823eea7b9bbf4c1fa57da0c49d1c8d61155909-staging.s3.ap-south-1.amazonaws.com/',
    //     path: fileDetails.videoPath,
    //     method: 'POST',
    //     type: 'multipart',
    //     field: 'file',
    //     headers: {
    //       'content-type': metadata.mimeType, // Customize content-type
    //       'content-length': `${metadata.size}`
    //     },
    //     parameters:{
    //       key: 'public/'+metadata.name
    //     },
    //     //Below are options only supported on Android
    //     notification: {
    //       enabled: true
    //     },
    //     useUtf8Charset: true
    //   }

    //   Upload.startUpload(uploadVideoOpts).then((uploadId) => {
    //     console.log(
    //       `Upload started with options: ${JSON.stringify(uploadVideoOpts)}`,
    //     );
    //     bgu_dispatch({type: 'uploadStarted', payload: true})
    //     Upload.addListener('progress', uploadId, (data) => {
    //       //if (data.progress % 5 === 0) {
    //         bgu_dispatch({type: 'uploadProgress', payload: data.progress})
    //       //}
    //       console.log(`Progress: ${data.progress}%`);
    //     })
    //     Upload.addListener('error', uploadId, (data) => {
    //       bgu_dispatch({type: 'uploadError', payload: data.error})
    //       console.log(`Error: ${data.error}%`)
    //     })
    //     Upload.addListener('cancelled', uploadId, (data) => {
    //       console.log(`Cancelled!`)
    //     })
    //     Upload.addListener('completed', uploadId, (data) => {
    //       // data includes responseCode: number and responseBody: Object
    //       console.log('Completed!',data);
    //     })    

    //     //for thumbnail upload
    //     Upload.getFileInfo(fileDetails.thumbnailPath).then(metadata => {
    //       const uploadThumbnailOpts = {
    //         url: 'https://liveboxpro823eea7b9bbf4c1fa57da0c49d1c8d61155909-staging.s3.ap-south-1.amazonaws.com/',
    //         path: fileDetails.thumbnailPath,
    //         method: 'POST',
    //         type: 'multipart',
    //         field: 'file',
    //         headers: {
    //           'content-type': metadata.mimeType, // Customize content-type
    //           'content-length': `${metadata.size}`
    //         },
    //         parameters:{
    //           key: 'public/'+metadata.name
    //         },
    //         //Below are options only supported on Android
    //         useUtf8Charset: true
    //       }
    //       Upload.startUpload(uploadThumbnailOpts)
    //       .catch((err) => {
    //         console.log('Upload thumbnail error!', err)
    //       })
    //     });
        
    //     const newPost = {
    //       videoUri: fileDetails.videoName,
    //       description: description,
    //       thumbnail: fileDetails.thumbnailName,
    //       userID: user.email,
    //       songID: '20dee14b-39a9-4321-8ec7-c3380e2f5c27',
    //       category,
    //       brand,
    //     };

    //     navigation.navigate('Home', {
    //       screen: 'Home',
    //       params: {
    //         uploadingPost: newPost,
    //       },
    //     });

    //   }).catch((err) => {
    //     console.log('Upload video error!', err)
    //   })
    // });
      
    try {      
      setLoading(true);
      const response1 = await fetch(videoUrii);
      const blob1 = await response1.blob();
      const response2 = await fetch(thumbnail);
      const blob2 = await response2.blob();

      console.log('Filename', blob1.data);
      console.log('Thumbnail', blob2.data);
      const s3Response = await Storage.put(blob1.data.name, blob1, {
        contentType: blob1.data.type,
      });
      console.log('s3Response', s3Response);
      const s3Response2 = await Storage.put(blob2.data.name, blob2, {
        contentType: blob2.data.type,
      });
      const newPost = {
        videoUri: s3Response.key,
        description: description,
        thumbnail: s3Response2.key,
        userID: user.email,
        songID: '20dee14b-39a9-4321-8ec7-c3380e2f5c27',
        category,
        brand,
      };

      const posRes = await API.graphql(
        graphqlOperation(createPost, {input: newPost}),
      );
      console.log('posRes', posRes);
      setLoading(false);
      ToastAndroid.show(message1, ToastAndroid.SHORT);
      navigation.navigate('Home', {
        screen: 'Home',
        params: {
          newPost: true,
        },
      });
    } catch (e) {
      console.error(e);
    }
    // await BackgroundService.start(veryIntensiveTask, options);
    // await BackgroundService.updateNotification({
    //   taskDesc: 'Your video is uploading...',
    // });

    // await BackgroundService.stop();
    // console.log('Uploading Done...');
  };

  const checkUser = async () => {
    setLoading(true);
    try {
      const userInfo = await Auth.currentAuthenticatedUser({
        bypassCache: true,
      });
      console.log('User', userInfo.attributes);
      setUser(userInfo.attributes);
      setLoading(false);
    } catch (error) {
      console.log('Error', error);
      setLoading(false);
    }
  };
  useEffect(() => {
    console.log('route.params.videoUri', route.params.videoUri);
    checkUser();
  }, []);

  const handleSignIn = async () => {
    await Auth.federatedSignIn();
    checkUser();
  };

  return (
    <ScrollView style={styles.container}>
      {loading && <LoadingIndicator visible={loading} />}

      <View style={{height: 1, borderWidth: 1, borderColor: '#3F464F'}} />

      <View style={{padding: 10, flexDirection: 'row'}}>
        <View style={{alignItems: 'center'}}>
          <ImagePickerBottomSheet
            imageUri={thumbnail}
            onChangeImage={(uri) => setThumbnail(uri)}
            title="Add Thumbnail"
            tStyle={{color: 'white', fontSize: 12}}
            cStyle={{
              width: 130,
              height: 250,
              borderRadius: 10,
            }}
          />
        </View>
        <View style={{flexDirection: 'column', left: 10, bottom: 10}}>
          <Text style={styles.text1}>Description</Text>
          <TextInput
            value={description}
            onChangeText={(text) => setDescription(text)}
            numberOfLines={5}
            placeholder={'Tell us something about your post...'}
            style={styles.textInput}
            placeholderTextColor={'rgba(255, 255, 255, 0.35)'}
          />
        </View>
      </View>

      {/* <AppButton
        onPress={() =>
          VESDK.openEditor({
            uri: videoUrii,
          })
            .then((res) => {
              if (res?.hasChanges === true) {
                setVideoUrii(res.video);
              }
            })
            .catch((err) => console.log('Error', err))
        }
        title="Edit Video"
      /> */}

      <View style={{marginHorizontal: 20}}>
        <AppText style={{color: 'white', fontSize: 12}}>Categories</AppText>

        <DropDownPicker
          items={categoryItems}
          placeholder="Select the Category"
          containerStyle={{
            height: 40,
            borderRadius: 30,
            marginVertical: 5,
          }}
          style={{backgroundColor: '#20232A', borderColor: '#3F464F'}}
          itemStyle={{
            justifyContent: 'flex-start',
          }}
          dropDownStyle={{backgroundColor: '#20232A', color: '#fff'}}
          onChangeItem={(item) => setCategory(item.value)}
          placeholderStyle={{color: 'white', fontSize: 12}}
          arrowColor={{color: 'white'}}
          selectedLabelStyle={{color: 'white'}}
        />
      </View>

      <View style={{marginHorizontal: 20, paddingBottom: 50}}>
        <AppText style={{color: 'white', fontSize: 12}}>Brand</AppText>
        <TextInput
          style={{
            backgroundColor: '#20232A',
            borderColor: '#3F464F',
            borderWidth: 1,
            height: 40,
            borderRadius: 5,
            fontSize: 12,
            paddingHorizontal: 15,
            color: 'white',
          }}
          placeholder="Enter the Brand"
          onChangeText={(text) => setBrand(text)}
          placeholderTextColor="white"
        />

        {/* <DropDownPicker
          items={brandItems}
          placeholder="Select the Brand"
          containerStyle={{
            height: 40,
            borderRadius: 30,
            marginVertical: 5,
          }}
          style={{backgroundColor: '#20232A', borderColor: '#3F464F'}}
          itemStyle={{
            justifyContent: 'flex-start',
          }}
          dropDownStyle={{backgroundColor: '#20232A'}}
          onChangeItem={(item) => setBrand(item.value)}
          placeholderStyle={{color: 'white', fontSize: 12}}
          arrowColor={{color: 'white'}}
          selectedLabelStyle={{color: 'white'}}
        /> */}
      </View>

      {user ? (
        <View style={styles.button}>
          <AppButton onPress={uploadToStorage} title="Publish" />
        </View>
      ) : (
        <View style={styles.button}>
          <AppButton
            style={{top: 20}}
            onPress={handleSignIn}
            title="Please sign in first"
          />
        </View>
      )}
    </ScrollView>
  );
};

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    backgroundColor: '#fff',
    fontSize: 18,
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    color: '#0c0c0c',
    // flex: 1,
    overflow: 'scroll',
    paddingRight: 30,
  },
  inputAndroid: {
    backgroundColor: '#fff',
    fontSize: 18,
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    color: '#0c0c0c',
    // flex: 1,
    overflow: 'scroll',
    paddingRight: 30,
  },

  iconContainer: {
    top: 30,
    right: 12,
  },
  modalViewTop: {
    color: '#000',
    backgroundColor: 'red',
  },
});

export default CreatePost;
