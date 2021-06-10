import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Alert,
  ToastAndroid,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import styles from './styles';
import LinearGradient from 'react-native-linear-gradient';

const Follow1 = ({isTouched, onFollow, onUnFollow, currentPost, user}) => {
  console.log('FollowerDatauser', user);
  console.log('FollowerDatacurrentPost', currentPost);
  const [isFollow, setIsFollow] = useState(false);
  const [message] = useState('Please login!');
  const [message1] = useState("You can't follow yourself");
  const navigation = useNavigation();

  //currentPost?.user? = v.userId
  //user = user

  useEffect(() => {
    //console.log(currentPost?.user?.username)
    const checkFollowings = async () => {
      if (currentPost?.followers?.length > 0) {//
        if (user) {//
          const checkFollow = currentPost?.followers.findIndex(
            (f) => user.email === f.userId,//
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
  }, [user, currentPost]);//

  //useEffect(()=>console.log('isfollow',isFollow),[isFollow])

  const handleFollow = async () => {
    if (user?.email === currentPost) {//
      ToastAndroid.show(message1, ToastAndroid.SHORT);
      return;
    }
    if (user) {
      if (isFollow) {
        onUnFollow(currentPost);//
        console.log('I am called1');
        setIsFollow(false);
      } else if (!isFollow) {
        onFollow(currentPost);//
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
              height: 25,
              width: 75,
              borderRadius: 15,
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
            }}
            colors={['#3cb2f1', '#3cb2f1', '#3cb2f1']}>
            <Text style={styles.text3}>Follow</Text>
          </LinearGradient>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.Rectangle1} onPress={handleFollow}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={{
              height: 25,
              width: 75,
              borderRadius: 15,
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
              borderTopWidth: 1,
              borderTopColor: '#757575',
            }}
            colors={['#252525', '#252525', '#252525']}>
            <Text style={styles.text3}>Following</Text>
          </LinearGradient>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Follow1;
