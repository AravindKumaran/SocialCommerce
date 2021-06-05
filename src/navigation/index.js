import React from 'react';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeBottomTabNavigator from './homeBottomTabNavigator';
import CreatePost from '../screens/CreatePost';
import Product from '../screens/Product';
import {TouchableOpacity} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Camera from '../screens/Camera/index';
import Settings from '../screens/Settings/index';
// import createMaterialTopTabNavigator from './homeTopTabNavigator';

const Stack = createStackNavigator();

const RootNavigation = () => {
  // const navigation = useNavigation();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerTintColor: '#ffffff',
          headerShown: false,
          headerStyle: {
            backgroundColor: '#20232A',
          },
        }}>
        {/* <Stack.Screen name="Home" component={createMaterialTopTabNavigator} /> */}
        <Stack.Screen name="Home" component={HomeBottomTabNavigator} />        
        {/* <Stack.Screen
          options={{
            headerShown: true,
            title: 'Your Post',
            headerTitleStyle: {
              color: 'white',
              fontFamily: 'Proxima Nova',
              fontWeight: '700',
            },           
          }}
          name="CreatePost"
          component={CreatePost}
        /> */}
        <Stack.Screen name="Camera" component={Camera} />
        <Stack.Screen name="Settings" component={Settings} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
