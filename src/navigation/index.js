import React from 'react'

import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeBottomTabNavigator from './homeBottomTabNavigator';
// import createMaterialTopTabNavigator from './homeTopTabNavigator';
import CreatePost from '../screens/CreatePost';
import Product from '../screens/Product';
import List from '../components/Comments/list';

const Stack = createStackNavigator();

const RootNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {/* <Stack.Screen name="Home" component={createMaterialTopTabNavigator} /> */}
        <Stack.Screen name="Home" component={HomeBottomTabNavigator} />       
        <Stack.Screen
          options={{
            headerShown: true,
            title: 'Post',
          }}
          name="CreatePost"
          component={CreatePost}
        />
        {/* <Stack.Screen name="Comments" component={List} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
