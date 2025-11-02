import { View, ScrollView } from 'react-native'
import React, { useCallback, useMemo, useState } from 'react'
import { useTheme } from 'src/context/ThemeContext'
import { useAuth } from 'src/context/AuthContext';
import { createStyles } from './styles';
import { useGlobalStyles } from 'src/hooks/useGlobalStyles';
import ProfileTopCard from 'src/components/User/ProfileTopCard/ProfileTopCard';
import CurrentPositions from 'src/components/User/CurrentPositions/CurrentPositions';
import { useGetUserById } from 'src/hooks/useUsers';
import UserExperience from 'src/components/User/UserExperience/UserExperience';
import UserEducation from 'src/components/User/UserEducation/UserEducation';
import { useFocusEffect } from '@react-navigation/native';
import UserReimbursement from 'src/components/User/UserReimbursement/UserReimbursement';
import LogoutButton from 'src/components/Profile/LogoutButton/LogoutButton';
import CancelMembershipButton from 'src/components/Profile/CancelMembershipButton/CancelMembershipButton';

export default function ProfileScreen() {
  const { user, login } = useAuth();
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const globalStyles = useGlobalStyles();


  const { data: fetchedUser, refetch: refetchUser } = useGetUserById(user.id);

  const userPositions = useMemo(() => {
    return fetchedUser?.current_positions || [];
  }, [fetchedUser]);

  const userExperience = useMemo(() => {
    return fetchedUser?.user_experiences || [];
  }, [fetchedUser]);

  const userEducation = useMemo(() => {
    return fetchedUser?.user_educations || [];
  }, [fetchedUser]);

  const userReimbursement = useMemo(() => {
    return fetchedUser?.reimbursement || null;
  }, [fetchedUser]);

  useFocusEffect(
    useCallback(() => {
      refetchUser();
    }, [refetchUser])
  );




  return (
    <>
      <ScrollView
        contentContainerStyle={globalStyles.scrollView}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>

          {/* Top Card */}
          <ProfileTopCard />

          {/* Current Positions */}
          <View style={[globalStyles.mt10, globalStyles.flex1]}>
            <CurrentPositions items={userPositions} />
          </View>

          {/* Experience */}
          <View style={[globalStyles.mt10, globalStyles.flex1]}>
            <UserExperience items={userExperience} />
          </View>

          {/* Education */}
          <View style={[globalStyles.mt10, globalStyles.flex1]}>
            <UserEducation items={userEducation} />
          </View>

          {/* Reimbursement */}
          <View style={[globalStyles.mt10, globalStyles.flex1]}>
            <UserReimbursement item={userReimbursement} />
          </View>


          {/* Buttons */}
          <View style={globalStyles.mt10}>
            <LogoutButton />
          </View>

          <View style={globalStyles.mv15}>
            <CancelMembershipButton />
          </View>
        </View>
      </ScrollView>



    </>
  )
}