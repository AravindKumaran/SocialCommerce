import React, {useState, useEffect, useRef, useContext} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
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
import ProfileVideoList from '../screens/Profile/ProfileVideoList';
import TrendingVideoList from '../screens/Search/TrendingVideoList';
import NotifVideoPlay from '../screens/Notifications/NotifVideoPlay';

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

export let c;

export const getTabBarIcon = (focused, props, imgUri) => {
  c = props.navigation;
  // console.log('C', c);
  // console.log(
  //   'Ref',
  //   props.navigation.setOptions({
  //     tabBarLabel: 'Home',
  //   }),
  // );
  if (imgUri) {
    console.log('I am clleed');
    return (
      <>
        <Image
          source={{
            uri: imgUri.startsWith('https')
              ? imgUri
              : `https://tiktok23f096015e564dd1964361d5c47fb832221214-demo.s3.us-east-2.amazonaws.com/public/${imgUri}`,
          }}
          size={25}
          style={{bottom: 2, width: 25, height: 25}}
        />
      </>
    );
  } else {
    return (
      <>
        {/* {imgUri ? (
        <Image
          source={{
            uri: imgUri.startsWith('https')
              ? imgUri
              : `https://tiktok23f096015e564dd1964361d5c47fb832221214-demo.s3.us-east-2.amazonaws.com/public/${imgUri}`,
          }}
          size={25}
          style={{bottom: 2, width: 25, height: 25}}
        />
      ) : (

      )} */}
        <Image
          source={require('../assets/images/Profile_icon.png')}
          size={25}
          style={{bottom: 2, width: 25, height: 25}}
        />

        {focused && <ActiveStyle />}
      </>
    );
  }
};

const Stack = createStackNavigator();

const ProfileNavigator = () => (
  <Stack.Navigator initialRouteName="Profile">
    <Stack.Screen
      name="Profile"
      component={ProfileScreen}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="ProfileVideoList"
      component={ProfileVideoList}
      options={{headerShown: false}}
    />
  </Stack.Navigator>
);

const ExploreNavigator = () => (
  <Stack.Navigator initialRouteName="Search">
    <Stack.Screen
      name="Search"
      component={Search}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="TrendingVideoList"
      component={TrendingVideoList}
      options={{headerShown: false}}
    />
  </Stack.Navigator>
);
const NotifNavigator = () => (
  <Stack.Navigator initialRouteName="Notification">
    <Stack.Screen
      name="Notification"
      component={Notifications}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="NotifVideoPlay"
      component={NotifVideoPlay}
      options={{headerShown: false}}
    />
  </Stack.Navigator>
);

const Tab = createBottomTabNavigator();

const HomeBottomTabNavigator = () => {
  const proRef = useRef(null);
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
        component={ExploreNavigator}
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
                    top: focused ? 0 : -30,
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
        component={NotifNavigator}
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
        component={ProfileNavigator}
        options={(props) => ({
          tabBarIcon: ({focused, tintColor}) =>
            // <CustomTabIcon focused={focused} />
            getTabBarIcon(focused, props),
        })}
      />
    </Tab.Navigator>
    // </Container>
  );
};

export default HomeBottomTabNavigator;
