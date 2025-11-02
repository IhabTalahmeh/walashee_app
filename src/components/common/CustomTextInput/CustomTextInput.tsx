import React, { useMemo } from 'react'
import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native'
import { useTheme } from 'src/context/ThemeContext';
import { useGlobalStyles } from 'src/hooks/useGlobalStyles';
import { createStyles } from './styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { fonts } from 'src/styles/theme'; // import font mapping
import CustomText from '../../../components/common/CustomText/CustomText';
import { hexWithOpacity } from 'src/common/utils';

interface CustomTextInputProps extends TextInputProps {
  label?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  errorMessage?: string | null;
  fontSize?: number;
  fontWeight?: keyof typeof fonts;
  textColor?: string;
}

export default function CustomTextInput({
  leftIcon,
  rightIcon,
  fontSize = 16,
  fontWeight = 'medium',
  textColor,
  label = '',
  ...props
}: CustomTextInputProps) {
  const globalStyles = useGlobalStyles();
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const fontFamily = fonts[fontWeight] ?? fonts.medium;

  return (
    <>
      {label && <View style={globalStyles.mb5}>
        <CustomText text={label} size={18} fontWeight='medium' color={theme.colors.text} />
      </View>}
      <View
        style={[
          styles.container,
          props.errorMessage ? { borderColor: theme.colors.error } : null,
        ]}
      >
        {leftIcon && (
          <View
            style={[
              { width: 40, height: '100%' },
              globalStyles.flexRow,
              globalStyles.aic,
              globalStyles.jcc,
            ]}
          >
            {leftIcon}
          </View>
        )}
        <TextInput
          {...props}
          placeholderTextColor={hexWithOpacity(theme.colors.text, 1)}
          style={[
            styles.textInput,
            {
              fontSize,
              color: textColor ?? theme.colors.text,
              fontFamily,
              flex: 1,
            },
          ]}
        />
        {rightIcon && (
          <View
            style={[
              { width: 40 },
              globalStyles.flexRow,
              globalStyles.aic,
              globalStyles.jcc,
            ]}
          >
            {rightIcon}
          </View>
        )}
      </View>
      {props.errorMessage && (
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle" color={theme.colors.error} size={16} />
          <Text style={styles.errorMessage}>{props.errorMessage}</Text>
        </View>
      )}
    </>
  );
}
