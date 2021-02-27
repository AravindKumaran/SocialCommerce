/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import Amplify from 'aws-amplify';
import config from './aws-exports';
Amplify.configure(config);

import { NativeModules } from 'react-native';
export default NativeModules.SplashScreen;

AppRegistry.registerComponent(appName, () => App);


{/* <link rel="preconnect" href="https://fonts.gstatic.com">
<link href="https://fonts.googleapis.com/css2?family=Lily+Script+One&display=swap" rel="stylesheet"></link> */}
