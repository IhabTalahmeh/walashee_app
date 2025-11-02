import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import CustomDialog from 'src/components/Modals/CustomDialog/CustomDialog'
import { useAuth } from 'src/context/AuthContext';
import ErrorButton from 'src/components/buttons/CustomButton/variants/ErrorButton';
import NeutralButton from 'src/components/buttons/CustomButton/variants/NeutralButton';
import WarningButton from 'src/components/buttons/CustomButton/variants/WarningButton';
import CustomText from 'src/components/common/CustomText/CustomText';
import { useTheme } from 'src/context/ThemeContext';
import { useGlobalStyles } from 'src/hooks/useGlobalStyles';
import { useCancelSubscription } from 'src/hooks/useSubscription';
import * as appService from 'src/services/appService';
import { useDeleteAccount } from 'src/hooks/useUserAuth';
import TransparentButton from 'src/components/buttons/CustomButton/variants/TransparentButton';

const CancelMembership = ({ onClose }: any) => {
  const { user, login, logout } = useAuth();
  const { theme } = useTheme();
  const globalStyles = useGlobalStyles();
  const [downgradeModalOpen, setDowngradeModalOpen] = useState<boolean>(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);

  const { mutateAsync: downgradeAsync, isLoading: isDowngradingAsync } = useCancelSubscription(
    () => { },
    () => { }
  )

  const { mutate: downgradeMutation, isLoading: isDowngrading } = useCancelSubscription(
    (data: any) => {
      if (data.status_code == 200) {
        onClose();
        user.subscription.cancelled = true;
        login(user);
        appService.showToast('You successfully cancelled your subscription', 'success');
      } else {
        console.log('error', data);
      }
    },
    (error: any) => {
      console.log('error', error);
    }
  )

  const { mutate: deleteMutation, isLoading: isDeleting } = useDeleteAccount(
    (data: any) => {
      if (data.status_code == 200) {
        logout();
        appService.showToast('You successfully deleted your account', 'success');
      } else {
        console.log('error', data);
      }
    },
    (error: any) => {
      console.log('error', error);
    }
  )

  const onDowngradePress = () => {
    const id = user?.subscriptioin?.subscr_id || user.id;
    downgradeMutation(id);
  }

  const onDeletePress = async () => {
    const id = user?.subscriptioin?.subscr_id || user.id;
    await downgradeAsync(id);
    deleteMutation(user.id);
  }

  const downgradeButtons = [
    {
      text: 'Downgrade',
      disabled: isDowngrading || isDowngradingAsync,
      loading: isDowngrading || isDowngradingAsync,
      onPress: onDowngradePress,
      button: ErrorButton,
    },
    {
      text: 'Cancel',
      onPress: () => setDowngradeModalOpen(false),
      button: NeutralButton,
    }
  ]

  const deleteButtons = [
    {
      text: 'Delete',
      disabled: isDeleting,
      loading: isDeleting,
      onPress: onDeletePress,
      button: ErrorButton,
    },
    {
      text: 'Cancel',
      onPress: () => setDeleteModalOpen(false),
      button: NeutralButton,
    }
  ]

  return (
    <>
      <View>

        <CustomText text='Cancel Membership' size={22} color={theme.colors.text} fontWeight='bold' />

        <View style={globalStyles.mv10}>

          {(user?.subscription?.cancelled == false && user?.subscription?.plan_id != 1) && <View style={globalStyles.mt10}>
            <TouchableOpacity onPress={() => setDowngradeModalOpen(true)}>
              <CustomText text='Downgrade to free plan' size={18} color={theme.colors.primary} />
            </TouchableOpacity>
          </View>}

          <View style={globalStyles.mt10}>
            <TouchableOpacity onPress={() => setDeleteModalOpen(true)}>
              <CustomText text='Delete account' size={18} color={theme.colors.primary} />
            </TouchableOpacity>
          </View>

          <View style={globalStyles.mt10}>
            <TouchableOpacity onPress={onClose}>
              <CustomText text='Cancel' size={18} color={theme.colors.primary} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Downgrade Dialog */}
      <CustomDialog
        visible={downgradeModalOpen}
        title={'Downgrade plan'}
        message={'Are you sure you want to downgrade to free plan?'}
        buttons={downgradeButtons}
        onClose={() => setDowngradeModalOpen(false)} />

      {/* Delete Dialog */}
      <CustomDialog
        visible={deleteModalOpen}
        title={'Delete account'}
        message={'Are you sure you want to delete your account?'}
        buttons={deleteButtons}
        onClose={() => setDeleteModalOpen(false)} />

    </>
  )
}

export default function CancelMembershipButton() {
  const { theme } = useTheme();
  const [modalOpen, setModalOpen] = useState<boolean>(false);



  return (
    <>
      <TransparentButton
        text='Cancel Membership'
        onPress={() => setModalOpen(true)}
        fontSize={16}
        textColor={theme.colors.error} 
        height={40}/>

      {/* Remove and Delete Dialog */}
      <CustomDialog
        visible={modalOpen}
        content={<CancelMembership onClose={() => setModalOpen(false)} />}
        onClose={() => setModalOpen(false)} title={''} message={''} buttons={[]} />
    </>
  )
}