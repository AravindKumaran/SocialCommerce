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
