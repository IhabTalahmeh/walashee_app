import { View, TouchableOpacity } from 'react-native'
import React, { useCallback, useMemo, useRef, useState } from 'react'
import FastImage from 'react-native-fast-image'
import { useTheme } from 'src/context/ThemeContext'
import { createStyles } from './styles';
import { useGlobalStyles } from 'src/hooks/useGlobalStyles';
import CustomText from 'src/components/common/CustomText/CustomText';
import TrashIconOutline from 'src/icons/TrashIconOutline';
import PencilIcon from 'src/icons/PencilIcon';
import CustomDialog from 'src/components/Modals/CustomDialog/CustomDialog';
import { ErrorButton } from 'src/components/buttons/CustomButton/variants';
import NeutralButton from 'src/components/buttons/CustomButton/variants/NeutralButton';
import { useRevokeUser, useUpdatePermission } from 'src/hooks/useUsers';
import { useAuth } from 'src/context/AuthContext';
import * as appService from 'src/services/appService';
import { hexWithOpacity, toTitleCase } from 'src/common/utils';
import { EInviteStatus } from 'src/enum/EInviteStatus';
import CustomBottomSheet from 'src/components/common/CustomBottomSheet/CustomBottomSheet';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { EPermission } from 'src/enum/EPermission';
import { PrimaryButtonProps } from 'src/types/props/PrimaryButtonProps';
import BottomSheetButtons from 'src/components/buttons/BottomSheetButtons/BottomSheetButtons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTranslation } from 'react-i18next';

interface Props {
  item: any;
}

export default function UserCard({ item }: Props) {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const globalStyles = useGlobalStyles();
  const optionsRef = useRef<BottomSheetModal>(null);
  const optionsSnapPoints = useMemo(() => [230 as const], []);
  const [revokeOpen, setRevokeOpen] = useState<boolean>(false);

  const { mutate: updateMutation, isLoading } = useUpdatePermission(
    (data: any) => {
      appService.showToast('Permission updated successfully', 'success');
    },
    (err: any) => {
      appService.showToast(err, 'error');
    }
  )

  const handleOpenOptions = useCallback(() => {
    optionsRef.current?.present();
  }, []);

  const handleCloseOptions = useCallback(() => {
    optionsRef.current?.dismiss();
  }, []);

  const { mutate: revokeMutation, isLoading: isRevoking } = useRevokeUser(
    (data: any) => {
      setRevokeOpen(false);
      appService.showToast('User access revoked successfully', 'success');
    },
    (err: any) => console.log('err', err),
  )

  const revokeUser = async () => {
    revokeMutation({
      userId: user.id,
      endUserId: item.end_user.id,
    });
  }


  const revokeButtons = [
    {
      text: 'Revoke',
      onPress: revokeUser,
      button: ErrorButton,
      loading: isRevoking,
      disabled: isRevoking,
    },
    {
      text: 'Cancel',
      onPress: () => setRevokeOpen(false),
      button: NeutralButton
    }
  ]

  const getStatusColor = (status: EInviteStatus) => {
    switch (status) {
      case EInviteStatus.ACCEPTED:
        return theme.colors.success;
      case EInviteStatus.PENDING:
        return theme.colors.warning;
      default:
        return theme.colors.text
    }
  }

  const updatePermission = (permission: EPermission) => {
    handleCloseOptions();
    updateMutation({
      userId: user.id,
      dto: {
        end_user_id: item.end_user.id,
        permission,
      }
    })
  }

  const updateModalButtons: PrimaryButtonProps[] = [
    {
      text: toTitleCase(EPermission.EDITOR),
      disabled: false,
      textColor: theme.colors.text,
      left: <Ionicons name={item.permission == EPermission.EDITOR ? 'radio-button-on' : 'radio-button-off-outline'} color={theme.colors.text} size={20} />,
      onPress: () => updatePermission(EPermission.EDITOR),
    },
    {
      text: toTitleCase(EPermission.VIEWER),
      disabled: false,
      textColor: theme.colors.text,
      left: <Ionicons name={item.permission == EPermission.VIEWER ? 'radio-button-on' : 'radio-button-off-outline'} color={theme.colors.text} size={20} />,
      onPress: () => updatePermission(EPermission.VIEWER)
    }
  ]

  const renderUpdateOptions = useCallback(() => {
    return (
      <View style={globalStyles.bottomSheetContainer}>
        <View style={globalStyles.mb15}>
          <CustomText text='Update Permission' size={18} color={theme.colors.text} fontWeight='semiBold' />
        </View>
        <View style={globalStyles.bottomSheetButtonsContainer}>
          <BottomSheetButtons buttons={updateModalButtons} />
        </View>
      </View>
    )
  }, [item]);

  return (
    <>
      <View style={styles.container}>
        <View style={[globalStyles.flexRow, globalStyles.aic]}>
          <View style={styles.imageContainer}>
            <FastImage source={item?.profile_image?.href_small ? { uri: item.profile_image.href_small } : require('assets/images/doctor-placeholder.png')} resizeMode='cover' style={globalStyles.full} />
          </View>
          <View style={[globalStyles.ph10, globalStyles.flex1]}>
            <CustomText text={item.invitee.fullName} size={20} fontWeight='medium' color={theme.colors.text} />
            <View style={[globalStyles.flexRow, globalStyles.aic, globalStyles.mt5]}>
              <CustomText text={t(item.as)} size={15} fontWeight='regular' color={theme.colors.text} />
              <CustomText text={' | '} fontWeight='regular' color={hexWithOpacity(theme.colors.text, 0.8)} />
              <CustomText text={t(item.status)} size={15} fontWeight='regular' color={getStatusColor(item.status)} numberOfLines={1} ellipsizeMode='tail' />
            </View>
          </View>
        </View>

        <View style={styles.actionButtons}>

          {/* Edit Permissions */}
          <TouchableOpacity style={globalStyles.mr15} onPress={handleOpenOptions}>
            <PencilIcon size={17} color={hexWithOpacity(theme.colors.text, 0.8)} />
          </TouchableOpacity>

          {/* Revoke Button */}
          <TouchableOpacity onPress={() => setRevokeOpen(true)}>
            <TrashIconOutline size={22} color={theme.colors.error} />
          </TouchableOpacity>
        </View>
      </View>

      <CustomDialog
        visible={revokeOpen}
        title={'Revoke User'}
        message={`Are you sure you want to revoke ${item.fullName}'s access to your dashboard?`}
        buttons={revokeButtons}
        onClose={() => setRevokeOpen(false)}
      />

      <CustomBottomSheet
        ref={optionsRef}
        snapPoints={optionsSnapPoints}
        content={renderUpdateOptions()}
        backgroundColor={theme.colors.topBackground}
      />
    </>

  )
}