import React, { useMemo, useRef } from 'react';
import { Text, TextInput, TextInputProps, TouchableWithoutFeedback, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { fonts } from 'src/styles/theme';
import CustomText from '../CustomText/CustomText';
import { hexWithOpacity } from 'src/common/utils';
import { useTheme } from 'src/context/ThemeContext';
import { useGlobalStyles } from 'src/hooks/useGlobalStyles';
import { createStyles } from './styles';

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
  minHeight?: number;
  lightBorder?: boolean;
}

export default function CustomFormTextArea({
  field,
  form,
  label = '',
  required,
  leftIcon,
  rightIcon,
  fontSize = 16,
  fontWeight = 'medium',
  textColor,
  minHeight = 75,
  lightBorder = false,
  ...props
}: FastFieldProps) {
  const globalStyles = useGlobalStyles();
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const inputRef = useRef<TextInput>(null);

  const handlePress = () => {
    inputRef.current?.focus();
  };

  return (
    <>
      {label && (
        <View style={[globalStyles.mb5, globalStyles.flexRow, globalStyles.aic]}>
          <CustomText text={label} size={18} fontWeight='medium' color={theme.colors.text} />
          {required === true && (
            <CustomText text="*" size={16} color={theme.colors.error} fontWeight="medium" />
          )}
          {required === false && (
            <CustomText
              text="(Optional)"
              size={16}
              color={theme.colors.pureBorder}
              fontWeight="regular"
              style={globalStyles.ml5}
            />
          )}
        </View>
      )}
      <TouchableWithoutFeedback onPress={handlePress}>
        <View
          style={[
            styles.container,
            lightBorder ? { borderColor: theme.colors.border } : null,
            {minHeight}
          ]}
        >
          {leftIcon && (
            <View style={[
              { width: 40, height: '100%' },
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
            multiline
            value={field.value}
            onChangeText={form.handleChange(field.name)}
            onBlur={form.handleBlur(field.name)}
            placeholderTextColor={hexWithOpacity(theme.colors.text, 1)}
            style={[
              styles.textInput,
              {
                fontSize,
                color: textColor ?? theme.colors.text,
                fontFamily: fonts[fontWeight],
                flex: 1,
              },
            ]}
            pointerEvents='none'
          />
          {rightIcon && (
            <View style={[
              { width: 40 },
              globalStyles.flexRow,
              globalStyles.aic,
              globalStyles.jcc,
            ]}>
              {rightIcon}
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
    </>
  );
}
