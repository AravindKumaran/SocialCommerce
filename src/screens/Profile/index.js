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
import {getUser} from '../../graphql/queries';

const randomImages = [
  'https://hieumobile.com/wp-content/uploads/avatar-among-us-2.jpg',
  'https://hieumobile.com/wp-content/uploads/avatar-among-us-3.jpg',
  'https://hieumobile.com/wp-content/uploads/avatar-among-us-6.jpg',
  'https://hieumobile.com/wp-content/uploads/avatar-among-us-9.jpg',
];

const getRandomImage = () => {
  return randomImages[Math.floor(Math.random() * randomImages.length)];
};

const ProfileScreen = () => {
  const refRBSheet = useRef();
  const refRBSheet1 = useRef();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const refRBSheet2 = useRef();

  const [images, setimages] = useState([
    require('../../assets/images/i1.png'),
    require('../../assets/images/i2.png'),
    require('../../assets/images/i3.png'),
    require('../../assets/images/i4.png'),
    require('../../assets/images/i5.png'),
    require('../../assets/images/i6.png'),
    require('../../assets/images/i1.png'),
    require('../../assets/images/i2.png'),
    require('../../assets/images/i3.png'),
    require('../../assets/images/i4.png'),
    require('../../assets/images/i5.png'),
    require('../../assets/images/i6.png'),
  ]);

  const checkUser = async () => {
    setLoading(true);
    // console.log('Im calling');
    try {
      const userInfo = await Auth.currentAuthenticatedUser({
        bypassCache: true,
      });
      // console.log('USerInfo', userInfo);
      const userRes = await API.graphql(
        graphqlOperation(getUser, {id: userInfo.attributes.sub}),
      );

      // console.log('UserRes', userRes);

      if (!userRes.data.getUser) {
        const newUser = {
          id: userInfo.attributes.sub,
          username: userInfo.attributes.email.split('@')[0],
          email: userInfo.attributes.email,
          imageUri: getRandomImage(),
        };
        const res = await API.graphql(
          graphqlOperation(createUser, {input: newUser}),
        );
        setUser(res?.data?.createUser);
      }
      setUser(userRes?.data?.getUser);
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
    Auth.signOut();
    setUser(null);
  };

  useEffect(() => {
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
    checkUser();
  }, []);

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
                  <TouchableOpacity
                    style={{bottom: 0, right: '150%'}}
                    onPress={() => refRBSheet.current.open()}>
                    <Feather name={'edit'} size={20} />
                  </TouchableOpacity>

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
                    <EditProfile />
                  </RBSheet>

                  <TouchableOpacity
                    style={{bottom: 40, left: '220%', position: 'absolute'}}>
                    <Feather
                      style={styles.chart}
                      name={'bar-chart'}
                      size={20}
                    />
                  </TouchableOpacity>

                  <Text
                    style={{
                      color: '#FFFFFF',
                      fontFamily: 'Proxima Nova',
                      fontWeight: '700',
                      fontSize: 16,
                      bottom: 10,
                    }}>
                    mark_3425
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
                    Designer
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
                        left: 10,
                      }}>
                      10K
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
                    <Followers />
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
                      1K
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
                    <Following />
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
                        left: 5,
                      }}>
                      500
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
                source={require('../../assets/images/User2.png')}
              />
            </View>
          </View>
          <View style={{margin: 20}}>
            <AppButton onPress={handleLogout} title="Logout" />
          </View>
          <View
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
          </View>
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
    zIndex: 1,
    position: 'absolute',
    alignSelf: 'center',
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
