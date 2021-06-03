import React, {useEffect, useRef, useState, useCallback} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import {ImageBackground} from 'react-native';

const languages = [
  {
    src: require('../../assets/images/languagesquare.png'),
    language: 'English',
    letter: 'Aa',
    tick: require('../../assets/images/selectedcircle.png'),
    untick: require('../../assets/images/unselectedcircle.png'),
  },
  {
    src: require('../../assets/images/languagesquare.png'),
    language: 'Tamil',
    letter: 'ஆ',
    tick: require('../../assets/images/selectedcircle.png'),
    untick: require('../../assets/images/unselectedcircle.png'),
  },
  {
    src: require('../../assets/images/languagesquare.png'),
    language: 'Hindi',
    letter: 'अ',
    tick: require('../../assets/images/selectedcircle.png'),
    untick: require('../../assets/images/unselectedcircle.png'),
  },
  {
    src: require('../../assets/images/languagesquare.png'),
    language: 'Malayalam',
    letter: 'ആ',
    tick: require('../../assets/images/selectedcircle.png'),
    untick: require('../../assets/images/unselectedcircle.png'),
  },
  {
    src: require('../../assets/images/languagesquare.png'),
    language: 'Telugu',
    letter: 'ఆ',
    tick: require('../../assets/images/selectedcircle.png'),
    untick: require('../../assets/images/unselectedcircle.png'),
  },
  {
    src: require('../../assets/images/languagesquare.png'),
    language: 'Marathi',
    letter: 'आ',
    tick: require('../../assets/images/selectedcircle.png'),
    untick: require('../../assets/images/unselectedcircle.png'),
  },
  {
    src: require('../../assets/images/languagesquare.png'),
    language: 'Bengali',
    letter: 'আ',
    tick: require('../../assets/images/selectedcircle.png'),
    untick: require('../../assets/images/unselectedcircle.png'),
  },
  {
    src: require('../../assets/images/languagesquare.png'),
    language: 'Kannada',
    letter: 'আ',
    tick: require('../../assets/images/selectedcircle.png'),
    untick: require('../../assets/images/unselectedcircle.png'),
  },
];

const Languages = ({closeSheet}) => {
  const [selected, setSelected] = useState(false);

  const toggleSelected = () => {
    setSelected(!selected);
  };

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <ScrollView>
        <View>
          <Text style={styles.text1}>Languages</Text>
          {/* <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
            style={{
              alignSelf: 'center',
              alignSelf: 'flex-start',
              marginLeft: 10,
              bottom: 20,
            }}>
            <Feather name={'chevron-left'} size={20} />
          </TouchableOpacity> */}
        </View>
        <View
          style={{
            flexDirection: 'column',
            margin: 20,
          }}>
          {languages.map((c, i) => (
            <TouchableOpacity
              style={{paddingBottom: 0}}
              onPress={() => toggleSelected(true)}>
              <View style={{flexDirection: 'row'}}>
                <ImageBackground
                  source={c.src}
                  style={{width: 45, height: 45, justifyContent: 'center'}}>
                  <Text
                    style={[
                      styles.text2,
                      {color: selected ? '#21FFFC' : '#FFFFFF'},
                    ]}>
                    {c.letter}
                  </Text>
                </ImageBackground>
                <Text
                  style={[
                    styles.text3,
                    {color: selected ? '#21FFFC' : '#FFFFFF'},
                  ]}>
                  {c.language}
                </Text>
              </View>
              <View style={{alignItems: 'flex-end'}}>
                {selected ? (
                  <Image source={c.tick} style={[styles.image1]} />
                ) : (
                  <Image source={c.untick} style={[styles.image1]} />
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 20,
    backgroundColor: 'transparent',
  },
  text1: {
    color: '#FFFFFF',
    fontWeight: '700',
    textAlign: 'center',
    fontFamily: 'Proxima Nova',
    fontSize: 16,
  },
  text2: {
    color: '#FFFFFF',
    fontWeight: '700',
    textAlign: 'center',
    fontFamily: 'Proxima Nova',
    fontSize: 16,
    alignContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
  },
  text3: {
    color: '#FFFFFF',
    fontWeight: '700',
    textAlign: 'center',
    fontFamily: 'Proxima Nova',
    fontSize: 14,
    alignContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    paddingLeft: 40,
  },
  image1: {
    height: 20,
    width: 20,
    right: 30,
    bottom: 30,
  },
});

export default Languages;
