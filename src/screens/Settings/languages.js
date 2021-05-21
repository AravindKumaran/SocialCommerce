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

const Languages = ({closeSheet}) => {
  const [english, setEnglish] = useState(false);
  const [tamil, setTamil] = useState(false);
  const [hindi, setHindi] = useState(false);
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.text1}>Languages</Text>
        <TouchableOpacity
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
        </TouchableOpacity>
      </View>
      <View style={{padding: 30}}>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            style={{flexDirection: 'row'}}
            onPress={() => setEnglish(true)}>
            <ImageBackground
              source={require('../../assets/images/languagesquare.png')}
              style={{width: 45, height: 45, justifyContent: 'center'}}>
              <Text style={styles.text2}>Aa</Text>
            </ImageBackground>
            <Text style={styles.text3}>English</Text>
          </TouchableOpacity>
          {english ? (
            <Image
              source={require('../../assets/images/selectedcircle.png')}
              style={styles.image1}
            />
          ) : (
            <Image
              source={require('../../assets/images/unselectedcircle.png')}
              style={styles.image1}
            />
          )}
        </View>

        <View style={{flexDirection: 'row', marginTop: 30}}>
          <TouchableOpacity
            style={{flexDirection: 'row'}}
            onPress={() => setTamil(true)}>
            <ImageBackground
              source={require('../../assets/images/languagesquare.png')}
              style={{width: 45, height: 45, justifyContent: 'center'}}>
              <Text style={styles.text2}>Aa</Text>
            </ImageBackground>
            <Text style={styles.text3}>Tamil</Text>
          </TouchableOpacity>
          {tamil ? (
            <Image
              source={require('../../assets/images/selectedcircle.png')}
              style={styles.image1}
            />
          ) : (
            <Image
              source={require('../../assets/images/unselectedcircle.png')}
              style={styles.image1}
            />
          )}
        </View>

        <View style={{flexDirection: 'row', marginTop: 30}}>
          <TouchableOpacity
            style={{flexDirection: 'row'}}
            onPress={() => setHindi(true)}>
            <ImageBackground
              source={require('../../assets/images/languagesquare.png')}
              style={{width: 45, height: 45, justifyContent: 'center'}}>
              <Text style={styles.text2}>Aa</Text>
            </ImageBackground>
            <Text style={styles.text3}>Hindi</Text>
          </TouchableOpacity>
          {hindi ? (
            <Image
              source={require('../../assets/images/selectedcircle.png')}
              style={styles.image1}
            />
          ) : (
            <Image
              source={require('../../assets/images/unselectedcircle.png')}
              style={styles.image1}
            />
          )}
        </View>
      </View>
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
    alignContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    left: 100,
  },
});

export default Languages;
