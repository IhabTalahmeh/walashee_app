import { View, Text } from 'react-native'
import React, { useMemo } from 'react'
import { useTheme } from 'src/context/ThemeContext'
import { createStyles } from './styles';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

export default function SignUpNote() {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const navigation: any = useNavigation();

  const navigateToPrivacyPolicy = () => {
    navigation.navigate('PrivacyPolicyScreen');
  }

  const navigateToTermsOfUse = () => {
    navigation.navigate('TermsOfUseScreen');
  }

  return (
    <View>
      <Text
        style={styles.mainText}
      >{t('signup-note-1')}
        <Text
          style={styles.linkText}
          onPress={navigateToTermsOfUse}
          suppressHighlighting={true}
        > {t('terms-of-use')}
        </Text> {t('&')}
        <Text
          style={styles.linkText}
          onPress={navigateToPrivacyPolicy}
          suppressHighlighting={true}
        > {t('privacy-policy')}</Text></Text>
    </View>
  )
}