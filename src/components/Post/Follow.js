import React, {useState, useEffect} from 'react';

import {StyleSheet, View, Text, Image, Alert, ToastAndroid} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

const Follow = ({isTouched, onFollow, onUnFollow, currentPost, user}) => {
  const [isFollow, setIsFollow] = useState(false);
  const [message] = useState('Please login!')

  useEffect(() => {
    const checkFollowings = async () => {
      if (currentPost?.user?.following?.length > 0) {
        if (user) {
          const checkFollow = currentPost?.user?.following.findIndex(
            (f) => user.sub === f.userId,
          );
          if (checkFollow !== -1) {
            setIsFollow(true);
          }
        }
      }
    };
    checkFollowings();
  }, []);

  const handleFollow = async () => {
    if (user) {
      if (isFollow) {
        await onUnFollow(currentPost.user);
        setIsFollow(false);
      } else if (!isFollow) {
        await onFollow(currentPost.user);
        setIsFollow(true);
      }
    } else {
      ToastAndroid.show(message, ToastAndroid.SHORT)
    }
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
        <TouchableOpacity onPress={handleFollow} style={{bottom: 5}}>
          <Image
            source={require('../../assets/images/Profile1_icon.png')}
            size={35}
            style={{height: 60, width: 60}}
          />
        </TouchableOpacity>
      ) : (
        <>
          <TouchableOpacity onPress={handleFollow} style={{bottom: 5}}>
            <Image
              source={require('../../assets/images/Profile1_icon.png')}
              size={35}
              style={{height: 60, width: 60}}
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
