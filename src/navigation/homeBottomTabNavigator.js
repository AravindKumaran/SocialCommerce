import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Camera from '../screens/Camera';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Feather from 'react-native-vector-icons/Feather';
import ProfileScreen from '../screens/Profile/index';
import {Image, Text} from 'react-native';



// import post from '../components/Post'
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


const Tab = createBottomTabNavigator();

// tabBarIcon: ({tintColor}) => <SimpleLineIcons name='home' color={tintColor} size={25}/>
// tabBarOptions: { activeTintColor:'blue', }

const HomeBottomTabNavigator = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        tabStyle: {
          backgroundColor: '#292929',
        },
        inactiveTintColor: '#FFFFFF',
        activeTintColor: '#21FFFC',      
        showLabel: false,
        showIcon: true
      }}>
      <Tab.Screen
        name={'Home'}
        component={Home}
        options={{
          // tabBarIcon: ({tintColor}) => <SimpleLineIcons name='home' color={tintColor} size={25}/>,
          // tabBarOptions: { activeTintColor:'blue' }
          tabBarIcon: ({tintColor}) => (
            // <SimpleLineIcons name={'home'} size={25}  tintColor={ tintColor }
              // style={{height: 25, resizeMode: 'contain'}}
              <Image source={require('../assets/images/Home_icon.png')} width={35} height={35} />           
          ),
        }}
      />
      <Tab.Screen
        name={'Search'}
        component={Home}
        options={{
          tabBarIcon: ({tintColor}) => (
            <Feather name={'search'} size={25} color={tintColor} 
            />                                        
          ),
        }}
      />
      <Tab.Screen
        name={'Upload'}
        component={Camera}
        options={{
          tabBarIcon: ({}) => (
            <Image source={require('../assets/images/Plus.png')} style={{ width: 75, height: 75, borderRadius: 50, bottom: 20 }} />
            // <Image name= {Plus}  />
            // <Fontisto name={'plus-a'} size={25}  color="white"
            // />
          ),
          tabBarLabel: () => null,
        }}
      />
      <Tab.Screen
        name={'Notification'}
        component={Home}
        options={{
          tabBarIcon: ({tintColor}) => (
            <Feather name={'bell'} size={25} color={tintColor} 
            />                                        
          ),
        }}
      />
      <Tab.Screen       
        name={'Profile'}
        component={ProfileScreen}
        options={{
          tabBarIcon: ({tintColor}) => (       
            // <Image source={{uri: post.user.imageUri}} style={{ width: 25, height: 25, borderRadius: 50, bottom: 20 }} />   
            <Image source={require('../assets/images/Profile_icon.png')} size={25}/>                                                                 
              // <Feather name={'user'} size={25} color={tintColor} onPress={() => ('Profile')}
              // />   
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeBottomTabNavigator;


