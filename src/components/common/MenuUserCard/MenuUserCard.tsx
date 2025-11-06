import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useMemo } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useTheme } from 'src/context/ThemeContext'
import { useGlobalStyles } from 'src/hooks/useGlobalStyles'
import { useAuth } from 'src/context/AuthContext'
import UserAvatar from '../UserAvatar/UserAvatar'
import { createStyles } from './styles'
import CustomText from '../CustomText/CustomText'
import { hexWithOpacity } from 'src/common/utils'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { useNavigation } from '@react-navigation/native'

export default function MenuUserCard() {
  const { user } = useAuth();
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const globalStyles = useGlobalStyles();
  const navigation: any = useNavigation();

  const navigate = () => {
    navigation.navigate('ProfileScreen');
  }

  return (
    <TouchableOpacity style={styles.userCardContainer} onPress={navigate}>

      {/* Profile Picture */}
      <View style={[globalStyles.flexRow, globalStyles.aic]}>
        <View>
          <UserAvatar size={60} uri={user?.profile_image?.href_big} />
        </View>

        {/* Name and Edit Profile */}
        <View style={styles.nameContainer}>
          <CustomText text={`${user.fullName}`} size={18} color={theme.colors.text} fontWeight='semiBold' />
        </View>

        <View style={globalStyles.flex1} />
        <MaterialIcons name='chevron-right' color={theme.colors.text} size={30} />
      </View>
    </TouchableOpacity>
  )
}
