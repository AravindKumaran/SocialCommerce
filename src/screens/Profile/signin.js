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


// function signin() {
//     Auth.federatedSignIn({provider: 'google'});
// };
// render{
//     return(
//     <WebView 
//     onPress = {signin}
//     originWhitelist={['*']}
//     source={{ uri: 'https://tiktok24dfe314-24dfe314-demo.auth.us-east-2.amazoncognito.com/login?redirect_uri=tiktok%3A%2F%2F&response_type=code&client_id=7dcbjoer98feb1f4spbn5p0g4l&identity_provider=google&scope=phone%20email%20openid%20profile%20aws.cognito.signin.user.admin&state=HcXprhpFinnP0yJWLg97AzKH0WvvD348&code_challenge=zyasMIpb4FzSb_x3T91xzwFKlQp_X5o3CV_L60nS1lM&code_challenge_method=S256&errorMessage=Login+option+is+not+available.+Please+try+another+one' }}       
//     />
// )
// };