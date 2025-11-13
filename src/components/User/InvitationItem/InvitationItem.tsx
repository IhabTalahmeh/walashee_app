import { View, Text } from 'react-native'
import React, { useMemo, useState } from 'react'
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
import CustomText from 'src/components/common/CustomText/CustomText';
import { useRejectTeamInvitation } from 'src/hooks/useTeam';
import AcceptInvitationModal from '../../../screens/user/AcceptInvitationScreen/AcceptInvitationScreen';
import { useNavigation } from '@react-navigation/native';

interface Props {
  item: any;
  refetchInvitations: () => void;
}

export default function InvitationItem({ item, refetchInvitations }: Props) {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const globalStyles = useGlobalStyles();
  const { user } = useAuth();
  const navigation: any = useNavigation();

  const { mutate: rejectMutation, isLoading: isRejecting } = useRejectTeamInvitation(
    (data: any) => {
      refetchInvitations();
      appService.showToast(t('invitation-rejected-successfully'), 'success');
    },
    (error: any) => {
      console.log('error reject', error);
      appService.showToast(error.message, 'error');
    }
  )

  const handleAccept = () => {

  }

  const handleReject = () => {
    rejectMutation({
      userId: user.id,
      invitationId: item.id,
    });
  }

  return (
    <View style={styles.container}>
      <View style={[globalStyles.flexRow]}>
        <View style={styles.iconContainer}>
          <FastImage source={item?.inviter?.avatars?.small ? { uri: item?.inviter?.avatars?.small } : require('assets/images/doctor-placeholder.png')} style={globalStyles.full} resizeMode='cover' />
        </View>
        <View style={[globalStyles.flex1, globalStyles.pl10]}>
          <CustomText
            text={t('invitation-message', { name: item.inviter.fullName, team: item.inviter.gender == 'male' ? t('invitation-team.his-team') : t('invitation-team.her-team'), as: t(`as.${item.as}`) })}
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
            // disabled={isRejecting || isApproving || isCreating}
            // isLoading={isApproving || isCreating}
            onPress={() => navigation.navigate('AcceptInvitationScreen')}
            fontSize={16}
          />
        </View>

        {/* Reject Invitation */}
        <View style={[globalStyles.flex1]}>
          <ErrorButton
            text={t('reject')}
            height={32}
            variant='outlined'
            disabled={isRejecting}
            isLoading={isRejecting}
            onPress={handleReject}
            fontSize={16}
          />
        </View>

      </View>
    </View>
  )
}