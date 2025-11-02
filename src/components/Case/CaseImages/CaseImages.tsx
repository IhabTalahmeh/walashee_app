import { View, TouchableOpacity } from 'react-native'
import React, { useMemo } from 'react'
import { FieldArray } from 'formik'
import CustomText from 'src/components/common/CustomText/CustomText'
import { useGlobalStyles } from 'src/hooks/useGlobalStyles'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useTheme } from 'src/context/ThemeContext'
import { createStyles } from './styles'
import { useNavigation, useRoute } from '@react-navigation/native'
import CaseImage from '../CaseImage/CaseImage'
import { ImageItem } from 'src/types/types/Types'

interface Props {
  images: ImageItem[];
  setImages: (values: any) => void;
}

export default function CaseImages({ images, setImages }: Props) {
  const route: any = useRoute();
  const globalStyles = useGlobalStyles();
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const navigation: any = useNavigation();

  const routeName = useMemo(() => {
    return route?.name ?? '';
  }, [route]);

  const isEditible = useMemo(() => {
    return routeName?.includes('AddCase');
  }, [routeName]);

  const handleRemove = (index: number) => {
    setImages((prev: any) => prev.filter((_: any, i: any) => i !== index));
  };

  const openCameraPhoto = () => {
    navigation.navigate('CameraScreen', {
      crop: false,
      onPhotoTaken: (media: any) => {
        if (media && media.path) {
          const newImage = {
            uri: media.path,
            image_name: `Image-${images.length + 1}`
          };
          setImages((prev: any) => [...prev, newImage]);
        }
      }
    });
  };

  const handleRename = (index: number, newName: string) => {
    const updated = [...images];
    updated[index].image_name = newName;
    setImages(updated);
  };

  return (
    <View style={globalStyles.mb20}>
      {/* Header */}
      {!isEditible ? (
        <View style={styles.titleContainer}>
          <CustomText
            text="Images"
            size={18}
            color={theme.colors.text}
            fontWeight="semiBold"
          />
        </View>
      ) : (<View style={styles.container}>
        <View style={[globalStyles.flexRow, globalStyles.aic]}>
          <CustomText text='Images' size={16} color={theme.colors.text} fontWeight='medium' />
          <CustomText text='(Optional)' size={16} color={theme.colors.pureBorder} fontWeight='regular' style={globalStyles.ml5} />
        </View>
        <TouchableOpacity onPress={openCameraPhoto}>
          <Ionicons name='add-circle-outline' color={theme.colors.primary} size={24} />
        </TouchableOpacity>
      </View>)}

      {/* Image List */}
      {images.map((image: ImageItem, index: number) => (
        <View key={index} style={[globalStyles.mt10]}>
          {/* Image Container */}
          <CaseImage
            handleRename={handleRename}
            handleRemove={handleRemove}
            index={index}
            item={image}
            isEditMode={true} />
        </View>
      ))}
    </View>
  )
}
