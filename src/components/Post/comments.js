import React, {useState, useEffect, useCallback} from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  Image,
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import {API, graphqlOperation} from 'aws-amplify';
import {getPost, listComments} from '../../graphql/queries';
import TimeAgo from 'react-native-timeago';

import LoadingIndicator from '../Common/LoadingIndicator';
import AppText from '../Common/AppText';
import {TextInput} from 'react-native-gesture-handler';
import CommentLikes from './commentLikes';

const user = {
  __typename: 'User',
  createdAt: '2021-01-01T17:03:46.393Z',
  email: 'asfiidarlachu@gmail.com',
  id: '0914c457-106d-4937-b44f-f430e611a52a',
  imageUri: 'https://hieumobile.com/wp-content/uploads/avatar-among-us-6.jpg',
  updatedAt: '2021-01-01T17:03:46.393Z',
  username: 'Asfiya begum',
};

const Comments = ({postId}) => {
  // console.log('PostId', postId);

  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getComments = async () => {
      try {
        setLoading(true);
        const res = await API.graphql(
          graphqlOperation(getPost, {
            id: '633fc656-7c1f-4059-a97b-49a9d0c26671',
          }),
        );
        // console.log('ress', res.data.getPost.comments.items);
        setComments(res.data.getPost.comments.items);

        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.log('Error', err);
      }
    };
    getComments();
  }, []);

  return (
    <View style={styles.container}>
      {loading && <LoadingIndicator asOverlay />}
      <View>
        <Text style={styles.text1}>Comments {comments.length}</Text>
        <Image
          source={require('../../assets/images/Bline.png')}
          size={25}
          style={{top: 280, left: 115, zIndex: 1}}
        />
        <TouchableOpacity>
          <View>
            <Image
              source={require('../../assets/images/Lline.png')}
              size={25}
              style={{bottom: 240, right: 0, zIndex: 1}}
            />
          </View>
        </TouchableOpacity>
        <Image
          source={require('../../assets/images/Tline.png')}
          size={25}
          style={{bottom: 270, left: 175, zIndex: 1}}
        />
        <Image
          source={require('../../assets/images/Dline.png')}
          size={25}
          style={{top: 230, left: 175, zIndex: 1}}
        />
      </View>
      <View>
        {comments.length > 0 &&
          comments.map((cm) => {
            return (
              <View key={cm.id} style={{top: 10, margin: -30, left: 25}}>
                <View style={{right: 70, bottom: 70}}>
                  <AppText
                    style={{
                      color: '#20232A',
                      fontFamily: 'Proxima Nova',
                      fontWeight: '700',
                      fontSize: 16,
                    }}>
                    {cm.user.username}
                  </AppText>
                  <AppText
                    style={{
                      color: '#20232A',
                      fontSize: 14,
                    }}>
                    {cm.text}
                  </AppText>
                  <AppText
                    style={{
                      color: '#20232A',
                      fontSize: 12,
                    }}>
                    <TimeAgo time={cm.createdAt} />
                  </AppText>
                </View>
                {/*
                <View style={{left: 50, bottom: 87}}>
                  <Text
                    style={{
                      color: '#20232A',
                      right: 60,
                      fontFamily: 'Proxima Nova',
                      fontWeight: '400',
                      fontSize: 12,
                    }}>
                    {cm.text}
                  </Text>
                </View> */}

                <View style={{right: 130, bottom: 100, margin: 0}}>
                  <Image
                    source={{uri: cm.user.imageUri}}
                    style={{height: 30, width: 35, borderRadius: 20}}
                  />
                </View>

                <View style={{right: 10, bottom: 110}}>
                  <Text
                    style={{
                      color: '#999999',
                      right: 60,
                      fontFamily: 'Proxima Nova',
                      fontWeight: '400',
                      fontSize: 12,
                    }}>
                    {cm.createdat}
                  </Text>
                </View>

                <View style={{left: 260, bottom: 140}}>
                  <Text
                    style={{
                      color: '#999999',
                      right: 60,
                      fontFamily: 'Proxima Nova',
                      fontWeight: '700',
                      fontSize: 10,
                    }}>
                    {cm.likes.length}
                  </Text>
                </View>

                <View style={{left: 203, bottom: 180}}>
                  <CommentLikes likes={cm.likes} />
                </View>
              </View>
            );
          })}
      </View>

      <View>
        <TextInput placeholder={'Enter your comments'} style={styles.input} />
        <TouchableOpacity>
          <Text style={styles.com}>Post</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingTop: Constants.statusBarHeight,
//     backgroundColor: '#ecf0f1',
//     padding: 8,
//   },
// });

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    flexDirection: 'row',
    borderTopWidth: 1,
    borderColor: '#EEE',
    alignItems: 'center',
    paddingLeft: 15,
    right: -20,
    bottom: 430,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 170,
    backgroundColor: '#EDFDFF',
    borderRadius: 30,
    zIndex: 1,
  },
  img: {
    height: 110,
    width: 100,
    right: 150,
    bottom: 100,
    borderRadius: 30,
  },
  text1: {
    color: '#20232A',
    position: 'absolute',
    fontFamily: 'Proxima Nova',
    fontWeight: '700',
    fontSize: 16,
    left: 150,
    bottom: 250,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  text2: {
    color: '#20232A',
    position: 'absolute',
    fontFamily: 'Proxima Nova',
    fontWeight: '700',
    fontSize: 16,
    width: 100,
    left: 0,
    bottom: 160,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  text3: {
    color: '#20232A',
    position: 'absolute',
    fontFamily: 'Proxima Nova',
    fontWeight: '700',
    fontSize: 16,
    left: 80,
    bottom: 140,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  text4: {
    color: '#20232A',
    position: 'absolute',
    fontFamily: 'Proxima Nova',
    fontWeight: '700',
    fontSize: 16,
    left: 0,
    bottom: 100,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 15,
    top: 230,
    right: 120,
  },
  button: {
    height: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    top: 230,
    right: 30,
  },
  inactive: {
    color: '#CCC',
  },
  text: {
    color: '#3F51B5',
    fontWeight: 'bold',
    fontFamily: 'Avenir',
    textAlign: 'center',
    fontSize: 15,
  },
  comment: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    right: 220,
    top: 200,
    fontSize: 16,
    fontFamily: 'Proxima Nova',
    width: 250,
  },
  com: {
    fontSize: 16,
    fontFamily: 'Proxima Nova',
    color: '#20232A',
    top: 165,
    left: 50,
    fontWeight: '700',
  },
});

export default Comments;
