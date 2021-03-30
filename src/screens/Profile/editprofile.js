import React, {useEffect, useRef, useState, useCallback} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Feather from 'react-native-vector-icons/Feather';
import {Storage, API, graphqlOperation, Auth, Hub} from 'aws-amplify';
import ImagePickerBottomSheet from '../../components/Common/ImagePickerBottomSheet';
import {listUsers} from '../../graphql/queries';
import {updateUser} from '../../graphql/mutations';
import LoadingIndicator from '../../components/Common/LoadingIndicator';

const EditProfile = ({user}) => {
  console.log('UUSer', user.id);
  const [username, setUsername] = useState(user.username);
  const [userImageUri, setUserImageUri] = useState(
    user.imageUri.startsWith('https')
      ? user.imageUri
      : `https://tiktok23f096015e564dd1964361d5c47fb832221214-demo.s3.us-east-2.amazonaws.com/public/${user.imageUri}`,
  );
  const [bio, setBio] = useState(user?.bio || '');
  const [loading, setLoading] = useState(false);

  const handleRevert = async () => {
    if (!username || !userImageUri) {
      alert('Please enter required values!');
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
          alert('Username already exists!');
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
      setLoading(false);
    } catch (error) {
      console.log('Error', error);
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {loading && <LoadingIndicator visible={loading} />}
      <View style={{padding: 20}}>
        <View style={{alignItems: 'center'}}>
          <ImagePickerBottomSheet
            imageUri={userImageUri}
            onChangeImage={(uri) => setUserImageUri(uri)}
          />
        </View>
      </View>

      <View style={{padding: 30, alignItems: 'center'}}>
        <View style={{top: 20}}>
          <Text
            style={{
              color: '#FFFFFF',
              fontFamily: 'Proxima Nova',
              fontWeight: '700',
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

        <View style={{top: 40}}>
          <Text
            style={{
              color: '#FFFFFF',
              fontFamily: 'Proxima Nova',
              fontWeight: '700',
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

      <View style={{alignItems: 'center', top: 40}}>
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
              Revert Changes
            </Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
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
    height: 40,
    padding: 10,
    top: 10,
    backgroundColor: '#181818',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignItems: 'center',
    color: '#FFFFFF',
    fontWeight: '400',
    fontSize: 12,
    borderTopWidth: 0.5,
    borderTopColor: '#737373',
  },
  input1: {
    width: 300,
    height: 100,
    padding: 10,
    top: 10,
    backgroundColor: '#181818',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignItems: 'center',
    color: '#FFFFFF',
    fontWeight: '400',
    fontSize: 12,
    borderTopWidth: 0.5,
    borderTopColor: '#737373',
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
