/**
 * @format
 */

import {AppRegistry, Linking} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import Amplify from 'aws-amplify';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import config from './src/aws-exports';

async function urlOpener(url, redirectUrl) {
  await InAppBrowser.closeAuth();
  await InAppBrowser.isAvailable();
  const {type, url: newUrl} = await InAppBrowser.openAuth(url, redirectUrl, {
    showTitle: false,
    enableUrlBarHiding: true,
    enableDefaultShare: false,
    ephemeralWebSession: false,
  });

  if (type === 'success' && newUrl) {
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
