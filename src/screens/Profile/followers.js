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

const Followers = ({data, followingData, user, postUser, currentPost}) => {
  console.log('followingdata', followingData);
  console.log('data', data);
  console.log('user', user);
  const [isTouched, setTouched] = useState(true);
  const [isPressed, setPressed] = useState(false);
  const [actualData, setData] = useState(data);

  const [active, setActive] = useState('followers');

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
                  setData(data);
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
                  if (isTouched === true) {
                    setData(followingData);
                  }
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
                          style={{}}>
                          <View>
                            <Image
                              source={{uri: v.imgUri}}
                              style={{height: 35, width: 35, borderRadius: 20}}
                            />
                          </View>
                          <View>
                            <Text
                              style={{
                                color: '#FFFFFF',
                                fontFamily: 'Proxima Nova',
                                fontWeight: '700',
                                fontSize: 12,
                                left: 60,
                                bottom: 25,
                              }}>
                              {v.userName}
                            </Text>
                          </View>
                        </TouchableOpacity>
                        <View>
                          <TouchableOpacity style={{bottom: 50, left: 310}}>
                            <Feather name={'more-vertical'} size={25} />
                          </TouchableOpacity>
                        </View>
                        <TouchableOpacity style={styles.Rectangle1}>
                          <LinearGradient
                            start={{x: 0, y: 0}}
                            end={{x: 1, y: 0}}
                            colors={['#518BF9', '#1DEAE7']}
                            style={{
                              width: 120,
                              height: 30,
                              alignItems: 'center',
                              borderRadius: 15,
                            }}>
                            <Text
                              style={{
                                color: '#FFFFFF',
                                fontFamily: 'Proxima Nova',
                                fontWeight: '400',
                                fontSize: 14,
                                top: 5,
                              }}>
                              Follow
                            </Text>
                          </LinearGradient>
                        </TouchableOpacity>
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
export default Followers;

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
    bottom: 52,
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
