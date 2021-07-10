import React, {useEffect, useRef, useState, useCallback} from 'react';
import {Storage, API, graphqlOperation, Auth, Hub} from 'aws-amplify';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  SafeAreaView,
  Dimensions,
  Alert,
  ImageBackground,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Feather from 'react-native-vector-icons/Feather';
import EditProfile from '../../screens/Profile/editprofile';
import Followers from '../../screens/Profile/followers';
import Following from '../../screens/Profile/following';
import RBSheet from 'react-native-raw-bottom-sheet';
import LoadingIndicator from '../../components/Common/LoadingIndicator';
import AppButton from '../../components/Common/AppButton';
import {createUser} from '../../graphql/mutations';
import {getUser, getUserByEmail, listUsers} from '../../graphql/queries';
import Videos from '../Profile/videos';
import {useIsFocused, CommonActions} from '@react-navigation/native';
import {c} from '../../navigation/homeBottomTabNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Header} from 'react-native-elements';
import Settings from '../Settings';
import Follow1 from '../../components/Post/Follow1';
import {S3_URL} from '@env';

console.log('S3_URL', S3_URL);

const randomImages = [
  'https://hieumobile.com/wp-content/uploads/avatar-among-us-2.jpg',
  'https://hieumobile.com/wp-content/uploads/avatar-among-us-3.jpg',
  'https://hieumobile.com/wp-content/uploads/avatar-among-us-6.jpg',
  'https://hieumobile.com/wp-content/uploads/avatar-among-us-9.jpg',
];

const getRandomImage = () => {
  return randomImages[Math.floor(Math.random() * randomImages.length)];
};

const ActiveStyle = () => (
  <>
    <Image
      style={{
        position: 'absolute',
        bottom: 13,
      }}
      source={require('../..//assets/images/blur.png')}
      width={15}
      height={15}
      // tintColor={color}
    />
    <View
      style={{
        width: 27,
        height: 4,
        borderRadius: 14,
        position: 'absolute',
        bottom: 10,
        borderBottomColor: '#21FFFC',
        borderBottomWidth: 4,
      }}></View>
  </>
);

const ProfileScreen = ({navigation, route, thirdUser}) => {
 
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loggedInUser, setLoggedInUser] = useState();
  const refRBSheet = useRef();
  const refRBSheet1 = useRef();
  const refRBSheet2 = useRef();
  const refRBSheet3 = useRef();
  const refRBSheet4 = useRef();


  const isFocused = useIsFocused();

  function closeSheets() {
    refRBSheet.current.close();
  }

  function closeSheets1() {
    refRBSheet1.current.close();
  }

  function closeSheets2() {
    refRBSheet2.current.close();
  }

  function closeSettings() {
    refRBSheet4.current.close();
  }

  const checkUser = async () => {
    setLoading(true);
    // console.log('Im calling');

    try {
      const userInfo = await Auth.currentAuthenticatedUser({
        bypassCache: true,
      });

      console.log('UserInformation', userInfo.attributes);

      if (userInfo.attributes) {
        const userRes = await API.graphql(
          graphqlOperation(getUser, {
            id: userInfo?.attributes?.email,
            postFilter: {
              isDeleted: {ne: true},
            },
          }),
        );

        console.log('UserRes', userRes);

        //console.log('UserRews', userRes.data.getUser.posts.items.length);

        // console.log('USer', userRes.data.listUsers.items.length);

        //If the User is created from cognito ui but not stored in db
        if (!userRes?.data?.getUser || !userRes) {
          let identity, provider;

          if (userInfo.attributes?.identities) {
            identity = JSON.parse(userInfo.attributes?.identities);
            provider = identity[0].providerName;
          }

          let uri;
          if (userInfo.attributes?.picture) {
            if (provider === 'Facebook') {
              uri = `https://graph.facebook.com/${identity[0].userId}/picture?height=300`;
            } else if (provider === 'Google') {
              let s = userInfo.attributes.picture;
              uri = s.replace('s96-c', 's250-c');
            }
          } else {
            uri = getRandomImage();
          }

          let profileName;
          if (userInfo.attributes?.name) {
            const nm = userInfo.attributes?.name.split(' ');
            if (nm.length > 0) {
              profileName = nm[0] + ' ' + nm[nm.length - 1];
            } else {
              profileName = nm[0];
            }
          }
          const newUser = {
            id: userInfo.attributes.email,
            username: userInfo.attributes.email.split('@')[0],
            name: profileName || '',
            imageUri: uri,
          };
          console.log('new user', newUser);
          const res = await API.graphql(
            graphqlOperation(createUser, {input: newUser}),
          );
          console.log('res?.data?.createUser', res?.data?.createUser);
          setUser(res?.data?.createUser);
          await AsyncStorage.setItem('userImg', uri);
          c.setOptions({
            tabBarIcon: ({focused, tintColor}) => (
              <>
                <Image
                  // source={require('../assets/images/Profile_icon.png')}
                  source={{
                    uri: res?.data?.createUser.imageUri.startsWith('https')
                      ? res?.data?.createUser.imageUri
                      : `${S3_URL}${res?.data?.createUser.imageUri}`,
                  }}
                  size={25}
                  style={{bottom: 5, width: 25, height: 25, borderRadius: 12}}
                />
                {focused && <ActiveStyle />}
              </>
            ),
          });
        } else {
          setUser(userRes?.data?.getUser);
          await AsyncStorage.setItem(
            'userImg',
            userRes.data?.getUser?.imageUri,
          );
          // getTabBarIcon(isFocused, userRes.data?.getUser?.imageUri);
          c.setOptions({
            tabBarIcon: ({focused, tintColor}) => (
              <>
                <Image
                  // source={require('../assets/images/Profile_icon.png')}
                  source={{
                    uri: userRes.data?.getUser?.imageUri.startsWith('https')
                      ? userRes.data?.getUser?.imageUri
                      : `${S3_URL}${userRes.data?.getUser?.imageUri}`,
                  }}
                  size={25}
                  style={{bottom: 5, width: 25, height: 25, borderRadius: 12}}
                />
                {focused && <ActiveStyle />}
              </>
            ),
          });
        }
      }
      setLoading(false);
    } catch (error) {
      console.log('Checkuser Error', error);
      setLoading(false);
      setUser(null);
    }
  };
  const loggedInUserDetails= async ()=>{
    setLoading(true)
    const userInfo = await Auth.currentAuthenticatedUser({
      bypassCache: true,
    });

    setLoggedInUser(userInfo?.attributes?.email);
    setLoading(false);
  }
  useEffect( ()=>{
    loggedInUserDetails();
    console.log("thirdUser",thirdUser);
  },[user]);

  const handleLogin = async (event) => {
    if (!user) {
      try {
        event.preventDefault();
        await Auth.federatedSignIn();
        setTimeout(() => {
          checkUser();
        }, 3000);
      } catch (error) {
        console.log('Error', error);
      }
    }
  };

  const handleLogout = async () => {
    console.log('User', user);
    setUser(null);
    Auth.signOut();
    await AsyncStorage.removeItem('userImg');
    console.log('logged out!');
    c.setOptions({
      tabBarIcon: ({focused, tintColor}) => (
        <>
          <Image
            source={require('../../assets/images/Profile_icon.png')}
            // source={{
            //   uri: imgUri.startsWith('https')
            //     ? imgUri
            //     : `https://tiktok23f096015e564dd1964361d5c47fb832221214-demo.s3.us-east-2.amazonaws.com/public/${imgUri}`,
            // }}
            size={25}
            style={{bottom: 5, width: 25, height: 25}}
          />
          {focused && <ActiveStyle />}
        </>
      ),
    });
  };

  useEffect(() => {
    if (!thirdUser) {
      Hub.listen('auth', ({payload: {event, data}}) => {
        console.log('event', event);
        switch (event) {
          case 'parsingCallbackUrl':
            //setLoading(true);
            break;
          case 'signIn':
          case 'cognitoHostedUI':
            checkUser();
            break;
          case 'signOut':
            //setLoading(false);
            setUser(null);
            console.log('User', user);
            break;
          case 'signIn_failure':
          case 'cognitoHostedUI_failure':
            console.log('Sign in failure', data);
            break;
        }
      });
    }
  }, []);

  useEffect(() => {
    console.log('usersss');
    const onOtherUser = async () => {
      if (!thirdUser) {
        console.log('isfocused useeffect');
        checkUser();
      } else {
        setLoading(true);
        try {
          const selectedUserResponse = await API.graphql(
            graphqlOperation(getUser, {
              id: thirdUser.id,
              postFilter: {
                isDeleted: {ne: true},
              },
            }),
          );
          console.log('suserres', selectedUserResponse.data.getUser);
          setUser(selectedUserResponse.data.getUser);
          const value = await AsyncStorage.getItem('userImg');
          if (value) {
            c.setOptions({
              tabBarIcon: ({focused, tintColor}) => (
                <>
                  <Image
                    // source={require('../assets/images/Profile_icon.png')}
                    source={{
                      uri: value?.startsWith('https')
                        ? value
                        : `${S3_URL}${value}`,
                    }}
                    size={25}
                    style={{
                      bottom: 5,
                      width: 25,
                      height: 25,
                      borderRadius: 12,
                    }}
                  />
                </>
              ),
            });
          }
          setLoading(false);
        } catch (error) {
          console.log('get 3rd user Error', error);
          setLoading(false);
          setUser(null);
        }
      }
    };
    onOtherUser();
  }, [isFocused === true]);

  const handleUpdateUser = (user) => {
    console.log('I am called');
    c.setOptions({
      tabBarIcon: ({focused, tintColor}) => (
        <>
          <Image
            // source={require('../assets/images/Profile_icon.png')}
            source={{
              uri: user.imageUri.startsWith('https')
                ? user.imageUri
                : `${S3_URL}${user.imageUri}`,
            }}
            size={25}
            style={{bottom: 5, width: 25, height: 25, borderRadius: 12}}
          />
          {focused && <ActiveStyle />}
        </>
      ),
    });
    setUser(user);
  };

  const MyCustomLeftComponent = () => {
    return (
      <Text
        style={{
          fontSize: 25,
          fontFamily: 'LilyScriptOne-Regular',
          width: 200,
        }}>
        Profile
      </Text>
    );
  };

  const initUser = (token) => {
    fetch(
      'https://graph.facebook.com/v2.5/me?fields=email,first_name,last_name,friends&access_token=' +
        token,
    )
      .then((response) => {
        response.json().then((json) => {
          const ID = json.id;
          console.log('ID ' + ID);

          const EM = json.email;
          console.log('Email ' + EM);

          const FN = json.first_name;
          console.log('First Name ' + FN);
        });
      })
      .catch(() => {
        console.log('ERROR GETTING DATA FROM FACEBOOK');
      });
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <LoadingIndicator visible={loading} />
      ) : (
        <View>
          <ScrollView
            nestedScrollEnabled={true}
            showsVerticalScrollIndicator={false}>
            {!user ? (
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginHorizontal: 30,
                  marginTop: 300,
                }}>
                <Text style={{fontSize: 22, margin: 5}}>
                  You are not logged in
                </Text>
                <AppButton title="Login" onPress={handleLogin} />
              </View>
            ) : (
              <View style={styles.container}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingHorizontal: 20,
                    marginTop: 60,
                  }}>
                  <View>
                    {!thirdUser && (
                      <>
                        <TouchableOpacity
                          onPress={() => refRBSheet.current.open()}>
                          <Image
                            source={require('../../assets/images/edit_profile.png')}
                            style={{height: 75, width: 75}}
                          />
                        </TouchableOpacity>

                        <RBSheet
                          ref={refRBSheet}
                          height={Dimensions.get('window').height - 140}
                          animationType="fade"
                          closeOnDragDown={false}
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
                          <EditProfile
                            user={user}
                            saveUser={handleUpdateUser}
                            closeSheet={closeSheets}
                          />
                        </RBSheet>
                      </>
                    )}
                  </View>
                  <View>
                    <Image
                      style={styles.user}
                      // source={{
                      //   uri: `https://graph.facebook.com/220891159509908/picture?height=500`,
                      // }}
                      source={{
                        uri: user?.imageUri?.startsWith('https')
                          ? user.imageUri
                          : `${S3_URL}${user.imageUri}`,
                      }}
                    />
                  </View>
                  <View>
                    {!thirdUser && (
                      <>
                        <TouchableOpacity
                          onPress={() => refRBSheet4.current.open()}>
                          {/* <ImageBackground
                            style={{
                              backgroundColor: '#1C1D21',
                              height: 50,
                              width: 50,
                              borderRadius: 50,
                              justifyContent: 'center',
                              elevation: 10,
                              borderTopWidth: 1,
                              borderTopColor: '#949494',
                            }}>
                            <Feather
                              style={styles.chart}
                              name={'settings'}
                              size={20}
                            />
                          </ImageBackground> */}
                          <Image
                            source={require('../../assets/images/settings.png')}
                            style={{height: 75, width: 75}}
                          />
                        </TouchableOpacity>

                        <RBSheet
                          ref={refRBSheet4}
                          height={Dimensions.get('window').height - 140}
                          animationType="fade"
                          closeOnDragDown={false}
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
                          <Settings
                            profileUser={user}
                            closeSettings={closeSettings}
                          />
                        </RBSheet>
                      </>
                    )}
                  </View>
                </View>

                <View
                  style={{
                    marginVertical: 10,
                    marginLeft: 20,
                  }}>
                  {!thirdUser ? (
                    <Text
                      style={{
                        color: '#FFFFFF',
                        fontFamily: 'Proxima Nova',
                        fontWeight: '700',
                        fontSize: 16,
                        textAlign: 'center',
                      }}>
                      {user?.name}
                      {/* Tamilvanan */}
                    </Text>
                  ) : (
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        alignSelf: 'center',
                      }}>
                      <Text
                        style={{
                          color: '#FFFFFF',
                          fontFamily: 'Proxima Nova',
                          fontWeight: '700',
                          fontSize: 16,
                          textAlign: 'center',
                          marginHorizontal: 10,
                        }}>
                        {user?.name}
                        {/* Tamilvanan */}
                      </Text>
                      <Follow1 thirdUser={thirdUser} />
                    </View>
                  )}
                  <Text
                    style={{
                      color: '#FFFFFF',
                      fontFamily: 'Proxima Nova',
                      fontWeight: '700',
                      fontSize: 13,
                      textAlign: 'center',
                    }}>
                    {` (${user.username}) `}
                  </Text>
                  <Text
                    style={{
                      color: '#FFFFFF',
                      fontFamily: 'Proxima Nova',
                      fontWeight: '400',
                      fontSize: 12,
                      textAlign: 'center',
                    }}>
                    {user.bio}
                  </Text>

                  <RBSheet
                    ref={refRBSheet1}
                    height={Dimensions.get('window').height - 140}
                    animationType="fade"
                    closeOnDragDown={false}
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
                    <Followers
                      data={user.followers}
                      followingData={user.following}
                      followerCloseSheet={closeSheets1}
                      user={user}
                    />
                  </RBSheet>

                  <RBSheet
                    ref={refRBSheet2}
                    height={Dimensions.get('window').height - 140}
                    animationType="fade"
                    closeOnDragDown={false}
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
                    <Following
                      data={user.following}
                      followerData={user.followers}
                      followingCloseSheet={closeSheets2}
                      user={user}
                    />
                  </RBSheet>

                  <RBSheet
                    ref={refRBSheet3}
                    height={Dimensions.get('window').height - 140}
                    animationType="fade"
                    closeOnDragDown={false}
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
                    <Following
                      data={user.following}
                      followerData={user.followers}
                    />
                  </RBSheet>
                </View>

                <View>
                  <Image
                    style={{
                      alignSelf: 'center',
                    }}
                    source={require('../../assets/images/Pline.png')}
                  />

                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      margin: 10,
                    }}>
                    <TouchableOpacity
                      style={{
                        flexDirection: 'column',
                      }}
                      onPress={() => refRBSheet1.current.open()}>
                      <Text
                        style={{
                          color: '#939495',
                          fontFamily: 'Proxima Nova',
                          fontWeight: '400',
                          fontSize: 12,
                          textAlign: 'center',
                        }}>
                        Followers
                      </Text>
                      <Text
                        style={{
                          color: '#FFFFFF',
                          fontFamily: 'Proxima Nova',
                          fontWeight: '700',
                          fontSize: 16,
                          textAlign: 'center',
                        }}>
                        {user?.followers?.length || 0}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{flexDirection: 'column', marginHorizontal: 100}}
                      onPress={() => refRBSheet2.current.open()}>
                      <Text
                        style={{
                          color: '#939495',
                          fontFamily: 'Proxima Nova',
                          fontWeight: '400',
                          fontSize: 12,
                          textAlign: 'center',
                        }}>
                        Following
                      </Text>
                      <Text
                        style={{
                          color: '#FFFFFF',
                          fontFamily: 'Proxima Nova',
                          fontWeight: '700',
                          fontSize: 16,
                          textAlign: 'center',
                        }}>
                        {user?.following?.length || 0}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{flexDirection: 'column'}}>
                      <Text
                        style={{
                          color: '#939495',
                          fontFamily: 'Proxima Nova',
                          fontWeight: '400',
                          fontSize: 12,
                          textAlign: 'center',
                        }}>
                        Posts
                      </Text>
                      <Text
                        style={{
                          color: '#FFFFFF',
                          fontFamily: 'Proxima Nova',
                          fontWeight: '700',
                          fontSize: 16,
                          textAlign: 'center',
                        }}>
                        {user?.posts?.items?.length || 0}
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <Image
                    style={{
                      alignSelf: 'center',
                    }}
                    source={require('../../assets/images/Pline.png')}
                  />
                </View>

                <View style={{marginVertical: 10}}>
                  {user?.id && (
                    <Videos
                      userId={user.id}
                      postLength={user?.posts?.items?.length}
                      isProfile={!thirdUser ? true : false}
                      isSeeProfile={thirdUser ? true : false}
                    />
                  )}
                </View>
              </View>
            )}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#20232A',
  },
  chart: {
    transform: [{scaleX: -1}, {rotate: '90deg'}],
    alignSelf: 'center',
  },
  Rectangle: {
    top: 100,
    width: '98%',
    height: 200,
    borderRadius: 10,
    opacity: 0.5,
    position: 'absolute',
    alignSelf: 'center',
    borderWidth: 0.6,
    borderTopColor: '#FFFFFF',
    borderLeftColor: '#FFFFFF',
    borderRightColor: '#FFFFFF',
  },
  user: {
    height: 200,
    width: 200,
    borderRadius: 200,
    resizeMode: 'cover',
    borderWidth: 10,
    borderColor: '#232323',
    marginHorizontal: 10,
  },
  mediaImageContainer: {
    width: 180,
    height: 200,
    borderRadius: 12,
    overflow: 'hidden',
    marginHorizontal: 10,
    padding: 10,
    resizeMode: 'cover',
  },
});
