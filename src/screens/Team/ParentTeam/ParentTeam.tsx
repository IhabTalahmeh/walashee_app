import { View, Text, TouchableOpacity } from 'react-native'
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
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import Spacer from 'src/components/common/Spacer/Spacer';

export default function ParentTeam() {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const globalStyles = useGlobalStyles();
  const navigation: any = useNavigation();

  return (
    <View>
      <SectionTitle
        text={t('higher-level-team')}
        icon={<UsersIcon size={22} color={theme.colors.text} />}
        rightButtons={
          <View style={[globalStyles.flexRow]}>
            <TouchableOpacity onPress={() => navigation.navigate('InviteAgents')}>
              <Ionicons name='chatbubble-ellipses-outline' size={24} color={theme.colors.text} />
            </TouchableOpacity>
          </View>
        }
      />
      <View style={[globalStyles.p5, globalStyles.mt5]}>
        <View style={[globalStyles.flexRow,]}>

          {/* Leader */}
          <View style={[globalStyles.flexRow, globalStyles.aic, globalStyles.flex1]}>
            <UserAvatar
              size={50}
              borderColor={theme.colors.white}
              borderWidth={1.2}
              uri={'https://images.unsplash.com/photo-1529778873920-4da4926a72c2?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y3V0ZSUyMGNhdHxlbnwwfHwwfHx8MA%3D%3D&fm=jpg&q=60&w=3000'} />
            <View style={globalStyles.ms10}>
              <CustomText text='Ihab Talahmeh' size={18} />
            </View>

            <Spacer flex={true} />

            <TouchableOpacity onPress={() => navigation.navigate('InviteAgents')}>
              <Ionicons name='chatbubble-ellipses' size={24} color={theme.colors.text} />
            </TouchableOpacity>
          </View>

        </View>
      </View>
    </View>
  )
}