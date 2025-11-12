import { View, Text } from 'react-native'
import React, { useMemo } from 'react'
import CustomText from '../CustomText/CustomText';
import { useTheme } from 'src/context/ThemeContext';
import { createStyles } from './styles';
import { useGlobalStyles } from 'src/hooks/useGlobalStyles';
import DocIcon from 'src/icons/DocIcon';
import ErrorButton from 'src/components/buttons/CustomButton/variants/ErrorButton';
import SuccessButton from 'src/components/buttons/CustomButton/variants/SuccessButton';
import FastImage from 'react-native-fast-image';
import { useApproveProcedureInvitation, useCreateProcedure, useRejectProcedureInvitation } from 'src/hooks/useProcedure';
import * as appService from 'src/services/appService';
import { useAuth } from 'src/context/AuthContext';
import { useTranslation } from 'react-i18next';

interface Props {
  item: any;
  refetchNotifications: () => void;
}

export default function NotificationItem({ item, refetchNotifications }: Props) {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const globalStyles = useGlobalStyles();
  const { user } = useAuth();


  const { mutate: createMutation, isLoading: isCreating } = useCreateProcedure(
    (data: any) => {
      if (data.status_code == 200) {
        approveMutation(item.id);
      } else {
        console.log('gg', JSON.stringify(data));
        appService.showToast('Could not approve invitation, please try again', 'error');
      }
    },
    (error: any) => {
      appService.showToast(error.message, 'error');
    }
  )

  const { mutate: approveMutation, isLoading: isApproving } = useApproveProcedureInvitation(
    (data: any) => {
      if (data.status_code == 200) {
        appService.showToast('Invitation approved successfully', 'success');
        refetchNotifications();
      } else {
        appService.showToast('Could not approve invitation, please try again', 'error');
      }
    },
    (error: any) => {
      appService.showToast(error.message, 'error');
    }
  );

  const { mutate: rejectMutation, isLoading: isRejecting } = useRejectProcedureInvitation(
    (data: any) => {
      if (data.status_code == 200) {
        appService.showToast('Invitation rejected successfully', 'success');
        refetchNotifications();
      } else {
        appService.showToast('Could not reject invitation, please try again', 'error');
      }
    },
    (error: any) => {
      appService.showToast(error.message, 'error');
    }
  )

  const handleApprove = () => {
    createMutation({
      userId: user.id,
      data: item.payload,
      approve: true,
    });
  }

  const handleReject = () => {
    rejectMutation(item.id);
  }

  return (
    <View style={styles.container}>
      <View style={[globalStyles.flexRow]}>
        <View style={styles.iconContainer}>
          <FastImage source={item?.user_media?.href_small ? { uri: item.user_media.href_small } : require('assets/images/doctor-placeholder.png')} style={globalStyles.full} resizeMode='cover' />
        </View>
        <View style={[globalStyles.flex1, globalStyles.pl10]}>
          <CustomText
            text={item.messageAr}
            size={16}
            color={theme.colors.text}
            fontWeight='medium'
          />
        </View>
      </View>
      <View style={[styles.actionButtons, globalStyles.mt10]}>

        {/* Accept Invitation */}
        <View style={[globalStyles.flex1]}>
          <SuccessButton
            text={t('accept')}
            height={32}
            variant='outlined'
            disabled={isRejecting || isApproving || isCreating}
            isLoading={isApproving || isCreating}
            onPress={handleApprove}
            fontSize={16}
          />
        </View>

        {/* Reject Invitation */}
        <View style={[globalStyles.flex1]}>
          <ErrorButton
            text={t('reject')}
            height={32}
            variant='outlined'
            disabled={isRejecting || isApproving}
            isLoading={isRejecting}
            onPress={handleReject}
            fontSize={16}
          />
        </View>

      </View>
    </View>
  )
}