import { View } from 'react-native'
import React, { useMemo } from 'react'
import { useTheme } from 'src/context/ThemeContext';
import { createStyles } from './styles';
import { useGlobalStyles } from 'src/hooks/useGlobalStyles';
import CustomText from '../CustomText/CustomText';

interface Props {
  label: string;
  value?: string | boolean | null;
}

export default function CaseInfoItem({ label, value }: Props) {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const globalStyles = useGlobalStyles();

  const renderValue = () => {
    if (value === null || value === undefined) return 'N/A';
    if (typeof value === 'boolean') return value ? 'Yes' : 'No';
    if (typeof value === 'string') {
      const trimmed = value.trim();
      if (!trimmed || trimmed === '[]' || trimmed.toLowerCase() === 'undefined') return 'N/A';
      return trimmed;
    }
    return String(value);
  };


  return (
    <View>
      {label && (
        <View style={[globalStyles.mb5, globalStyles.flexRow, globalStyles.aic]}>
          <CustomText text={label} size={18} fontWeight='medium' color={theme.colors.text} />
        </View>
      )}
      <View style={styles.valueContainer}>
        <CustomText text={renderValue()} size={16} fontWeight='medium' color={theme.colors.text} />
      </View>
    </View>
  )
}
