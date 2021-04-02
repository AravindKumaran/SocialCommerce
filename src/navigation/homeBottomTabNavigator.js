import React, {useState, useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Camera from '../screens/Camera';
import Search from '../screens/Search';
import Notifications from '../screens/Notifications';
import ProfileScreen from '../screens/Profile/index';
import {
  Image,
  Text,
  View,
  TouchableOpacity,
  BackHandler,
  Keyboard,
} from 'react-native';
import {color} from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import Container from '../navigation/container';

// import {BlurView, VibrancyView} from '@react-native-community/blur';
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
        bottom: 13,
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
        bottom: 10,
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
// backgroundColor: '#383734',

const HomeBottomTabNavigator = () => {
  const {keyboardHidesTabBars} = useState(true);
  const [didKeyboardShow, setKeyboardShow] = useState(false);

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
    Keyboard.addListener('keyboardDidHide', _keyboardDidHide);

    return () => {
      Keyboard.removeListener('keyboardDidShow', _keyboardDidShow);
      Keyboard.removeListener('keyboardDidHide', _keyboardDidHide);
    };
  }, []);

  const _keyboardDidShow = () => {
    setKeyboardShow(true);
  };

  const _keyboardDidHide = () => {
    setKeyboardShow(false);
  };

  const TabBar = (props) => {
    return (
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={['red', 'yellow']}
      />
    );
  };

  return (
    // <Container>
    <Tab.Navigator
      tabBarOptions={{
        keyboardHidesTabBar: true,
        tabStyle: {
          backgroundColor: '#20232A',
          height: 65,
          bottom: 10,
          borderTopEndRadius: 20,
          borderTopStartRadius: 20,
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
          backgroundColor: '#20232A',
          position: 'absolute',
          bottom: -10,
          padding: 10,
          height: 65,
          zIndex: 8,
        },
      }}
      tabBarComponent={(props) => {
        return <TabBar {...props} />;
      }}>
      <Tab.Screen
        name={'Home'}
        component={Home}
        options={{
          tabBarIcon: ({focused, color}) => (
            <>
              <Image
                source={require('../assets/images/home1.png')}
                width={25}
                height={25}
                tintColor={color}
                style={{bottom: 5, width: 20, height: 20}}
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
                source={require('../assets/images/explore1.png')}
                width={25}
                height={25}
                tintColor={color}
                style={{bottom: 5, width: 20, height: 20}}
              />
              {focused && <ActiveStyle />}
            </>
          ),
        }}
      />
      <Tab.Screen
        name={'Upload'}
        component={Camera}
        options={() => ({
          tabBarIcon: ({focused, color}) => (
            <>
              {!didKeyboardShow && (
                <Image
                  source={require('../assets/images/Plus.png')}
                  style={{
                    top: -30,
                    width: 65,
                    height: 65,
                    borderRadius: 37,
                    bottom: focused ? -20 : 20,
                    zIndex: 1,
                  }}
                />
              )}
            </>
          ),
          tabBarLabel: () => null,
          tabBarVisible: false,
        })}
      />
      <Tab.Screen
        name={'Notification'}
        component={Notifications}
        options={{
          tabBarIcon: ({focused, color}) => (
            <>
              <Image
                source={require('../assets/images/notification1.png')}
                width={25}
                height={25}
                tintColor={color}
                style={{bottom: 5, width: 20, height: 20}}
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
          tabBarIcon: ({focused, tintColor}) => (
            <>
              <Image
                source={require('../assets/images/Profile_icon.png')}
                size={25}
                style={{bottom: 2, width: 25, height: 25}}
              />
              {focused && <ActiveStyle />}
            </>
          ),
        }}
      />
    </Tab.Navigator>
    // </Container>
  );
};

export default HomeBottomTabNavigator;
