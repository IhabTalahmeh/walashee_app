import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import { useTheme } from 'src/context/ThemeContext'
import { createStyles } from './styles';
import { useGlobalStyles } from 'src/hooks/useGlobalStyles';
import { useNavigation } from '@react-navigation/native';
import BellIcon from 'src/icons/BellIcon';
import { useGetProcedureInvitations } from 'src/hooks/useProcedure';

const intervalTimeout = 10000;

export default function ProcedureNotificationsIcon() {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const globalStyles = useGlobalStyles();

  const navigation: any = useNavigation();

  const [count, setCount] = useState<number>(0);

  const { refetch } = useGetProcedureInvitations({
    onSuccess: (data: any) => {
      if (data.status_code == 200) {
        setCount(data.data.results.length);
      }
    }
  });

  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, intervalTimeout);

    return () => {
      clearInterval(interval);
    }
  })

  const navigateToNotifications = () => {
    navigation.navigate('NotificationsScreen', {
      onGoBack: refetch
    });
  }

  return (
    <>
      <TouchableOpacity
        style={[globalStyles.iconCircle, globalStyles.mr10]}
        onPress={navigateToNotifications}
      >
        <BellIcon size={25} color={theme.colors.text} />
        {count > 0 && <View style={styles.redDot} />}
      </TouchableOpacity>
    </>
  )
}