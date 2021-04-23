import React from 'react';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeBottomTabNavigator from './homeBottomTabNavigator';
import CreatePost from '../screens/CreatePost';
import Product from '../screens/Product';
import {TouchableOpacity} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

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
        <Stack.Screen
          options={{
            headerShown: true,
            title: 'Your Post',
            headerTitleStyle: {
              color: 'white',
              fontFamily: 'Proxima Nova',
              fontWeight: '700',
            },
            headerRight: () => (
              <TouchableOpacity
              // onPress={() => {
              //   navigation.navigate('CreatePost');
              // }}
              >
                <Feather
                  name="x"
                  size={25}
                  color="white"
                  style={{
                    marginRight: 10,
                    paddingRight: 20,
                  }}
                />
              </TouchableOpacity>
            ),
            // headerStyle: () =>
          }}
          name="CreatePost"
          component={CreatePost}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
