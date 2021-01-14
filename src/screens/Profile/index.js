import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { v4 as uuidv4, v4 } from 'uuid';

import { Storage, API, graphqlOperation, Auth } from 'aws-amplify';
import { useRoute, useNavigation } from '@react-navigation/native';
import { withAuthenticator } from 'aws-amplify-react-native';
import styles from './styles';
import { createPost } from '../../graphql/mutations';


const ProfileScreen = () => {

  const [user, setUser] = useState(null);
  const signin = useCallback(() => {
    Auth.federatedSignIn({ provider: 'google' });
    setUser(true);
  }, []);

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then((user) => {
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

  return (
    <View style={styles.container}>
      {user === null ? (
        <TouchableOpacity onPress={signin}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Sign in</Text>
          </View>
        </TouchableOpacity>
      ) : (
          <>
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
    </View>
  );
};

export default ProfileScreen;
