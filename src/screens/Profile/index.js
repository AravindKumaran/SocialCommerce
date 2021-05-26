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
import {LoginButton, AccessToken} from 'react-native-fbsdk';

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

const ProfileScreen = ({navigation, route, postUser}) => {
  const refRBSheet = useRef();
  const refRBSheet1 = useRef();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const refRBSheet2 = useRef();
  const refRBSheet3 = useRef();

  const isFocused = useIsFocused();

  function closeSheets() {
    refRBSheet.current.close();
  }

  const checkUser = async () => {
    setLoading(true);
    // console.log('Im calling');

    try {
      const userInfo = await Auth.currentAuthenticatedUser({
        bypassCache: true,
      });

      console.log('UserInfo', userInfo.attributes);

      const userRes = await API.graphql(
        graphqlOperation(getUser, {
          id: userInfo?.attributes?.email,
          limit: 2,
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
        const res = await API.graphql(
          graphqlOperation(createUser, {input: newUser}),
        );

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
                    : `https://liveboxc7d791528cf44cb0b92efd2c8b1c077762739-staging.s3.ap-south-1.amazonaws.com/public/${res?.data?.createUser.imageUri}`,
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
        await AsyncStorage.setItem('userImg', userRes.data?.getUser?.imageUri);
        // getTabBarIcon(isFocused, userRes.data?.getUser?.imageUri);
        c.setOptions({
          tabBarIcon: ({focused, tintColor}) => (
            <>
              <Image
                // source={require('../assets/images/Profile_icon.png')}
                source={{
                  uri: userRes.data?.getUser?.imageUri.startsWith('https')
                    ? userRes.data?.getUser?.imageUri
                    : `https://liveboxc7d791528cf44cb0b92efd2c8b1c077762739-staging.s3.ap-south-1.amazonaws.com/public/${userRes.data?.getUser?.imageUri}`,
                }}
                size={25}
                style={{bottom: 5, width: 25, height: 25, borderRadius: 12}}
              />
              {focused && <ActiveStyle />}
            </>
          ),
        });
      }
      setLoading(false);
    } catch (error) {
      console.log('Checkuser Error', error);
      setLoading(false);
      setUser(null);
    }
  };

  const handleLogin = async () => {
    if (!user) {
      try {
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
    console.log('pro use emp', postUser);
    if (!postUser) {
      Hub.listen('auth', ({payload: {event, data}}) => {
        console.log('event', event);
        switch (event) {
          case 'signIn':
          case 'cognitoHostedUI':
            //checkUser();
            break;
          case 'signOut':
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
    const onOtherUser = async () => {
      if (!postUser) {
        console.log('isfocused useeffect');
        checkUser();
      } else {
        setUser(postUser);
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
                      : `https://liveboxc7d791528cf44cb0b92efd2c8b1c077762739-staging.s3.ap-south-1.amazonaws.com/public/${value}`,
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
                : `https://liveboxc7d791528cf44cb0b92efd2c8b1c077762739-staging.s3.ap-south-1.amazonaws.com/public/${user.imageUri}`,
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

  return (
    <View style={styles.container}>
      {/* <Header
        leftComponent={<MyCustomLeftComponent />}
        containerStyle={{
          backgroundColor: '#20232A',
          borderColor: '#20232A',
        }}
      /> */}
      <ScrollView nestedScrollEnabled={true}>
        {loading && <LoadingIndicator visible={loading} />}
        {!user ? (
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              marginHorizontal: 30,
              marginTop: 300,
            }}>
            <Text style={{fontSize: 22, margin: 5}}>You are not logged in</Text>
            <LoginButton
              onLoginFinished={(error, result) => {
                if (error) {
                  console.log('login has error: ' + result.error);
                } else if (result.isCancelled) {
                  console.log('login is cancelled.');
                } else {
                  AccessToken.getCurrentAccessToken().then((data) => {
                    console.log(data);
                  });
                }
              }}
              onLogoutFinished={() => console.log('logout.')}
            />
            {/* <AppButton title="Login" onPress={handleLogin} /> */}
          </View>
        ) : (
          <View
            style={styles.container}
            // showsVerticalScrollIndicator={false}
          >
            <View style={{top: 0, height: 400}}>
              <View style={{top: 80, marginHorizontal: '4%'}}>
                <View>
                  <LinearGradient
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}
                    colors={['#141414', '#232323']}
                    style={styles.Rectangle}>
                    <View />
                  </LinearGradient>

                  <Image
                    style={{
                      top: 180,
                      position: 'absolute',
                      left: 5,
                      width: '98%',
                    }}
                    source={require('../../assets/images/Pline.png')}
                  />
                  <Image
                    style={{
                      top: 245,
                      position: 'absolute',
                      left: 5,
                      width: '98%',
                    }}
                    source={require('../../assets/images/Pline.png')}
                  />
                </View>

                <View style={{alignItems: 'center'}}>
                  <View style={{top: 110, position: 'absolute'}}>
                    {!postUser && (
                      <TouchableOpacity
                        style={{
                          bottom: 0,
                          right: '750%',
                          height: 50,
                        }}
                        onPress={() => refRBSheet.current.open()}>
                        <Feather name={'edit'} size={20} />
                      </TouchableOpacity>
                    )}

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

                    {!postUser && (
                      <TouchableOpacity
                        onPress={handleLogout}
                        style={{
                          bottom: 0,
                          left: '750%',
                          position: 'absolute',
                          height: 50,
                        }}>
                        <Feather
                          style={styles.chart}
                          name={'bar-chart'}
                          size={20}
                        />
                      </TouchableOpacity>
                    )}
                  </View>

                  <View style={{position: 'absolute', zIndex: 1, top: '62.5%'}}>
                    <Text
                      style={{
                        color: '#FFFFFF',
                        fontFamily: 'Proxima Nova',
                        fontWeight: '700',
                        fontSize: 16,
                        textAlign: 'center',
                      }}>
                      {user?.name}
                    </Text>
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
                        // left: 25,
                        bottom: 0,
                        alignSelf: 'center',
                      }}>
                      {user.bio}
                    </Text>
                  </View>

                  <View style={{top: '40%'}}>
                    <TouchableOpacity
                      style={{top: 115, right: 130, height: 50, width: 80}}
                      onPress={() => refRBSheet1.current.open()}>
                      <Text
                        style={{
                          color: '#939495',
                          fontFamily: 'Proxima Nova',
                          fontWeight: '400',
                          fontSize: 12,
                          left: 15,
                        }}>
                        Followers
                      </Text>
                      <Text
                        style={{
                          color: '#FFFFFF',
                          fontFamily: 'Proxima Nova',
                          fontWeight: '700',
                          fontSize: 16,
                          left: 35,
                        }}>
                        {user?.followers?.length || 0}
                      </Text>
                    </TouchableOpacity>

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
                      />
                    </RBSheet>

                    <TouchableOpacity
                      style={{top: 65, height: 50, width: 80}}
                      onPress={() => refRBSheet2.current.open()}>
                      <Text
                        style={{
                          color: '#939495',
                          fontFamily: 'Proxima Nova',
                          fontWeight: '400',
                          fontSize: 12,
                          left: 15,
                        }}>
                        Following
                      </Text>
                      <Text
                        style={{
                          color: '#FFFFFF',
                          fontFamily: 'Proxima Nova',
                          fontWeight: '700',
                          fontSize: 16,
                          left: 35,
                        }}>
                        {user?.following?.length || 0}
                      </Text>
                    </TouchableOpacity>

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
                      />
                    </RBSheet>

                    <TouchableOpacity
                      style={{top: 15, left: 130, height: 50, width: 80}}>
                      <Text
                        style={{
                          color: '#939495',
                          fontFamily: 'Proxima Nova',
                          fontWeight: '400',
                          fontSize: 12,
                          left: 15,
                        }}>
                        Posts
                      </Text>
                      <Text
                        style={{
                          color: '#FFFFFF',
                          fontFamily: 'Proxima Nova',
                          fontWeight: '700',
                          fontSize: 16,
                          left: 25,
                        }}>
                        {user?.posts?.items?.length || 0}
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <View style={{top: 90}}>
                    <TouchableOpacity
                      onPress={() => refRBSheet3.current.open()}
                      style={{left: 20, alignSelf: 'center', top: 10}}>
                      <Feather
                        style={{top: 10, right: 35}}
                        name={'activity'}
                        size={20}
                      />
                      <Text
                        style={{
                          color: '#FFFFFF',
                          fontFamily: 'Proxima Nova',
                          fontWeight: '700',
                          fontSize: 14,
                          bottom: 10,
                        }}>
                        View Analytics
                      </Text>
                    </TouchableOpacity>
                  </View>
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
              </View>

              <View
                style={{
                  zIndex: -1,
                  position: 'absolute',
                  bottom: 440,
                  width: '100%',
                }}>
                <Image
                  style={styles.user}
                  // source={{
                  //   uri: `https://graph.facebook.com/220891159509908/picture?height=500`,
                  // }}
                  source={{
                    uri: user.imageUri.startsWith('https')
                      ? user.imageUri
                      : `https://liveboxc7d791528cf44cb0b92efd2c8b1c077762739-staging.s3.ap-south-1.amazonaws.com/public/${user.imageUri}`,
                  }}
                />
              </View>
            </View>
            {/* {!postUser && (
            <View style={{margin: 20}}>
              <AppButton onPress={handleLogout} title="Logout" />
            </View>
            )} */}
            <View>
              {user?.id && (
                <Videos
                  userId={user.id}
                  postLength={user?.posts?.items?.length}
                  isProfile={!postUser ? true : false}
                  isSeeProfile={postUser ? true : false}
                />
              )}
            </View>
          </View>
        )}
      </ScrollView>
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
    height: 300,
    width: '100%',
    // borderRadius: 200,
    resizeMode: 'cover',
    zIndex: 1,
    position: 'absolute',
    // alignSelf: 'center',
    borderBottomRightRadius: 350,
    borderBottomLeftRadius: 350,
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
