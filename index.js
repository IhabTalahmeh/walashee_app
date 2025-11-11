import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import notifee, { EventType } from '@notifee/react-native';
import * as notificationsService from './src/services/appNotificationsService';

notifee.onBackgroundEvent(async ({ type, detail }) => {
  console.log('Background event triggered:', type, detail);
  
  if (type === EventType.PRESS) {
    console.log('Notification pressed:', detail.notification);
    notificationsService.navigateToTargetScreen(detail.notification.id?.toString());
  }
});

AppRegistry.registerComponent(appName, () => App);
