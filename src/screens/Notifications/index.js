import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

class Notification extends Component {
  state = {};
  render() {
    return (
      <View style={styles.container}>
        <Text>Notification</Text>
      </View>
    );
  }
}

export default Notification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
});






// import React, { useState } from 'react';
// import {StyleSheet, View, Text, Image, Dimensions, ScrollView, TextInput} from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
// import Post from '../../components/Post';
// import { API, graphqlOperation, Storage } from 'aws-amplify';
// import {getComments} from './src/graphql/queries';

// const Notification = (props) => {

//   const fetchComments = async () => {
//     const userInfo = await Auth.currentAuthenticatedUser({bypassCache: true});
//     if (!userInfo) {
//       return;
//     } 

//     const getUserResponse = await API.graphql(
//       graphqlOperation(getUser, {id: userInfo.attributes.sub}),
//     ); 
//   };

//   const [comment, setComment] = useState('');
//   const [post, setPost] = useState(props.post);

  
//   return (
//     <View style={styles.coverer}>
//       {/* <LinearGradient colors={["#EFFAFF", "#EDFDFF"]} style={styles.linearGradient}> */}
        
//         <View>
//         <Image source={require('../../assets/images/Bline.png')} size={25} style={{ top: 250, left: 10 }} />
//         <Image source={require('../../assets/images/Lline.png')} size={25} style={{ bottom: 290, right: 100 }} />
//         <Image source={require('../../assets/images/Tline.png')} size={25} style={{ bottom: 320, left: 50 }} />
//         <Image source={require('../../assets/images/Dline.png')} size={25} style={{ top: 200, left: 60 }} />
//         <Text style={styles.text1}>Comments</Text>
        
//         <ScrollView>
//         <TextInput
//             value={comment}
//             onChangeText={setComment}
//             numberOfLines={5}
//             placeholder={'Comment'}
//             style={styles.textInput}
//           />
//         <Text style={styles.text2}>Enter your comments</Text>
//         <Image style={styles.img}>{post.user.userimage}</Image>
//         <Text style={styles.handle}>{post.user.username}</Text>
//         <Text style={styles.statsLabel}>{post.comments}</Text>
        
//         </ScrollView>
//         </View>
//       {/* </LinearGradient>  */}

//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   coverer: {
//     flex: 1,
//     borderRadius: 30,
//     justifyContent: 'center',
//     alignItems: 'center',
//     alignContent: 'center',
//     width: '100%',
//     backgroundColor: 'green'
//   },
//   linearGradient: {
//     width: '100%',
//     height: '100%',
//     opacity: 0.95,
//     justifyContent: 'center',
//     alignItems: 'center'
//   },
//   text1: {
//     color: '#20232A',
//     position: 'absolute',
//     fontFamily: 'Proxima Nova',
//     fontWeight: '700',
//     fontSize: 16,
//     left: 30,
//     bottom: 300,
//     justifyContent: 'center',
//     alignItems: 'center',
//     alignContent: 'center',
//   },
//   text2: {
//     color: 'green'
//   },
//   text: {
//     color: 'green'
//   },
//   statsLabel: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: '600',
//     marginTop: 5,
//   },
// });

// export default Notification;