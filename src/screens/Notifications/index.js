import React, {Component} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {Header} from 'react-native-elements';

const Notifications = () => {
  const user = [
    {
      name: 'Tamil25',
      photo: 'https://i.stack.imgur.com/t8vJf.jpg?s=328&g=1',
      comment: 'commented on your photo.',
      createdat: '11m',
      reply: 'Reply',
      liked: 'https://i.stack.imgur.com/t8vJf.jpg?s=328&g=1',
    },
    {
      name: 'Eren45',
      photo: 'https://i.stack.imgur.com/t8vJf.jpg?s=328&g=1',
      comment: 'commented on your photo.',
      createdat: '22m',
      reply: 'Reply',
      liked: 'https://i.stack.imgur.com/t8vJf.jpg?s=328&g=1',
    },
    {
      name: 'Mikasa',
      photo: 'https://i.stack.imgur.com/t8vJf.jpg?s=328&g=1',
      comment: 'commented on your photo.',
      createdat: '33m',
      reply: 'Reply',
      liked: 'https://i.stack.imgur.com/t8vJf.jpg?s=328&g=1',
    },
    {
      name: 'Armin65',
      photo: 'https://i.stack.imgur.com/t8vJf.jpg?s=328&g=1',
      comment: 'commented on your photo.',
      createdat: '44m',
      reply: 'Reply',
      liked: 'https://i.stack.imgur.com/t8vJf.jpg?s=328&g=1',
    },
    {
      name: 'Levi75',
      photo: 'https://i.stack.imgur.com/t8vJf.jpg?s=328&g=1',
      comment: 'commented on your photo.',
      createdat: '50m',
      reply: 'Reply',
      liked: 'https://i.stack.imgur.com/t8vJf.jpg?s=328&g=1',
    },
    {
      name: 'Hange85',
      photo: 'https://i.stack.imgur.com/t8vJf.jpg?s=328&g=1',
      comment: 'commented on your photo.',
      createdat: '56m',
      reply: 'Reply',
      liked: 'https://i.stack.imgur.com/t8vJf.jpg?s=328&g=1',
    },
  ];

  return (
    <View style={styles.container}>
      <View style={{left: 0, top: 65}}>
        <Text style={styles.text1}>Notifications</Text>
        <Image
          source={require('../../assets/images/Thinline.png')}
          size={25}
          style={{bottom: 160, left: 0, zIndex: 1}}
        />
        <Text style={styles.text2}>Today</Text>
      </View>

      <View>
        {user.map((v, i) => {
          return (
            <View key={i} style={{top: 30, margin: -30, left: 25}}>
              <View style={{right: 80, bottom: 65}}>
                <Text
                  style={{
                    color: '#FFFFFF',
                    fontFamily: 'Proxima Nova',
                    fontWeight: '700',
                    fontSize: 14,
                  }}>
                  {v.name}
                </Text>
              </View>

              <View style={{left: 50, bottom: 83}}>
                <Text
                  style={{
                    color: '#FFFFFF',
                    right: 60,
                    fontFamily: 'Proxima Nova',
                    fontWeight: '400',
                    fontSize: 12,
                  }}>
                  {v.comment}
                </Text>
              </View>

              <View style={{right: 130, bottom: 110, margin: 0}}>
                <Image
                  source={{uri: v.photo}}
                  style={{height: 35, width: 35, borderRadius: 20}}
                />
              </View>

              <View style={{left: 210, bottom: 135}}>
                <Text
                  style={{
                    color: '#5C5C5C',
                    right: 60,
                    fontFamily: 'Proxima Nova',
                    fontWeight: '400',
                    fontSize: 12,
                  }}>
                  {v.createdat}
                </Text>
              </View>

              {/* <View style={{left: 90, bottom: 126}}>
                <Text style={{ color: '#999999', right: 60,fontFamily: 'Proxima Nova' , fontWeight: '700', fontSize: 12}}>{v.reply}</Text>
              </View> */}

              <View style={{left: 260, bottom: 140}}>
                <Text
                  style={{
                    color: '#999999',
                    right: 60,
                    fontFamily: 'Proxima Nova',
                    fontWeight: '700',
                    fontSize: 10,
                  }}>
                  {v.likes}
                </Text>
              </View>

              <View style={{left: 200, bottom: 173}}>
                <Image
                  source={{uri: v.liked}}
                  style={{height: 30, width: 30}}
                />
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#20232A',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    top: 0,
  },
  text1: {
    color: '#FFFFFF',
    fontFamily: 'Proxima Nova',
    fontWeight: '700',
    fontSize: 24,
    bottom: 180,
    left: 10,
    zIndex: 1,
  },
  text2: {
    color: '#51565D',
    fontFamily: 'Proxima Nova',
    fontWeight: '400',
    fontSize: 12,
    bottom: 150,
    left: 170,
    zIndex: 1,
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
