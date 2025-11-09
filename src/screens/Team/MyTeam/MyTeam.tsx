import { View, Text } from 'react-native'
import React from 'react'
import SectionTitle from 'src/components/common/SectionTitle/SectionTitle'
import { useTranslation } from 'react-i18next'
import UsersIcon from 'src/icons/UsersIcon';
import { useTheme } from 'src/context/ThemeContext';

export default function MyTeam() {
  const { t } = useTranslation();
  const { theme } = useTheme();

  return (
    <View>
      <SectionTitle
        text={t('my-team')}
        icon={<UsersIcon size={22} color={theme.colors.text} />}
      />
      <Text>MyTeam</Text>
    </View>
  )
}