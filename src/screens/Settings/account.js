import React, {useEffect, useRef, useState, useCallback} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import {ImageBackground} from 'react-native';

const Account = () => {
  const [privacy, setPrivacy] = useState(false);
  const [linkSocialMedia, setLinkSocialMedia] = useState(false);
  const [terms, setTerms] = useState(false);
  const [deleteAccount, setDeleteAccount] = useState(false);
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.text1}>Account</Text>
      <View>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={{
            alignSelf: 'center',
            alignSelf: 'flex-start',
            marginLeft: 10,
            bottom: 20,
          }}>
          <Feather name={'chevron-left'} size={20} />
        </TouchableOpacity>
      </View>

      <View style={{flexDirection: 'column'}}>
        <TouchableOpacity onPress={() => setPrivacy(true)}>
          <Text style={styles.text2}>Privacy</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setLinkSocialMedia(true)}>
          <Text style={styles.text2}>Link Social Media Accounts</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setTerms(true)}>
          <Text style={styles.text2}>Terms Of Use</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setDeleteAccount(true)}>
          <Text style={[styles.text2, styles.text3]}>Delete account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 20,
    backgroundColor: 'transparent',
  },
  text1: {
    color: '#FFFFFF',
    fontWeight: '700',
    textAlign: 'center',
    fontFamily: 'Proxima Nova',
    fontSize: 16,
  },
  text2: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontFamily: 'Proxima Nova',
    fontSize: 16,
    margin: 20,
  },
  text3: {
    color: 'red',
  },
});

export default Account;
