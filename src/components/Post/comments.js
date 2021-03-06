import React, {useState, useEffect, useCallback, useRef} from 'react';

import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';

import {API, graphqlOperation, Hub, Auth} from 'aws-amplify';
import {getPost, listComments, getComment} from '../../graphql/queries';
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

import useInfiniteScroll from './useInfiniteScroll';

const Comments = ({postId, postUserId, curUser, route}) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cmtText, setCmtText] = useState('');
  const [user, setUser] = useState(null);
  const [message] = useState('Please login first');

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
      ToastAndroid.show(message, ToastAndroid.SHORT);

      return;
    }
    const oldComment = comments.find((cmt) => cmt.id === comment.id);
    if (oldComment && oldComment?.likes?.length > 0) {
      const likesIndex = oldComment.likes.findIndex(
        (lkId) => lkId === user.email,
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
      ToastAndroid.show(message, ToastAndroid.SHORT);
      return;
    }
    const oldComment = comments.find((cmt) => cmt.id === comment.id);
    if (oldComment) {
      oldComment.likes.push(user.email);
      const likes = oldComment.likes;
      try {
        const res = await API.graphql(
          graphqlOperation(updateComment, {
            input: {id: comment.id, likes},
          }),
        );
        console.log('ress1', res.data);
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
              userID: user.email,
              notificationID: res33.data.createNotification.id,
              read: false,
              ownerID: comment.user.id,
              postID: postId,
            },
          }),
        );

        console.log('ress2', res2.data);

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
      ToastAndroid.show(message, ToastAndroid.SHORT);
      return;
    }

    if (cmtText.length > 0) {
      const cmtt = {
        postId,
        userID: user.email,
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
              userID: user.email,
              notificationID: res33.data.createNotification.id,
              read: false,
              ownerID: postUserId,
              postID: postId,
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

  const refScrollView = useRef(null);
  const moveTo = () => {
    // refScrollView.current.scrollTo({y: 250, animated: true});
    refScrollView.current.scrollToEnd();
  };

  return (
    <View style={styles.container}>
      {loading && <LoadingIndicator visible={loading} bgc="blue" />}
      <AppText
        style={{
          textAlign: 'center',
          fontSize: 16,
          marginVertical: 10,
          fontWeight: '700',
          marginTop: -35,
        }}>
        Comments ({comments.length})
      </AppText>

      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        ref={refScrollView}>
        <View style={styles.cmList}>
          {comments.length > 0 &&
            comments.map((cm) => (
              <View styles={styles.cmCard} key={cm.id}>
                <View style={styles.cmCardContent}>
                  <View style={{width: 40, padding: 5}}>
                    <Image
                      source={{uri: cm?.user?.imageUri}}
                      style={{
                        height: 35,
                        width: 35,
                        borderRadius: 20,
                        top: 20,
                      }}
                    />
                  </View>

                  <View style={{flex: 1}}>
                    <Text style={{top: 20, marginBottom: 15, margin: 5}}>
                      <AppText
                        style={{
                          textTransform: 'capitalize',
                          fontSize: 12,
                          fontWeight: '700',
                          color: '#20232A',
                          // top: 5,
                        }}>
                        {cm?.user?.username}
                      </AppText>{' '}
                      <AppText
                        style={{
                          color: '#030303',
                          fontWeight: '400',
                          color: '#20232A',
                          fontSize: 12,
                          // left: 110,
                          // bottom: 20,
                        }}>
                        {cm.text}
                      </AppText>
                    </Text>
                    <AppText
                      style={{
                        color: '#999999',
                        fontSize: 12,
                        fontWeight: '400',
                        marginBottom: 20,
                        top: 0,
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

      <TouchableOpacity onPress={moveTo}>
        <Feather
          name="chevron-down"
          size={30}
          color="#999999"
          style={{
            alignContent: 'center',
            alignSelf: 'center',
            alignItems: 'center',
          }}
        />
      </TouchableOpacity>

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
