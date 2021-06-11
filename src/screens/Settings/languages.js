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
import {API, graphqlOperation, Auth} from 'aws-amplify';
import {c} from '../../navigation/homeBottomTabNavigator';
import {updateUser} from '../../graphql/mutations';
import {getUser} from '../../graphql/queries';

const languagesList = [
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

const Languages = ({languages, user, closeSettings}) => {
  console.log('languages', languages);
  const [selLanguages, setSelLanguages] = useState(languages ? languages : []);

  useEffect(async () => {
    console.log('useeff');
    console.log(user.id);
    const response = await API.graphql(
      graphqlOperation(getUser, {
        id: user.id,
      }),
    );

    console.log('res', response.data.getUser.languages);

    let lang = response?.data?.getUser?.languages;
    if (lang) {
      setSelLanguages([...lang]);
    } else {
      setSelLanguages([]);
    }

    // if(languages){
    //   setSelLanguages([...lang])
    // }else{
    //   setSelLanguages([])
    // }
  }, []);

  const selectLanguage = async (l) => {
    try {
      let langArray = selLanguages;

      let checkLanguage = langArray.findIndex((lang) => l === lang);
      console.log(checkLanguage);

      if (checkLanguage == -1) {
        console.log(langArray);
        langArray.push(l);
        setSelLanguages([...langArray]);

        const response = await API.graphql(
          graphqlOperation(updateUser, {
            input: {
              id: user.id,
              languages: langArray,
            },
          }),
        );
      } else {
        console.log('before splice', langArray);
        langArray.splice(langArray.indexOf(l), 1);
        console.log('after splice', langArray);

        setSelLanguages([...langArray]);

        const response = await API.graphql(
          graphqlOperation(updateUser, {
            input: {
              id: user.id,
              languages: langArray,
            },
          }),
        );
      }
    } catch (error) {
      console.log('Lang select Error', error);
    }
  };

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <ScrollView>
        <View>
          <Text style={styles.text1}>Languages</Text>
          <TouchableOpacity
            onPress={closeSettings}
            style={{
              alignSelf: 'center',
              alignSelf: 'flex-start',
              left: 30,
              bottom: 20,
            }}>
            <Feather name={'x'} size={20} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'column',
            margin: 20,
          }}>
          {languagesList.map((c, i) => (
            <View key={`${c.language}-${i}`}>
              <TouchableOpacity
                style={{paddingBottom: 0}}
                onPress={() => selectLanguage(c.language)}>
                <View style={{flexDirection: 'row'}}>
                  <ImageBackground
                    source={c.src}
                    style={{width: 45, height: 45, justifyContent: 'center'}}>
                    <Text
                      style={[
                        styles.text2,
                        {
                          color:
                            selLanguages.findIndex((l) => c.language === l) !==
                            -1
                              ? '#21FFFC'
                              : '#FFFFFF',
                        },
                      ]}>
                      {c.letter}
                    </Text>
                  </ImageBackground>
                  <Text
                    style={[
                      styles.text3,
                      {
                        color:
                          selLanguages.findIndex((l) => c.language === l) !== -1
                            ? '#21FFFC'
                            : '#FFFFFF',
                      },
                    ]}>
                    {c.language}
                  </Text>
                </View>
                <View style={{alignItems: 'flex-end'}}>
                  {selLanguages.findIndex((l) => c.language === l) !== -1 ? (
                    <Image source={c.tick} style={[styles.image1]} />
                  ) : (
                    <Image source={c.untick} style={[styles.image1]} />
                  )}
                </View>
              </TouchableOpacity>
            </View>
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
