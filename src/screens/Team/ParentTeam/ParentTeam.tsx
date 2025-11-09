import { View, Text } from 'react-native'
import React from 'react'
import SectionTitle from 'src/components/common/SectionTitle/SectionTitle'
import { useTranslation } from 'react-i18next'
import { useTheme } from 'src/context/ThemeContext';
import UsersIcon from 'src/icons/UsersIcon';
import UserAvatar from 'src/components/common/UserAvatar/UserAvatar';
import { useGlobalStyles } from 'src/hooks/useGlobalStyles';
import CustomText from 'src/components/common/CustomText/CustomText';
import MembersRow from 'src/components/common/MembersRow/MembersRow';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LeaderAvatar from 'src/components/common/LeaderAvatar/LeaderAvatar';

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

          {/* Avatar */}
          <UserAvatar size={100} radius={10} uri={'https://images.unsplash.com/photo-1529778873920-4da4926a72c2?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y3V0ZSUyMGNhdHxlbnwwfHwwfHx8MA%3D%3D&fm=jpg&q=60&w=3000'} />

          {/* Right part */}
          <View style={globalStyles.ph10}>
            <View>
              <CustomText text={'Alpha team for marketting'} size={18} fontWeight='semiBold' color={theme.colors.text} numberOfLines={1} />
            </View>

            <View style={[globalStyles.mt5, globalStyles.ass]}>
              <LeaderAvatar uri='https://ak1.ostkcdn.com/images/products/is/images/direct/302a4c347052562af662c74b6169aac554f5eea1/Cat-Couture-Canvas-Cute-Cat-Art-Prints-by-Art-Remedy.jpg?impolicy=medium' />
            </View>

            <View style={globalStyles.mt5}>
              <MembersRow />
            </View>
          </View>

        </View>
      </View>
    </View>
  )
}