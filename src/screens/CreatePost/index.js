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

const CreatePost = () => {
  const [description, setDescription] = useState('');
  const [videoKey, setVideoKey] = useState(null);

  const route = useRoute();
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const signin = useCallback(() => {
    Auth.federatedSignIn({provider: 'google'});
    setUser(true);
  }, []);

  const uploadToStorage = async () => {
    if (!description || !route.params.videoUri) {
      return;
    }
    try {
      setLoading(true);
      const response1 = await fetch(route.params.videoUri);

      const blob1 = await response1.blob();
      console.log('Filename', blob1.data);
      const s3Response = await Storage.put(blob1.data.name, blob1, {
        contentType: blob1.data.type,
      });
      console.log('s3Response', s3Response);
      const newPost = {
        videoUri: s3Response.key,
        description: description,
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
