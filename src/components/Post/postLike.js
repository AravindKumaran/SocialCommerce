import React, {useState, useEffect} from 'react';

import {
  StyleSheet,
  Image,
  TouchableOpacity,
  View,
  ToastAndroid,
  Text,
  ImageBackground,
} from 'react-native';

const user = {
  __typename: 'User',
  createdAt: '2021-01-01T17:03:46.393Z',
  email: 'asfiidarlachu@gmail.com',
  id: '0914c457-106d-4937-b44f-f430e611a52a',
  imageUri: 'https://hieumobile.com/wp-content/uploads/avatar-among-us-6.jpg',
  updatedAt: '2021-01-01T17:03:46.393Z',
  username: 'Asfiya begum',
};

const PostLike = ({isTouched, likes, onLike, onUnlike, currentPost, user}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikes] = useState(likes?.length);

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
        console.log('I am called1');
        onUnlike(currentPost);
        setIsLiked(false);
        setLikes(likes.length);
      }
    } else {
      if (user) {
        console.log('I am called2');
        onLike(currentPost);
        setIsLiked(true);
        setLikes(likes.length);
      }
    }
  };

  return (
    <View
      style={[
        {position: 'absolute', right: 15, bottom: 0, top: 47.5},
        // isTouched ? {top: -60} : '',
      ]}>
      {isLiked ? (
        <>
          <TouchableOpacity
            onPress={handleLike}
            style={{height: 50, flexDirection: 'row'}}>
            {/* <Image
              style={{height: 45, width: 45, opacity: 0.7}}
              source={require('../../assets/images/Like_icon1.png')}
              size={25}
            /> */}
            <ImageBackground
              style={{
                backgroundColor: '#363E45',
                height: 55,
                width: 55,
                borderRadius: 100,
                opacity: 0.3,
                justifyContent: 'center',
              }}></ImageBackground>
            <Image
              style={{
                height: 35,
                width: 35,
                alignSelf: 'center',
                right: 45,
                top: 2,
              }}
              source={require('../../assets/images/like-selected.png')}
            />
          </TouchableOpacity>
          <View
            style={{
              backgroundColor: '#FF5050',
              height: 12.5,
              width: 35,
              borderRadius: 10,
              left: 10,
              bottom: 6,
              justifyContent: 'center',
            }}>
            <Text
              style={{
                color: '#fff',
                fontSize: 10,
                fontWeight: '700',
                textAlign: 'center',
                alignItems: 'center',
                alignSelf: 'center',
                alignContent: 'center',
              }}>
              {likesCount || 1}
            </Text>
          </View>
        </>
      ) : (
        <>
          <TouchableOpacity
            onPress={handleLike}
            style={{height: 50, flexDirection: 'row'}}>
            {/* <Image
              style={{
                height: 45,
                width: 45,
                opacity: 0.7,
              }}
              source={require('../../assets/images/Like_icon.png')}
              size={25}
            /> */}
            <ImageBackground
              style={{
                backgroundColor: '#363E45',
                height: 55,
                width: 55,
                borderRadius: 50,
                opacity: 0.3,
                justifyContent: 'center',
              }}></ImageBackground>
            <Image
              style={{
                height: 35,
                width: 35,
                alignSelf: 'center',
                right: 45,
                top: 2,
              }}
              source={require('../../assets/images/like.png')}
            />
          </TouchableOpacity>
          <View
            style={{
              backgroundColor: '#FF5050',
              height: 12.5,
              width: 35,
              borderRadius: 10,
              left: 10,
              bottom: 6,
              justifyContent: 'center',
            }}>
            <Text
              style={{
                color: '#fff',
                fontSize: 10,
                fontWeight: '700',
                textAlign: 'center',
                alignItems: 'center',
                alignSelf: 'center',
                alignContent: 'center',
              }}>
              {likesCount || 0}
            </Text>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({});

export default PostLike;
