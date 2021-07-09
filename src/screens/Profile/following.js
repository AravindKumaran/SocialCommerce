import React, {useEffect, useRef, useState, useCallback} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Image,
  ImageBackground,
  ScrollView,
  SafeAreaView,
  FlatList,
  ImageBase,
  TouchableWithoutFeedback,
  ToastAndroid,
  Dimensions
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import RBSheet from 'react-native-raw-bottom-sheet';
import Feather from 'react-native-vector-icons/Feather';
import Searchbar from '../../screens/Profile/search';
import {useNavigation} from '@react-navigation/native';
import {getUser} from '../../graphql/queries';
import {API, graphqlOperation, Storage, Auth, Hub} from 'aws-amplify';
import Follow1 from './Follow1';
import Follow2 from './Follow2';
import {
  updatePost,
  createNotification,
  createUserNotification,
  updateUser,
} from '../../graphql/mutations';
import FollowUserDetails from './FollowUserDetails';

const ActiveStyle = () => (
  <>
    <View style={{alignItems: 'center'}}>
      <Image
        style={{
          position: 'absolute',
          top: 0,
          left: 15,
          transform: [
            {
              rotate: '-180deg',
            },
          ],
        }}
        source={require('../../assets/images/blur.png')}
        width={15}
        height={15}
      />
      <View
        style={{
          width: 27,
          right: 2,
          borderRadius: 14,
          borderBottomColor: '#21FFFC',
          borderBottomWidth: 4,
        }}></View>
    </View>
  </>
);

const Following = ({data, followerData, post, followingCloseSheet, user}) => {
  const [isTouched, setTouched] = useState(false);
  const [isPressed, setPressed] = useState(true);
  const [actualData, setData] = useState(data);

  const [active, setActive] = useState('following');

  const navigation = useNavigation();

  const [message] = useState('Please login!');
  const [message1] = useState("You can't follow yourself");

  const [isFollow, setIsFollow] = useState(true);
  const refRBSheet2 = useRef();

  function closeSheets2() {
    refRBSheet2.current.close();
  }

  const handleActive = (value) => {
    setActive(value);
  };

  const seeProfile = async (selecteduderID) => {
    followingCloseSheet();
    console.log('id', selecteduderID);
    const selectedUserResponse = await API.graphql(
      graphqlOperation(getUser, {
        id: selecteduderID,
      }),
    );
    console.log('resId', selectedUserResponse);
    navigation.navigate('SeeProfile', {
      screen: 'SeeProfile',
      thirdUser: selectedUserResponse.data.getUser
    });
  };

  const handleFollow = async (postUser) => {
    if (postUser) {
      const selectedUserResponse = await API.graphql(
        graphqlOperation(getUser, {
          id: postUser.userId,
        }),
      );

      if (selectedUserResponse.data.getUser.followers === null) {
        selectedUserResponse.data.getUser.followers = [];
      }

      try {
        if (user) {
          const userRes = await API.graphql(
            graphqlOperation(getUser, {
              id: user.id,
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
                input: {id: postUser.userId, followers: updatedFollowers},
              }),
            );
          }

          const fr = {
            userId: postUser.userId,
            userName: postUser.username,
            imgUri: postUser.imageUri,
          };
          const fwIndex = userRes.data.getUser.following.findIndex(
            (f) => f.userId === postUser.userId,
          );
          if (fwIndex === -1) {
            userRes.data.getUser.following.push(fr);
            const updatedFollowing = userRes.data.getUser.following;
            await API.graphql(
              graphqlOperation(updateUser, {
                input: {id: user.id, following: updatedFollowing},
              }),
            );
            setData(updatedFollowing);
          }
          console.log('FollowDone');
        }
      } catch (error) {
        console.log('Please Login', error);
        ToastAndroid.show(message, ToastAndroid.SHORT);
      }
    }
  };

  const handleUnFollow = async (postUser) => {
    const selectedUserResponse = await API.graphql(
      graphqlOperation(getUser, {
        id: postUser.userId,
      }),
    );
    if (selectedUserResponse?.data?.getUser?.followers.length > 0) {
      try {
        if (user) {
          const frIndex = selectedUserResponse.data.getUser.followers.findIndex(
            (f) => f.userId === user.id,
          );
          if (frIndex !== -1) {
            selectedUserResponse.data.getUser.followers.splice(frIndex, 1);
            const updatedFollowers =
              selectedUserResponse.data.getUser.followers;
            await API.graphql(
              graphqlOperation(updateUser, {
                input: {id: postUser.userId, followers: updatedFollowers},
              }),
            );

            const userRes = await API.graphql(
              graphqlOperation(getUser, {
                id: user.id,
              }),
            );
            if (userRes.data.getUser?.following?.length > 0) {
              const fwIndex = userRes.data.getUser.following.findIndex(
                (f) => f.userId === postUser.userId,
              );
              if (fwIndex !== -1) {
                userRes.data.getUser.following.splice(fwIndex, 1);
                const updatedFollowing = userRes.data.getUser.following;
                await API.graphql(
                  graphqlOperation(updateUser, {
                    input: {
                      id: user.id,
                      following: updatedFollowing,
                    },
                  }),
                );
                setData(updatedFollowing);
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

  useEffect(() => {
    //console.log(currentPost?.user?.username)
    const checkFollowings = async () => {
      if (post?.followers?.length > 0) {
        //
        if (user) {
          //
          const checkFollow = post?.followers.findIndex(
            (f) => user.email === f.userId, //
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
  }, [user, post]); //

  //useEffect(()=>console.log('isfollow',isFollow),[isFollow])

  const handleFolloww = async (selecteduser) => {
    console.log('usersss', user);
    console.log('selecteduser', selecteduser);
    if (user?.id === selecteduser.userId) {
      ToastAndroid.show(message1, ToastAndroid.SHORT);
      return;
    }
    if (user) {
      console.log('user2');
      if (!isFollow) {
        console.log('I am called1');
        handleUnFollow(selecteduser);
        // setIsFollow(false);
      } else if (isFollow) {
        console.log('I am called2');
        handleFollow(selecteduser);
        // setIsFollow(true);
      }
    } else {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/images/Background1.png')}
      style={styles.container}>
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <View style={styles.choose}>
            <View>
              {active === 'followers' ? <ActiveStyle /> : <></>}
              <TouchableWithoutFeedback
                onPress={() => {
                  if (isTouched === false) {
                    setIsFollow(false);
                    setData(followerData);
                  }
                  handleActive('followers');
                }}>
                <Text
                  style={[
                    styles.text1,
                    {color: active === 'followers' ? '#21FFFC' : '#FFFFFF'},
                  ]}>
                  Followers
                </Text>
              </TouchableWithoutFeedback>
            </View>
            <View>
              {active === 'following' ? <ActiveStyle /> : <></>}
              <TouchableWithoutFeedback
                onPress={() => {
                  setIsFollow(true);
                  setData(data);
                  handleActive('following');
                }}>
                <Text
                  style={[
                    styles.text1,
                    {color: active === 'following' ? '#21FFFC' : '#FFFFFF'},
                  ]}>
                  Following
                </Text>
              </TouchableWithoutFeedback>
            </View>
          </View>

          <View style={{top: 20}}>
            <Image source={require('../../assets/images/Pline.png')} />
          </View>

          <View style={{top: 30}}>
            <Searchbar />
          </View>

          <View style={{padding: 20}}>
            <ScrollView showsVerticalScrollIndicator={false} style={{top: 20}}>
              <View>
                {actualData?.length > 0 &&
                  actualData.map((v, i) => {
                    return (
                      <View key={`${v.userId}-${i}`}>
                        <TouchableOpacity
                          onPress={() => {
                            seeProfile(v.userId);
                          }}
                          style={{
                            flexDirection: 'row',
                            alignSelf: 'flex-start',
                            justifyContent: 'center',
                            alignContent: 'center',
                            alignItems: 'center',
                          }}>
                          <View>
                            <Image
                              source={{uri: v.imgUri}}
                              style={{
                                height: 35,
                                width: 35,
                                borderRadius: 20,
                                marginRight: 20,
                              }}
                            />
                          </View>
                          <View>
                            <Text
                              style={{
                                color: '#FFFFFF',
                                fontFamily: 'Proxima Nova',
                                fontWeight: '700',
                                fontSize: 12,
                              }}>
                              {v.userName}
                            </Text>
                          </View>
                        </TouchableOpacity>
                        {/* <Follow2
                          data={user.following}
                          followerData={data.followers}
                          user={data}
                          onFollow={handleFollow}
                          onUnFollow={handleUnFollow}
                        /> */}
                        {/* <RBSheet
                          ref={refRBSheet2}
                          height={Dimensions.get('window').height - 140}
                          animationType="fade"
                          //closeOnDragDown={false}
                          customStyles={{
                            wrapper: {
                              backgroundColor: 'rgba(0,0,0,.6)',
                              padding: 10,
                            },
                            draggableIcon: {
                              backgroundColor: '#000',
                            },
                            container: {
                              backgroundColor: '#1A1A1A',
                              borderBottomLeftRadius: 10,
                              borderBottomRightRadius: 10,
                              borderTopLeftRadius: 10,
                              borderTopRightRadius: 10,
                              bottom: 85,
                            },
                          }}>
                          <Follow2
                            data={user.following}
                            followerData={data.followers}
                            user={data}
                            onFollow={handleFollow}
                            onUnFollow={handleUnFollow}
                          />
                        </RBSheet> */}
                        <View
                          style={{
                            flexDirection: 'row',
                            alignSelf: 'flex-end',
                            justifyContent: 'center',
                            alignContent: 'center',
                            alignItems: 'center',
                            bottom: 30,
                          }}>
                          <FollowUserDetails thirdUserId={v.userId} />
                          <View>
                            <TouchableOpacity
                              style={{bottom: 0, left: 0, marginLeft: 10}}>
                              <Feather name={'more-vertical'} size={25} />
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                    );
                  })}
              </View>
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};
export default Following;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#1A1A1A',
  },
  user: {
    height: 140,
    width: 140,
    borderRadius: 75,
    zIndex: 1,
    top: 20,
  },
  input: {
    width: 300,
    height: 40,
    padding: 10,
    backgroundColor: '#232323',
    borderRadius: 15,
    alignItems: 'center',
  },
  input1: {
    width: 300,
    height: 80,
    padding: 10,
    backgroundColor: '#232323',
    borderRadius: 15,
    alignItems: 'center',
  },
  Rectangle1: {
    width: 120,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    left: 0,
    bottom: 0,
    margin: -25,
  },
  choose: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: 0,
  },
  text1: {
    fontWeight: '700',
    fontFamily: 'Proxima Nova',
    fontSize: 14,
    marginHorizontal: 25,
    marginTop: 20,
  },
  text3: {
    fontFamily: 'Proxima Nova',
    fontWeight: '700',
    fontSize: 10,
  },
});
