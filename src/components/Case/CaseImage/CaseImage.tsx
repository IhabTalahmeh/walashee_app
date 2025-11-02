import { View, Text, TextInput, Modal, TouchableOpacity } from 'react-native'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import FastImage from 'react-native-fast-image'
import LinearGradient from 'react-native-linear-gradient'
import { useTheme } from 'src/context/ThemeContext';
import { useGlobalStyles } from 'src/hooks/useGlobalStyles';
import { createStyles } from './styles';
import { hexWithOpacity } from 'src/common/utils';
import CustomText from 'src/components/common/CustomText/CustomText';
import CustomDialog from 'src/components/Modals/CustomDialog/CustomDialog';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CustomTextInput from 'src/components/common/CustomTextInput/CustomTextInput';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDeleteCaseImage, useUpdateProcedureImage } from 'src/hooks/useProcedure';
import { useAuth } from 'src/context/AuthContext';
import { ImageItem } from 'src/types/types/Types';
import * as appService from 'src/services/appService';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import CustomBottomSheet from 'src/components/common/CustomBottomSheet/CustomBottomSheet';
import BottomSheetButton from 'src/components/buttons/BottomSheetButton/BottomSheetButton';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import TrashIconOutline from 'src/icons/TrashIconOutline';
import Feather from 'react-native-vector-icons/Feather';
import { useDownloadProcedureImage } from 'src/hooks/useUtility';
import NeutralButton from 'src/components/buttons/CustomButton/variants/NeutralButton';
import { ErrorButton, PrimaryButton } from 'src/components/buttons/CustomButton/variants';
import PencilIcon from 'src/icons/PencilIcon';

interface Props {
  index: number;
  item: ImageItem;
  handleRename: (index: number, value: string) => void;
  handleRemove: (index: number) => void;
  isEditMode: boolean;
}

export default function CaseImage({ item, handleRename, index, handleRemove, isEditMode }: Props) {
  const { user } = useAuth();
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const globalStyles = useGlobalStyles();
  const [localName, setLocalName] = useState<string>(item.image_name);
  const sheetRef = useRef<BottomSheetModal>(null);

  const [renameModalVisible, setRenameModalVisible] = useState<boolean>(false);
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);

  const sheetSnapPoints = useMemo(() => [230], []);

  const handleOpenOptions = useCallback(() => {
    sheetRef.current?.present();
  }, []);

  const handleCloseOptions = useCallback(() => {
    sheetRef.current?.dismiss();
  }, []);

  const { mutate: updateMutation, isLoading: isUpdating } = useUpdateProcedureImage(
    (data: any) => {
      handleCloseOptions();
      appService.showToast('Image updated successfully', 'success');
    },
    (err: any) => appService.showToast(err, 'error'),
  )

  const { mutate: deleteMutation, isLoading: isDeleting } = useDeleteCaseImage(
    (data: any) => {
      handleRemove(index);
      handleCloseOptions();
      setDeleteOpen(false);
      appService.showToast('Image deleted successfully', 'success');
    },
    (err: any) => appService.showToast(err, 'error'),
  )

  const { mutate: downloadMutation, isLoading: isDownloading } = useDownloadProcedureImage(
    (data: any) => {
      handleCloseOptions();
      appService.showToast('Image downloaded successfully', 'success');
    },
    (err: any) => appService.showToast(err, 'error'),
  )

  const renderRenameTextInput = useCallback(() => {
    return (
      <>
        <View style={[globalStyles.w100, globalStyles.mb10]}>
          <CustomTextInput
            value={localName}
            placeholder='Enter image name'
            onChangeText={setLocalName} />
        </View>
      </>
    )
  }, [localName]);

  const handleNameSave = () => {
    if (item?.id) {
      updateMutation({
        userId: user.id,
        procedureId: item.procedure,
        image: item
      } as any);
    }
    handleRename(index, localName);
    setRenameModalVisible(false);
  }

  const isValidName = useMemo(() => {
    return localName?.trim() != '';
  }, [localName]);

  const handleDeleteImage = () => {
    deleteMutation({
      userId: user.id,
      procedureId: item.procedure,
      imageId: item?.id
    } as any)
  }

  const handleDownloadImage = () => {
    downloadMutation({ imageUrl: item.uri });
  }

  const handleRemoveImage = () => {
    handleRemove(index);
  }

  const buttons = [
    {
      title: 'Rename',
      color: theme.colors.text,
      onPress: () => setRenameModalVisible(true),
      leftIcon: <PencilIcon size={18} color={theme.colors.text}/>
    },
    {
      title: 'Download',
      color: theme.colors.text,
      onPress: () => handleDownloadImage(),
      disabled: isDownloading,
      leftIcon: <FontAwesome6 name='download' color={theme.colors.text} size={16} />
    },
    {
      title: 'Delete',
      color: theme.colors.error,
      onPress: () => setDeleteOpen(true),
      leftIcon: <TrashIconOutline size={20} color={theme.colors.error} />
    }
  ]

  const renderOptions = useCallback(() => {
    return (
      <View style={globalStyles.bottomSheetContainer}>
        <View style={globalStyles.bottomSheetButtonsContainer}>
          {buttons.map((item, index) => {
            return (
              <View key={item.title}>
                <BottomSheetButton
                  text={item.title}
                  textColor={item.color}
                  disabled={item.disabled ?? false}
                  isLoading={item.disabled}
                  onPress={item.onPress}
                  left={item?.leftIcon ?? <View />}
                />
              </View>
            )
          })}
        </View>
      </View>
    )
  }, [buttons]);

  const deleteModalButtons = [
    {
      text: item?.id ? 'Delete Anyway' : 'Remove',
      disabled: isDeleting,
      loading: isDeleting,
      onPress: () => item?.id ? handleDeleteImage() : handleRemoveImage(),
      button: ErrorButton,
    },
    {
      text: 'Cancel',
      onPress: () => setDeleteOpen(false),
      button: NeutralButton,
    }
  ]

  const renameModalButtons = [
    {
      text: 'Save',
      disabled: isDeleting,
      loading: isDeleting,
      onPress: () => handleNameSave(),
      button: PrimaryButton,
    },
    {
      text: 'Cancel',
      onPress: () => setRenameModalVisible(false),
      button: NeutralButton,
    }
  ]

  return (
    <>
      <View style={[styles.imageContainer]}>
        <FastImage source={{ uri: item.uri }} style={globalStyles.full} resizeMode='cover' />
        <LinearGradient
          colors={['transparent', hexWithOpacity(theme.colors.black, 0.6)]}
          style={styles.gradientOverlay}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
        />
        <TouchableOpacity style={styles.imageName} onPress={() => setRenameModalVisible(true)} disabled={!isEditMode}>
          {isEditMode && <PencilIcon size={15} color={theme.colors.background} style={globalStyles.mr5}/>}
          <CustomText text={item.image_name} color={theme.colors.white} size={16} fontWeight='medium' numberOfLines={1} ellipsizeMode='tail' />
        </TouchableOpacity>
        {isEditMode && <>
          {item.id ? (
            <TouchableOpacity style={styles.removeButton} onPress={handleOpenOptions}>
              <Ionicons name='ellipsis-vertical' color='white' size={24} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.removeButton} onPress={() => setDeleteOpen(true)}>
              <Ionicons name='remove-circle-outline' color={theme.colors.error} size={24} />
            </TouchableOpacity>)}
        </>}
      </View>

      {/* Remove and Delete Dialog */}
      <CustomDialog
        visible={deleteOpen}
        title={item?.id ? 'Delete Image' : 'Remove Image'}
        message={item?.id ? 'Note: Deleting this image is permanent and cannot be undone.' : 'Are you sure you want to remove this image?'}
        buttons={deleteModalButtons}
        onClose={() => setDeleteOpen(false)}
      />


      {/* Editable Name Field */}
      <CustomDialog
        visible={renameModalVisible}
        onClose={() => setRenameModalVisible(false)}
        content={renderRenameTextInput()} title={''} message={''} buttons={renameModalButtons} />

      <CustomBottomSheet
        ref={sheetRef}
        content={renderOptions()}
        snapPoints={sheetSnapPoints}
        backgroundColor={theme.colors.topBackground}
      />
    </>
  )
}