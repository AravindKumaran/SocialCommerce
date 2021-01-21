// /**
//  * @flow
//  */
// 'use strict';
// // import { View, StyleSheet, Animated, TouchableOpacity } from 'react-native';
// // import * as Animatable from 'react-native-animatable';

// /**
//  * Start and exit animations of Custom Tabs.
//  * Slide in from left at start, Slide out to right.at exit.
//  */
// export const ANIMATIONS_SLIDE: Animations = {
//   startEnter: 'slide_in_right',
//   startExit: 'slide_out_left',
//   endEnter: 'android:anim/slide_in_left',
//   endExit: 'android:anim/slide_out_right',
// };

// /**
//  * Start and exit animations of Custom Tabs.
//  * Fade in at start, Fade out  at exit.
//  */
// export const ANIMATIONS_FADE: Animations = {
//   startEnter: 'android:anim/fade_in',
//   startExit: 'android:anim/fade_out',
//   endEnter: 'android:anim/fade_in',
//   endExit: 'android:anim/fade_out',
// };

// export type Animations = {
//   startEnter: string,
//   startExit: string,
//   endEnter: string,
//   endExit: string,
// }

// /**
//  * Options to customize Custom Tabs of look & feel.
//  */
// export type TabOption = {

//   /**
//    * the Toolbar color.
//    * Supported formats are: #RRGGBB, #AARRGGBB, etc.
//    *
//    * {@link http://d.android.com/reference/android/graphics/Color.html#parseColor(java.lang.String) Color.parseColor(String)}
//    */
//   toolbarColor?: string;

//   /**
//    * Enables the url bar to hide as the user scrolls down on the page.
//    */
//   enableUrlBarHiding?: boolean;

//   /**
//    * Sets whether the title should be shown in the custom tab.
//    */
//   showPageTitle?: boolean;

//   /**
//    * Whether to add a default shared items of the menu.
//    */
//   enableDefaultShare?: boolean;

//   /**
//    * Sets the exit and start animations.
//    *
//    * Each property needs to be an Andrion animation resource ID,
//    * e.g. 'com.github.droibit.android.reactnative.customtabs.example:anim/slide_out_bottom'
//    *
//    * @see ANIMATIONS_FADE
//    * @see ANIMATIONS_SLIDE
//    */
//   animations?: Animations;

//   /**
//    * Sets any custom headers that should be used.
//    */
//   headers?: Object;

//   /**
//    * Workaround that Custom Tabs doesn't close on redirecting back to app scheme.
//    */
//   forceCloseOnRedirection?: boolean;
// };


// import { Linking, Alert } from 'react-native'
// import { InAppBrowser } from 'react-native-inappbrowser-reborn'

// ...
//   async openLink() {
//     try {
//       const url = 'https://www.google.com'
//       if (await InAppBrowser.isAvailable()) {
//         const result = await InAppBrowser.open(url, {
//           // iOS Properties
//           dismissButtonStyle: 'cancel',
//           preferredBarTintColor: '#453AA4',
//           preferredControlTintColor: 'white',
//           readerMode: false,
//           animated: true,
//           modalPresentationStyle: 'fullScreen',
//           modalTransitionStyle: 'coverVertical',
//           modalEnabled: true,
//           enableBarCollapsing: false,
//           // Android Properties
//           showTitle: true,
//           toolbarColor: '#6200EE',
//           secondaryToolbarColor: 'black',
//           enableUrlBarHiding: true,
//           enableDefaultShare: true,
//           forceCloseOnRedirection: false,
//           // Specify full animation resource identifier(package:anim/name)
//           // or only resource name(in case of animation bundled with app).
//           animations: {
//             startEnter: 'slide_in_right',
//             startExit: 'slide_out_left',
//             endEnter: 'slide_in_left',
//             endExit: 'slide_out_right'
//           },
//           headers: {
//             'my-custom-header': 'my custom header value'
//           }
//         })
//         Alert.alert(JSON.stringify(result))
//       }
//       else Linking.openURL(url)
//     } catch (error) {
//       Alert.alert(error.message)
//     }
//   }




// import { Platform } from 'react-native'
// export const getDeepLink = (path = "") => {
//   const scheme = 'my-scheme'
//   const prefix = Platform.OS == 'android' ? `${scheme}://my-host/` : `${scheme}://`
//   return prefix + path
// }



// import { Root } from 'native-base'
// import { getDeepLink } from './utilities'
// import { createStackNavigator } from 'react-navigation'

// const Main = createStackNavigator(
//   {
//     SplashComponent: { screen: SplashComponent },
//     LoginComponent: { screen: LoginComponent },
//     HomeComponent: { screen: HomeComponent },
//     CallbackComponent: { //Redirect users to the Home page if they are authenticated, otherwise to Login page...
//       screen: CallbackComponent,
//       path: 'callback/' //Enable Deep linking redirection to get the auth_token
//     }
//   },
//   {
//     index: 0,
//     initialRouteName: 'SplashComponent',
//     headerMode: 'none'
//   }
// )
// ...
//   render() {
//     return (
//       <Root>
//         <Main uriPrefix={getDeepLink()} />
//       </Root>
//     )
//   }
// ...




// import { Linking } from 'react-native'
// import { InAppBrowser } from 'react-native-inappbrowser-reborn'
// import { getDeepLink } from './utilities'
// ...
//   async onLogin() {
//     const deepLink = getDeepLink("callback")
//     const url = `https://my-auth-login-page.com?redirect_uri=${deepLink}`
//     try {
//       if (await InAppBrowser.isAvailable()) {
//         InAppBrowser.openAuth(url, deepLink, {
//           // iOS Properties
//           ephemeralWebSession: false,
//           // Android Properties
//           showTitle: false,
//           enableUrlBarHiding: true,
//           enableDefaultShare: false
//         }).then((response) => {
//           if (
//             response.type === 'success' &&
//             response.url
//           ) {
//             Linking.openURL(response.url)
//           }
//         })
//       } else Linking.openURL(url)
//     } catch (error) {
//       Linking.openURL(url)
//     }
//   }
// ...




// async componentDidMount() {
//     // Play Lottie Animation :)

//     // Validate the stored access token (Maybe with a request)
//     // Redirect the user to the Home page if the token is still valid
//     // Otherwise redirect to the Login page
//   };





//   async componentDidMount() {
//     // Play Lottie Animation :)
//     try {
//       await this.loadUserInfo()
//       // Redirect to the Home page
//     } catch (error) {
//       // Show error and redirect the user to the Login page
//     }
//   };

//   async loadUserInfo() {
//     const { navigation } = this.props
//     const { state: { params } } = navigation
//     const { code, error } = params || {}

//     if (code) {
//       // Get and Save the access token request, user info...
//     }
//     else {
//       return Promise.reject(new Error(error))
//     }
//   };



//   async openInBrowser(url) {
//     try {
//       const oldStyle = StatusBar.pushStackEntry({ barStyle: 'dark-content', animate: false });
//       await InAppBrowser.open(url)
//       StatusBar.popStackEntry(oldStyle);
//     } catch (error) {
//       Alert.alert(error.message)
//     }
//   });



//   async openInBrowser(url) {
//     try {
//       StatusBar.setBarStyle('dark-content')
//       await InAppBrowser.open(url)
//     } catch (error) {
//       Alert.alert(error.message)
//     }
//   });



// // patch StatusBar.setBarStyle to make style accessible
// const _setBarStyle = StatusBar.setBarStyle
// StatusBar.setBarStyle = (style) => {
//   StatusBar.currentStyle = style
//   _setBarStyle(style)
// };



// async openInBrowser(url) {
//     try {
//       const oldStyle = StatusBar.currentStyle
//       StatusBar.setBarStyle('dark-content')
//       await InAppBrowser.open(url)
//       if(oldStyle) StatusBar.setBarStyle(oldStyle)
//     } catch (error) {
//       Alert.alert(error.message)
//     }
//   });



// import React from 'react';
// import './App.css';
// import { Amplify } from '@aws-amplify/core';
// import { Auth, CognitoHostedUIIdentityProvider } from '@aws-amplify/auth';
// import awsconfig from './aws-exports';

// Amplify.configure(awsconfig);

//  function App() {
//   React.useEffect(() => {
//     (async () => {
//       const userInfo = await Auth.currentUserInfo();
//       console.log({userInfo});
//     })();
//   })
 
//   function hostedUISignIn() {
//     Auth.federatedSignIn({provider: CognitoHostedUIIdentityProvider.Google});
//   }

//   return (
//     <div className="App">
//       <header className="App-header">
//         <button onClick={hostedUISignIn}>sign in with hosted ui</button>
//       </header>
//     </div>
//   );
// }

// export default App;