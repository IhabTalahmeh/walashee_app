/**
 * @format
 */

import {AppRegistry, Platform} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import Purchases from 'react-native-purchases';

if(Platform.OS === 'ios'){
  Purchases.configure({ apiKey: 'appl_OnELHpfqYPdHnvpUueTlQlOwIhu' });
}

AppRegistry.registerComponent(appName, () => App);
