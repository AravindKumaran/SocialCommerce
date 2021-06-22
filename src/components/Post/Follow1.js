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
import {API, graphqlOperation, Storage, Auth, Hub} from 'aws-amplify';
import {updateUser} from '../../graphql/mutations';
import {getUser} from '../../graphql/queries';
import {useNavigation} from '@react-navigation/native';
import styles from './styles';
import LinearGradient from 'react-native-linear-gradient';
import {Context} from '../../context/Store';

const Follow1 = ({thirdUser}) => {
  const [user, setUser] = useState(null)
  const [isFollow, setIsFollow] = useState(false);
  const [message] = useState('Please login!');
  const [message1] = useState("You can't follow yourself");
  const navigation = useNavigation();

  const [globalState, globalDispatch] = useContext(Context);

  function getCurrentUser() {
    return Auth.currentAuthenticatedUser()
      .then((userData) => userData)
      .catch(() => console.log('Not signed in'));
  }

  useEffect(() => {  
    getCurrentUser().then((userData) => {
      if (userData?.attributes) {
        setUser(userData.attributes);
      }
    });
  }, []);

  useEffect(() => {
    const checkFollowings = async () => {
      if (thirdUser?.followers?.length > 0) {
        if (user) {
          const checkFollow = thirdUser?.followers.findIndex(
            (f) => user.email === f.userId,
          );
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
  }, [user, thirdUser]);

  useEffect(() => {
    if(globalState.userFollowing.length){
      const checkFollow = globalState.userFollowing.findIndex(
        (f) => thirdUser.id === f.userId
      );
      if (checkFollow != -1) {
        setTimeout(() => {
          setIsFollow(true);
        }, 0);        
      }
    }
  }, [globalState.userFollowing])

  useEffect(() => {
    if(globalState.userUnFollowing.length){
      const checkUnFollow = globalState.userUnFollowing.findIndex(
        (f) => thirdUser.id === f.userId
      );
      if (checkUnFollow != -1) {
        setTimeout(() => {
          setIsFollow(false);
        }, 0); 
      }
    }
  }, [globalState.userUnFollowing])

  const toggleFollow = async () => {
    if (user?.email === thirdUser.id) {
      ToastAndroid.show(message1, ToastAndroid.SHORT);
      return;
    }
    if (user) {
      console.log('isFollow', isFollow);
      if (!isFollow) {       
        console.log('I am called1');
        setIsFollow(false);
        handleFollow(thirdUser)
      } else{        
        console.log('I am called2');
        setIsFollow(true);
        handleUnFollow(thirdUser)
      }
    } else {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    }
  };

  const handleFollow = async (thirdUser) => {
    
      const selectedUserResponse = await API.graphql(
        graphqlOperation(getUser, {
          id: thirdUser.id,
        }),
      );

      if (selectedUserResponse.data.getUser.followers === null) {
        selectedUserResponse.data.getUser.followers = [];
      }

      try {
        if (user) {
          const userRes = await API.graphql(
            graphqlOperation(getUser, {
              id: user.email,
            }),
          );
          if (userRes.data.getUser.followers === null) {
            userRes.data.getUser.followers = [];
          }
          if (userRes.data.getUser.following === null) {
            userRes.data.getUser.following = [];
          }
          const fw = {
            userId: userRes.data.getUser.id,
            userName: userRes.data.getUser.username,
            imgUri: userRes.data.getUser.imageUri,
          };
          const frIndex = selectedUserResponse?.data?.getUser?.followers.findIndex(
            (f) => f.userId === userRes.data.getUser.id,
          );
          if (frIndex === -1) {
            selectedUserResponse.data.getUser.followers.push(fw);
            const updatedFollowers =
              selectedUserResponse.data.getUser.followers;
            await API.graphql(
              graphqlOperation(updateUser, {
                input: {id: thirdUser.id, followers: updatedFollowers},
              }),
            );
          }

          const fr = {
            userId: thirdUser.id,
            userName: thirdUser.username,
            imgUri: thirdUser.imageUri,
          };
          const fwIndex = userRes.data.getUser.following.findIndex(
            (f) => f.userId === thirdUser.id,
          );
          if (fwIndex === -1) {
            //update user following to global
            globalDispatch({
              type: 'userFollowing',
              payload: [...globalState.userFollowing, fr],
            });
            let f_idx = globalState.userUnFollowing.findIndex(
              (f) => fr.userId === f.userId,
            );
            if (f_idx !== -1) {
              globalDispatch({
                type: 'userUnFollowing',
                payload: [...globalState.userUnFollowing.splice(0, f_idx)],
              });
            }

            userRes.data.getUser.following.push(fr);
            const updatedFollowing = userRes.data.getUser.following;
            await API.graphql(
              graphqlOperation(updateUser, {
                input: {id: user.email, following: updatedFollowing},
              }),
            );
          }

          console.log('FollowDone');
        }
      } catch (error) {
        console.log('Please Login', error);
        ToastAndroid.show(message, ToastAndroid.SHORT);
      }
    
  };

  const handleUnFollow = async (thirdUser) => {
    const selectedUserResponse = await API.graphql(
      graphqlOperation(getUser, {
        id: thirdUser.id,
      }),
    );
    if (selectedUserResponse?.data?.getUser?.followers.length > 0) {
      try {
        if (user) {
          const frIndex = selectedUserResponse.data.getUser.followers.findIndex(
            (f) => f.userId === user.email,
          );
          if (frIndex !== -1) {
            selectedUserResponse.data.getUser.followers.splice(frIndex, 1);
            const updatedFollowers =
              selectedUserResponse.data.getUser.followers;
            await API.graphql(
              graphqlOperation(updateUser, {
                input: {id: thirdUser.id, followers: updatedFollowers},
              }),
            );

            const userRes = await API.graphql(
              graphqlOperation(getUser, {
                id: user.email,
              }),
            );

            const fr = {
              userId: thirdUser.id,
              userName: thirdUser.username,
              imgUri: thirdUser.imageUri,
            };

            if (userRes.data.getUser?.following?.length > 0) {
              const fwIndex = userRes.data.getUser.following.findIndex(
                (f) => f.userId === thirdUser.id,
              );
              if (fwIndex !== -1) {
                //update user following to global
                let f_idx = globalState.userFollowing.findIndex(
                  (f) => thirdUser.id === f.userId,
                );
                if (f_idx !== -1) {
                  globalDispatch({
                    type: 'userFollowing',
                    payload: [...globalState.userFollowing.slice(0, f_idx)],
                  });
                }
                globalDispatch({
                  type: 'userUnFollowing',
                  payload: [...globalState.userUnFollowing, fr],
                });

                userRes.data.getUser.following.splice(fwIndex, 1);
                const updatedFollowing = userRes.data.getUser.following;
                await API.graphql(
                  graphqlOperation(updateUser, {
                    input: {
                      id: user.email,
                      following: updatedFollowing,
                    },
                  }),
                );
              }
            }
          }
          console.log('UnfollowDone');
        }
      } catch (error) {
        console.log('Please Login', error);
        ToastAndroid.show(message, ToastAndroid.SHORT);
      }
    }
  };

  return (
    <View>
      {!isFollow ? (
        <TouchableOpacity style={styles.Rectangle1} onPress={toggleFollow}>
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
        <TouchableOpacity style={styles.Rectangle1} onPress={toggleFollow}>
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
