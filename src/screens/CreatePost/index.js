import React, {useEffect, useState, useContext, useRef} from 'react';
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
  TouchableWithoutFeedback,
} from 'react-native';
import {v4 as uuidv4, v4} from 'uuid';

const {RNVideoEditorSDK} = NativeModules;

import {Storage, API, graphqlOperation, Auth} from 'aws-amplify';
import {useRoute, useNavigation} from '@react-navigation/native';
import styles from './styles';
import {
  createPost,
  createHashTag,
  createPostHashTag,
  updatePost,
  deletePostHashTag,
} from '../../graphql/mutations';
import {listHashTags, listPostHashTags} from '../../graphql/queries';
import LoadingIndicator from '../../components/Common/LoadingIndicator';
import AppButton from '../../components/Common/AppButton';
import ImagePickerBottomSheet from '../../components/Common/ImagePickerBottomSheet';
import DropDownPicker from 'react-native-dropdown-picker';
import AppText from '../../components/Common/AppText';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import Upload from 'react-native-background-upload';

import {Context} from '../../context/Store';

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
  {label: 'Beauty', value: 'Beauty'},
  {label: 'Jewellery', value: 'Jewellery'},
  {label: 'Fitness', value: 'Fitness'},
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

const language = [
  {label: 'English', value: 'English'},
  {label: 'Hindi', value: 'Hindi'},
  {label: 'Tamil', value: 'Tamil'},
  {label: 'Malayalam', value: 'Malayalam'},
  {label: 'Telugu', value: 'Telugu'},
  {label: 'Marathi', value: 'Marathi'},
  {label: 'Bengali', value: 'Bengali'},
];

const CreatePost = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [editPost, seteditPost] = useState(
    route.params.editPost ? true : false,
  );
  const [description, setDescription] = useState(
    route.params.description ? route.params.description : '',
  );
  const [thumbnail, setThumbnail] = useState(route.params.thumbnailUri);
  const [category, setCategory] = useState(
    route.params.category ? route.params.category : null,
  );
  const [brand, setBrand] = useState(
    route.params.brand ? route.params.brand : user?.brand || '',
  );
  const [languages, setLanguage] = useState(
    route.params.languages ? route.params.languages : [],
  );
  const [audience, setAudience] = useState(
    route.params.audience ? route.params.audience : [],
  );
  const [videoKey, setVideoKey] = useState(null);
  const [videoUrii, setVideoUrii] = useState(route.params.videoUri);

  console.log(
    'editPost',
    editPost,
    description,
    thumbnail,
    category,
    brand,
    languages,
    audience,
  );

  const [message] = useState('Please provide all details');
  const [message1] = useState('Your video has been uploaded');
  const [message2] = useState('Your video is being uploaded');

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const [globalState, globalDispatch] = useContext(Context);

  const dropDownRef = useRef();

  useEffect(() => {
    if (globalState.globalMuted == false) {
      // console.log('createpost mute gloabally');
      globalDispatch({type: 'globalMuted', payload: true});
    }
  }, [globalState.globalMuted == false]);

  useEffect(() => {
    return () => {
      if (globalState.globalMuted == true) {
        // console.log('createpost Unmute gloabally');
        globalDispatch({type: 'globalMuted', payload: false});
      }
    };
  }, [globalState.globalMuted == true]);

  const uploadToStorage = async () => {
    // console.log('gdf', videoUrii, description, category, brand, languages);
    // return false;
    // console.log('languages', languages);
    if (!description || !videoUrii || !thumbnail || !category || !languages) {
      ToastAndroid.show(message, ToastAndroid.SHORT);
      return;
    }

    //to get hashtags
    var hashTagRegexp = /\B\#\w\w+\b/g;
    hashTagResult = description.match(hashTagRegexp);
    //console.log(hashTagResult);return false;

    // const fileDetails = {
    //   videoPath: videoUrii.replace('file://', ''), //To remove "file://"
    //   videoName: videoUrii.split('/').pop(),
    //   thumbnailPath: thumbnail.replace('file://', ''),
    //   thumbnailName: thumbnail.split('/').pop(),
    // };

    // Upload.getFileInfo(fileDetails.videoPath).then(metadata => {

    //   const uploadVideoOpts = {
    //     url: 'https://liveboxpro823eea7b9bbf4c1fa57da0c49d1c8d61151613-test.s3.ap-south-1.amazonaws.com/',
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
    //         url: 'https://liveboxpro823eea7b9bbf4c1fa57da0c49d1c8d61151613-test.s3.ap-south-1.amazonaws.com/',
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
    //       songID: 'baaf848d-fb01-4ea7-9be2-f058e33a39a9',
    //       category,
    //       brand
    //     };

    //     //console.log('newPost', newPost)

    //     navigation.navigate('Home', {
    //       screen: 'Home',
    //       uploadingPost: newPost,
    //       hashTag: hashTagResult
    //     });

    //   }).catch((err) => {
    //     console.log('Upload video error!', err)
    //   })

    // });

    try {
      setLoading(true);

      ToastAndroid.show(message2, ToastAndroid.LONG);

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
        languages,
        audience
      };

      const posRes = await API.graphql(
        graphqlOperation(createPost, {input: newPost}),
      );
      console.log('posRes', posRes);

      if (hashTagResult) {
        for (var i = 0; i < hashTagResult.length; i++) {
          console.log(hashTagResult[i]);
          var hashTagLower = hashTagResult[i].toLowerCase();

          //check hashtag is avail in db
          const response = await API.graphql(
            graphqlOperation(listHashTags, {
              filter: {
                name: {eq: hashTagLower},
              },
            }),
          );

          console.log('response', response);

          if (response.data.listHashTags.items.length) {
            console.log('posRes.data.createPost.id', posRes.data.createPost.id);
            console.log(
              'response.data.listHashTags.id',
              response.data.listHashTags.items[0].id,
            );

            const postHashTagRes = await API.graphql(
              graphqlOperation(createPostHashTag, {
                input: {
                  postID: posRes.data.createPost.id,
                  hashTagID: response.data.listHashTags.items[0].id,
                },
              }),
            );
            console.log('postHashTagRes', postHashTagRes);
          }
        }
      }
      setLoading(false);
      ToastAndroid.show(message1, ToastAndroid.SHORT);
      await AsyncStorage.setItem('isNewPost', 'true')
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

  const updatePostDetails = async () => {
    if (!description || !videoUrii || !thumbnail || !category || !languages) {
      ToastAndroid.show(message, ToastAndroid.SHORT);
      return;
    }

    //to get hashtags
    var hashTagRegexp = /\B\#\w\w+\b/g;
    hashTagResult = description.match(hashTagRegexp);
    //console.log(hashTagResult);return false;

    try {
      setLoading(true);

      const posRes = await API.graphql(
        graphqlOperation(updatePost, {
          input: {
            id: route.params.postId,
            description: description,
            category: category,
            brand: brand,
            languages: languages,
            audience: audience
          },
        }),
      );
      console.log('posRes', posRes);

      const res = await API.graphql(
        graphqlOperation(listPostHashTags, {
          filter: {
            postID: {eq: route.params.postId},
          },
        }),
      );

      if (res.data.listPostHashTags.items.length) {
        console.log('res', res.data.listPostHashTags.items);
        const posthashtags = res.data.listPostHashTags.items;
        posthashtags.map(async (h, i) => {
          const res = await API.graphql(
            graphqlOperation(deletePostHashTag, {
              input: {id: h.id},
            }),
          );
        });
      }

      if (hashTagResult) {
        for (var i = 0; i < hashTagResult.length; i++) {
          console.log(hashTagResult[i]);
          var hashTagLower = hashTagResult[i].toLowerCase();

          //check hashtag is avail in db
          const response = await API.graphql(
            graphqlOperation(listHashTags, {
              filter: {
                name: {eq: hashTagLower},
              },
            }),
          );

          console.log('response', response);

          if (response.data.listHashTags.items.length) {
            console.log('posRes.data.updatePost.id', posRes.data.updatePost.id);
            console.log(
              'response.data.listHashTags.id',
              response.data.listHashTags.items[0].id,
            );

            const postHashTagRes = await API.graphql(
              graphqlOperation(createPostHashTag, {
                input: {
                  postID: posRes.data.updatePost.id,
                  hashTagID: response.data.listHashTags.items[0].id,
                },
              }),
            );
            console.log('postHashTagRes', postHashTagRes);
          }
        }
      }
      setLoading(false);

      navigation.navigate('Home', {
        screen: 'Home',
      });
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    console.log(languages);
  }, [languages]);

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
    // <TouchableWithoutFeedback
    //   onPress={(dropDownRef.current?.close(), console.log('hello'))}>
    <ScrollView style={styles.container}>
      {loading && <LoadingIndicator visible={loading} />}

      <View style={{height: 1, borderWidth: 1, borderColor: '#3F464F'}} />

      <View style={{padding: 10, flexDirection: 'row'}}>
        <View style={{alignItems: 'center'}}>
          <ImagePickerBottomSheet
            imageUri={thumbnail}
            onChangeImage={(uri) => setThumbnail(uri)}
            title="Edit Thumbnail"
            tStyle={{color: 'white', fontSize: 12}}
            cStyle={{
              width: 130,
              height: 250,
              borderRadius: 10,
            }}
          />
        </View>
        <View style={{flexDirection: 'column', left: 10, bottom: 10}}>
          <Text style={styles.text1}># Challenges</Text>
          <TextInput
            value={description}
            onChangeText={(text) => setDescription(text)}
            multiline={true}
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
          defaultValue={category}
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
          onChangeItem={(item) => {
            setCategory(item.value);
          }}
          placeholderStyle={{color: 'white', fontSize: 12}}
          arrowColor={{color: 'white'}}
          selectedLabelStyle={{color: 'white'}}
        />
      </View>

      <View style={{marginHorizontal: 20, paddingBottom: 0}}>
        <AppText style={{color: 'white', fontSize: 12}}>Language</AppText>
        <DropDownPicker
          items={language}
          placeholder="Select the Language"
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
          onChangeItem={(item) => {
            setLanguage([...item]);
          }}
          placeholderStyle={{color: 'white', fontSize: 12}}
          arrowColor={{color: 'white'}}
          selectedLabelStyle={{color: 'white'}}
          multiple={true}
          defaultValue={languages}
          // controller={(instance) => dropDownRef.current = instance}
        />
      </View>

      <View style={{marginHorizontal: 20, paddingBottom: 0}}>
        <AppText style={{color: 'white', fontSize: 12}}>Audience</AppText>
        <DropDownPicker
          items={language}
          placeholder="Select the Language"
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
          onChangeItem={(item) => {
            setAudience([...item]);
          }}
          placeholderStyle={{color: 'white', fontSize: 12}}
          arrowColor={{color: 'white'}}
          selectedLabelStyle={{color: 'white'}}
          multiple={true}
          defaultValue={audience}
          // controller={(instance) => dropDownRef.current = instance}
        />
      </View>

      <View style={{marginHorizontal: 20, paddingBottom: 0}}>
        <AppText style={{color: 'white', fontSize: 12, marginBottom: 10}}>
          Brands(optional)
        </AppText>
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
            marginBottom: 5,
          }}
          placeholder="Enter the Brand"
          onChangeText={(text) => setBrand(text)}
          placeholderTextColor="white"
          value={brand}
        />
      </View>

      {user ? (
        <View style={styles.button}>
          <AppButton
            onPress={editPost ? updatePostDetails : uploadToStorage}
            title={editPost ? 'Update' : 'Publish'}
          />
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
    // </TouchableWithoutFeedback>
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
