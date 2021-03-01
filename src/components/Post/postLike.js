import React, {useState, useEffect} from 'react';

import {StyleSheet, Image, TouchableOpacity, View} from 'react-native';

import AppText from '../Common/AppText';

const user = {
  __typename: 'User',
  createdAt: '2021-01-01T17:03:46.393Z',
  email: 'asfiidarlachu@gmail.com',
  id: '0914c457-106d-4937-b44f-f430e611a52a',
  imageUri: 'https://hieumobile.com/wp-content/uploads/avatar-among-us-6.jpg',
  updatedAt: '2021-01-01T17:03:46.393Z',
  username: 'Asfiya begum',
};

const PostLike = ({isTouched, likes, onLike, onUnlike, currentPost}) => {
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (likes?.length > 0) {
      // console.log('Likes', likes, 'iddd', id);
      const checkLiked = likes.findIndex((id) => user.id === id);
      // console.log('checkLiked', checkLiked);
      if (checkLiked !== -1) {
        setIsLiked(true);
      }
    }
  }, []);

  const handleLike = () => {
    if (isLiked) {
      onUnlike(currentPost);
      setIsLiked(false);
    } else {
      onLike(currentPost);
      setIsLiked(true);
    }
  };

  return (
    <View
      style={[
        {position: 'absolute', right: 20, bottom: 0, top: 50},
        isTouched ? {top: -60} : '',
      ]}>
      {isLiked ? (
        <TouchableOpacity onPress={handleLike}>
          <Image
            source={require('../../assets/images/Like_icon1.png')}
            size={25}
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={handleLike}>
          <Image
            source={require('../../assets/images/Like_icon.png')}
            size={25}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({});

export default PostLike;
