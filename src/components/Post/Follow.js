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
    //console.log(currentPost?.user?.username)
    const checkFollowings = async () => {
      if (currentPost?.user?.followers?.length > 0) {
        if (user) {
          const checkFollow = currentPost?.user?.followers.findIndex(
            (f) => user.email === f.userId,
          );
          if (checkFollow != -1) {
            setIsFollow(true);
          } else {
            setIsFollow(false);
          }
        }
        // else {
        //   currentPost?.user?.followers.forEach(() => setIsFollow(false));
        // }
      } else {
        setIsFollow(false);
      }
    };
    checkFollowings();
  }, [user, currentPost]);

  //useEffect(()=>console.log('isfollow',isFollow),[isFollow])

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
    navigation.navigate('SeeProfile', {
      screen: 'SeeProfile',
      postUser: currentPost.user,
    });
  };

  return (
    <View
      style={[
        {
          position: 'absolute',
          right: 45,
          bottom: 0,
          top: -20,
        },
        // isTouched ? {top: -130} : '',
      ]}>
      
      <>
        <TouchableOpacity onPress={seeProfile} style={{bottom: 5}}>
          <Image
            // source={require('../../assets/images/Profile1_icon.png')}
            source={{
              uri: currentPost.user?.imageUri?.startsWith('https')
                ? currentPost.user?.imageUri
                : `https://liveboxpro823eea7b9bbf4c1fa57da0c49d1c8d61151613-test.s3.ap-south-1.amazonaws.com/public/${currentPost.user?.imageUri}`,
            }}
            size={35}
            style={{height: 65, width: 65, borderRadius: 50}}
          />
        </TouchableOpacity>
      </>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Follow;
