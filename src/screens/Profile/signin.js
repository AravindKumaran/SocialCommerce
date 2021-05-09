// import React, { useEffect, useRef, useState, useCallback } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   ActivityIndicator,
// } from 'react-native';
// import { v4 as uuidv4, v4 } from 'uuid';

// import { Storage, API, graphqlOperation, Auth } from 'aws-amplify';
// import { useRoute, useNavigation } from '@react-navigation/native';
// import { withAuthenticator } from 'aws-amplify-react-native';
// import styles from './styles';
// import { createPost } from '../../graphql/mutations';
// import { WebView } from 'react-native-webview';

// const Signin = () => {
//     Auth.federatedSignIn({provider: 'google'});
//   return (
//     <WebView
//     originWhitelist={['*']}
//     source={{ uri: 'https://livebox951e0a7a-951e0a7a-staging.auth.ap-south-1.amazoncognito.com/login?redirect_uri=tiktok%3A%2F%2F&response_type=code&client_id=7dcbjoer98feb1f4spbn5p0g4l&identity_provider=google&scope=phone%20email%20openid%20profile%20aws.cognito.signin.user.admin&state=HcXprhpFinnP0yJWLg97AzKH0WvvD348&code_challenge=zyasMIpb4FzSb_x3T91xzwFKlQp_X5o3CV_L60nS1lM&code_challenge_method=S256&errorMessage=Login+option+is+not+available.+Please+try+another+one' }}
//     />
//   );
// };

// export default Signin;

// function signin() {
//     Auth.federatedSignIn({provider: 'google'});

//     return(

// )
//     }

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
import {WebView} from 'react-native-webview';

const ProfileScreen = () => {
  const [user, setUser] = useState(null);

  // function signin() {
  //   Auth.federatedSignIn({provider: 'google'});
  // }

  const signin = useCallback(() => {
    Auth.federatedSignIn({provider: 'google'});
    setUser(true);
  }, []);

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then((user) => {
        console.log('USer', user);
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
        // <TouchableOpacity onPress={signin}>
        //   <View style={styles.button}>
        <WebView
          style={styles.button}
          onPress={signin}
          originWhitelist={['*']}
          source={{
            uri:
              'https://livebox951e0a7a-951e0a7a-staging.auth.ap-south-1.amazoncognito.com/login?redirect_uri=tiktok%3A%2F%2F&response_type=code&client_id=7dcbjoer98feb1f4spbn5p0g4l&identity_provider=google&scope=phone%20email%20openid%20profile%20aws.cognito.signin.user.admin&state=HcXprhpFinnP0yJWLg97AzKH0WvvD348&code_challenge=zyasMIpb4FzSb_x3T91xzwFKlQp_X5o3CV_L60nS1lM&code_challenge_method=S256&errorMessage=Login+option+is+not+available.+Please+try+another+one',
          }}
        />
      ) : (
        //     <Text style={styles.buttonText}>Sign in</Text>
        //   </View>
        // </TouchableOpacity>
        // <Text style={styles.buttonText}>Sign in</Text>
        // </View>
        // </TouchableOpacity>
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

// // import * as React from 'react';
// // import { Text, View, StyleSheet,ActivityIndicator } from 'react-native';
// // import { WebView } from 'react-native-webview';

// // import { Card } from 'react-native-paper';
// //  function LoadingIndicatorView() {
// //     return <ActivityIndicator color='#009b88' size='large' />
// //   }

// // renderLoading={this.LoadingIndicatorView}
// // startInLoadingState={true}

// // export default function App() {
// //   return (
// //    <WebView
// //         originWhitelist={['*']}
// //         source={{ uri: 'https://livebox951e0a7a-951e0a7a-staging.auth.ap-south-1.amazoncognito.com/login?redirect_uri=tiktok%3A%2F%2F&response_type=code&client_id=7dcbjoer98feb1f4spbn5p0g4l&identity_provider=google&scope=phone%20email%20openid%20profile%20aws.cognito.signin.user.admin&state=HcXprhpFinnP0yJWLg97AzKH0WvvD348&code_challenge=zyasMIpb4FzSb_x3T91xzwFKlQp_X5o3CV_L60nS1lM&code_challenge_method=S256&errorMessage=Login+option+is+not+available.+Please+try+another+one' }}
// //       />
// //   );
// // }
