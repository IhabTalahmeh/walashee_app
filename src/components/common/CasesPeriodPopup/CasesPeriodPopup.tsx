import { View, Text, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import React, { useMemo } from 'react';
import { useTheme } from 'src/context/ThemeContext';
import { createStyles } from './styles';
import CustomText from '../CustomText/CustomText';
import { useGlobalStyles } from 'src/hooks/useGlobalStyles';
import { usePeriodFilter } from 'src/context/PeriodFilterContext';

export default function CasesPeriodPopup() {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const globalStyles = useGlobalStyles();
  const { data, selected, select, hide } = usePeriodFilter();

  return (
    <>
      <TouchableWithoutFeedback onPressIn={hide}>
        <View style={styles.toggleButton} />
      </TouchableWithoutFeedback>

      <View style={styles.container}>
        {data.map((item) => {
          const isSelected = item.id === selected.id;
          return (
            <TouchableOpacity
              style={[styles.button, isSelected ? styles.selectedButton : null]}
              key={item.id}
              onPress={() => select(item)}
            >
              <CustomText
                text={item.title}
                size={14}
                fontWeight='medium'
                color={isSelected ? theme.colors.white : theme.colors.text}
                style={globalStyles.centerText}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </>
  );
}
