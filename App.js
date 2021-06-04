/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {SafeAreaView, StatusBar} from 'react-native';

import Navigation from './src/navigation';

import {Auth, API, graphqlOperation} from 'aws-amplify';

import {createUser} from './src/graphql/mutations';
import {getUser} from './src/graphql/queries';

import SplashScreen from 'react-native-splash-screen';

import Store from './src/context/Store';

const randomImages = [
  'https://hieumobile.com/wp-content/uploads/avatar-among-us-2.jpg',
  'https://hieumobile.com/wp-content/uploads/avatar-among-us-3.jpg',
  'https://hieumobile.com/wp-content/uploads/avatar-among-us-6.jpg',
  'https://hieumobile.com/wp-content/uploads/avatar-among-us-9.jpg',
];

const getRandomImage = () => {
  return randomImages[Math.floor(Math.random() * randomImages.length)];
};

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
    const fetchUser = async () => {
      // get currently authenticated user
      const userInfo = await Auth.currentAuthenticatedUser({bypassCache: true});
      console.log(userInfo)
      if (!userInfo) {
        return;
      }

      // check if THE user exist in database
      const getUserResponse = await API.graphql(
        graphqlOperation(getUser, {id: userInfo.attributes.sub}),
      );

      if (getUserResponse.data.getUser) {
        console.log('User already exists in database');
        return;
      }
      const newUser = {
        id: userInfo.attributes.sub,
        username: userInfo.username,
        email: userInfo.attributes.email,
        imageUri: getRandomImage(),
      };

      await API.graphql(graphqlOperation(createUser, {input: newUser}));
    };

    // fetchUser();
  }, []);

  return (
    <>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={{flex: 1, backgroundColor: 'black'}}>
        <Store>
          <Navigation />
        </Store>
      </SafeAreaView>
    </>
  );
};

export default App;
class WelcomePage extends React.Component {
  componentDidMount() {
    SplashScreen.hide();
  }
}
