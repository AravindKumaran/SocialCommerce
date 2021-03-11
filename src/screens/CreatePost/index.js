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
// import WebViewBridge from 'react-native-webview-bridge';
// import { CustomTabs } from 'react-native-custom-tabs';
  


const CreatePost = () => {
  const [description, setDescription] = useState('');
  const [videoKey, setVideoKey] = useState(null);

  const route = useRoute();
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const [isNotLoading, setNotLoading] = useState(null);
  const signin = useCallback(() => {
    Auth.federatedSignIn({provider: 'google'});
    setUser(true);
  }, []);

  const uploadToStorage = async (imagePath) => {
    try {
      const response = await fetch(imagePath);

      const blob = await response.blob();
      const random = Math.floor(Math.random() * 9000);
      const filename = `${random}.mp4`;
      const s3Response = await Storage.put(filename, blob);
      console.log('s3Response', s3Response);
      setVideoKey(s3Response.key);
      setTimeout(() => {
        console.log('video', videoKey);
        onPublish(s3Response.key);
      }, 1000);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    console.log('route.params.videoUri', route.params.videoUri);
    Auth.currentAuthenticatedUser()
      .then((user) => {
        console.log('USSS', user);
        user.getUserData((err, userData) => {
          setUser({
            email: user.attributes.email,
          });
        });
      })
      .catch((error) => {
        setUser(null);
      });
  }, []);

  const onPublishButtonClick = async () => {
    setNotLoading(false);
    uploadToStorage(route.params.videoUri);
  };

  const onPublish = async (keyVideo) => {
    // create post in the database (API)
    if (!keyVideo) {
      setNotLoading(true);
      console.warn('Video is uploading! Please wait!');
      return;
    }

    try {
      const userInfo = await Auth.currentAuthenticatedUser();
      console.log('df', userInfo);
      const newPost = {
        videoUri: keyVideo,
        description: description,
        userID: userInfo.attributes.sub,
        likes: 0,
        songID: '20dee14b-39a9-4321-8ec7-c3380e2f5c27',
      };

      const response = await API.graphql(
        graphqlOperation(createPost, {input: newPost}),
      );
      setNotLoading(true);
      navigation.navigate('Home', {screen: 'Home'});
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View style={styles.container}>
      {isNotLoading !== false ? (
        <>
          <TextInput
            value={description}
            onChangeText={setDescription}
            numberOfLines={5}
            placeholder={'Hashtag'}
            style={styles.textInput}
          />
          {user === null ? (
            // CustomTabs.openURL('https://tiktok24dfe314-24dfe314-demo.auth.us-east-2.amazoncognito.com/login?redirect_uri=tiktok%3A%2F%2F&response_type=code&client_id=7dcbjoer98feb1f4spbn5p0g4l&identity_provider=google&scope=phone%20email%20openid%20profile%20aws.cognito.signin.user.admin&state=HcXprhpFinnP0yJWLg97AzKH0WvvD348&code_challenge=zyasMIpb4FzSb_x3T91xzwFKlQp_X5o3CV_L60nS1lM&code_challenge_method=S256&errorMessage=Login+option+is+not+available.+Please+try+another+one', {
            //   enableUrlBarHiding: true,
            // })
            <WebView
              style={styles.button}
              onPress={signin}
              originWhitelist={['*']}
              source={{
                uri:
                  'https://tiktok24dfe314-24dfe314-demo.auth.us-east-2.amazoncognito.com/login?redirect_uri=tiktok%3A%2F%2F&response_type=code&client_id=7dcbjoer98feb1f4spbn5p0g4l&identity_provider=google&scope=phone%20email%20openid%20profile%20aws.cognito.signin.user.admin&state=HcXprhpFinnP0yJWLg97AzKH0WvvD348&code_challenge=zyasMIpb4FzSb_x3T91xzwFKlQp_X5o3CV_L60nS1lM&code_challenge_method=S256&errorMessage=Login+option+is+not+available.+Please+try+another+one',
              }}
            />
          ) : (
            <>
              <TouchableOpacity
                style={styles.button}
                onPress={onPublishButtonClick}>
                <Text style={styles.buttonText}>Publish</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  Auth.signOut();
                  setUser(null);
                }}>
                <View style={styles.button}>
                  <Text style={styles.buttonText}>Sign out</Text>
                </View>
              </TouchableOpacity>
            </>
          )}
        </>
      ) : (
        <ActivityIndicator
          animating={true}
          size="large"
          color="#bc2b78"
          style={styles.activityIndicator}
        />
      )}
    </View>
  );
};

export default CreatePost;
