import { View, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useMemo } from 'react'
import { useNavigation } from '@react-navigation/native'
// import MyStoresMenuList from '../../components/menus/MyStoresMenuList'
import MenuUserCard from 'src/components/common/MenuUserCard/MenuUserCard'
import { useTheme } from 'src/context/ThemeContext'
import { createStyles } from './styles'
import { useGlobalStyles } from 'src/hooks/useGlobalStyles'
import GearIconOutline from 'src/icons/GearIconOutline'
import SharedDashboards from 'src/components/User/SharedDashboards/SharedDashboards'

export default function MenuScreen() {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const globalStyles = useGlobalStyles();
  const navigation: any = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={[globalStyles.iconCircle, globalStyles.mr15]}
          onPress={() => navigation.navigate('EditProfileScreen')}
        >
          <GearIconOutline size={25} color={theme.colors.text} />
        </TouchableOpacity>
      ),
    });
  }, []);

  return (
    <View style={styles.container}>
      <View style={globalStyles.mb10}>
        <MenuUserCard />
      </View>

      <View style={globalStyles.flex1}>
        {/* Dashboards */}
        <SharedDashboards />
      </View>

    </View>
  )
}