import { View, Text } from 'react-native'
import React from 'react'
import SectionTitle from 'src/components/common/SectionTitle/SectionTitle'
import { useTranslation } from 'react-i18next'
import { useTheme } from 'src/context/ThemeContext';
import UsersIcon from 'src/icons/UsersIcon';
import UserAvatar from 'src/components/common/UserAvatar/UserAvatar';
import { useGlobalStyles } from 'src/hooks/useGlobalStyles';
import CustomText from 'src/components/common/CustomText/CustomText';

export default function ParentTeam() {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const globalStyles = useGlobalStyles();

  return (
    <View>
      <SectionTitle
        text={t('higher-level-team')}
        icon={<UsersIcon size={22} color={theme.colors.text} />}
      />
      <View style={[globalStyles.mt10]}>
        <View style={[globalStyles.flexRow,]}>
          <UserAvatar size={100} radius={10} uri={'https://images.unsplash.com/photo-1529778873920-4da4926a72c2?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y3V0ZSUyMGNhdHxlbnwwfHwwfHx8MA%3D%3D&fm=jpg&q=60&w=3000'} />
          <View style={globalStyles.ps10}>
            <CustomText text={'Alpha team for marketting'} size={18} fontWeight='semiBold' color={theme.colors.text} numberOfLines={1}/>
          </View>
        </View>
      </View>
    </View>
  )
}