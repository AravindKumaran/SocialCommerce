import React, { useState, useEffect } from 'react';

import {
  StyleSheet,
  Image,
  TouchableOpacity,
  View,
  ToastAndroid,
} from 'react-native';

const PostLike = ({ isTouched, likes, onLike, onUnlike, currentPost, user }) => {
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const loadLikes = async () => {
      // console.log('FirstCall', user);
      if (likes?.length > 0) {
        if (user) {
          const checkLiked = likes.findIndex((id) => {
            return user.email === id;
          });
          if (checkLiked !== -1) {
            setIsLiked(true);
          }
        } else {
          likes.forEach(() => setIsLiked(false));
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
        console.log('I am called1');
        await onUnlike(currentPost);
        setIsLiked(false);
      }
    } else {
      if (user) {
        console.log('I am called2');
        await onLike(currentPost);
        setIsLiked(true);
      }
    }
  };

  return (
    <View
      style={[
        { position: 'absolute', right: 20, bottom: 0, top: 50 },
        isTouched ? { top: -60 } : '',
      ]}>
      {isLiked ? (
        <TouchableOpacity onPress={handleLike}>
          <Image
            style={{ height: 45, width: 45, opacity: 0.7, }}
            source={require('../../assets/images/Like_icon1.png')}
            size={25}
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={handleLike}>
          <Image
            style={{
              height: 45, width: 45, opacity: 0.7,
            }}

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
