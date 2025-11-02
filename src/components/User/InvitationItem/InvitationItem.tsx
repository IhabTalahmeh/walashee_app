import { View, Text, TouchableOpacity } from 'react-native'
import React, { useMemo } from 'react'
import { useTheme } from 'src/context/ThemeContext';
import { createStyles } from './styles';
import { useGlobalStyles } from 'src/hooks/useGlobalStyles';
import FastImage from 'react-native-fast-image';
import { fonts } from 'src/styles/theme';
import { ErrorButton, SuccessButton } from 'src/components/buttons/CustomButton/variants';
import { useAcceptInvitation, useRejectInvitation } from 'src/hooks/useUsers';
import { useAuth } from 'src/context/AuthContext';
import * as appService from 'src/services/appService';

interface Props {
  item: any;
  refetchInvitations: () => void;
}

export default function InvitationItem({ item, refetchInvitations }: Props) {
  const { user } = useAuth();
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const globalStyles = useGlobalStyles();

  const { mutate: acceptMutation, isLoading: isAccepting } = useAcceptInvitation(
    (data: any) => {
      appService.showToast('Invitation accepted successfully', 'success');
      refetchInvitations();
    },
    (err: any) => {
      appService.showToast(err, 'error');
    },
  )

  const { mutate: rejectMutation, isLoading: isRejecting } = useRejectInvitation(
    (data: any) => {
      appService.showToast('Invitation rejected successfully', 'success');
      refetchInvitations();
    },
    (err: any) => {
      appService.showToast(err, 'error');
    },
  )

  const handleAccept = () => {
    acceptMutation({
      userId: user.id,
      doctorId: item.id,
    });
  }

  const handleReject = () => {
    rejectMutation({
      userId: user.id,
      doctorId: item.id,
    });
  }

  return (
    <>
      <View style={styles.container}>
        <View style={[globalStyles.flexRow]}>
          <View style={styles.imageContainer}>
            <FastImage
              source={item?.user_media?.image?.href_big ? { uri: item.user_media.image.href_big, cache: FastImage.cacheControl.immutable } : require('assets/images/avatar.png')}
              resizeMode='cover'
              style={globalStyles.full}
            />
          </View>
          <View style={[globalStyles.ph10, globalStyles.flex1]}>
            <Text style={styles.notificationText}>
              <Text style={{ fontFamily: fonts.bold }}>{item.name}</Text>
              {' has invited you to their dashboard.'}
            </Text>

          </View>
        </View>

        <View style={[styles.actionButtons, globalStyles.mt10]}>

          {/* Reject Invitation */}
          <View style={[globalStyles.flex1]}>
            <ErrorButton
              text='Reject'
              height={40}
              variant='outlined'
              disabled={isRejecting}
              isLoading={isRejecting}
              onPress={handleReject}
            />
          </View>

          {/* Accept Invitation */}
          <View style={[globalStyles.flex1]}>
            <SuccessButton
              text='Accept'
              height={40}
              variant='outlined'
              disabled={isAccepting}
              isLoading={isAccepting}
              onPress={handleAccept}
            />
          </View>

        </View>
      </View>
    </>
  )
}