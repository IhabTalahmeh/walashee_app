import { View, Text, TouchableOpacity } from 'react-native'
import React, { useMemo } from 'react'
import { useTheme } from 'src/context/ThemeContext'
import { createStyles } from './styles';
import { useGlobalStyles } from 'src/hooks/useGlobalStyles';
import UserAvatar from 'src/components/common/UserAvatar/UserAvatar';
import { useAuth } from 'src/context/AuthContext';
import CustomText from 'src/components/common/CustomText/CustomText';
import EmailIcon from 'src/icons/EmailIcon';
import PencilIcon from 'src/icons/PencilIcon';
import { useNavigation } from '@react-navigation/native';
import { PrimaryButton } from 'src/components/buttons/CustomButton/variants';

export default function ProfileTopCard() {
  const { user } = useAuth();
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const globalStyles = useGlobalStyles();
  const navigation: any = useNavigation();

  const speciality = useMemo(() => {
    return user.user_profile[0]?.speciality?.name;
  }, [user]);

  const navigate = () => {
    navigation.navigate('EditProfileScreen');
  }

  return (
    < View style={styles.container} >
      <View>        
        <View style={globalStyles.aic}>
          <UserAvatar
            size={120}
            borderColor={theme.colors.primary}
            borderWidth={1}
            uri={user?.profile_image?.href_small}
          />
        </View>

        <View>
          <View style={[globalStyles.aic, globalStyles.mt10]}>
            <CustomText text={`${user.first_name} ${user.last_name}`} size={20} fontWeight='bold' color={theme.colors.text} />
            {speciality && <CustomText text={`(${speciality})`} size={16} fontWeight='regular' color={theme.colors.primary} style={globalStyles.mt5}/>}
          </View>

          <View style={[globalStyles.flexRow, globalStyles.aic, globalStyles.jcc, globalStyles.mt10]}>
            <EmailIcon size={20} color={theme.colors.primary} />
            <CustomText text={user.email} size={16} color={theme.colors.pureBorder} style={globalStyles.ml5} />
          </View>


          <View style={[globalStyles.mt15]}>
            <TouchableOpacity style={styles.editProfileButton} onPress={navigate}>
              <CustomText text={'Edit Profile'} size={16} color={theme.colors.text} fontWeight='medium' />
              <PencilIcon size={19} color={theme.colors.text} style={globalStyles.ml10} />
            </TouchableOpacity>
          </View>
        </View>

      </View>
    </View >

  )
}