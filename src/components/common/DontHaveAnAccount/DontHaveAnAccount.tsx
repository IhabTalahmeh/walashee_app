import { View, Text, TouchableOpacity, Platform, Linking } from 'react-native'
import React, { useMemo } from 'react'
import CustomText from 'src/components/common/CustomText/CustomText'
import { useTheme } from 'src/context/ThemeContext'
import { createStyles } from './styles';
import { useGlobalStyles } from 'src/hooks/useGlobalStyles';
import { useNavigation } from '@react-navigation/native';

export default function DontHaveAnAccount() {
  const globalStyles = useGlobalStyles();
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const navigation: any = useNavigation();

  const navigate = () => {
    navigation.navigate('PhoneSignUpScreen');
  }

  return (
    <View style={styles.container}>
      <CustomText text={"Don't have an account?"} size={16} fontWeight='medium' color={theme.colors.text}/>
      <TouchableOpacity style={globalStyles.ml5} onPress={navigate}>
        <CustomText text='Sign Up' size={16} fontWeight='semiBold' color={theme.colors.primary} />
      </TouchableOpacity>
    </View>
  )
}