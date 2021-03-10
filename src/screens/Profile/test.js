// // import React, {useEffect, useRef, useState, useCallback} from 'react';
// // import {
// //   View,
// //   Text,
// //   TextInput,
// //   TouchableOpacity,
// //   ActivityIndicator,
// //   StyleSheet
// // } from 'react-native';
// // import LinearGradient from 'react-native-linear-gradient';
// // import {v4 as uuidv4, v4} from 'uuid';

// // import {Storage, API, graphqlOperation, Auth} from 'aws-amplify';
// // import {useRoute, useNavigation} from '@react-navigation/native';
// // import {withAuthenticator} from 'aws-amplify-react-native';
// // import {createPost} from '../../graphql/mutations';
// // import {WebView} from 'react-native-webview';

// // const ProfileScreen = () => {
// //   const [user, setUser] = useState(null);

// //   return (
// //     <View style={styles.container}>
// //       <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#c1c1c1', '#ffffff']} style={styles.Rectangle} >
// //         <View />
// //       </LinearGradient>
// //       <Text>Profile</Text>
// //     </View>
// //   );
// // };

// // export default ProfileScreen;

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: '#20232A',
// //     justifyContent: 'center',
// //     alignContent: 'center',
// //     alignItems: 'center',
// //     top: 0
// //   },
// //   text1: {
// //     color: '#FFFFFF',
// //     fontFamily: 'Proxima Nova',
// //     fontWeight: '700',
// //     fontSize: 24,
// //     bottom: 180,
// //     left: 10,
// //     zIndex: 1
// //   },
// //   text2: {
// //     color: '#51565D',
// //     fontFamily: 'Proxima Nova',
// //     fontWeight: '400',
// //     fontSize: 12,
// //     bottom: 150,
// //     left: 170,
// //     zIndex: 1
// //   },
// //   Rectangle: {
// //     bottom: 0,
// //     width: 370,
// //     height: 200,
// //     borderRadius: 10,
// //     left: 5,
// //     opacity: 0.8
// //   },
// // });

// import React, {useEffect, useRef, useState, useCallback} from 'react';
// import {v4 as uuidv4, v4} from 'uuid';

// import {Storage, API, graphqlOperation, Auth} from 'aws-amplify';
// import {useRoute, useNavigation} from '@react-navigation/native';
// import {withAuthenticator} from 'aws-amplify-react-native';
// // import styles from './styles';
// import {createPost} from '../../graphql/mutations';
// import {WebView} from 'react-native-webview';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   ActivityIndicator,
//   StyleSheet,
//   Image,
//   ImageBackground,
// } from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
// import Feather from 'react-native-vector-icons/Feather';

// const ProfileScreen = () => {
//   const [user, setUser] = useState(null);

//   // function signin() {
//   //   Auth.federatedSignIn({provider: 'google'});
//   // }

//   const signin = useCallback(() => {
//     Auth.federatedSignIn({provider: 'google'});
//     setUser(true);
//   }, []);

//   useEffect(() => {
//     Auth.currentAuthenticatedUser()
//       .then((user) => {
//         console.log('USer', user);
//         user.getUserData((err, userData) => {
//           setUser({
//             email: user.attributes.email,
//           });
//         });
//       })
//       .catch((error) => {
//         setUser(null);
//       });
//   }, []);

//   return (
//     <View style={styles.container}>
//       <View>
//         <Image
//           style={styles.user}
//           source={require('../../assets/images/User.png')}
//         />
//       </View>

//       <View style={styles.container1}>
//         <View style={styles.box}>
//           <LinearGradient
//             start={{x: 0, y: 0}}
//             end={{x: 0, y: 1}}
//             colors={['#141414', '#232323']}
//             style={styles.Rectangle}>
//             <View />
//           </LinearGradient>

//           <Image
//             style={styles.img1}
//             source={require('../../assets/images/Pline.png')}
//           />
//           <Image
//             style={styles.img2}
//             source={require('../../assets/images/Pline.png')}
//           />
//         </View>

//         <View style={styles.icon}>
//           <TouchableOpacity style={styles.t1}>
//             <Feather style={styles.icon1} name={'activity'} size={25} />
//           </TouchableOpacity>

//           <TouchableOpacity style={styles.t2}>
//             <Feather style={styles.icon2} name={'bar-chart'} size={25} />
//           </TouchableOpacity>

//           <TouchableOpacity style={styles.t3}>
//             <Feather style={styles.icon3} name={'edit'} size={25} />
//           </TouchableOpacity>
//         </View>

//         <View
//           style={{
//             alignContent: 'center',
//             alignItems: 'center',
//             justifyContent: 'center',
//           }}>
//           <Text
//             style={{
//               fontFamily: 'Proxima Nova',
//               fontWeight: '700',
//               fontSize: 16,
//               bottom: 180,
//             }}>
//             Mikasa_45
//           </Text>
//           <Text
//             style={{
//               fontFamily: 'Proxima Nova',
//               fontWeight: '400',
//               fontSize: 12,
//               bottom: 175,
//               right: 30,
//             }}>
//             Monster_Hunter
//           </Text>
//           <Text
//             style={{
//               fontFamily: 'Proxima Nova',
//               fontWeight: '400',
//               fontSize: 12,
//               bottom: 190,
//               left: 40,
//             }}>
//             . Mar 15
//           </Text>
//           <Text
//             style={{
//               fontFamily: 'Proxima Nova',
//               fontWeight: '400',
//               fontSize: 12,
//               bottom: 161,
//               right: 100,
//             }}>
//             Folowers
//           </Text>
//           <Text
//             style={{
//               fontFamily: 'Proxima Nova',
//               fontWeight: '700',
//               fontSize: 16,
//               bottom: 155,
//               right: 100,
//             }}>
//             10k
//           </Text>
//           <Text
//             style={{
//               fontFamily: 'Proxima Nova',
//               fontWeight: '400',
//               fontSize: 12,
//               bottom: 198,
//             }}>
//             Following
//           </Text>
//           <Text
//             style={{
//               fontFamily: 'Proxima Nova',
//               fontWeight: '700',
//               fontSize: 16,
//               bottom: 192,
//             }}>
//             100
//           </Text>
//           <Text
//             style={{
//               fontFamily: 'Proxima Nova',
//               fontWeight: '400',
//               fontSize: 12,
//               bottom: 235,
//               left: 100,
//             }}>
//             Posts
//           </Text>
//           <Text
//             style={{
//               fontFamily: 'Proxima Nova',
//               fontWeight: '700',
//               fontSize: 16,
//               bottom: 230,
//               left: 100,
//             }}>
//             500
//           </Text>
//           <Text
//             style={{
//               fontFamily: 'Proxima Nova',
//               fontWeight: '700',
//               fontSize: 16,
//               bottom: 210,
//               left: 20,
//             }}>
//             View Analytics
//           </Text>
//         </View>
//       </View>
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
//     top: 0,
//   },
//   container1: {
//     top: 10,
//     zIndex: 1,
//   },
//   box: {
//     right: 135,
//   },
//   user: {
//     height: 300,
//     width: 400,
//     bottom: 140,
//     borderRadius: 50,
//   },
//   text1: {
//     color: '#FFFFFF',
//     fontFamily: 'Proxima Nova',
//     fontWeight: '700',
//     fontSize: 24,
//     bottom: 180,
//     left: 10,
//     zIndex: 1,
//   },
//   text2: {
//     color: '#51565D',
//     fontFamily: 'Proxima Nova',
//     fontWeight: '400',
//     fontSize: 12,
//     bottom: 150,
//     left: 170,
//     zIndex: 1,
//   },
//   Rectangle: {
//     bottom: 0,
//     width: 370,
//     height: 200,
//     borderRadius: 10,
//     left: 5,
//     opacity: 0.8,
//     position: 'absolute',
//     // zIndex: 1
//   },
//   line1: {
//     height: 10,
//     width: 300,
//     color: 'red',
//     top: 200,
//   },
//   img1: {
//     bottom: 56,
//     position: 'absolute',
//   },
//   img2: {
//     bottom: 122,
//     position: 'absolute',
//   },
//   t1: {
//     position: 'absolute',
//     zIndex: 1,
//   },
//   t2: {
//     position: 'absolute',
//     zIndex: 1,
//   },
//   t3: {
//     position: 'absolute',
//     zIndex: 1,
//   },
//   icon: {
//     left: 55,
//   },
//   icon1: {
//     position: 'absolute',
//     bottom: 20,
//     right: 40,
//   },
//   icon2: {
//     position: 'absolute',
//     bottom: 160,
//     left: 140,
//     transform: [{scaleX: -1}, {rotate: '90deg'}],
//   },
//   icon3: {
//     bottom: 160,
//     right: 140,
//     position: 'absolute',
//   },
// });


import { coverer } from 'aws-amplify-react-native/dist/AmplifyUI';
import React, {Component, useState} from 'react';
import {View, Image, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import { FlatList, ScrollView } from 'react-native';
import styles from '../../components/Post/styles';
// import Video from 'react-native-af-video-player'
import VideoPlayer from 'react-native-video-player';
import Video from 'react-native-video';

const Trending = () => {
  const [paused, setPaused] = useState(false);
  const onPlayPausePress = () => {
    setPaused(!paused);
  };

  return (
      <View style={{
        flex: 1,
        width: 400,
        height: 400,
        top: 150,
        backgroundColor: '#20232A'
      }}>
        <View style={{left: 5, top: 5}}>
        {/* <TouchableWithoutFeedback onPress={onPlayPausePress}> */}
        <View style={{
          flex: 1,
          width: 166,
          height: 257,
          position: 'absolute',
          // backgroundColor: 'red'
        }} >
        <Video
        muted={true}
        // paused={true}
        // thumbnail={{ uri: 'https://th.bing.com/th/id/OPA.0wlIXou2gXpavQ474C474?w=160&h=220&rs=1&o=5&dpr=1.25&pid=21.1' }}
        source={{uri: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4"}} 
        resizeMode='cover'
        style={StyleSheet.absoluteFill}
        />
        
        {/* <Image source={require('../../assets/images/R1.png')} />  */}
        </View>
        {/* </TouchableWithoutFeedback> */}
        <View style={{
          flex: 1,
          width: 166,
          height: 173,
          top: 262,
          position: 'absolute',
          // backgroundColor: 'pink'
        }} >
        <Video
        muted={true}
        source={{uri: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4"}} 
        resizeMode='cover'
        style={StyleSheet.absoluteFill}
        />
        {/* <Image source={require('../../assets/images/R2.png')} />  */}
        </View>

        <View style={{
          flex: 1,
          width: 166,
          height: 120,
          top: 442,
          position: 'absolute',
          // backgroundColor: 'yellow'
        }} >
        <Video
        muted={true} 
        source={{uri: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4"}} 
        resizeMode='cover'
        style={StyleSheet.absoluteFill}
        />
        {/* <Image source={require('../../assets/images/R3.png')} />  */}
        </View>

        </View>

        <View style={{right: -5, top: 5}}>

        <View style={{
          flex: 1,
          width: 103,
          height: 108,
          left: 171,
          position: 'absolute',
          // backgroundColor: 'orange'
        }} >
        <Video
        muted={true}
        source={{uri: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4"}} 
        resizeMode='cover'
        style={StyleSheet.absoluteFill}
        />
        {/* <Image source={require('../../assets/images/R4.png')} />  */}
        </View>

        <View style={{
          flex: 1,
          width: 103,
          height: 108,
          left: 280,
          position: 'absolute',
          // backgroundColor: 'green'
        }} >
        <Video
        muted={true} 
        source={{uri: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4"}} 
        resizeMode='cover'
        style={StyleSheet.absoluteFill}
        />
        {/* <Image source={require('../../assets/images/R5.png')} />  */}
        </View>

        <View style={{
          flex: 1,
          width: 103,
          height: 108,
          left: 171,
          top: 115,
          position: 'absolute',
          
        }} >
        <Video
        muted={true} 
        source={{uri: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4"}} 
        resizeMode='cover'
        style={StyleSheet.absoluteFill}
        />
        {/* <Image source={require('../../assets/images/R6.png')} />  */}
        </View>

        <View style={{
          flex: 1,
          width: 103,
          height: 108,
          left: 280,
          top: 115,
          position: 'absolute',
          // backgroundColor: 'violet'
        }} >
        <Video
        muted={true} 
        source={{uri: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4"}} 
        resizeMode='cover'
        style={StyleSheet.absoluteFill}
        />
        {/* <Image source={require('../../assets/images/R7.png')} />  */}
        </View>

        <View style={{
          flex: 1,
          width: 215,
          height: 257,
          left: 171,
          top: 230,
          position: 'absolute',
          // backgroundColor: 'purple'
        }} >
        <Video
        muted={true} 
        source={{uri: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4"}} 
        resizeMode='cover'
        style={StyleSheet.absoluteFill}
        />
        {/* <Image source={require('../../assets/images/R8.png')} />  */}
        </View>
        
        <View style={{
          flex: 1,
          width: 215,
          height: 166,
          left: 171,
          top: 495,
          position: 'absolute',
          // backgroundColor: 'grey'
        }} >
        <Video
        muted={true} 
        source={{uri: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4"}} 
        resizeMode='cover'
        style={StyleSheet.absoluteFill}
        />
        {/* <Image source={require('../../assets/images/R8.png')} />  */}
        </View>
        </View>
      </View>
  );
};

export default Trending;

// import { coverer } from 'aws-amplify-react-native/dist/AmplifyUI';
// import React, {Component} from 'react';
// import {View, Image} from 'react-native';
// import MasonryList from "react-native-masonry-list";
// import Searchbar from '../Search/searchbar';

// const Notification = () => {
//     return (
//       <MasonryList
//       spacing={1}
//             images={[
//                 { source: require("../../assets/images/R1.png"),
//                   completeCustomComponent: {left: 10},
//                   dimensions: {height: 257, width: 166 }},
                
//                 { source: require("../../assets/images/R2.png"),
//                   dimensions: {height: 173, width: 165 }},

//                 { source: require("../../assets/images/R3.png"),
//                   dimensions: {height: 125, width: 165 }},

//                 { source: require("../../assets/images/R4.png"),
//                   dimensions: {height: 108, width: 103 }},

//                 { source: require("../../assets/images/R5.png"),
//                   dimensions: {height: 108, width: 103 }},

//                 { source: require("../../assets/images/R6.png"),
//                   dimensions: {height: 108, width: 103 }},

//                 { source: require("../../assets/images/R7.png"),
//                   dimensions: {height: 108, width: 103 }},

//                 { source: require("../../assets/images/R8.png"),
//                   dimensions: {height: 257, width: 215 }}
//             ]}
//         />
//     );
// };

// export default Notification;


{/* <MasonryList
            images={[
                { uri: "https://luehangs.site/pic-chat-app-images/beautiful-blond-blonde-hair-478544.jpg", 
                dimensions: { width: 166, height: 257 }, },
                { source: { uri: "https://luehangs.site/pic-chat-app-images/beautiful-beautiful-women-beauty-40901.jpg",
                dimensions: { width: 100, height: 100 } } },
                { uri: "https://luehangs.site/pic-chat-app-images/animals-avian-beach-760984.jpg",
                    dimensions: { width: 100, height: 100 } },
                { URI: "https://luehangs.site/pic-chat-app-images/beautiful-blond-fishnet-stockings-48134.jpg",
                    id: "blpccx4cn" },
                { url: "https://luehangs.site/pic-chat-app-images/beautiful-beautiful-woman-beauty-9763.jpg",
                dimensions: { width: 100, height: 100 } },
                { URL: "https://luehangs.site/pic-chat-app-images/attractive-balance-beautiful-186263.jpg",
                dimensions: { width: 100, height: 100 } },
                { uri: "https://luehangs.site/pic-chat-app-images/beautiful-blond-blonde-hair-478544.jpg", 
                dimensions: { width: 165, height: 173 }},
                { source: { uri: "https://luehangs.site/pic-chat-app-images/beautiful-beautiful-women-beauty-40901.jpg" } },
                { uri: "https://luehangs.site/pic-chat-app-images/animals-avian-beach-760984.jpg",
                    dimensions: { width: 215, height: 257 } },
                { URI: "https://luehangs.site/pic-chat-app-images/beautiful-blond-fishnet-stockings-48134.jpg",
                    id: "blpccx4cn" },
                { url: "https://luehangs.site/pic-chat-app-images/beautiful-beautiful-woman-beauty-9763.jpg",
                dimensions: { width: 165, height: 125 } },
            ]}
        /> */}