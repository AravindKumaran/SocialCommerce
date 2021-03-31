import React, {useEffect, useRef, useState, useCallback} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ToastAndroid,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Feather from 'react-native-vector-icons/Feather';
import {Storage, API, graphqlOperation, Auth, Hub} from 'aws-amplify';
import ImagePickerBottomSheet from '../../components/Common/ImagePickerBottomSheet';
import {listUsers} from '../../graphql/queries';
import {updateUser} from '../../graphql/mutations';
import LoadingIndicator from '../../components/Common/LoadingIndicator';

const EditProfile = ({user, saveUser}) => {
  console.log('UUSer', user.id, saveUser);
  const [username, setUsername] = useState(user.username);
  const [userImageUri, setUserImageUri] = useState(
    user.imageUri.startsWith('https')
      ? user.imageUri
      : `https://tiktok23f096015e564dd1964361d5c47fb832221214-demo.s3.us-east-2.amazonaws.com/public/${user.imageUri}`,
  );
  const [bio, setBio] = useState(user?.bio || '');
  const [loading, setLoading] = useState(false);

  const [message] = useState('Please enter required values!');
  const [message1] = useState('Username already exists!');

  const handleRevert = async () => {
    if (!username || !userImageUri) {
      ToastAndroid.show(message, ToastAndroid.SHORT);

      return;
    }
    console.log('username', username);
    console.log('bio', bio);
    console.log('uri', userImageUri);

    try {
      setLoading(true);
      if (username !== user.username) {
        const userRes = await API.graphql(
          graphqlOperation(listUsers, {
            filter: {
              username: {eq: username},
            },
          }),
        );
        if (userRes.data.listUsers.items.length >= 1) {
          setLoading(false);
          ToastAndroid.show(message1, ToastAndroid.SHORT);

          return;
        }
      }

      let imgKey = user.imageUri;
      if (!userImageUri.startsWith('https')) {
        const response = await fetch(userImageUri);

        const blob = await response.blob();
        console.log('Filename', blob.data);
        const s3Response = await Storage.put(blob.data.name, blob, {
          contentType: blob.data.type,
          // acl: 'public-read',
        });
        imgKey = s3Response.key;
      }
      const res3 = await API.graphql(
        graphqlOperation(updateUser, {
          input: {
            id: user.id,
            username,
            bio,
            imageUri: imgKey,
          },
        }),
      );

      if (imgKey !== user.imageUri) {
        setUserImageUri(
          `https://tiktok23f096015e564dd1964361d5c47fb832221214-demo.s3.us-east-2.amazonaws.com/public/${imgKey}`,
        );
        user.imageUri = `https://tiktok23f096015e564dd1964361d5c47fb832221214-demo.s3.us-east-2.amazonaws.com/public/${imgKey}`;
      }

      user.bio = bio;
      user.username = username;

      console.log('Ress', res3);
      saveUser(res3?.data?.updateUser);
      setLoading(false);
    } catch (error) {
      console.log('Error', error);
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {loading && <LoadingIndicator visible={loading} />}
      {/* <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={['#1A1A1A', '#232323']}
        style={styles.container}> */}
      <View style={{padding: 30}}>
        <View style={{alignItems: 'center'}}>
          <ImagePickerBottomSheet
            imageUri={userImageUri}
            onChangeImage={(uri) => setUserImageUri(uri)}
          />
        </View>
      </View>

      <View style={{padding: 0, alignItems: 'center'}}>
        <View style={{top: 20}}>
          <Text
            style={{
              color: '#FFFFFF',
              fontFamily: 'Proxima Nova',
              fontWeight: '400',
              fontSize: 12,
              left: 10,
            }}>
            Name
          </Text>
          <TextInput
            style={styles.input}
            // value={username}
            defaultValue={username}
            onChangeText={(e) => setUsername(e)}
          />
        </View>

        <View style={{top: 50}}>
          <Text
            style={{
              color: '#FFFFFF',
              fontFamily: 'Proxima Nova',
              fontWeight: '400',
              fontSize: 12,
              left: 10,
            }}>
            Bio
          </Text>
          <TextInput
            style={styles.input1}
            // value={bio}
            defaultValue={bio}
            onChangeText={(e) => setBio(e)}
            maxLength={50}
          />
        </View>
      </View>

      <View style={{alignItems: 'center', top: 100}}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={['#21FFFC', '#518bf9', '#5E37F4']}
          style={styles.Rectangle1}>
          <TouchableOpacity onPress={handleRevert}>
            <Text
              style={{
                color: '#FFFFFF',
                fontFamily: 'Proxima Nova',
                fontWeight: '700',
                fontSize: 14,
              }}>
              Update
            </Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
      {/* </LinearGradient> */}
    </View>
  );
};
export default EditProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1A',
  },
  user: {
    height: 140,
    width: 140,
    borderRadius: 75,
    zIndex: 1,
    top: 20,
  },
  input: {
    width: 300,
    height: 50,
    padding: 10,
    top: 10,
    backgroundColor: '#1A1A1A',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignItems: 'center',
    color: '#FFFFFF',
    fontWeight: '400',
    fontSize: 14,
    borderWidth: 0.5,
    borderColor: '#737373',
  },
  input1: {
    width: 300,
    height: 120,
    padding: 10,
    top: 10,
    backgroundColor: '#1A1A1A',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignItems: 'center',
    color: '#FFFFFF',
    fontWeight: '400',
    fontSize: 14,
    borderWidth: 0.5,
    borderColor: '#737373',
  },
  Rectangle1: {
    width: 300,
    height: 45,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
});
