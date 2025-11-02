import { TouchableOpacity, View } from 'react-native'
import React, { useEffect, useMemo } from 'react'
import CustomText from 'src/components/common/CustomText/CustomText';
import { useTheme } from 'src/context/ThemeContext';
import { useGlobalStyles } from 'src/hooks/useGlobalStyles';
import { useNavigation } from '@react-navigation/native';
import { createStyles } from './styles';
import UserAvatar from 'src/components/common/UserAvatar/UserAvatar';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { hexWithOpacity } from 'src/common/utils';

interface Props {
  item: any;
}

export default function SharedDashboardItem({ item }: Props) {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const globalStyles = useGlobalStyles();
  const navigation: any = useNavigation();

  const navigate = () => {
    navigation.navigate('SharedDashboardScreen', {
      id: item.id,
    });
  }

  const isDoctor = useMemo(() => {
    return item.user_role?.name == 'SPECIALIST' || item.user_role?.name == 'FELLOW' || item.user_role?.name == 'RESIDENT';
  }, [item]);

  return (
    <TouchableOpacity style={styles.container} onPress={navigate}>
      <View style={[globalStyles.flexRow, globalStyles.jcc, globalStyles.aic]}>
        <UserAvatar
          size={70}
          uri={item?.user_media?.image?.href_small}
          borderWidth={1}
          borderColor={theme.colors.primary} />
        <View style={[globalStyles.flex1, globalStyles.ml20]}>
          <CustomText text={`${isDoctor ? 'Dr.' : ''} ${item.name}'s dashboard`} size={18} color={theme.colors.text} fontWeight='medium' />
        </View>
        <MaterialIcons name='chevron-right' color={theme.colors.text} size={30} />
      </View>
    </TouchableOpacity>
  )
}