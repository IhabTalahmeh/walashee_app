import { TouchableOpacity, View } from 'react-native'
import React, { useMemo } from 'react'
import { useGlobalStyles } from 'src/hooks/useGlobalStyles';
import { createStyles } from './styles';
import { useTheme } from 'src/context/ThemeContext';
import CustomText from '../CustomText/CustomText';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Spacer from '../Spacer/Spacer';

interface Props {
  text: string;
  icon?: React.ReactNode,
  rightButtons?: React.ReactNode,
}

export default function SectionTitle({ text, icon, rightButtons }: Props) {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const globalStyles = useGlobalStyles();

  return (
    <View style={styles.headerContainer}>
      <View style={[globalStyles.flexRow, globalStyles.aic, globalStyles.jcb, globalStyles.flex1]}>
        <View style={[globalStyles.flexRow, globalStyles.aic]}>
          <View style={styles.iconContainer}>
            {icon}
          </View>
          <CustomText text={text} size={16} color={theme.colors.text} fontWeight='medium' style={globalStyles.ml10} />
          <Spacer flex={true} />
          <View>
            {rightButtons}
          </View>
        </View>
      </View>
    </View>
  )
}