import React, { useMemo, useRef, useState } from 'react';
import { Text, TextInput, TextInputProps, TouchableWithoutFeedback, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { fonts } from 'src/styles/theme';
import CustomText from '../CustomText/CustomText';
import { hexWithOpacity } from 'src/common/utils';
import { useTheme } from 'src/context/ThemeContext';
import { useGlobalStyles } from 'src/hooks/useGlobalStyles';
import { createStyles } from './styles';
import { useTranslation } from 'react-i18next';

interface FastFieldProps extends TextInputProps {
  field: any;
  form: any;
  label?: string;
  required?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fontSize?: number;
  fontWeight?: keyof typeof fonts;
  textColor?: string;
  placeholder?: string;
  height?: number;
  leftIconWidth?: number;
  note?: string;
  selectTextOnFocus?: boolean;
  leftIconContainerStyle?: any;
  rightIconWidth?: number;
  withBorder?: boolean;
}

export default function CustomFormTextInput({
  field,
  form,
  label = '',
  required,
  leftIcon,
  rightIcon,
  fontSize = 16,
  fontWeight = 'medium',
  textColor,
  height = 55,
  selectTextOnFocus = false,
  leftIconWidth = 40,
  leftIconContainerStyle = {},
  rightIconWidth = 40,
  note = '',
  withBorder = false,
  ...props
}: FastFieldProps) {
  const { t } = useTranslation();
  const globalStyles = useGlobalStyles();
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const inputRef = useRef<TextInput>(null);
  const error = form.touched[field.name] && form.errors[field.name];

  const handlePress = () => {
    inputRef.current?.focus();
    handleFocus();
  };

  const handleFocus = () => {
    if (selectTextOnFocus && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.setNativeProps({
          selection: {
            start: 0,
            end: String(field.value).length,
          },
        });
      }, 0);
    }
  };
  return (
    <>
      {label && (
        <View style={[globalStyles.mb5, globalStyles.flexRow, globalStyles.aic]}>
          <CustomText text={label} size={18} fontWeight='medium' color={theme.colors.text} />

          {note && (
            <CustomText
              text={note}
              size={15}
              color={theme.colors.pureBorder}
              fontWeight="regular"
              style={globalStyles.ml5}
            />
          )}
          {required === true && (
            <CustomText text="*" size={16} color={theme.colors.error} fontWeight="medium" />
          )}
          {required === false && (
            <CustomText
              text={`(${t('optional')})`}
              size={15}
              color={theme.colors.pureBorder}
              fontWeight="regular"
              style={globalStyles.ml5}
            />
          )}
        </View>
      )}
      <TouchableWithoutFeedback onPress={handlePress}>
        <>
          <View
            style={[
              styles.container,
              withBorder ? { borderColor: theme.colors.pureBorder } : null,
              error ? { borderColor: theme.colors.error } : null,
              { height }
            ]}
          >
            {leftIcon && (
              <View style={[
                { height: '100%' },
                { width: leftIconWidth },
                leftIconContainerStyle,
                globalStyles.flexRow,
                globalStyles.aic,
                globalStyles.jcc,
              ]}>
                {leftIcon}
              </View>
            )}
            <TextInput
              ref={inputRef}
              {...props}
              value={field.value}
              onChangeText={form.handleChange(field.name)}
              onBlur={form.handleBlur(field.name)}
              placeholderTextColor={hexWithOpacity(theme.colors.text, 1)}
              style={[
                styles.textInput,
                // globalStyles.text,
                {
                  fontSize,
                  color: error ? theme.colors.error : textColor ?? theme.colors.text,
                  fontFamily: fonts[fontWeight],
                  flex: 1,
                  paddingLeft: leftIcon ? 0 : 10,
                },
              ]}
              pointerEvents='none'
              autoCorrect={false}
            />
            {rightIcon && (
              <View style={[
                { width: rightIconWidth },
                globalStyles.flexRow,
                globalStyles.aic,
                globalStyles.jcc,
              ]}>
                {rightIcon}
              </View>
            )}
          </View>
          <View style={globalStyles.mt2}>
            {error && <CustomText text={error} color={theme.colors.error} size={14} />}
          </View>
        </>
      </TouchableWithoutFeedback >
    </>
  );
}
