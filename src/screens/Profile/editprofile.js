import React, {useEffect, useRef, useState, useCallback} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ToastAndroid,
  ScrollView,
  ImageBackground,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Feather from 'react-native-vector-icons/Feather';
import {Storage, API, graphqlOperation, Auth, Hub} from 'aws-amplify';
import ImagePickerBottomSheet from '../Profile/ImagePickerBottomSheet';
import {listUsers} from '../../graphql/queries';
import {updateUser} from '../../graphql/mutations';
import LoadingIndicator from '../../components/Common/LoadingIndicator';
import AppButton from '../../components/Common/AppButton';
import DropDownPicker from 'react-native-dropdown-picker';
import AppText from '../../components/Common/AppText';

let languages = [
  {label: 'English', value: 'English', disabled: false},
  {label: 'Hindi', value: 'Hindi', disabled: false},
  {label: 'Tamil', value: 'Tamil', disabled: false},
  {label: 'Malayalam', value: 'Malayalam', disabled: false},
  {label: 'Telugu', value: 'Telugu', disabled: false},
  {label: 'Marathi', value: 'Marathi', disabled: false},
  {label: 'Bengali', value: 'Bengali', disabled: false},
  {label: 'Kannada', value: 'Kannada', disabled: false},
];

const EditProfile = ({user, saveUser, closeSheet}) => {
  console.log('User', user.id, saveUser);
  const [username, setUsername] = useState(user.username);
  const [userImageUri, setUserImageUri] = useState(
    user.imageUri.startsWith('https')
      ? user.imageUri
      : `https://liveboxpro823eea7b9bbf4c1fa57da0c49d1c8d61155909-staging.s3.ap-south-1.amazonaws.com/public/${user.imageUri}`,
  );
  const [bio, setBio] = useState(user?.bio || '');
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState(
    user?.languages ? user.languages : [],
  );
  let l = language;
  //drop down items

  // languages.forEach(item => {
  //   if(user?.languages && user.languages.includes(item.value)) {
  //     item.disabled = true;
  //   }
  // })

  // console.log('drop_down_items', languages)

  //Social media links
  const [facebook, setFacebook] = useState(
    user?.facebook?.startsWith('https') ? user.facebook : '',
  );
  const [instagram, setInstagram] = useState(
    user?.instagram?.startsWith('https') ? user.instagram : '',
  );
  const [youtube, setYoutube] = useState(
    user?.youtube?.startsWith('https') ? user.youtube : '',
  );

  console.log('facebook', user.facebook);
  const [message] = useState('Please enter required values!');
  const [message1] = useState('Username already exists!');

  const [message2] = useState('Please enter a valid url');

  const handleRevert = async () => {
    if (!username || !userImageUri) {
      ToastAndroid.show(message, ToastAndroid.SHORT);

      return;
    }

    if (
      (facebook && !facebook.startsWith('https')) ||
      (instagram && !instagram.startsWith('https')) ||
      (youtube && !youtube.startsWith('https'))
    ) {
      ToastAndroid.show(message2, ToastAndroid.SHORT);

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
            facebook,
            instagram,
            youtube,
            imageUri: imgKey,
            languages: language,
          },
        }),
      );

      if (imgKey !== user.imageUri) {
        setUserImageUri(
          `https://liveboxpro823eea7b9bbf4c1fa57da0c49d1c8d61155909-staging.s3.ap-south-1.amazonaws.com/public/${imgKey}`,
        );
        user.imageUri = `https://liveboxpro823eea7b9bbf4c1fa57da0c49d1c8d61155909-staging.s3.ap-south-1.amazonaws.com/public/${imgKey}`;
      }

      user.bio = bio;
      user.username = username;
      user.facebook = facebook;
      user.instagram = instagram;
      user.youtube = youtube;

      console.log('Ress', res3);
      saveUser(res3?.data?.updateUser);
      closeSheet();
      setLoading(false);
    } catch (error) {
      console.log('Error', error);
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/images/Background1.png')}
      style={styles.container}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {loading && <LoadingIndicator visible={loading} />}
        <View style={{padding: 30}}>
          <View style={{alignItems: 'center'}}>
            <ImagePickerBottomSheet
              imageUri={userImageUri}
              onChangeImage={(uri) => setUserImageUri(uri)}
              tStyle={{color: 'white', fontSize: 12}}
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
              Username
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
                fontWeight: '400',
                fontSize: 12,
                left: 10,
              }}>
              Facebook Link
            </Text>
            <TextInput
              style={styles.input}
              //value={facebook}
              defaultValue={facebook}
              onChangeText={(e) => setFacebook(e)}
            />
          </View>

          <View style={{top: 60}}>
            <Text
              style={{
                color: '#FFFFFF',
                fontFamily: 'Proxima Nova',
                fontWeight: '400',
                fontSize: 12,
                left: 10,
              }}>
              Instagram Link
            </Text>
            <TextInput
              style={styles.input}
              //value={instagram}
              defaultValue={instagram}
              onChangeText={(e) => setInstagram(e)}
            />
          </View>

          <View style={{top: 80}}>
            <Text
              style={{
                color: '#FFFFFF',
                fontFamily: 'Proxima Nova',
                fontWeight: '400',
                fontSize: 12,
                left: 10,
              }}>
              YouTube Link
            </Text>
            <TextInput
              style={styles.input}
              //value={youtube}
              defaultValue={youtube}
              onChangeText={(e) => setYoutube(e)}
            />
          </View>

          <View style={{top: 100, width: '90%'}}>
            <AppText style={{color: 'white', fontSize: 12}}>Language</AppText>
            <DropDownPicker
              items={languages}
              placeholder="Select the Language"
              containerStyle={{
                height: 50,
                borderRadius: 30,
                marginVertical: 5,
              }}
              style={{
                backgroundColor: 'transparent',
                borderColor: '#3F464F',
              }}
              itemStyle={{
                justifyContent: 'flex-start',
              }}
              dropDownStyle={{backgroundColor: '#20232A'}}
              onChangeItem={(item) => setLanguage(item)}
              placeholderStyle={{color: 'white', fontSize: 12}}
              arrowColor={{color: 'white'}}
              selectedLabelStyle={{color: 'white'}}
              multiple={true}
              defaultValue={false}
            />
          </View>

          <View style={{top: 170}}>
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

        {/* <View style={{alignItems: 'center', paddingTop: 100}}>
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
      </View> */}

        <View style={{alignItems: 'center', paddingTop: 190, margin: 20}}>
          <AppButton onPress={handleRevert} title="Submit" />
        </View>
      </ScrollView>
    </ImageBackground>
  );
};
export default EditProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 5,
    paddingHorizontal: 10,
    // backgroundColor: '#1A1A1A',
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
    // backgroundColor: '#1A1A1A',
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
    // backgroundColor: '#1A1A1A',
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
    paddingBottom: 75,
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
