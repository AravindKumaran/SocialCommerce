import React, {useEffect, useRef, useState, useCallback} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {v4 as uuidv4, v4} from 'uuid';

import {Storage, API, graphqlOperation, Auth} from 'aws-amplify';
import {useRoute, useNavigation} from '@react-navigation/native';
import {withAuthenticator} from 'aws-amplify-react-native';
import {createPost} from '../../graphql/mutations';
import {WebView} from 'react-native-webview';

const ProfileScreen = () => {
  const [user, setUser] = useState(null);

  return (
    <View style={styles.container}>
      <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#c1c1c1', '#ffffff']} style={styles.Rectangle} >
        <View />
      </LinearGradient>
      <Text>Profile</Text>
    </View>
  );
};



export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#20232A',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    top: 0
  },
  text1: {
    color: '#FFFFFF',
    fontFamily: 'Proxima Nova',
    fontWeight: '700',
    fontSize: 24,
    bottom: 180,
    left: 10,
    zIndex: 1
  },
  text2: {
    color: '#51565D',
    fontFamily: 'Proxima Nova',
    fontWeight: '400',
    fontSize: 12,
    bottom: 150,
    left: 170,
    zIndex: 1
  },
  Rectangle: {
    bottom: 0,
    width: 370,
    height: 200,
    borderRadius: 10,
    left: 5,
    opacity: 0.8
  },
});


