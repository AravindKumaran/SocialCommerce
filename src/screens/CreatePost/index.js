import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { v4 as uuidv4, v4 } from 'uuid';

import { Storage, API, graphqlOperation, Auth } from 'aws-amplify';
import { useRoute, useNavigation } from '@react-navigation/native';

import styles from './styles';
import { createPost } from '../../graphql/mutations';

const CreatePost = () => {
  const [description, setDescription] = useState('');
  const [videoKey, setVideoKey] = useState(null);

  const route = useRoute();
  const navigation = useNavigation();

  const uploadToStorage = async (imagePath) => {
    try {
      const response = await fetch(imagePath);

      const blob = await response.blob();

      const filename = `filename1.mp4`;
      const s3Response = await Storage.put(filename, blob);
      console.log('s3Response', s3Response)
      setVideoKey(s3Response.key);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    console.log('route.params.videoUri', route.params.videoUri)
    uploadToStorage(route.params.videoUri);
  }, []);

  const onPublish = async () => {
    // create post in the database (API)
    if (!videoKey) {
      console.warn('VIdeo is not yet uploaded');
      return;
    }

    try {
      const userInfo = await Auth.currentAuthenticatedUser();

      const newPost = {
        videoUri: videoKey,
        description: description,
        userID: userInfo.attributes.sub,
        songID: "20dee14b-39a9-4321-8ec7-c3380e2f5c27",
      };

      const response = await API.graphql(
        graphqlOperation(createPost, { input: newPost }),
      );
      navigation.navigate("Home", { screen: "Home" });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={description}
        onChangeText={setDescription}
        numberOfLines={5}
        placeholder={'Description'}
        style={styles.textInput}
      />
      <TouchableOpacity onPress={onPublish}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Publish</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default CreatePost;
