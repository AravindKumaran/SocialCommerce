import React, {useState, useEffect, useCallback} from 'react';

import {StyleSheet, View, Text, ScrollView, Image} from 'react-native';

import {API, graphqlOperation} from 'aws-amplify';
import {getPost, listComments} from '../../graphql/queries';
import TimeAgo from 'react-native-timeago';

import LoadingIndicator from '../Common/LoadingIndicator';
import AppText from '../Common/AppText';
import AppTextInput from '../Common/AppTextInput';
import AppButton from '../Common/AppButton';
import CommentLikes from './commentLikes';
import {updateComment, createComment} from '../../graphql/mutations';

const user = {
  __typename: 'User',
  createdAt: '2021-01-01T17:03:46.393Z',
  email: 'asfiidarlachu@gmail.com',
  id: '0914c457-106d-4937-b44f-f430e611a52a',
  imageUri: 'https://hieumobile.com/wp-content/uploads/avatar-among-us-6.jpg',
  updatedAt: '2021-01-01T17:03:46.393Z',
  username: 'Asfiya begum',
};

const commentsa = [
  {
    createdAt: '2021-02-27T06:15:31.473Z',
    id: '22ad6a5cb3c7032f4505219028b74649575fecf1',
    likes: ['0914c457-106d-4937-b44f-f430e611a52a'],
    postId: '633fc656-7c1f-4059-a97b-49a9d0c26671',
    text:
      'This is my first comment,This is my first comment,This is my first comment,This is my first comment,This is my first comment,This is my first comment,This is my first comment,This is my first comment,This is my first comment,This is my first comment,This is my first comment',
    updatedAt: '2021-02-27T06:15:31.473Z',
    user: {
      createdAt: '2021-01-01T17:03:46.393Z',
      email: 'asfiidarlachu@gmail.com',
      id: '0914c457-106d-4937-b44f-f430e611a52a',
      imageUri:
        'https://hieumobile.com/wp-content/uploads/avatar-among-us-6.jpg',
      posts: [Object],
      updatedAt: '2021-01-01T17:03:46.393Z',
      username: 'Asfiya begum',
    },
    userID: '0914c457-106d-4937-b44f-f430e611a52a',
  },
  {
    createdAt: '2021-02-27T06:15:31.473Z',
    id: '22ad6a5cb3c7032f4505219028b74649575fecf2',
    likes: ['0914c457-106d-4937-b44f-f430e611a52a'],
    postId: '633fc656-7c1f-4059-a97b-49a9d0c26671',
    text: 'This is my first comment',
    updatedAt: '2021-02-27T06:15:31.473Z',
    user: {
      createdAt: '2021-01-01T17:03:46.393Z',
      email: 'asfiidarlachu@gmail.com',
      id: '0914c457-106d-4937-b44f-f430e611a52a',
      imageUri:
        'https://hieumobile.com/wp-content/uploads/avatar-among-us-6.jpg',
      posts: [Object],
      updatedAt: '2021-01-01T17:03:46.393Z',
      username: 'Asfiya begum',
    },
    userID: '0914c457-106d-4937-b44f-f430e611a52a',
  },
  {
    createdAt: '2021-02-27T06:15:31.473Z',
    id: '22ad6a5cb3c7032f4505219028b74649575fecf3',
    likes: ['0914c457-106d-4937-b44f-f430e611a52a'],
    postId: '633fc656-7c1f-4059-a97b-49a9d0c26671',
    text: 'This is my first comment',
    updatedAt: '2021-02-27T06:15:31.473Z',
    user: {
      createdAt: '2021-01-01T17:03:46.393Z',
      email: 'asfiidarlachu@gmail.com',
      id: '0914c457-106d-4937-b44f-f430e611a52a',
      imageUri:
        'https://hieumobile.com/wp-content/uploads/avatar-among-us-6.jpg',
      posts: [Object],
      updatedAt: '2021-01-01T17:03:46.393Z',
      username: 'Asfiya begum',
    },
    userID: '0914c457-106d-4937-b44f-f430e611a52a',
  },
  {
    createdAt: '2021-02-27T06:15:31.473Z',
    id: '22ad6a5cb3c7032f4505219028b74649575fecf4',
    likes: ['0914c457-106d-4937-b44f-f430e611a52a'],
    postId: '633fc656-7c1f-4059-a97b-49a9d0c26671',
    text: 'This is my first comment',
    updatedAt: '2021-02-27T06:15:31.473Z',
    user: {
      createdAt: '2021-01-01T17:03:46.393Z',
      email: 'asfiidarlachu@gmail.com',
      id: '0914c457-106d-4937-b44f-f430e611a52a',
      imageUri:
        'https://hieumobile.com/wp-content/uploads/avatar-among-us-6.jpg',
      posts: [Object],
      updatedAt: '2021-01-01T17:03:46.393Z',
      username: 'Asfiya begum',
    },
    userID: '0914c457-106d-4937-b44f-f430e611a52a',
  },
  {
    createdAt: '2021-02-27T06:15:31.473Z',
    id: '22ad6a5cb3c7032f4505219028b74649575fecf5',
    likes: ['0914c457-106d-4937-b44f-f430e611a52a'],
    postId: '633fc656-7c1f-4059-a97b-49a9d0c26671',
    text: 'This is my first comment',
    updatedAt: '2021-02-27T06:15:31.473Z',
    user: {
      createdAt: '2021-01-01T17:03:46.393Z',
      email: 'asfiidarlachu@gmail.com',
      id: '0914c457-106d-4937-b44f-f430e611a52a',
      imageUri:
        'https://hieumobile.com/wp-content/uploads/avatar-among-us-6.jpg',
      posts: [Object],
      updatedAt: '2021-01-01T17:03:46.393Z',
      username: 'Asfiya begum',
    },
    userID: '0914c457-106d-4937-b44f-f430e611a52a',
  },
  {
    createdAt: '2021-02-27T06:15:31.473Z',
    id: '22ad6a5cb3c7032f4505219028b74649575fecf6',
    likes: ['0914c457-106d-4937-b44f-f430e611a53a'],
    postId: '633fc656-7c1f-4059-a97b-49a9d0c26671',
    text: 'This is my first comment',
    updatedAt: '2021-02-27T06:15:31.473Z',
    user: {
      createdAt: '2021-01-01T17:03:46.393Z',
      email: 'asfiidarlachu@gmail.com',
      id: '0914c457-106d-4937-b44f-f430e611a52a',
      imageUri:
        'https://hieumobile.com/wp-content/uploads/avatar-among-us-6.jpg',
      posts: [Object],
      updatedAt: '2021-01-01T17:03:46.393Z',
      username: 'Asfiya begum',
    },
    userID: '0914c457-106d-4937-b44f-f430e611a52a',
  },
];

const Comments = ({postId}) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cmtText, setCmtText] = useState('');

  useEffect(() => {
    const getComments = async () => {
      try {
        setLoading(true);
        const res = await API.graphql(
          graphqlOperation(getPost, {
            id: postId,
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

  const handleCommentUnLike = async (commentId) => {
    const oldComment = comments.find((cmt) => cmt.id === commentId);
    if (oldComment && oldComment?.likes?.length > 0) {
      const likesIndex = oldComment.likes.findIndex((lkId) => lkId === user.id);
      oldComment.likes.splice(likesIndex, 1);
      const likes = oldComment.likes;
      try {
        const res = await API.graphql(
          graphqlOperation(updateComment, {
            input: {id: commentId, likes},
          }),
        );
        // console.log('ress', res.data);

        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.log('Error', err);
      }
    }
  };

  const handleCommentLike = async (commentId) => {
    const oldComment = comments.find((cmt) => cmt.id === commentId);
    if (oldComment) {
      oldComment.likes.push(user.id);
      const likes = oldComment.likes;
      try {
        const res = await API.graphql(
          graphqlOperation(updateComment, {
            input: {id: commentId, likes},
          }),
        );
        // console.log('ress', res.data);

        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.log('Error', err);
      }
    }
  };

  const handleSumbit = async () => {
    if (cmtText.length > 0) {
      console.log('Cliekd', cmtText);
      const cmtt = {
        postId,
        userID: user.id,
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
        console.log('ress', res.data.createComment);
        setComments([res.data.createComment, ...comments]);
        setCmtText('');
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.log('Error', err);
        setCmtText('');
      }
    }
  };

  return (
    <ScrollView style={styles.container}>
      <AppText style={{textAlign: 'center', fontSize: 20, marginVertical: 10}}>
        Comments ({comments.length})
      </AppText>

      <View style={styles.commentForm}>
        <AppTextInput
          placeholder="Add your comment"
          autoCapitalize="none"
          autoCorrect={false}
          numberOfLines={3}
          value={cmtText}
          name={cmtText}
          multiline={true}
          maxLength={200}
          onChangeText={(text) => setCmtText(text)}
        />
        <AppButton
          btnStyle={{
            width: 150,
            marginHorizontal: 10,
            marginVertical: 15,
            alignSelf: 'flex-end',
          }}
          onPress={handleSumbit}
          title="Submit"
        />
      </View>
      {loading && <LoadingIndicator visible={loading} />}
      <View style={styles.cmList}>
        {comments.length > 0 &&
          comments.map((cm) => (
            <View styles={styles.cmCard} key={cm.id}>
              <View style={styles.cmCardContent}>
                <View style={{width: 40, padding: 5}}>
                  <Image
                    source={{uri: cm.user.imageUri}}
                    style={{height: 30, width: 35, borderRadius: 20}}
                  />
                </View>

                <View style={{flex: 1}}>
                  <AppText
                    style={{
                      textTransform: 'capitalize',
                      fontSize: 18,
                      fontWeight: '700',
                      color: '#20232A'
                    }}>
                    {cm.user.username}
                  </AppText>
                  <AppText
                    style={{
                      color: '#030303',
                      fontWeight: '400',
                      color: '#20232A',
                      fontSize: 14,
                    }}>
                    {cm.text}
                  </AppText>
                  <AppText
                    style={{
                      color: '#999999',
                      fontSize: 14,
                      fontWeight: '400'
                    }}>
                    <TimeAgo time={cm.createdAt} />
                  </AppText>
                </View>

                <CommentLikes
                  likes={cm.likes}
                  onLike={handleCommentLike}
                  onUnlike={handleCommentUnLike}
                  id={cm.id}
                />
              </View>
            </View>
          ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: '#f9f9f9',
  },
  cmList: {
    marginTop: 5,
  },
  cmCardContent: {
    flexDirection: 'row',
    marginVertical: 8,
    borderBottomColor: '#ebe9e9',
    borderBottomWidth: 2,
  },
  commentForm: {
    flexDirection: 'column',
  },
});

export default Comments;
