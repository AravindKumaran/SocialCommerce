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
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
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

const Following = ({data, followerData, user}) => {
  const [isTouched, setTouched] = useState(false);
  const [isPressed, setPressed] = useState(true);
  const [actualData, setData] = useState(data);

  const [active, setActive] = useState('following');

  const navigation = useNavigation();

  const handleActive = (value) => {
    setActive(value);
  };

  const seeProfile = async (selecteduderID) => {
    console.log('id', selecteduderID);
    const selectedUserResponse = await API.graphql(
      graphqlOperation(getUser, {
        id: selecteduderID,
      }),
    );
    console.log('resId', selectedUserResponse);
    navigation.navigate('SeeProfile', {
      screen: 'SeeProfile',
      postUser: selectedUserResponse.data.getUser,
    });
  };

  const handleFollow = async (postUser) => {
    if (post) {
      const selectedUserResponse = await API.graphql(
        graphqlOperation(getUser, {
          id: post.user.id,
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
                input: {id: postUser.id, followers: updatedFollowers},
              }),
            );
          }

          const fr = {
            userId: postUser.id,
            userName: postUser.username,
            imgUri: postUser.imageUri,
          };
          const fwIndex = userRes.data.getUser.following.findIndex(
            (f) => f.userId === postUser.id,
          );
          if (fwIndex === -1) {
            userRes.data.getUser.following.push(fr);
            const updatedFollowing = userRes.data.getUser.following;
            await API.graphql(
              graphqlOperation(updateUser, {
                input: {id: user.email, following: updatedFollowing},
              }),
            );
          }
          props.setPostRerender(true);
          props.setPostRerender(false);

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
        id: post.user.id,
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
                input: {id: postUser.id, followers: updatedFollowers},
              }),
            );

            const userRes = await API.graphql(
              graphqlOperation(getUser, {
                id: user.email,
              }),
            );
            if (userRes.data.getUser?.following?.length > 0) {
              const fwIndex = userRes.data.getUser.following.findIndex(
                (f) => f.userId === postUser.id,
              );
              if (fwIndex !== -1) {
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
          props.setPostRerender(true);
          props.setPostRerender(false);
          console.log('UnfollowDone');
        }
      } catch (error) {
        console.log('Please Login', error);
        ToastAndroid.show(message, ToastAndroid.SHORT);
      }
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
                        <View
                          style={{
                            flexDirection: 'row',
                            alignSelf: 'flex-end',
                            justifyContent: 'center',
                            alignContent: 'center',
                            alignItems: 'center',
                            bottom: 30,
                          }}>
                          {actualData === followerData ? (
                            <Follow1
                              isTouched={isTouched}
                              onFollow={handleFollow}
                              onUnFollow={handleUnFollow}
                              user={user}
                              currentPost={post}
                            />
                          ) : (
                            <Follow2
                              isTouched={isTouched}
                              onFollow={handleFollow}
                              onUnFollow={handleUnFollow}
                              user={user}
                              currentPost={post}
                            />
                          )}
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
    left: 210,
    bottom: 50,
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
});
