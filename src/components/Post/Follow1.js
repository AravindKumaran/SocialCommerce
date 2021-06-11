import React, {useState, useEffect, useContext} from 'react';
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
import {Context} from '../../context/Store';

const Follow1 = ({isTouched, onFollow, onUnFollow, currentPost, user}) => {
  const [isFollow, setIsFollow] = useState(false);
  const [message] = useState('Please login!');
  const [message1] = useState("You can't follow yourself");
  const navigation = useNavigation();

  const [globalState, globalDispatch] = useContext(Context);

  useEffect(() => {
    const checkFollowings = async () => {
      if (currentPost?.user?.followers?.length > 0) {
        if (user) {
          const checkFollow = currentPost?.user?.followers.findIndex(
            (f) => user.email === f.userId,
          );
          // console.log('forllow useeff called',currentPost?.user?.id, checkFollow);
          if (checkFollow != -1) {
            setIsFollow(true);
          } else {
            setIsFollow(false);
          }
        }
      } 
      else {
        setIsFollow(false);
      }
    };
    checkFollowings();
  }, [user, currentPost]);

  useEffect(() => {
    //console.log('globalState.userFollowing', globalState.userFollowing);
    if(globalState.userFollowing.length){
      //console.log('currentPost.user.id', currentPost.user.id);
      const checkFollow = globalState.userFollowing.findIndex(
        (f) => currentPost.user.id === f.userId
      );
      //console.log('checkFollow', checkFollow);
      if (checkFollow != -1) {
        setTimeout(() => {
          setIsFollow(true);
        }, 0);        
      }
    }
  }, [globalState.userFollowing])

  useEffect(() => {
    //console.log('globalState.userUnFollowing', globalState.userUnFollowing);
    if(globalState.userUnFollowing.length){
      //console.log('currentPost.user.id', currentPost.user.id);
      const checkUnFollow = globalState.userUnFollowing.findIndex(
        (f) => currentPost.user.id === f.userId
      );
      //console.log('checkUnFollow', checkUnFollow);
      if (checkUnFollow != -1) {
        setTimeout(() => {
          setIsFollow(false);
        }, 0); 
      }
    }
  }, [globalState.userUnFollowing])

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
              height: 25,
              width: 75,
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
              height: 25,
              width: 75,
              borderRadius: 7.5,
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
              borderWidth: 2,
              borderColor: '#585EF7',
            }}
            colors={['transparent', 'transparent', 'transparent']}>
            <Text style={styles.text3}>Following</Text>
          </LinearGradient>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Follow1;
