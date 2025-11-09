import { View, Text, TouchableOpacity } from 'react-native'
import React, { useMemo } from 'react'
import FastImage from 'react-native-fast-image'
import { useGlobalStyles } from 'src/hooks/useGlobalStyles';
import { useTheme } from 'src/context/ThemeContext';
import { createStyles } from './styles';
import { useAuth } from 'src/context/AuthContext';
import Skeleton from '../Skeleton/Skeleton';

interface Props {
  uri?: string;
  size: number;
  onPress?: () => void;
  borderColor?: string;
  borderWidth?: number;
  loading?: boolean;
  radius?: number;
}

export default function UserAvatar({
  uri,
  size,
  onPress,
  borderColor = 'transparent',
  borderWidth = 0,
  loading=false,
  radius=100,
}: Props) {

  const { user } = useAuth();
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const globalStyles = useGlobalStyles();
  return (
    <TouchableOpacity style={[
      {
        height: size,
        width: size,
        borderRadius: radius,
        overflow: 'hidden',
        borderColor,
        borderWidth
      }]} onPress={onPress} disabled={!onPress}>
      {loading ? (<Skeleton style={{ height: size, width: size, borderRadius: 100 }} />)
      : (<FastImage source={uri ? { uri } : require('assets/images/avatar.png')} style={globalStyles.full} />)}
    </TouchableOpacity>
  )
}