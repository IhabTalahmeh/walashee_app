import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import CustomText from './CustomText/CustomText';

const CustomToast = ({ text1, type }: any) => {
  const { theme } = useTheme();
  const backgroundColor =
    type === 'success'
      ? theme.colors.success
      : type === 'error'
        ? theme.colors.error
        : type === 'warning'
          ? theme.colors.warning
          : theme.colors.border;

  return (
    <View style={[styles.toastContainer, { backgroundColor }]}>
      <CustomText text={text1} size={16} color={theme.colors.white} />
    </View>
  );
};

const styles = StyleSheet.create({
  toastContainer: {
    width: '90%',
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 14,
    marginTop: 20
    // marginHorizontal: '5%',
    // marginVertical: 10,
  }
});

export const toastConfig = {
  success: (props: any) => <CustomToast {...props} type="success" />,
  error: (props: any) => <CustomToast {...props} type="error" />, // Changed from 'danger' to 'error'
  warning: (props: any) => <CustomToast {...props} type="warning" />,
};
