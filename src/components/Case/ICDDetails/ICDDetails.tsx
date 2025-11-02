import { ScrollView, View } from 'react-native';
import React, { useEffect, useMemo } from 'react';
import CustomText from 'src/components/common/CustomText/CustomText';
import { useTheme } from 'src/context/ThemeContext';
import { createStyles } from './styles';
import { useGlobalStyles } from 'src/hooks/useGlobalStyles';

interface ICD {
  icd_lookup: {
    code: string;
    value: string;
  };
}

interface Props {
  icds: ICD[];
}

export default function ICDDetails({ icds = [] }: Props) {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const globalStyles = useGlobalStyles();

  return (
    <View>
      <View style={styles.titleContainer}>
        <CustomText
          text="ICD-9/10"
          size={18}
          color={theme.colors.text}
          fontWeight="semiBold"
        />
      </View>
      <View>
        {icds.map((item, index) => (
          <View key={`${item.icd_lookup.code}-${index}`} style={[styles.icdItemContainer, globalStyles.mt10]}>
            <CustomText
              text={item.icd_lookup.code}
              size={16}
              color={theme.colors.text}
              fontWeight="semiBold"
            />
            <CustomText
              text={item.icd_lookup.value}
              size={16}
              color={theme.colors.text}
              fontWeight='regular' />
          </View>
        ))}
      </View>
    </View>
  );
}
