import React, {useState, useEffect, useRef} from 'react';

import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ToastAndroid,
} from 'react-native';
import AppText from '../Common/AppText';
import {Auth} from 'aws-amplify';

import Feather from 'react-native-vector-icons/Feather';

const user = {
  __typename: 'User',
  createdAt: '2021-01-01T17:03:46.393Z',
  email: 'asfiidarlachu@gmail.com',
  id: '0914c457-106d-4937-b44f-f430e611a52a',
  imageUri: 'https://hieumobile.com/wp-content/uploads/avatar-among-us-6.jpg',
  updatedAt: '2021-01-01T17:03:46.393Z',
  username: 'Asfiya begum',
};

const CommentLikes = ({likes, onLike, onUnlike, comment, user}) => {
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const loadLikes = async () => {
      if (likes?.length > 0) {
        try {
          if (user) {
            const checkLiked = likes.findIndex((id) => user.email === id);
            if (checkLiked !== -1) {
              setIsLiked(true);
            }
          } else {
            likes.forEach((like) => {
              setIsLiked(false);
            });
          }
        } catch (error) {
          console.log('Error');
        }
      }
    };

    loadLikes();
  }, [user]);

  const handleLike = async () => {
    if (!user) {
      ToastAndroid.show('Please Login First', ToastAndroid.SHORT);
      return;
    }
    if (isLiked) {
      if (user) {
        await onUnlike(comment);
        console.log('I am called1');
        setIsLiked(false);
      }
    } else {
      if (user) {
        await onLike(comment);
        console.log('I am called2', user);
        setIsLiked(true);
      }
    }
  };

  return (
    <View style={{paddingHorizontal: 8, top: 20}}>
      {isLiked ? (
        <TouchableOpacity onPress={handleLike} style={styles.iconWrapper}>
          <Image
            source={require('../../assets/images/Cl3.png')}
            size={20}
            style={{height: 25, width: 25, top: 8, left: 2}}
          />
          {/* <Feather name={'heart'} size={25} style={{color: '#999999'}}  /> */}
          <AppText style={{fontSize: 10, left: 2, color: '#999999'}}>
            {likes.length}
          </AppText>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={handleLike} style={styles.iconWrapper}>
          <Image
            source={require('../../assets/images/Cl1.png')}
            size={20}
            style={{height: 20, width: 20, top: 10}}
          />
          <AppText style={{fontSize: 10, top: 5, color: '#999999'}}>
            {likes.length}
          </AppText>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  iconWrapper: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CommentLikes;
