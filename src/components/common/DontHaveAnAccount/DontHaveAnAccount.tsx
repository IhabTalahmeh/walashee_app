import { View, Text, TouchableOpacity, Platform, Linking } from 'react-native'
import React, { useMemo } from 'react'
import CustomText from 'src/components/common/CustomText/CustomText'
import { useTheme } from 'src/context/ThemeContext'
import { createStyles } from './styles';
import { useGlobalStyles } from 'src/hooks/useGlobalStyles';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

export default function DontHaveAnAccount() {
  const { t } = useTranslation();
  const globalStyles = useGlobalStyles();
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const navigation: any = useNavigation();

  const navigate = () => {
    navigation.navigate('PhoneSignUpScreen');
  }

  return (
    <View style={styles.container}>
      <CustomText text={t('dont-have-an-account?')} size={16} fontWeight='medium' color={theme.colors.text} />
      <TouchableOpacity style={globalStyles.ml5} onPress={navigate}>
        <CustomText text={t('create-account')} size={16} fontWeight='semiBold' color={theme.colors.primary} />
      </TouchableOpacity>
    </View>
  )
}