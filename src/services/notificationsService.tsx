import {
  getApp
} from '@react-native-firebase/app';
import {
  getMessaging,
  getToken,
  onMessage,
  onNotificationOpenedApp,
  registerDeviceForRemoteMessages,
} from '@react-native-firebase/messaging';
import notifee, {
  AndroidImportance,
  AndroidStyle,
  AuthorizationStatus,
  EventType,
} from '@notifee/react-native';
import * as usersService from '../services/usersService';
import * as authService from '../services/authService';
import { Linking, Platform } from 'react-native';
import { createNavigationContainerRef } from '@react-navigation/native';
import RNFS from 'react-native-fs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { EventRegister } from 'react-native-event-listeners';

/* ---------------------------------- NAVIGATION ---------------------------------- */
export const navigationRef: any = createNavigationContainerRef();

export function getCurrentRoute() {
  return {
    name: navigationRef.current?.getCurrentRoute()?.name,
    params: navigationRef.current?.getCurrentRoute()?.params,
  };
}

/* ---------------------------------- HELPERS ---------------------------------- */
const openURL = async (url: string) => {
  const canOpen = await Linking.canOpenURL(url);
  if (canOpen) {
    Linking.openURL(url);
  } else {
    console.log('❌ Unable to open URL:', url);
  }
};

const openStore = () => {
  if (Platform.OS === 'android') {
    openURL('https://play.google.com/store/apps/details?id=com.carez.App');
  } else if (Platform.OS === 'ios') {
    openURL('https://apps.apple.com/us/app/carez/id6736712373');
  }
};

const getAppLanguage = async () => {
  return await AsyncStorage.getItem('APP_LANGUAGE');
};

/* ---------------------------------- PERMISSIONS ---------------------------------- */
const requestPermissions = async () => {
  try {
    const settings = await notifee.requestPermission({
      sound: true,
      badge: true,
      alert: true,
      carPlay: true,
      criticalAlert: true,
      provisional: false,
      announcement: false,
    });

    if (settings.authorizationStatus >= AuthorizationStatus.AUTHORIZED) {
      console.log('✅ Notification permission granted');
    } else {
      console.log('⚠️ Notification permission denied');
    }
  } catch (error) {
    console.error('Permission Error', error);
  }
};

/* ---------------------------------- LOGIC HELPERS ---------------------------------- */
const shouldSendNotification = (message: any) => {
  const routeInfo: any = getCurrentRoute();

  if (routeInfo.name === 'GroupView' || routeInfo.name === 'ConsultGroupView') {
    return routeInfo.params?.guid !== message.data.receiver;
  } else if (routeInfo.name === 'ChatView') {
    return routeInfo.params?.uid !== message.data.sender;
  }
  return true;
};

/* ---------------------------------- MAIN REGISTER FUNCTION ---------------------------------- */
export const registerToken = async () => {
  const app = getApp();
  const messaging = getMessaging(app);

  await requestPermissions();
  await notifee.requestPermission();
  await registerDeviceForRemoteMessages(messaging);

  /* Handle notification open (background → foreground) */
  onNotificationOpenedApp(messaging, async (remoteMessage: any) => {
    console.log('remote message', remoteMessage?.data);
    if (remoteMessage?.data) {
      switch (remoteMessage.data.receiverType) {
        case 'user':
          navigationRef.navigate('ChatView', { uid: remoteMessage.data.sender });
          break;
        case 'group':
          // handle group navigation here
          break;
      }
    }
  });

  /* Register FCM token */
  const token = await getToken(messaging);
  await authService.registerForPushNotifications(token);

  /* Handle initial notification (quit → open) */
  const initialNotification: any = await notifee.getInitialNotification();
  if (initialNotification) {
    const { type } = initialNotification.notification?.data || {};
    if (type === 'team_invitation') {
      navigateToAppScreen(initialNotification.notification.data);
    } else if (type === 'new-version') {
      openStore();
    } else {
      navigateToTargetScreen(initialNotification.notification.id);
    }
  }

  /* Foreground notification events */
  notifee.onForegroundEvent(({ type, detail }: any) => {
    switch (type) {
      case EventType.DISMISSED:
        console.log('User dismissed notification', detail.notification);
        break;
      case EventType.PRESS:
        const data = detail?.notification?.data;
        if (data?.type === 'team_invitation') {
          navigateToAppScreen(data);
        } else if (data?.type === 'new-version') {
          openStore();
        } else {
          navigateToTargetScreen(detail.notification.id?.toString());
        }
        break;
    }

    if (detail?.pressAction?.id === 'update') {
      openStore();
    }
  });

  /* Foreground FCM messages */
  onMessage(messaging, async (message: any) => {
    if (message?.data?.type === 'team_invitation') {
      await sendAppNotification(message);
    } else if (shouldSendNotification(message)) {
      await onMessageReceived(message);
    }
  });
};

/* ---------------------------------- MESSAGE HANDLERS ---------------------------------- */
async function onMessageReceived(message: any) {
  await sendNotification(message);
}

export const sendNotification = async (message?: any) => {
  await notifee.requestPermission();

  if (message?.data?.type === 'team_invitation') {
    sendAppNotification(message);
  } else if (message?.data?.type === 'new-version') {
    sendNewAppVersionNotification(message);
  } else {
    switch (message.data.receiverType) {
      case 'group':
        sendGroupNotification(message);
        EventRegister.emit('get-unread-messages');
        break;
      case 'user':
        sendChatNotification(message);
        EventRegister.emit('get-unread-messages');
        break;
    }
  }
};

/* ---------------------------------- NOTIFICATION TYPES ---------------------------------- */
async function sendAppNotification(message: any) {
  const channelId = await notifee.createChannel({
    id: 'test',
    name: 'test',
    importance: AndroidImportance.HIGH,
  });

  const lang = await getAppLanguage();
  const title = lang === 'ar' ? message.data.titleAr : message.data.titleEn;
  const body = lang === 'ar' ? message.data.messageAr : message.data.messageEn;

  await notifee.displayNotification({
    id: message.messageId,
    title,
    body,
    data: message.data,
    android: {
      channelId,
      importance: AndroidImportance.HIGH,
      pressAction: { id: 'default', launchActivity: 'default' },
      timestamp: Date.now(),
      showTimestamp: true,
    },
    ios: {
      foregroundPresentationOptions: { alert: true, badge: true, sound: true, list: true },
    },
  });

  EventRegister.emit(message?.data?.event);
}

async function sendNewAppVersionNotification(message: any) {
  const channelId = await notifee.createChannel({
    id: 'app',
    name: 'App Notifications',
    importance: AndroidImportance.DEFAULT,
  });

  const lang = await getAppLanguage();
  const body = lang === 'ar' ? message.data.bodyAr : message.data.bodyEn;
  const title = lang === 'ar' ? 'كيرز' : 'Carez';
  const updateButtonTitle = lang === 'ar' ? 'تحديث' : 'Update';
  const laterButtonTitle = lang === 'ar' ? 'لاحقاً' : 'Later';

  const categoryId = 'updateActions';
  await notifee.setNotificationCategories([
    {
      id: categoryId,
      actions: [
        { id: 'update', title: updateButtonTitle, foreground: true, authenticationRequired: true },
        { id: 'later', title: laterButtonTitle, destructive: true },
      ],
    },
  ]);

  await notifee.displayNotification({
    id: message.messageId,
    title,
    body,
    data: message.data,
    android: {
      channelId,
      importance: AndroidImportance.HIGH,
      actions: [
        { title: updateButtonTitle, pressAction: { id: 'update', launchActivity: 'default' } },
        { title: laterButtonTitle, pressAction: { id: 'later' } },
      ],
      pressAction: { id: 'default', launchActivity: 'default' },
      timestamp: Date.now(),
      showTimestamp: true,
    },
    ios: {
      categoryId,
      foregroundPresentationOptions: { alert: true, badge: true, sound: true, list: true },
    },
  });

  EventRegister.emit(message?.data?.event);
}

/* ---------------------------------- CHAT / GROUP NOTIFICATIONS ---------------------------------- */
export const sendGroupNotification = async (message: any) => {
  const channelId = await notifee.createChannel({
    id: 'groups',
    name: 'Groups Notifications',
    importance: AndroidImportance.HIGH,
  });

  let messages = [];
  if (Platform.OS === 'android') {
    messages = await generateChatMessages(message);
  }

  const iosAssetPath = `${RNFS.MainBundlePath}/assets/assets/images/default_group.png`;
  const conversationId = `group_${message.data.receiver}`;

  await notifee.displayNotification({
    id: conversationId,
    title: message.data.receiverName,
    subtitle: `${message.data.senderName}: ${message.data.body}`,
    android: {
      channelId,
      importance: AndroidImportance.HIGH,
      pressAction: { id: 'default', launchActivity: 'default' },
      timestamp: Date.now(),
      showTimestamp: true,
      style: {
        title: message.data.receiverName,
        type: AndroidStyle.MESSAGING,
        person: { name: message.data.senderName, icon: '../../assets/images/default_avatar.png' },
        messages,
      },
    },
    ios: {
      foregroundPresentationOptions: { alert: true, badge: true, sound: true, list: true },
    },
  });
};

export const sendChatNotification = async (message: any) => {
  const channelId = await notifee.createChannel({
    id: 'Chats',
    name: 'Chats Notifications',
    importance: AndroidImportance.HIGH,
  });

  const messages = await generateChatMessages(message);
  const senderAvatar = await usersService.getUserById(message.data.sender);
  const iosAssetPath = `${RNFS.MainBundlePath}/assets/assets/images/default_avatar.png`;

  await notifee.displayNotification({
    id: `user_${message.data.sender}`,
    title: message.data.senderName,
    subtitle: message.data.body,
    android: {
      channelId,
      importance: AndroidImportance.HIGH,
      pressAction: { id: 'default', launchActivity: 'default' },
      timestamp: Date.now(),
      showTimestamp: true,
      style: {
        type: AndroidStyle.MESSAGING,
        person: { name: message.data.senderName, icon: '../../assets/images/default_avatar.png' },
        messages,
      },
    },
    ios: {
      foregroundPresentationOptions: { alert: true, badge: true, sound: true, list: true },
      attachments: [
        { url: senderAvatar?.avatarLink || iosAssetPath },
      ],
    },
  });
};

/* ---------------------------------- UTILITIES ---------------------------------- */
export const navigateToTargetScreen = async (conversationId: string) => {
  const [type, id] = conversationId.split('_');
  switch (type) {
    case 'group':
      // handle group navigation here if needed
      break;
    case 'user':
      navigationRef.navigate('ChatView', { uid: id });
      break;
  }
};

export const navigateToAppScreen = (data: any) => {
  navigationRef.navigate(data.screen, data?.params ? JSON.parse(data.params) : null);
};

export const cancelAllNotifications = async () => {
  await notifee.cancelAllNotifications();
};

export const cancelNotificationById = async (notificationId: string) => {
  await notifee.cancelNotification(notificationId);
};

export const getDisplayedNotifications = async (notificationId: string) => {
  return (await notifee.getDisplayedNotifications()).filter(
    (notification) => notification.id === notificationId
  );
};

export const generateChatMessages = async (message: any) => {
  const notification: any = await getDisplayedNotifications(message.data.conversationId);
  const sender = await usersService.getUserById(message.data.sender);
  const defaultAvatar =
    'https://media.4-paws.org/d/2/5/f/d25ff020556e4b5eae747c55576f3b50886c0b90/cut%20cat%20serhio%2002-1813x1811-720x719.jpg';

  if (notification.length === 0) {
    return [
      {
        text: message.data.body,
        timestamp: Date.now(),
        person: { name: message.data.senderName, icon: sender?.avatarLink || defaultAvatar },
      },
    ];
  } else {
    return [
      ...notification[0].notification.android?.style.messages,
      {
        text: message.data.body,
        timestamp: Date.now(),
        person: { name: message.data.senderName, icon: sender?.avatarLink || defaultAvatar },
      },
    ];
  }
};
