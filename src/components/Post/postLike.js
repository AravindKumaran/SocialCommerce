import React, {useState, useEffect} from 'react';

import {StyleSheet, Image, TouchableOpacity, View} from 'react-native';

const PostLike = ({isTouched, likes, onLike, onUnlike, currentPost, user}) => {
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const loadLikes = async () => {
      if (likes?.length > 0) {
        if (user) {
          const checkLiked = likes.findIndex((id) => user.sub === id);
          if (checkLiked !== -1) {
            setIsLiked(true);
          }
        }
      }
    };

    loadLikes();
  }, []);

  const handleLike = async () => {
    if (isLiked) {
      if (user) {
        onUnlike(currentPost);
        setIsLiked(false);
      }
    } else {
      if (user) {
        onLike(currentPost);
        setIsLiked(true);
      }
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
            style={{height: 45, width: 45}}
            source={require('../../assets/images/Like_icon1.png')}
            size={25}
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={handleLike}>
          <Image
            style={{height: 45, width: 45}}
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
