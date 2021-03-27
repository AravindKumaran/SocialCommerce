import React, {useState, useEffect, useCallback} from 'react';

import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  TouchableOpacity
} from 'react-native';

import {API, graphqlOperation, Hub, Auth} from 'aws-amplify';
import {getPost, listComments} from '../../graphql/queries';
import TimeAgo from 'react-native-timeago';

import LoadingIndicator from '../Common/LoadingIndicator';
import AppText from '../Common/AppText';
import AppTextInput from '../Common/AppTextInput';
import AppButton from '../Common/AppButton';
import CommentLikes from './commentLikes';
import {
  updateComment,
  createComment,
  createNotification,
  createUserNotification,
} from '../../graphql/mutations';
import {useNavigation} from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';

// const user = {
//   __typename: 'User',
//   createdAt: '2021-01-01T17:03:46.393Z',
//   email: 'asfiidarlachu@gmail.com',
//   id: '0914c457-106d-4937-b44f-f430e611a52a',
//   imageUri: 'https://hieumobile.com/wp-content/uploads/avatar-among-us-6.jpg',
//   updatedAt: '2021-01-01T17:03:46.393Z',
//   username: 'Asfiya begum',
// };

const Comments = ({postId, postUserId}) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cmtText, setCmtText] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    Hub.listen('auth', ({payload: {event, data}}) => {
      switch (event) {
        case 'signIn':
        case 'cognitoHostedUI':
          console.log('Hub sign IN');
          getUser().then((userData) => {
            // console.log('User', userData);
            if (userData?.attributes) {
              setUser(userData.attributes);
            }
          });
          break;
        case 'signOut':
          console.log('Hub sign out');
          setUser(null);
          break;
        case 'signIn_failure':
        case 'cognitoHostedUI_failure':
          console.log('Sign in failure', data);
          break;
      }
    });

    getUser().then((userData) => {
      if (userData?.attributes) {
        setUser(userData.attributes);
      }
    });
  }, []);

  function getUser() {
    return Auth.currentAuthenticatedUser()
      .then((userData) => userData)
      .catch(() => console.log('Not signed in'));
  }

  const navigation = useNavigation();

  useEffect(() => {
    const getComments = async () => {
      try {
        setLoading(true);
        const res = await API.graphql(
          graphqlOperation(getPost, {
            id: postId,
          }),
        );
        console.log('ress', res.data.getPost.comments.items[0]);
        const allItems = res.data.getPost.comments.items;
        const sortedItems = allItems.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
        );
        setComments(sortedItems);

        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.log('Error', err);
      }
    };
    getComments();
  }, []);

  const handleCommentUnLike = async (comment) => {
    if (!user) {
      alert('Please login first');
      return;
    }
    const oldComment = comments.find((cmt) => cmt.id === comment.id);
    if (oldComment && oldComment?.likes?.length > 0) {
      const likesIndex = oldComment.likes.findIndex(
        (lkId) => lkId === user.sub,
      );
      if (likesIndex !== -1) {
        oldComment.likes.splice(likesIndex, 1);
        const likes = oldComment.likes;
        try {
          const res = await API.graphql(
            graphqlOperation(updateComment, {
              input: {id: comment.id, likes},
            }),
          );
          // console.log('ress', res.data);

          setLoading(false);
        } catch (err) {
          setLoading(false);
          console.log('Error', err);
        }
      }
    }
  };

  const handleCommentLike = async (comment) => {
    if (!user) {
      alert('Please login first');
      return;
    }
    const oldComment = comments.find((cmt) => cmt.id === comment.id);
    if (oldComment) {
      oldComment.likes.push(user.sub);
      const likes = oldComment.likes;
      try {
        const res = await API.graphql(
          graphqlOperation(updateComment, {
            input: {id: comment.id, likes},
          }),
        );
        // console.log('ress', res.data);
        const res33 = await API.graphql(
          graphqlOperation(createNotification, {
            input: {
              message: `liked your comment`,
            },
          }),
        );
        console.log('ress33', res33.data.createNotification.id);
        const res2 = await API.graphql(
          graphqlOperation(createUserNotification, {
            input: {
              userID: user.sub,
              notificationID: res33.data.createNotification.id,
              read: false,
              ownerID: comment.user.id,
            },
          }),
        );

        console.log('ress', res2.data);

        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.log('Error', err);
      }
    }
  };

  const handleSumbit = async () => {
    // console.log('Cliekd', cmtText);
    // return;

    if (!user) {
      alert('Please login first');
      return;
    }

    if (cmtText.length > 0) {
      const cmtt = {
        postId,
        userID: user.sub,
        text: cmtText,
        likes: [],
      };
      try {
        setLoading(true);
        const res = await API.graphql(
          graphqlOperation(createComment, {
            input: cmtt,
          }),
        );
        // console.log('ress', res.data.createComment);
        setComments([res.data.createComment, ...comments]);
        const res33 = await API.graphql(
          graphqlOperation(createNotification, {
            input: {
              message: `commented on your video`,
            },
          }),
        );
        console.log('ress33', res33.data.createNotification.id);
        const res2 = await API.graphql(
          graphqlOperation(createUserNotification, {
            input: {
              userID: user.sub,
              notificationID: res33.data.createNotification.id,
              read: false,
              ownerID: postUserId,
            },
          }),
        );

        console.log('ress', res2.data);
        setCmtText('');
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.log('Error', err);
        setCmtText('');
      }
    }
  };

  // const goBackSafe = () => {
  //   let parent = navigation;
  //   while (parent.dangerouslyGetState()?.index === 0 && parent.dangerouslyGetParent()) {
  //     parent = parent.dangerouslyGetParent();
  //   }
  //   parent?.goBack();
  // };

  return (
    <View style={styles.container}>
      {loading && <LoadingIndicator visible={loading} bgc="blue" />}
      <AppText
        style={{
          textAlign: 'center',
          fontSize: 16,
          marginVertical: 10,
          fontWeight: '700',
        }}>
        Comments ({comments.length})
      </AppText>

      {/* <TouchableOpacity
        // onPress={() => {
        //   navigation.goBack()
        // }}
        style={{bottom: 35, left: 5}}>
        <Feather name="chevron-left" size={30} color="#000000" />
      </TouchableOpacity> */}

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.cmList}>
          {comments.length > 0 &&
            comments.map((cm) => (
              <View styles={styles.cmCard} key={cm.id}>
                <View style={styles.cmCardContent}>
                  <View style={{width: 40, padding: 5}}>
                    <Image
                      source={{uri: cm.user.imageUri}}
                      style={{
                        height: 35,
                        width: 35,
                        borderRadius: 20,
                        top: 5,
                      }}
                    />
                  </View>

                  <View style={{flex: 1}}>
                    <AppText
                      style={{
                        textTransform: 'capitalize',
                        fontSize: 12,
                        fontWeight: '700',
                        color: '#20232A',
                        top: 5,
                      }}>
                      {cm.user.username}
                    </AppText>
                    <AppText
                      style={{
                        color: '#030303',
                        fontWeight: '400',
                        color: '#20232A',
                        fontSize: 12,
                        left: 80,
                        bottom: 20,
                      }}>
                      {cm.text}
                    </AppText>
                    <AppText
                      style={{
                        color: '#999999',
                        fontSize: 12,
                        fontWeight: '400',
                        marginBottom: 20,
                        bottom: 25,
                      }}>
                      <TimeAgo time={cm.createdAt} />
                    </AppText>
                  </View>

                  <CommentLikes
                    likes={cm.likes}
                    onLike={handleCommentLike}
                    onUnlike={handleCommentUnLike}
                    comment={cm}
                    user={user}
                  />
                </View>
              </View>
            ))}
        </View>
      </ScrollView>

      <View style={styles.commentForm}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : null}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
          <AppTextInput
            // style={{color: '#FEFEFE'}}
            placeholder="Type your comment here..."
            autoCapitalize="none"
            autoCorrect={false}
            // numberOfLines={3}
            value={cmtText}
            name={cmtText}
            // multiline={true}
            maxLength={200}
            onChangeText={(text) => setCmtText(text)}
            onSubmitEditing={handleSumbit}
          />
        </KeyboardAvoidingView>
        {/* <AppButton
          btnStyle={{
            width: 150,
            height: 30,
            marginHorizontal: 10,
            marginVertical: 15,
            alignSelf: 'center',
          }}
          onPress={handleSumbit}
          title="Submit"
        /> */}
        {/* <Image
          source={require('../../assets/images/Bline.png')}
          size={25}
          style={{alignSelf: 'center'}}
        /> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: '#EBEBEB',
  },
  cmList: {
    marginTop: 5,
  },
  cmCardContent: {
    flexDirection: 'row',
    marginVertical: -15,
    borderBottomColor: '#ebe9e9',
    // borderBottomWidth: 2,
  },
  commentForm: {
    flexDirection: 'column',
    bottom: 10,
  },
});

export default Comments;
