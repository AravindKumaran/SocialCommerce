import React, {useEffect, useRef, useState, useCallback} from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, StyleSheet, Image, ImageBackground } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Feather from 'react-native-vector-icons/Feather';

const ProfileScreen = () => {
  const [user, setUser] = useState(null);

  return (
    <View style={styles.container}>

      <View>
        <Image style={styles.user} source={require('../../assets/images/User.png')} />
      </View>

      <View style={styles.container1}>
        <View style={styles.box}>
          <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={['#141414', '#232323']} style={styles.Rectangle} >
            <View />
          </LinearGradient>

          <Image style={styles.img1} source={require('../../assets/images/Pline.png')} />
          <Image style={styles.img2} source={require('../../assets/images/Pline.png')} />  

        </View>

        <View style={styles.icon}>
          <TouchableOpacity style={styles.t1}>
            <Feather style={styles.icon1} name={'activity'} size={25} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.t2}>
            <Feather style={styles.icon2} name={'bar-chart'} size={25} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.t3}>
            <Feather style={styles.icon3} name={'edit'} size={25} />
          </TouchableOpacity>
        </View>

        <View style={{alignContent: 'center', alignItems: 'center', justifyContent: 'center'}}>

          <Text style={{fontFamily: 'Proxima Nova', fontWeight: '700', fontSize: 16, bottom: 180}}>Mikasa_45</Text>
          <Text style={{fontFamily: 'Proxima Nova', fontWeight: '400', fontSize: 12, bottom: 175, right: 30}}>Monster_Hunter</Text>
          <Text style={{fontFamily: 'Proxima Nova', fontWeight: '400', fontSize: 12, bottom: 190, left: 40}}>.  Mar 15</Text>
          <Text style={{fontFamily: 'Proxima Nova', fontWeight: '400', fontSize: 12, bottom: 161, right: 100}}>Folowers</Text>
          <Text style={{fontFamily: 'Proxima Nova', fontWeight: '700', fontSize: 16, bottom: 155, right: 100}}>10k</Text>
          <Text style={{fontFamily: 'Proxima Nova', fontWeight: '400', fontSize: 12, bottom: 198}}>Following</Text>
          <Text style={{fontFamily: 'Proxima Nova', fontWeight: '700', fontSize: 16, bottom: 192}}>100</Text>
          <Text style={{fontFamily: 'Proxima Nova', fontWeight: '400', fontSize: 12, bottom: 235, left: 100}}>Posts</Text>
          <Text style={{fontFamily: 'Proxima Nova', fontWeight: '700', fontSize: 16, bottom: 230, left: 100}}>500</Text>
          <Text style={{fontFamily: 'Proxima Nova', fontWeight: '700', fontSize: 16, bottom: 210, left: 20}}>View Analytics</Text>
          
        </View>

      </View>

    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#20232A',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    top: 0
  },
  container1: {
    top: 10, 
    zIndex: 1
  },
  box: {
    right: 135
  },
  user: {
    height: 300,
    width: 400,
    bottom: 140, 
    borderRadius: 50,
  },
  text1: {
    color: '#FFFFFF',
    fontFamily: 'Proxima Nova',
    fontWeight: '700',
    fontSize: 24,
    bottom: 180,
    left: 10,
    zIndex: 1
  },
  text2: {
    color: '#51565D',
    fontFamily: 'Proxima Nova',
    fontWeight: '400',
    fontSize: 12,
    bottom: 150,
    left: 170,
    zIndex: 1
  },
  Rectangle: {
    bottom: 0,
    width: 370,
    height: 200,
    borderRadius: 10,
    left: 5,
    opacity: 0.8,
    position: 'absolute',
    // zIndex: 1
  },
  line1: {
    height: 10,
    width: 300,
    color: 'red',
    top: 200
  },
  img1: {
    bottom: 56,
    position: 'absolute'
  },
  img2: {
    bottom: 122,
    position: 'absolute'
  },
  t1: {
    position: 'absolute',
    zIndex: 1
  },
  t2: {
    position: 'absolute',
    zIndex: 1
  },
  t3: {
    position: 'absolute',
    zIndex: 1
  },
  icon: {
    left: 55
  },
  icon1: {
    position: 'absolute',
    bottom: 20, 
    right: 40
  },
  icon2: {
    position: 'absolute',
    bottom: 160,
    left: 140,
    transform: [{scaleX: -1}, {rotate: '90deg'}]
  },
  icon3: {
    bottom: 160,
    right: 140,
    position: 'absolute'
  }
});


