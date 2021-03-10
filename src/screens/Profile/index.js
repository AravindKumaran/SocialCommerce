import React, {useEffect, useRef, useState, useCallback} from 'react';
import {Storage, API, graphqlOperation, Auth} from 'aws-amplify';
import { View,Text,TextInput,TouchableOpacity,ActivityIndicator,StyleSheet, Image,ImageBackground,ScrollView,SafeAreaView,FlatList, ImageBase,Dimensions} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Feather from 'react-native-vector-icons/Feather';
import EditProfile from '../../screens/Profile/editprofile';
import Followers from '../../screens/Profile/followers';
import RBSheet from 'react-native-raw-bottom-sheet';

const ProfileScreen = () => {
  const refRBSheet = useRef();
  const refRBSheet1 = useRef();

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

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

        <View style={{top: 0, height: 400}}>

          <View style={{top: 80}}>

            <View style={{left: 2}}>
                <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 0, y: 0}}
                colors={['#141414', '#232323']}
                style={styles.Rectangle}>
                <View />
              </LinearGradient>

              <Image
                style={{top: 180, position: 'absolute', left: 5}}
                source={require('../../assets/images/Pline.png')}
              />
              <Image
                style={{top: 245, position: 'absolute', left: 5}}
                source={require('../../assets/images/Pline.png')}
              />
            </View>


            <View style={{alignItems: 'center'}}>

              <View style={{top: 110, position: 'absolute'}}>
                <TouchableOpacity style={{bottom: 0, right: 130}} onPress={() => refRBSheet.current.open()} >
                  <Feather name={'edit'} size={25} />
                </TouchableOpacity>  

                <RBSheet
                  ref={refRBSheet}
                  height={Dimensions.get('window').height - 140}
                  animationType="fade"
                  customStyles={{
                    wrapper: {
                      backgroundColor: 'rgba(0,0,0,.6)',
                      padding: 10
                    },
                    draggableIcon: {
                      backgroundColor: '#000',
                    },
                    container: {
                      backgroundColor: '#1A1A1A',
                      borderRadius: 25,
                      bottom: 85
                    },
                  }}>
                  <EditProfile />
                </RBSheet>

                <TouchableOpacity style={{bottom: 50, left: 200, position: 'absolute'}} onPress={() => refRBSheet1.current.open()} >
                  <Feather style={styles.chart} name={'bar-chart'} size={25} />
                </TouchableOpacity>

                <RBSheet
                  ref={refRBSheet1}
                  height={Dimensions.get('window').height - 140}
                  animationType="fade"
                  customStyles={{
                    wrapper: {
                      backgroundColor: 'rgba(0,0,0,.6)',
                      padding: 10
                    },
                    draggableIcon: {
                      backgroundColor: '#000',
                    },
                    container: {
                      backgroundColor: '#1A1A1A',
                      borderRadius: 25,
                      bottom: 85
                    },
                  }}>
                  <Followers />
                </RBSheet>

                <Text style={{color: '#FFFFFF' ,fontFamily: 'Proxima Nova' ,fontWeight: '700' ,fontSize: 18, bottom: 20}}>Username</Text>
                <Text style={{color: '#FFFFFF' ,fontFamily: 'Proxima Nova' ,fontWeight: '400' ,fontSize: 16, left: 25, bottom: 20}}>Bio</Text>
              </View>

              <View style={{top: 70}}>
                <TouchableOpacity style={{top: 120, right: 130}}>
                  <Text style={{color: '#939495' ,fontFamily: 'Proxima Nova' ,fontWeight: '400' ,fontSize: 16}}>Followers</Text>
                  <Text style={{color: '#FFFFFF' ,fontFamily: 'Proxima Nova' ,fontWeight: '700' ,fontSize: 18, left: 10}}>10K</Text>
                </TouchableOpacity> 

                <TouchableOpacity style={{top: 75}}>
                  <Text style={{color: '#939495' ,fontFamily: 'Proxima Nova' ,fontWeight: '400' ,fontSize: 16}}>Following</Text>
                  <Text style={{color: '#FFFFFF' ,fontFamily: 'Proxima Nova' ,fontWeight: '700' ,fontSize: 18, left: 20}}>1K</Text>
                </TouchableOpacity> 

                <TouchableOpacity style={{top: 30, left: 150}}>
                  <Text style={{color: '#939495' ,fontFamily: 'Proxima Nova' ,fontWeight: '400' ,fontSize: 16}}>Posts</Text>
                  <Text style={{color: '#FFFFFF' ,fontFamily: 'Proxima Nova' ,fontWeight: '700' ,fontSize: 18, left: 5}}>500</Text>
                </TouchableOpacity>
              </View>

              <View >
                <TouchableOpacity style={{top: 95, left: 20}}>
                  <Feather style={{top: 25, right: 35}} name={'activity'} size={25} />
                  <Text style={{color: '#FFFFFF' ,fontFamily: 'Proxima Nova' ,fontWeight: '700' ,fontSize: 18}}>View Analytics</Text>
                </TouchableOpacity> 
              </View>

            </View>

          </View>

          <View style={{zIndex: -1, position: 'absolute', bottom: 440}}>
          <Image
              style={styles.user}
              source={require('../../assets/images/User.png')}
            />
          </View>

        </View>

        <View style={{flexWrap: 'wrap', flexDirection: 'row',  }}>
          {images.map((s) => (
          <TouchableOpacity style={{aspectRatio: 0.7, width: '33.33%', }}>
            <Image style={{flex: 1, resizeMode: 'contain', height: '100%', width: '100%', marginBottom: 10, }} source={s}></Image>             
          </TouchableOpacity>
          ))}
        </View>

      </ScrollView>
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
    width: 380,
    height: 200,
    borderRadius: 10,
    left: 5,
    opacity: 0.8,
    position: 'absolute',
  },
  user: {
    height: 300,
    width: 400,
    borderRadius: 50,
    zIndex: 1,
    position: 'absolute'
  },
  mediaImageContainer: {
    width: 180,
    height: 200,
    borderRadius: 12,
    overflow: "hidden",
    marginHorizontal: 10, 
    padding: 10,
    resizeMode: 'cover'
},
});
