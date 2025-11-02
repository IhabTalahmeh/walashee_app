import React, { useRef, useEffect, useState, useMemo } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  StatusBar,
  SafeAreaView,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ImageCropPicker from 'react-native-image-crop-picker';
import { Camera } from 'react-native-camera-kit';
import { useTheme } from 'src/context/ThemeContext';
import { createStyles } from './styles';
import { useGlobalStyles } from 'src/hooks/useGlobalStyles';

const CameraScreen = ({ navigation, route }: any) => {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const globalStyles = useGlobalStyles();

  const camera = useRef<any>(null);
  const [hasPermission, setHasPermission] = useState(false);
  const [zoom, setZoom] = useState(0);
  const [torch, setTorch] = useState<'on' | 'off'>('off');
  const [cameraType, setCameraType] = useState<'front' | 'back'>('back');
  const [isCapturing, setIsCapturing] = useState(false);
  const [showFlash, setShowFlash] = useState(false);

  useEffect(() => {
    const requestCameraPermission = async () => {
      if (Platform.OS === 'android') {
        const status = await PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.CAMERA,
        );

        if (status) {
          // already granted
          setHasPermission(true);
          return;
        }

        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'This app needs access to your camera.',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // ✅ Restart once after granting
          navigation.replace('CameraScreen', route.params);
        } else {
          console.log('Camera permission denied');
        }
      } else {
        // iOS automatically handles via Info.plist
        setHasPermission(true);
      }
    };

    requestCameraPermission();
  }, []);


  const onClose = () => {
    navigation.goBack();
  };

  const switchCamera = () => {
    setCameraType(cameraType === 'front' ? 'back' : 'front');
  };

  const takePhoto = async () => {
    if (camera.current && !isCapturing) {
      setIsCapturing(true);
      try {
        const photo = await camera.current.capture({
          qualityPrioritization: 'quality',
          skipMetadata: true,
        });

        let finalPath = `${Platform.OS === 'android' ? 'file://' : ''}${photo.path ?? photo.uri}`;
        let width = photo.width;
        let height = photo.height;

        // CROP if requested
        if (route?.params?.crop) {
          const croppedPhoto = await ImageCropPicker.openCropper({
            path: finalPath,
            width: 2048,
            height: 2048,
            cropping: true,
            freeStyleCropEnabled: false,
            mediaType: 'photo',
            includeBase64: false,
          });
          finalPath = croppedPhoto.path;
          width = croppedPhoto.width;
          height = croppedPhoto.height;
        }

        route.params.onPhotoTaken({
          ...photo,
          path: finalPath,
          width,
          height,
        });

        navigation.goBack();
      } catch (error) {
        console.log('Error taking/cropping photo:', error);
      } finally {
        setIsCapturing(false);
      }
    }
  };

  const openGallery = async () => {
    try {
      const image = await ImageCropPicker.openPicker({
        width: 2048,
        height: 2048,
        cropping: route?.params?.crop || false,
        freeStyleCropEnabled: false,
        mediaType: 'photo',
        includeBase64: false,
      });

      route.params.onPhotoTaken({
        path: image.path,
        width: image.width,
        height: image.height,
      });

      navigation.goBack();
    } catch (error) {
      console.log('Error selecting/cropping image from gallery:', error);
    }
  };

  const toggleTorch = () => {
    setTorch(torch === 'off' ? 'on' : 'off');
  };

  if (!hasPermission) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading camera...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <View style={styles.container}>
        <StatusBar translucent backgroundColor="transparent" barStyle="light-content" hidden />
        <Camera
          ref={camera}
          style={StyleSheet.absoluteFill}
          cameraType={cameraType as any}
          zoom={zoom}
          focusable={false}
          resizeMode="contain"
          torchMode={torch}
          flashMode="off"
        />

        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Ionicons name="close-outline" size={30} color={theme.colors.white} />
        </TouchableOpacity>
        <View style={styles.cameraOptionsContainer}>
          <TouchableOpacity onPress={toggleTorch} style={styles.torchButton}>
            <Ionicons
              name={torch === 'off' ? 'flash-off-outline' : 'flash'}
              size={25}
              color={theme.colors.white}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={switchCamera} style={[styles.torchButton, globalStyles.mt15]}>
            <Ionicons
              name="camera-reverse-outline"
              size={25}
              color={theme.colors.white}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={openGallery} style={[styles.torchButton, globalStyles.mt15]}>
            <Ionicons
              name="images-outline"
              size={25}
              color={theme.colors.white}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.captureContainer}>
          <TouchableOpacity
            onPress={takePhoto}
            style={[
              styles.captureButton,
              isCapturing && { opacity: 0.5 },
            ]}
            disabled={isCapturing}
            activeOpacity={0.7}
          />
        </View>
      </View>
    </View>
  );
};

export default CameraScreen;
