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


const CreatePost = () => {
  const [description, setDescription] = useState('');
  const [videoKey, setVideoKey] = useState(null);

  const route = useRoute();
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const [isNotLoading, setNotLoading] = useState(false);
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
      setNotLoading(true);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    console.log('route.params.videoUri', route.params.videoUri);
    Auth.currentAuthenticatedUser()
      .then((user) => {
        user.getUserData((err, userData) => {
          setUser({
            email: user.attributes.email,
          });
        });
        uploadToStorage(route.params.videoUri);
      })
      .catch((error) => {
        setUser(null);
      });
  }, []);

  const onPublish = async () => {
    // create post in the database (API)
    if (!videoKey) {
      console.warn('Video is uploading! Please wait!');
      return;
    }

    try {
      const userInfo = await Auth.currentAuthenticatedUser();
      console.log('df', userInfo);
      const newPost = {
        videoUri: videoKey,
        description: description,
        userID: userInfo.attributes.sub,
        likes: 0,
        songID: '20dee14b-39a9-4321-8ec7-c3380e2f5c27',
      };

      const response = await API.graphql(
        graphqlOperation(createPost, {input: newPost}),
      );
      navigation.navigate('Home', {screen: 'Home'});
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View style={styles.container}>
      {isNotLoading == true ? (
        <>
          <TextInput
            value={description}
            onChangeText={setDescription}
            numberOfLines={5}
            placeholder={'Description'}
            style={styles.textInput}
          />
          {user === null ? (
            <TouchableOpacity onPress={signin}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>Sign in before Publish</Text>
              </View>
            </TouchableOpacity>
          ) : (
            <>
              {/* <LoginButton onPress =  {onPublish }/> */}

              <TouchableOpacity style={styles.button} onPress={onPublish}>
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
        <ActivityIndicator animating={true} size="large" color="#00ff00" />
      )}
    </View>
  );
};

export default CreatePost;
