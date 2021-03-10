import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image, ScrollView} from 'react-native';
import {API, graphqlOperation, Storage} from 'aws-amplify';
import {listUserNotifications} from '../../graphql/queries';
import AppText from '../../components/Common/AppText';
import TimeAgo from 'react-native-timeago';

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

const user1 = {
  __typename: 'User',
  createdAt: '2021-01-01T17:03:46.393Z',
  email: 'asfiidarlachu@gmail.com',
  id: '0914c457-106d-4937-b44f-f430e611a52a',
  imageUri: 'https://hieumobile.com/wp-content/uploads/avatar-among-us-6.jpg',
  updatedAt: '2021-01-01T17:03:46.393Z',
  username: 'Asfiya begum',
};

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const getAllNotifications = async () => {
      try {
        const res = await API.graphql(
          graphqlOperation(listUserNotifications, {
            filter: {
              userID: {eq: user1.id},
            },
          }),
        );
        // console.log('ress', res.data.listUserNotifications.items);
        setNotifications(res.data.listUserNotifications.items);
      } catch (err) {
        console.log('Error', err);
      }
    };
    getAllNotifications();
  }, []);

  return (
    <View style={styles.container}>
      <View style={{marginBottom: 20, padding: 15}}>
        <Text style={styles.text1}>Notifications</Text>
        <Image
          source={require('../../assets/images/Thinline.png')}
          size={25}
          style={{width: '100%', paddingTop: 5}}
        />
      </View>
      <ScrollView>
        {notifications.map((ntf, i) => {
          return (
            <View key={ntf.id} style={styles.ntfCard}>
              <View style={{width: 40, marginHorizontal: 10}}>
                <Image
                  source={{uri: ntf.user.imageUri}}
                  style={{
                    height: 35,
                    width: 35,
                    borderRadius: 20,
                    marginTop: 7,
                  }}
                />
              </View>
              <View style={{flex: 1}}>
                <AppText style={{color: '#fff'}}>
                  {ntf.notification.message}
                </AppText>
                <AppText
                  style={{
                    color: '#999999',
                    fontSize: 14,
                    fontWeight: '400',
                  }}>
                  <TimeAgo time={ntf.createdAt} />
                </AppText>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#20232A',
    color: '#fff',
  },

  ntfCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 10,
    marginHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc7c7',
    padding: 10,
    paddingBottom: 20,
  },
  text1: {
    color: '#FFFFFF',
    fontFamily: 'Proxima Nova',
    fontWeight: '700',
    fontSize: 24,
    textAlign: 'center',
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
