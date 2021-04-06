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
import {
  useIsFocused,
  useNavigationState,
  CommonActions,
  useNavigation,
  useRoute,
  getFocusedRouteNameFromRoute,
} from '@react-navigation/native';
import {getTabBarIcon} from '../../navigation/homeBottomTabNavigator';

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

const ProfileScreen = ({navigation, route}) => {
  // const state = useNavigationState((state) => state);
  // console.log('State', state);
  const refRBSheet = useRef();
  const refRBSheet1 = useRef();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const refRBSheet2 = useRef();

  const isFocused = useIsFocused();

  // useEffect(()=>{
  //   getTabBarIcon()
  // },[user])

  const checkUser = async () => {
    setLoading(true);
    // console.log('Im calling');
    try {
      const userInfo = await Auth.currentAuthenticatedUser({
        bypassCache: true,
      });
      console.log('UserInfio', userInfo.attributes);

      const userRes = await API.graphql(
        graphqlOperation(getUser, {
          id: userInfo.attributes.email,
        }),
      );

      console.log('UserRews', userRes.data.getUser);

      // console.log('USer', userRes.data.listUsers.items.length);
      if (!userRes?.data?.getUser) {
        const identity = JSON.parse(userInfo.attributes.identities);
        const provider = identity[0].providerName;
        let uri;
        if (userInfo.attributes?.picture) {
          if (provider === 'Facebook') {
            const pic = JSON.parse(userInfo.attributes.picture);
            uri = pic.data.url;
          } else {
            uri = userInfo.attributes.picture;
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
        navigation.setOptions({
          tabBarIcon: ({focused, tintColor}) => (
            <>
              <Image
                // source={require('../assets/images/Profile_icon.png')}
                source={{
                  uri: res?.data?.createUser.imageUri.startsWith('https')
                    ? res?.data?.createUser.imageUri
                    : `https://tiktok23f096015e564dd1964361d5c47fb832221214-demo.s3.us-east-2.amazonaws.com/public/${res?.data?.createUser.imageUri}`,
                }}
                size={25}
                style={{bottom: 2, width: 25, height: 25, borderRadius: 12}}
              />
              {focused && <ActiveStyle />}
            </>
          ),
        });
      } else {
        setUser(userRes?.data?.getUser);
        // getTabBarIcon(isFocused, userRes.data?.getUser?.imageUri);
        navigation.setOptions({
          tabBarIcon: ({focused, tintColor}) => (
            <>
              <Image
                // source={require('../assets/images/Profile_icon.png')}
                source={{
                  uri: userRes.data?.getUser?.imageUri.startsWith('https')
                    ? userRes.data?.getUser?.imageUri
                    : `https://tiktok23f096015e564dd1964361d5c47fb832221214-demo.s3.us-east-2.amazonaws.com/public/${userRes.data?.getUser?.imageUri}`,
                }}
                size={25}
                style={{bottom: 2, width: 25, height: 25, borderRadius: 12}}
              />
              {focused && <ActiveStyle />}
            </>
          ),
        });
      }
      setLoading(false);
    } catch (error) {
      console.log('Error', error);
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
        }, 5000);
      } catch (error) {
        console.log('Error', error);
      }
    }
  };

  const handleLogout = async () => {
    console.log('User', user);
    Auth.signOut();
    setUser(null);
  };

  useEffect(() => {
    if (!route?.params?.postUser) {
      Hub.listen('auth', ({payload: {event, data}}) => {
        switch (event) {
          case 'signIn':
          case 'cognitoHostedUI':
            checkUser();
            break;
          case 'signOut':
            setUser(null);
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
    if (!route?.params?.postUser) {
      checkUser();
    } else {
      setUser(route?.params?.postUser);
      // navigation.setOptions({
      //   tabBarIcon: ({focused, tintColor}) => (
      //     <>
      //       <Image
      //         // source={require('../assets/images/Profile_icon.png')}
      //         source={{
      //           uri: route?.params?.postUser.imageUri.startsWith('https')
      //             ? route?.params?.postUser.imageUri
      //             : `https://tiktok23f096015e564dd1964361d5c47fb832221214-demo.s3.us-east-2.amazonaws.com/public/${route?.params?.postUser.imageUri}`,
      //         }}
      //         size={25}
      //         style={{bottom: 2, width: 25, height: 25, borderRadius: 12}}
      //       />
      //       {focused && <ActiveStyle />}
      //     </>
      //   ),
      // });
    }
  }, [isFocused === true]);

  useEffect(() => {
    if (isFocused === false) {
      navigation.dispatch({
        ...CommonActions.setParams({postUser: null}),
        source: route.key,
      });
      // console.log('I am called', isFocused, route?.params?.postUser);
    }
  }, [!isFocused === false]);

  const handleUpdateUser = (user) => {
    console.log('I am called');
    navigation.setOptions({
      tabBarIcon: ({focused, tintColor}) => (
        <>
          <Image
            // source={require('../assets/images/Profile_icon.png')}
            source={{
              uri: user.imageUri.startsWith('https')
                ? user.imageUri
                : `https://tiktok23f096015e564dd1964361d5c47fb832221214-demo.s3.us-east-2.amazonaws.com/public/${user.imageUri}`,
            }}
            size={25}
            style={{bottom: 2, width: 25, height: 25, borderRadius: 12}}
          />
          {focused && <ActiveStyle />}
        </>
      ),
    });
    setUser(user);
  };

  return (
    <SafeAreaView style={styles.container}>
      {loading && <LoadingIndicator visible={loading} />}
      {!user ? (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            marginHorizontal: 30,
          }}>
          <Text style={{fontSize: 22, margin: 5}}>You are not logged in</Text>
          <AppButton title="Login" onPress={handleLogin} />
        </View>
      ) : (
        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}>
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
                  {!route?.params?.postUser && (
                    <TouchableOpacity
                      style={{bottom: 0, right: '750%'}}
                      onPress={() => refRBSheet.current.open()}>
                      <Feather name={'edit'} size={20} />
                    </TouchableOpacity>
                  )}

                  <RBSheet
                    ref={refRBSheet}
                    height={Dimensions.get('window').height - 140}
                    animationType="fade"
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
                    <EditProfile user={user} saveUser={handleUpdateUser} />
                  </RBSheet>

                  <TouchableOpacity
                    style={{bottom: 0, left: '750%', position: 'absolute'}}>
                    <Feather
                      style={styles.chart}
                      name={'bar-chart'}
                      size={20}
                    />
                  </TouchableOpacity>
                </View>

                <View style={{position: 'absolute', zIndex: 1, top: '90%'}}>
                  <View style={{bottom: 40}}>
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
                      }}>
                      {` (${user.username}) `}
                    </Text>
                  </View>

                  <Text
                    style={{
                      color: '#FFFFFF',
                      fontFamily: 'Proxima Nova',
                      fontWeight: '400',
                      fontSize: 12,
                      // left: 25,
                      bottom: 40,
                      alignSelf: 'center',
                    }}>
                    {user.bio}
                  </Text>
                </View>

                <View style={{top: '40%'}}>
                  <TouchableOpacity
                    style={{top: 135, right: 130}}
                    onPress={() => refRBSheet1.current.open()}>
                    <Text
                      style={{
                        color: '#939495',
                        fontFamily: 'Proxima Nova',
                        fontWeight: '400',
                        fontSize: 12,
                      }}>
                      Followers
                    </Text>
                    <Text
                      style={{
                        color: '#FFFFFF',
                        fontFamily: 'Proxima Nova',
                        fontWeight: '700',
                        fontSize: 14,
                        left: 20,
                      }}>
                      {user?.followers?.length || 0}
                    </Text>
                  </TouchableOpacity>

                  <RBSheet
                    ref={refRBSheet1}
                    height={Dimensions.get('window').height - 140}
                    animationType="fade"
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
                    style={{top: 100}}
                    onPress={() => refRBSheet2.current.open()}>
                    <Text
                      style={{
                        color: '#939495',
                        fontFamily: 'Proxima Nova',
                        fontWeight: '400',
                        fontSize: 12,
                      }}>
                      Following
                    </Text>
                    <Text
                      style={{
                        color: '#FFFFFF',
                        fontFamily: 'Proxima Nova',
                        fontWeight: '700',
                        fontSize: 14,
                        left: 20,
                      }}>
                      {user?.following?.length || 0}
                    </Text>
                  </TouchableOpacity>

                  <RBSheet
                    ref={refRBSheet2}
                    height={Dimensions.get('window').height - 140}
                    animationType="fade"
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

                  <TouchableOpacity style={{top: 65, left: 150}}>
                    <Text
                      style={{
                        color: '#939495',
                        fontFamily: 'Proxima Nova',
                        fontWeight: '400',
                        fontSize: 12,
                      }}>
                      Posts
                    </Text>
                    <Text
                      style={{
                        color: '#FFFFFF',
                        fontFamily: 'Proxima Nova',
                        fontWeight: '700',
                        fontSize: 14,
                        left: 3,
                      }}>
                      {user?.posts?.items?.length || 0}
                    </Text>
                  </TouchableOpacity>
                </View>

                <View style={{top: 135}}>
                  <TouchableOpacity style={{left: 20, alignSelf: 'center'}}>
                    <Feather
                      style={{top: 20, right: 35}}
                      name={'activity'}
                      size={20}
                    />
                    <Text
                      style={{
                        color: '#FFFFFF',
                        fontFamily: 'Proxima Nova',
                        fontWeight: '700',
                        fontSize: 14,
                      }}>
                      View Analytics
                    </Text>
                  </TouchableOpacity>
                </View>
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
                // source={require('../../assets/images/User2.png')}
                source={{
                  uri: user.imageUri.startsWith('https')
                    ? user.imageUri
                    : `https://tiktok23f096015e564dd1964361d5c47fb832221214-demo.s3.us-east-2.amazonaws.com/public/${user.imageUri}`,
                }}
              />
            </View>
          </View>
          {!route?.params?.postUser && (
            <View style={{margin: 20}}>
              <AppButton onPress={handleLogout} title="Logout" />
            </View>
          )}

          {/* <View
            style={{
              flexWrap: 'wrap',
              flexDirection: 'row',
              marginHorizontal: '4%',
            }}>
            {images.map((s, i) => (
              <TouchableOpacity
                key={i}
                style={{aspectRatio: 0.7, width: '33.33%'}}>
                <Image
                  style={{
                    flex: 1,
                    resizeMode: 'contain',
                    height: '100%',
                    width: '100%',
                    marginBottom: 10,
                  }}
                  source={s}></Image>
              </TouchableOpacity>
            ))}
          </View> */}
          {user?.posts?.items?.length > 0 && <Videos post={user.posts.items} />}
        </ScrollView>
      )}
    </SafeAreaView>
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
