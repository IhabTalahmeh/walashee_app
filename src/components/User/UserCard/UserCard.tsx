import { View, TouchableOpacity } from 'react-native'
import React, { memo, useMemo, useState } from 'react'
import FastImage from 'react-native-fast-image'
import { useTheme } from 'src/context/ThemeContext'
import { createStyles } from './styles';
import { useGlobalStyles } from 'src/hooks/useGlobalStyles';
import CustomText from 'src/components/common/CustomText/CustomText';
import TrashIconOutline from 'src/icons/TrashIconOutline';
import CustomDialog from 'src/components/Modals/CustomDialog/CustomDialog';
import { ErrorButton } from 'src/components/buttons/CustomButton/variants';
import NeutralButton from 'src/components/buttons/CustomButton/variants/NeutralButton';
import { useAuth } from 'src/context/AuthContext';
import * as appService from 'src/services/appService';
import { hexWithOpacity } from 'src/common/utils';
import { EInviteStatus } from 'src/enum/EInviteStatus';
import { useTranslation } from 'react-i18next';
import { useCancelTeamInvitation } from 'src/hooks/useTeam';

interface Props {
  item: any;
  teamId: string,
  afterCancelInvitation?: () => void,
}

function UserCard({ item, teamId, afterCancelInvitation }: Props) {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const globalStyles = useGlobalStyles();
  const [cancelInvitationOpen, setCancelInvitationOpen] = useState<boolean>(false);

  const { mutate: cancelTeamInvitation, isLoading: isRevoking } = useCancelTeamInvitation(
    (data: any) => {
      setCancelInvitationOpen(false);
      appService.showToast(t('invitation-cancelled-successfully'), 'success');
      afterCancelInvitation?.();
    },
    (err: any) => console.log('err', err),
  )

  const cancelInvitation = async () => {
    cancelTeamInvitation({
      userId: user.id,
      teamId,
      invitationId: item.id,
    });
  }


  const revokeButtons = [
    {
      text: t('cancel-invitation'),
      onPress: cancelInvitation,
      button: ErrorButton,
      loading: isRevoking,
      disabled: isRevoking,
    },
    {
      text: t('close'),
      onPress: () => setCancelInvitationOpen(false),
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

  return (
    <>
      <View style={styles.container}>
        <View style={[globalStyles.flexRow, globalStyles.aic]}>
          <View style={styles.imageContainer}>
            <FastImage source={item?.profile_image?.href_small ? { uri: item.profile_image.href_small } : require('assets/images/doctor-placeholder.png')} resizeMode='cover' style={globalStyles.full} />
          </View>
          <View style={[globalStyles.ph10, globalStyles.flex1]}>
            <CustomText text={item.invitee.fullName} size={20} fontWeight='medium' color={theme.colors.text} />
            <View style={[globalStyles.flexRow, globalStyles.aic]}>
              <CustomText text={t(item.as)} size={15} fontWeight='regular' color={theme.colors.text} />
              <CustomText text={' | '} fontWeight='regular' color={hexWithOpacity(theme.colors.text, 0.8)} />
              <CustomText text={t(item.status)} size={15} fontWeight='regular' color={getStatusColor(item.status)} numberOfLines={1} ellipsizeMode='tail' />
            </View>
          </View>
        </View>

        <View style={styles.actionButtons}>

          {/* Cancel invitation button */}
          <TouchableOpacity onPress={() => setCancelInvitationOpen(true)}>
            <TrashIconOutline size={22} color={theme.colors.error} />
          </TouchableOpacity>
        </View>
      </View>

      <CustomDialog
        visible={cancelInvitationOpen}
        title={t('cancel-invitation')}
        message={`${t('cancel-invitation-message-1')} "${item.invitee.fullName}" ${t('cancel-invitation-message-2')}`}
        buttons={revokeButtons}
        onClose={() => setCancelInvitationOpen(false)}
      />
    </>

  )
}

export default memo(UserCard);