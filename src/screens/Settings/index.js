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

const settingsmenu = [
  {
    src: require('../../assets/images/languageset.png'),
    name: 'Languages',
  },
  {
    src: require('../../assets/images/whatsappset.png'),
    name: 'Invite friends via WhatsApp',
  },
  {
    src: require('../../assets/images/notificationset.png'),
    name: 'Notifications',
  },
  {
    src: require('../../assets/images/accountset.png'),
    name: 'Account',
  },
  {
    src: require('../../assets/images/ratingset.png'),
    name: 'Rate us',
  },
  {
    src: require('../../assets/images/feedbackset.png'),
    name: 'Feedback',
  },
  {
    src: require('../../assets/images/logoutset.png'),
    name: 'Logout',
  },
];

const Settings = () => {
  const [settings, setSettings] = useState('');
  const [searchedData, setSearchedData] = useState(null);
  const refRBSheet3 = useRef();

  const handleCategory = (value) => {
    setSettings(value);
    setSearchedData(null);
  };

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
          <View style={{marginTop: 20}}>
            <Searchbar />
          </View>
          <View style={styles.button}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.cat}>
                {settingsmenu.map((c, i) => (
                  <View
                    style={{
                      paddingVertical: 15,
                      marginTop: 10,
                      marginLeft: 30,
                    }}>
                    <TouchableOpacity
                      onPress={() => handleCategory(c.name)}
                      key={`${c.name}-${i}`}
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

        {settings === 'Languages' && <Languages />}
        {settings === 'Invite friends via WhatsApp' && <Invite />}
        {settings === 'Notifications' && <Notifications />}
        {settings === 'Account' && <Account />}
        {settings === 'Rate us' && <Rating />}
        {settings === 'Feedback' && <Feedback />}
        {settings === 'Logout' && <Languages />}
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
