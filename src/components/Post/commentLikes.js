import React, {useState, useEffect} from 'react';

import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';

const user = {
  __typename: 'User',
  createdAt: '2021-01-01T17:03:46.393Z',
  email: 'asfiidarlachu@gmail.com',
  id: '0914c457-106d-4937-b44f-f430e611a52a',
  imageUri: 'https://hieumobile.com/wp-content/uploads/avatar-among-us-6.jpg',
  updatedAt: '2021-01-01T17:03:46.393Z',
  username: 'Asfiya begum',
};

const CommentLikes = ({likes}) => {
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (likes?.length > 0) {
      const checkLiked = likes.findIndex((id) => user.id === id);
      console.log('checkLiked', checkLiked);
      if (checkLiked !== -1) {
        setIsLiked(true);
      }
    }
  }, []);

  const handleLike = () => {
    console.log('Likees');
  };

  return (
    <>
      {isLiked ? (
        <TouchableOpacity onPress={handleLike}>
          <AntDesign name="heart" size={25} color="#000" />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={handleLike}>
          <AntDesign name="hearto" size={25} color="#000" />
        </TouchableOpacity>
      )}
    </>
  );
};

const styles = StyleSheet.create({});

export default CommentLikes;
