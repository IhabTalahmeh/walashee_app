import { View, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useMemo, useState } from 'react'
import CustomText from 'src/components/common/CustomText/CustomText'
import { useGlobalStyles } from 'src/hooks/useGlobalStyles'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useTheme } from 'src/context/ThemeContext'
import { createStyles } from './styles'
import { useNavigation, useRoute } from '@react-navigation/native'
import CaseImage from '../CaseImage/CaseImage'
import { ImageItem } from 'src/types/types/Types'
import { useUpdateProcedureImages } from 'src/hooks/useProcedure'
import { useAuth } from 'src/context/AuthContext'
import PencilIcon from 'src/icons/PencilIcon'
import * as appService from 'src/services/appService'

interface Props {
  images: ImageItem[];
  setImages: (values: any) => void;
  procedureId: number;
  refetch: () => void;
  isFetching: boolean;
  isEditor: boolean;
}

export default function CaseImages({ images, setImages, procedureId, refetch, isFetching, isEditor }: Props) {
  const { user } = useAuth();
  const route: any = useRoute();
  const globalStyles = useGlobalStyles();
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const navigation: any = useNavigation();
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  const { mutate: updateImagesMutation, isLoading: isUpdating } = useUpdateProcedureImages(
    (data: any) => {
      appService.showToast('Images updated successfully', 'success');
      setIsEditMode(false);
      refetch();
    },
    (error: any) => console.log('error', error),
  )

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

  const handleUpdateImages = () => {
    const newImages = images.filter((img: any) => !img.id);
    if (newImages.length == 0) {
      appService.showToast('Images saved successfully', 'success');
      setIsEditMode(false);
    } else {
      updateImagesMutation({
        userId: user.id,
        procedureId,
        images: newImages,
      });
    }
  }

  return (
    <View style={globalStyles.mb20}>
      {/* Header */}
      {!isEditible ? (
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <CustomText text='Images' size={18} color={theme.colors.text} fontWeight='semiBold' />
          </View>
          {isEditor && <View style={[globalStyles.flexRow, globalStyles.aic]}>
            {isEditMode ? (<>
              {(!isFetching) && <TouchableOpacity onPress={handleUpdateImages} style={globalStyles.mr5}>
                {isUpdating ? (
                  <ActivityIndicator size={12} color={theme.colors.text} style={globalStyles.mr5} />
                ) : (
                  <Ionicons name='checkmark-circle-outline' color={theme.colors.success} size={24} />
                )}
              </TouchableOpacity>}
              <TouchableOpacity onPress={openCameraPhoto}>
                <Ionicons name='add-circle-outline' color={theme.colors.primary} size={24} />
              </TouchableOpacity>
            </>) : (
              <TouchableOpacity onPress={() => setIsEditMode(true)} style={{ padding: 2 }}>
                <PencilIcon size={18} color={theme.colors.primary} />
              </TouchableOpacity>
            )}
          </View>}
        </View>
      ) : (<View style={styles.container}>
        <View style={[globalStyles.flexRow, globalStyles.aic]}>
          <CustomText text='Images' size={16} color={theme.colors.text} fontWeight='medium' />
          <CustomText text='(Optional)' size={16} color={theme.colors.pureBorder} fontWeight='regular' style={globalStyles.ml5} />
        </View>

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
            isEditMode={isEditMode} />
        </View>
      ))}
    </View>
  )
}
