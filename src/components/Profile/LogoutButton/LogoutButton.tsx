import { View, Text } from 'react-native'
import React, { useState } from 'react'
import CustomDialog from 'src/components/Modals/CustomDialog/CustomDialog'
import { useAuth } from 'src/context/AuthContext';
import ErrorButton from 'src/components/buttons/CustomButton/variants/ErrorButton';
import NeutralButton from 'src/components/buttons/CustomButton/variants/NeutralButton';
import WarningButton from 'src/components/buttons/CustomButton/variants/WarningButton';

export default function LogoutButton() {
  const [logoutModalOpen, setLogoutModalOpen] = useState<boolean>(false);
  const [loggingOut, setLoggingOut] = useState<boolean>(false);
  const { logout } = useAuth();

  const onLogoutPress = async () => {
    setLoggingOut(true);
    await logout();
    setLoggingOut(false);
  }

  const logoutModalButtons = [
    {
      text: 'Logout',
      disabled: loggingOut,
      loading: loggingOut,
      onPress: onLogoutPress,
      button: ErrorButton,
    },
    {
      text: 'Cancel',
      onPress: () => setLogoutModalOpen(false),
      button: NeutralButton,
    }
  ]

  return (
    <>
      <WarningButton
        text='Logout'
        onPress={() => setLogoutModalOpen(true)} />

      {/* Remove and Delete Dialog */}
      <CustomDialog
        visible={logoutModalOpen}
        title={'Logout'}
        message={'Are you sure you want to log out?'}
        buttons={logoutModalButtons}
        onClose={() => setLogoutModalOpen(false)}
      />
    </>
  )
}