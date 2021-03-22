/**
 * @format
 */

import {AppRegistry, Linking} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import Amplify from 'aws-amplify';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import config from './aws-exports';

async function urlOpener(url) {
  await InAppBrowser.isAvailable();
  const {type, url: newUrl} = await InAppBrowser.openAuth(url, {
    showTitle: false,
    enableUrlBarHiding: true,
    enableDefaultShare: false,
    ephemeralWebSession: false,
  });

  if (type === 'success') {
    Linking.openURL(newUrl);
  }
}

// Amplify.configure(config);
Amplify.configure({
  ...config,
  oauth: {
    ...config.oauth,
    urlOpener,
  },
});

import {NativeModules} from 'react-native';
export default NativeModules.SplashScreen;

AppRegistry.registerComponent(appName, () => App);
