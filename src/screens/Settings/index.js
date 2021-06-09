import React, {useEffect, useRef, useState, useCallback} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  ImageBackground,
  ScrollView,
  Image,
  Dimensions,
  Linking,
} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import Feather from 'react-native-vector-icons/Feather';
import Searchbar from './settingssearch';
import Languages from './languages';
import Invite from './invite';
import Notifications from './notifications';
import Account from './account';
import Rating from './rating';
import Feedback from './feedback';
import Support from './support';
import Share from 'react-native-share';
import {Auth} from 'aws-amplify';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {c} from '../../navigation/homeBottomTabNavigator';

const settingsmenu = [
  {
    src: require('../../assets/images/languageset.png'),
    name: 'Languages',
  },
  // {
  //   src: require('../../assets/images/whatsappset.png'),
  //   name: 'Invite friends via WhatsApp',
  // },
  // {
  //   src: require('../../assets/images/notificationset.png'),
  //   name: 'Notifications',
  // },
  // {
  //   src: require('../../assets/images/accountset.png'),
  //   name: 'Account',
  // },
  // {
  //   src: require('../../assets/images/ratingset.png'),
  //   name: 'Rate us',
  // },
  // {
  //   src: require('../../assets/images/feedbackset.png'),
  //   name: 'Feedback',
  // },
  {
    src: require('../../assets/images/languageset.png'),
    name: 'Support',
  },
  {
    src: require('../../assets/images/languageset.png'),
    name: 'Privacy Policy',
  },
  {
    src: require('../../assets/images/logoutset.png'),
    name: 'Logout',
  },
];

const Settings = (props) => {
  const [settings, setSettings] = useState('');
  const [searchedData, setSearchedData] = useState(null);
  const refRBSheet3 = useRef();
  const [user, setUser] = useState(props.user);

  useEffect(() => {
    if (settings == 'Logout') {
      handleLogout();
    }
  }, [settings]);

  useEffect(() => {
    if (settings == 'Privacy Policy') {
      Privacypolicy();
    }
  }, [settings]);

  useEffect(() => {
    if (settings == 'Invite friends via WhatsApp') {
      myCustomShare();
    }
  }, [settings]);

  const handleCategory = (value) => {
    setSettings(value);
    setSearchedData(null);
  };

  const myCustomShare = async () => {
    const shareOptions = {
      title: 'Share via',
      message: 'Enter your message: ',
      url: 'https://www.youtube.com/',
      social: Share.Social.WHATSAPP,
      whatsAppNumber: '919999999999',
      filename: 'test',
    };

    try {
      const ShareResponse = await Share.shareSingle(shareOptions);
      console.log(JSON.stringify(ShareResponse));
    } catch (error) {
      console.log('Error => ', error);
    }
  };

  const Privacypolicy = () => {
    return Linking.openURL('https://liveboxapp.com/privacypolicy.html');
  };

  const handleLogout = async () => {
    console.log('User', user);
    setUser(null);
    Auth.signOut();
    await AsyncStorage.removeItem('userImg');
    console.log('logged out!');
    c.setOptions({
      tabBarIcon: ({focused, tintColor}) => (
        <>
          <Image
            source={require('../../assets/images/Profile_icon.png')}
            // source={{
            //   uri: imgUri.startsWith('https')
            //     ? imgUri
            //     : `https://tiktok23f096015e564dd1964361d5c47fb832221214-demo.s3.us-east-2.amazonaws.com/public/${imgUri}`,
            // }}
            size={25}
            style={{bottom: 5, width: 25, height: 25}}
          />
          {focused && <ActiveStyle />}
        </>
      ),
    });
  };

  const ActiveStyle = () => (
    <>
      <Image
        style={{
          position: 'absolute',
          bottom: 13,
        }}
        source={require('../..//assets/images/blur.png')}
        width={15}
        height={15}
        // tintColor={color}
      />
      <View
        style={{
          width: 27,
          height: 4,
          borderRadius: 14,
          position: 'absolute',
          bottom: 10,
          borderBottomColor: '#21FFFC',
          borderBottomWidth: 4,
        }}></View>
    </>
  );

  return (
    <>
      <ImageBackground
        source={require('../../assets/images/Background1.png')}
        style={styles.container}>
        <ScrollView style={styles.container}>
          <View>
            <Text
              style={{
                textAlign: 'center',
                color: '#FFFFFF',
                fontWeight: '700',
                fontFamily: 'Proxima Nova',
                fontSize: 16,
                marginTop: 25,
              }}>
              Settings
            </Text>
          </View>
          {/* <View style={{marginTop: 20}}>
            <Searchbar />
          </View> */}
          <View style={styles.button}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.cat}>
                {settingsmenu.map((c, i) => (
                  <View
                    key={`${c.name}-${i}`}
                    style={{
                      paddingVertical: 15,
                      marginTop: 10,
                      marginLeft: 30,
                    }}>
                    <TouchableOpacity
                      onPress={() => handleCategory(c.name)}
                      style={styles.catItem}>
                      <Text>
                        <Image
                          source={c.src}
                          size={15}
                          style={{height: 15, width: 15}}
                        />
                        {'      '}
                        <Text
                          style={{
                            color: '#FFFFFF',
                            fontWeight: '700',
                            fontFamily: 'Proxima Nova',
                            fontSize: 14,
                          }}>
                          {c.name}
                        </Text>
                      </Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            </ScrollView>
          </View>
        </ScrollView>

        {settings === 'Languages' && (
          <Languages languages={user.languages} user={user} />
        )}
        {settings === 'Invite friends via WhatsApp' && <Invite />}
        {settings === 'Notifications' && <Notifications />}
        {settings === 'Account' && <Account />}
        {settings === 'Rate us' && <Rating />}
        {settings === 'Feedback' && <Feedback />}
        {settings === 'Support' && <Support user={user} />}
        {/* {settings === 'Logout' && <Feedback />} */}
      </ImageBackground>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
});

export default Settings;
