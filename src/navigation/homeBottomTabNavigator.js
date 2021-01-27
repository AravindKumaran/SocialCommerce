import React, { useState } from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Camera from '../screens/Camera';
import Search from '../screens/Search';
import Notifications from '../screens/Notifications';
import ProfileScreen from '../screens/Profile/index';
import {Image, Text, View} from 'react-native';
import {color} from 'react-native-reanimated';

// import post from '../components/Post';
// import Entypo from 'react-native-vector-icons/Entypo';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import Plusicon from '../assets/images/Plus_icon.png';
// import Homeicon from '../assets/images/Home_icon.png';
// import Bellicon from '../assets/images/Bell_icon.png';
// import { TouchableOpacity } from 'react-native-gesture-handler';
// import { NavigationContainer } from '@react-navigation/native';
// import Profileicon from '../assets/images/Profile_icon.png';
// import Likeicon from '../assets/images/Like_icon.png';
// import Plus from '../assets/images/Plus.png';
// import Fontisto from 'react-native-vector-icons/Fontisto';
// import { color } from 'react-native-reanimated';
// import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
// import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
// import Feather from 'react-native-vector-icons/Feather';
// import Product from '../screens/Product';

const ActiveStyle = () => (
  <>
    <Image
      style={{
        position: 'absolute',
        bottom: -2,
      }}
      source={require('../assets/images/blur.png')}
      width={15}
      height={15}
      tintColor={color}
    />
    <View
      style={{
        width: 27,
        height: 4,
        borderRadius: 14,
        position: 'absolute',
        bottom: 1,
        borderBottomColor: '#21FFFC',
        borderBottomWidth: 4,
      }}></View>
  </>
);

// function Color(){
//   return {
   
//       <Image source={require('../assets/images/Search_icon.png')} size={15} style={{width: 25, height: 25, bottom: -5}}  />

//   }
// }

// const Color = () => {
//   return (
//     <View>
//       <Image
//         source={require('../assets/images/Search_icon.png')}
//         style={{width: 25, height: 25, bottom: -5}}
//         tintColor= '#21FFFC'
//       />
//     </View>
//     // tintColor= '#21FFFC'
//   );
// }


// tabBarIcon: ({tintColor}) => <SimpleLineIcons name='home' color={tintColor} size={25}/>
// tabBarOptions: { activeTintColor:'blue', }

// state={
//   tintColor: '#21FFFC',
//   pressed: false,
// };

// function ChangeColor() {
//   if(!this.state.pressed){
//      this.setState({ pressed: true, tintColor: '#21FFFC' });
//   } else {
//     this.setState({ pressed: false, tintColor: '#21FFFC' });
//   }
// };

// const Color = () => {
//   const [isEnabled, setIsEnabled] = useState(false);
//   const toggleSwitch = () => setIsEnabled(previousState => !previousState);

//   return (
//     <View>
//       <Switch
//         trackColor={{ false: "#767577", true: "#21FFFC" }}
//         ios_backgroundColor="#3e3e3e"
//         onValueChange={toggleSwitch}
//         value={isEnabled}
//       />
//     </View>
//   );
// }

// const Color = () => {
//   tintColor = '#21FFFC'
// }

const Tab = createBottomTabNavigator();

// function Color() {
//   const isClicked = true;
  
// }

// class constructor {
//   constructor(props) {
//     super(props);
//     this.state = {
//       myDynamicColor: '#ffffff'
//     };
//   }
// }

// function changeColor(bool) {
//   this.setState({
//     myDynamicColor: bool ? '#932727' : '#ffffff';
//   })
// }


const HomeBottomTabNavigator = () => {
 
  return (
    <Tab.Navigator
      tabBarOptions={{
        tabStyle: {
          backgroundColor: '#383734',
        },
        inactiveTintColor: '#FFFFFF',
        activeTintColor: '#21FFFC',
        showLabel: false,
        showIcon: true,
        indicatorStyle: {
          opacity: 0.2,
        },
        style: {
          borderRadius: 20,
          backgroundColor: '#383734',
          position: 'absolute',
          bottom: 0,
          padding: 10,
          height: 55,
          zIndex: 8,
        },
      }}>
      <Tab.Screen
        name={'Home'}
        component={Home}
        options={{
          tabBarIcon: ({focused, color}) => (
            <>
              <Image
                source={require('../assets/images/Home_icon.png')}
                width={25}
                height={25}
                tintColor={color}
                style={{bottom: 10}}
              />
              {focused && <ActiveStyle />}
            </>
          ),
        }}
      />
      <Tab.Screen
        name={'Search'}
        component={Search}
        options={{
          tabBarIcon: ({focused, color}) => (
            <>
              <Image
                source={require('../assets/images/Search_icon.png')}
                width={25}
                height={25}
                tintColor={color}
                style={{bottom: 10}}
              />
              {focused && <ActiveStyle />}
            </>
          ),
        }}
      />
      <Tab.Screen
        name={'Upload'}
        component={Camera}
        options={{
          tabBarIcon: ({}) => (
            <Image
              source={require('../assets/images/Plus.png')}
              style={{width: 65, height: 65, borderRadius: 37, bottom: 25}}
            />
            // <Image name= {Plus}  />
            // <Fontisto name={'plus-a'} size={25}  color="white"
            // />
          ),
          tabBarLabel: () => null,
        }}
      />
      <Tab.Screen
        name={'Notification'}
        component={Notifications}
        options={{
          tabBarIcon: ({focused, color}) => (
            <>
              <Image
                source={require('../assets/images/Bell_icon.png')}
                width={25}
                height={25}
                tintColor={color}
                style={{bottom: 10}}
              />
              {focused && <ActiveStyle />}
            </>
          ),
        }}
      />
      <Tab.Screen
        name={'Profile'}
        component={ProfileScreen}
        options={{
          tabBarIcon: ({tintColor}) => (
            // <Image source={{uri: post.user.imageUri}} style={{ width: 25, height: 25, borderRadius: 50, bottom: 20 }} />
            <Image
              source={require('../assets/images/Profile_icon.png')}
              size={25}
              style={{bottom: 10}}
            />
            // <Feather name={'user'} size={25} color={tintColor} onPress={() => ('Profile')}
            // />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeBottomTabNavigator;
