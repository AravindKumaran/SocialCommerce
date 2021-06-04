import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, Image, Alert, ToastAndroid} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import styles from './styles';
import LinearGradient from 'react-native-linear-gradient';

const Follow1 = ({isTouched, onFollow, onUnFollow, currentPost, user}) => {
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
          if (checkFollow != -1) {
            setIsFollow(true);
          } else {
            setIsFollow(false);
          }
        }
      } else {
        setIsFollow(false);
      }
    };
    checkFollowings();
  }, [user, currentPost]);

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

  return (
    <View>
      {!isFollow ? (
        <TouchableOpacity style={styles.Rectangle1} onPress={handleFollow}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={{
              height: 20,
              width: 70,
              borderRadius: 5,
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
            }}
            colors={['#5e37f4', '#518bf9', '#21fffc']}>
            <Text style={styles.text3}>Follow</Text>
          </LinearGradient>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.Rectangle1} onPress={handleFollow}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={{
              height: 20,
              width: 70,
              borderRadius: 5,
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
              borderWidth: 1,
              borderColor: '#21FFFC',
            }}
            colors={['transparent', 'transparent', 'transparent']}>
            <Text style={styles.text3}>Unfollow</Text>
          </LinearGradient>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Follow1;
