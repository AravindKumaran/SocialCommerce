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
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Feather from 'react-native-vector-icons/Feather';
import Searchbar from '../../screens/Profile/search';

const ActiveStyle = () => (
  <>
    <Image
      style={{
        position: 'absolute',
        top: 0,
        left: 65,
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
        height: 4,
        borderRadius: 14,
        position: 'absolute',
        top: 0,
        borderBottomColor: '#21FFFC',
        borderBottomWidth: 4,
        left: 90,
        zIndex: 1,
      }}></View>
  </>
);

const ActiveStyle1 = () => (
  <>
    <Image
      style={{
        position: 'absolute',
        top: 0,
        right: 65,
        transform: [
          {
            rotate: '-180deg',
          },
        ],
      }}
      source={require('../../assets/images/blur.png')}
      width={5}
      height={5}
    />
    <View
      style={{
        width: 27,
        height: 4,
        borderRadius: 14,
        position: 'absolute',
        top: 0,
        borderBottomColor: '#21FFFC',
        borderBottomWidth: 4,
        right: 93,
        zIndex: 1,
      }}></View>
  </>
);

const Following = ({data}) => {
  // console.log('Flig', data);
  const [isTouched, setTouched] = useState(false);
  const [isPressed, setPressed] = useState(true);
  const [isClicked, setClicked] = useState(false);

  const user = [
    {
      name: 'Tamil25',
      photo: 'https://i.stack.imgur.com/t8vJf.jpg?s=328&g=1',
    },
    {
      name: 'Eren45',
      photo: 'https://i.stack.imgur.com/t8vJf.jpg?s=328&g=1',
    },
    {
      name: 'Mikasa',
      photo: 'https://i.stack.imgur.com/t8vJf.jpg?s=328&g=1',
    },
    {
      name: 'Armin65',
      photo: 'https://i.stack.imgur.com/t8vJf.jpg?s=328&g=1',
    },
    {
      name: 'Levi75',
      photo: 'https://i.stack.imgur.com/t8vJf.jpg?s=328&g=1',
    },
    {
      name: 'Hange85',
      photo: 'https://i.stack.imgur.com/t8vJf.jpg?s=328&g=1',
    },
    {
      name: 'Tamil25',
      photo: 'https://i.stack.imgur.com/t8vJf.jpg?s=328&g=1',
    },
    {
      name: 'Eren45',
      photo: 'https://i.stack.imgur.com/t8vJf.jpg?s=328&g=1',
    },
    {
      name: 'Mikasa',
      photo: 'https://i.stack.imgur.com/t8vJf.jpg?s=328&g=1',
    },
    {
      name: 'Armin65',
      photo: 'https://i.stack.imgur.com/t8vJf.jpg?s=328&g=1',
    },
    {
      name: 'Levi75',
      photo: 'https://i.stack.imgur.com/t8vJf.jpg?s=328&g=1',
    },
    {
      name: 'Hange85',
      photo: 'https://i.stack.imgur.com/t8vJf.jpg?s=328&g=1',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View style={{alignItems: 'center', padding: 5}}>
          <View style={{top: 20, right: 80}}>
            <TouchableOpacity
              onPress={() => {
                setTouched(!isTouched);
                setPressed(!isPressed);
              }}>
              <Text
                style={{
                  color: !isTouched ? '#FFFFFF' : '#21FFFC',
                  fontFamily: 'Proxima Nova',
                  fontWeight: '700',
                  fontSize: 16,
                }}>
                Followers
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{left: 80}}>
            <TouchableOpacity
              onPress={() => {
                setPressed(!isPressed);
                setTouched(!isTouched);
              }}>
              <Text
                style={{
                  color: !isPressed ? '#FFFFFF' : '#21FFFC',
                  fontFamily: 'Proxima Nova',
                  fontWeight: '700',
                  fontSize: 16,
                }}>
                Following
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{top: 10}}>
            <Image source={require('../../assets/images/Pline.png')} />
          </View>
        </View>

        <View style={{top: 10}}>
          <Searchbar />
        </View>

        <View style={{padding: 20}}>
          <ScrollView showsVerticalScrollIndicator={false} style={{top: 50}}>
            <View>
              {data?.length > 0 &&
                data.map((v, i) => {
                  return (
                    <View key={`${v.userId}-${i}`}>
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
                            fontSize: 14,
                            left: 60,
                            bottom: 25,
                          }}>
                          {v.userName}
                        </Text>
                      </View>
                      <View>
                        <Feather
                          style={{bottom: 50, left: 310}}
                          name={'more-vertical'}
                          size={25}
                        />
                      </View>
                      <View style={{margin: -25}}>
                        <LinearGradient
                          start={{x: 0, y: 0}}
                          end={{x: 1, y: 0}}
                          colors={['#252525', '#252525', '#252525']}
                          style={styles.Rectangle1}>
                          <TouchableOpacity>
                            <Text
                              style={{
                                color: '#FFFFFF',
                                fontFamily: 'Proxima Nova',
                                fontWeight: '400',
                                fontSize: 14,
                              }}>
                              Following
                            </Text>
                          </TouchableOpacity>
                        </LinearGradient>
                      </View>
                    </View>
                  );
                })}
            </View>
          </ScrollView>
        </View>

        {isTouched && isPressed == false ? <ActiveStyle /> : <></>}

        {isPressed && isTouched == false ? <ActiveStyle1 /> : <></>}
      </View>
    </SafeAreaView>
  );
};
export default Following;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1A',
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
    width: 100,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    left: 220,
    bottom: 50,
  },
});
