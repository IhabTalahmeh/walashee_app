import RNFS from 'react-native-fs';
import { CameraRoll } from '@react-native-camera-roll/camera-roll'; // ensure curly braces
import { Platform, PermissionsAndroid } from 'react-native';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

async function requestAndroidPermissions() {
  if (Platform.OS !== 'android') return true;

  if (Platform.Version >= 33) {
    const imagePermission = await request(PERMISSIONS.ANDROID.READ_MEDIA_IMAGES);

    return (
      imagePermission === RESULTS.GRANTED
    );
  } else {
    const legacyPermission = await request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
    return legacyPermission === RESULTS.GRANTED;
  }
}

async function requestIOSPhotoPermission() {
  const status = await check(PERMISSIONS.IOS.PHOTO_LIBRARY);
  if (status !== RESULTS.GRANTED) {
    const req = await request(PERMISSIONS.IOS.PHOTO_LIBRARY);
    return req === RESULTS.GRANTED;
  }
  return true;
}



export async function downloadImage(imageUrl: string): Promise<{ success: boolean; uri?: string; error?: string }> {
  try {
    if (Platform.OS === 'android' && !(await requestAndroidPermissions())) throw new Error('Android storage permission denied');

    const filename = imageUrl.split('/').pop()?.split('?')[0] ?? `img_${Date.now()}.jpg`;
    const localPath = `${RNFS.CachesDirectoryPath}/${filename}`;

    const result = await RNFS.downloadFile({ fromUrl: imageUrl, toFile: localPath }).promise;
    if (result.statusCode !== 200) throw new Error(`Download failed: ${result.statusCode}`);

    await CameraRoll.saveAsset(`file://${localPath}`, { type: 'photo' });
    return { success: true };
  } catch (e: any) {
    console.error('Download error:', e);
    return { success: false, error: e.message };
  }
}

async function requestStoragePermission(): Promise<boolean> {
  if (Platform.OS !== 'android') return true;

  const granted = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    {
      title: 'Storage Permission Required',
      message: 'App needs access to your storage to download files.',
      buttonNeutral: 'Ask Me Later',
      buttonNegative: 'Cancel',
      buttonPositive: 'OK',
    }
  );

  return granted === PermissionsAndroid.RESULTS.GRANTED;
}

export const downloadFile = async (url: string, fileName?: string): Promise<string> => {
  try {
    const fileExtension = url.substring(url.lastIndexOf('.')).split('?')[0];
    const finalFileName = fileName ? fileName : `downloaded_${Date.now()}${fileExtension}`;

    const downloadDest = `${Platform.OS === 'android' ? RNFS.DownloadDirectoryPath : RNFS.DocumentDirectoryPath}/${finalFileName}`;

    const options = {
      fromUrl: url,
      toFile: downloadDest,
    };

    const result = await RNFS.downloadFile(options).promise;

    if (result.statusCode === 200) {
      return downloadDest;
    } else {
      throw new Error(`Failed to download file. Status code: ${result.statusCode}`);
    }
  } catch (error) {
    console.error('Download failed:', error);
    throw error;
  }
}
