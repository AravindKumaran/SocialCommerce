// import React, {useEffect, useRef, useState, useCallback} from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   ActivityIndicator,
//   StyleSheet
// } from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
// import {v4 as uuidv4, v4} from 'uuid';

// import {Storage, API, graphqlOperation, Auth} from 'aws-amplify';
// import {useRoute, useNavigation} from '@react-navigation/native';
// import {withAuthenticator} from 'aws-amplify-react-native';
// import {createPost} from '../../graphql/mutations';
// import {WebView} from 'react-native-webview';

// const ProfileScreen = () => {
//   const [user, setUser] = useState(null);

//   return (
//     <View style={styles.container}>
//       <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#c1c1c1', '#ffffff']} style={styles.Rectangle} >
//         <View />
//       </LinearGradient>
//       <Text>Profile</Text>
//     </View>
//   );
// };

// export default ProfileScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#20232A',
//     justifyContent: 'center',
//     alignContent: 'center',
//     alignItems: 'center',
//     top: 0
//   },
//   text1: {
//     color: '#FFFFFF',
//     fontFamily: 'Proxima Nova',
//     fontWeight: '700',
//     fontSize: 24,
//     bottom: 180,
//     left: 10,
//     zIndex: 1
//   },
//   text2: {
//     color: '#51565D',
//     fontFamily: 'Proxima Nova',
//     fontWeight: '400',
//     fontSize: 12,
//     bottom: 150,
//     left: 170,
//     zIndex: 1
//   },
//   Rectangle: {
//     bottom: 0,
//     width: 370,
//     height: 200,
//     borderRadius: 10,
//     left: 5,
//     opacity: 0.8
//   },
// });

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
              'https://tiktok24dfe314-24dfe314-demo.auth.us-east-2.amazoncognito.com/login?redirect_uri=tiktok%3A%2F%2F&response_type=code&client_id=7dcbjoer98feb1f4spbn5p0g4l&identity_provider=google&scope=phone%20email%20openid%20profile%20aws.cognito.signin.user.admin&state=HcXprhpFinnP0yJWLg97AzKH0WvvD348&code_challenge=zyasMIpb4FzSb_x3T91xzwFKlQp_X5o3CV_L60nS1lM&code_challenge_method=S256&errorMessage=Login+option+is+not+available.+Please+try+another+one',
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
