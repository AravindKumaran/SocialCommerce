import React, {useState, useEffect} from 'react';

import {StyleSheet, View, Text, Image, Alert, ToastAndroid} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';

const Follow = ({isTouched, onFollow, onUnFollow, currentPost, user}) => {
  const [isFollow, setIsFollow] = useState(false);
  const [message] = useState('Please login!');
  const [message1] = useState("You can't follow yourself");
  const navigation = useNavigation();

  useEffect(() => {
    const checkFollowings = async () => {
      if (currentPost?.user?.followers?.length > 0) {
        if (user) {
          const checkFollow = currentPost?.user?.followers.findIndex(
            (f) => user.email === f.userId,
          );
          if (checkFollow !== -1) {
            setIsFollow(true);
          }
        } else {
          currentPost?.user?.followers.forEach(() => setIsFollow(false));
        }
      }
    };
    checkFollowings();
  }, [user]);

  const handleFollow = async () => {
    if (user?.email === currentPost.user.id) {
      ToastAndroid.show(message1, ToastAndroid.SHORT);
      return;
    }
    if (user) {
      if (isFollow) {
        onUnFollow(currentPost.user);
        console.log('I am called1');
        setIsFollow(false);
      } else if (!isFollow) {
        onFollow(currentPost.user);
        console.log('I am called2');
        setIsFollow(true);
      }
    } else {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    }
  };

  const seeProfile = () => {
    navigation.navigate('Profile', {
      screen: 'Profile',
      params: {
        postUser: currentPost.user,
      },
    });
  };

  return (
    <View
      style={[
        {
          position: 'absolute',
          right: 15,
          bottom: 0,
          top: -20,
        },
        isTouched ? {top: -130} : '',
      ]}>
      {isFollow ? (
        <>
          <TouchableOpacity onPress={seeProfile} style={{bottom: 5}}>
            <Image
              // source={require('../../assets/images/Profile1_icon.png')}
              source={{
                uri: currentPost.user?.imageUri?.startsWith('https')
                  ? currentPost.user?.imageUri
                  : `https://liveboxc7d791528cf44cb0b92efd2c8b1c077762739-staging.s3.ap-south-1.amazonaws.com/public/${currentPost.user?.imageUri}`,
              }}
              size={35}
              style={{height: 60, width: 60, borderRadius: 30}}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleFollow}
            style={{bottom: 17, left: 10, height: 30, width: 40}}>
            <Image
              source={require('../../assets/images/tick.png')}
              size={35}
              style={{height: 17, width: 24, left: 8}}
            />
          </TouchableOpacity>
        </>
      ) : (
        <>
          <TouchableOpacity onPress={seeProfile} style={{bottom: 5}}>
            <Image
              // source={require('../../assets/images/Profile1_icon.png')}
              source={{
                uri: currentPost.user?.imageUri?.startsWith('https')
                  ? currentPost.user?.imageUri
                  : `https://liveboxc7d791528cf44cb0b92efd2c8b1c077762739-staging.s3.ap-south-1.amazonaws.com/public/${currentPost.user?.imageUri}`,
              }}
              size={35}
              style={{height: 60, width: 60, borderRadius: 30}}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleFollow}
            style={{bottom: 17, left: 18, height: 20, width: 40}}>
            <Image
              source={require('../../assets/images/profplus.png')}
              size={35}
              style={{height: 17, width: 24}}
            />
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({});

export default Follow;
