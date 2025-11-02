import { View, Text } from 'react-native'
import React, { useMemo } from 'react'
import { useTheme } from 'src/context/ThemeContext'
import { createStyles } from './styles';
import { useNavigation } from '@react-navigation/native';

export default function SignUpNote() {
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
      >By continue you agree to our
        <Text
          style={styles.linkText}
          onPress={navigateToTermsOfUse}
          suppressHighlighting={true}
        > Terms of Use
        </Text> &
        <Text
          style={styles.linkText}
          onPress={navigateToPrivacyPolicy}
          suppressHighlighting={true}
        > Privacy Policy</Text></Text>
    </View>
  )
}