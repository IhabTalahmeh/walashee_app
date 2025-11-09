import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import SectionTitle from 'src/components/common/SectionTitle/SectionTitle'
import { useTranslation } from 'react-i18next'
import UsersIcon from 'src/icons/UsersIcon';
import { useTheme } from 'src/context/ThemeContext';
import { useGetTeam } from 'src/hooks/useTeam';
import { useAuth } from 'src/context/AuthContext';
import CustomText from 'src/components/common/CustomText/CustomText';
import { useGlobalStyles } from 'src/hooks/useGlobalStyles';
import NeutralButton from 'src/components/buttons/CustomButton/variants/NeutralButton';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function MyTeam() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { theme } = useTheme();
  const { data: team } = useGetTeam(user.id);
  const globalStyles = useGlobalStyles();
  const navigation: any = useNavigation();

  return (
    <View>
      <SectionTitle
        text={t('my-team')}
        icon={<UsersIcon size={22} color={theme.colors.text} />}
        rightButtons={
          <>
            {team && <View style={[globalStyles.flexRow, { gap: 5 }]}>
              <TouchableOpacity onPress={() => navigation.navigate('InviteAgents')}>
                <MaterialIcons name='person-add-alt-1' size={24} color={theme.colors.text} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('InviteAgents')}>
                <Ionicons name='chatbubble-ellipses-outline' size={24} color={theme.colors.text} />
              </TouchableOpacity>
            </View>}
          </>
        }
      />
      <View>
        {!team && (
          <View style={[globalStyles.h100, globalStyles.mt20]}>
            <View style={[globalStyles.aic, globalStyles.jcc]}>
              <View style={globalStyles.mt10}>
                <CustomText text={t('dont-have-team-yet')} size={18} color={theme.colors.text} style={globalStyles.centerText} fontWeight='bold' />
              </View>
              <View style={globalStyles.mt10}>
                <CustomText text={t('create-your-own-team')} size={18} color={theme.colors.text} style={globalStyles.centerText} />
              </View>
            </View>
            <View style={[globalStyles.mt20]}>
              <NeutralButton
                text={t('create-team')}
                variant='outlined'
                icon={<Ionicons name='add-circle-outline' size={23} color={theme.colors.neutral} />}
                onPress={() => navigation.navigate('CreateTeamScreen')}
              />
            </View>
          </View>
        )}
      </View>
    </View>
  )
}