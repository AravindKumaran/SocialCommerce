import React, {useEffect, useRef, useState, useCallback} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {v4 as uuidv4, v4} from 'uuid';

import {Storage, API, graphqlOperation, Auth} from 'aws-amplify';
import {useRoute, useNavigation} from '@react-navigation/native';
import {withAuthenticator} from 'aws-amplify-react-native';
import styles from './styles';
import {createPost} from '../../graphql/mutations';
import {WebView} from 'react-native-webview';
import LoadingIndicator from '../../components/Common/LoadingIndicator';
import AppButton from '../../components/Common/AppButton';
import ImagePickerBottomSheet from '../../components/Common/ImagePickerBottomSheet';

const CreatePost = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [description, setDescription] = useState('');
  const [thumbnail, setThumbnail] = useState(route.params.thumbnailUri);
  const [videoKey, setVideoKey] = useState(null);

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const signin = useCallback(() => {
    Auth.federatedSignIn({provider: 'google'});
    setUser(true);
  }, []);

  const uploadToStorage = async () => {
    if (!description || !route.params.videoUri || !thumbnail) {
      alert('Please provide all details');
      return;
    }
    console.log('gdf', description, thumbnail);
    try {
      setLoading(true);
      const response1 = await fetch(route.params.videoUri);
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
        userID: user.sub,
        songID: '20dee14b-39a9-4321-8ec7-c3380e2f5c27',
      };

      const posRes = await API.graphql(
        graphqlOperation(createPost, {input: newPost}),
      );
      console.log('posRes', posRes);
      setLoading(false);
      navigation.navigate('Home', {screen: 'Home'});
    } catch (e) {
      console.error(e);
    }
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
    <View style={styles.container}>
      {loading && <LoadingIndicator visible={loading} />}
      <TextInput
        value={description}
        onChangeText={(text) => setDescription(text)}
        numberOfLines={5}
        placeholder={'Hashtag'}
        style={styles.textInput}
      />

      <View style={{padding: 30}}>
        <View style={{alignItems: 'center'}}>
          <ImagePickerBottomSheet
            imageUri={thumbnail}
            onChangeImage={(uri) => setThumbnail(uri)}
            title="Add Thumbnail"
            tStyle={{color: '#000'}}
            cStyle={{
              width: 250,
              height: 250,
              borderRadius: 25,
              backgroundColor: '#333',
            }}
          />
        </View>
      </View>

      {user ? (
        <View style={styles.button}>
          <AppButton onPress={uploadToStorage} title="Publish Video" />
        </View>
      ) : (
        <View style={styles.button}>
          <AppButton onPress={handleSignIn} title="Please sign in first" />
        </View>
      )}
    </View>
  );
};

export default CreatePost;
