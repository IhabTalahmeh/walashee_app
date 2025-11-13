import { View, Text } from 'react-native'
import React, { useMemo } from 'react'
import { useTheme } from 'src/context/ThemeContext'
import { createStyles } from './styles';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

export default function AgentTeamRequestNote() {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const navigation: any = useNavigation();

  const navigateToTermsOfUse = () => {
    navigation.navigate('AgentTeamRequestTermsScreen');
  }

  return (
    <View>
      <Text
        style={styles.mainText}
      >{t('agent-request-terms-1')}
        <Text
          style={styles.linkText}
          onPress={navigateToTermsOfUse}
          suppressHighlighting={true}
        > {t('agent-terms-of-use')}
        </Text>
        <Text
          style={styles.mainText}
        > {t('agent-request-terms-2')}
        </Text>
      </Text>
    </View>
  )
}