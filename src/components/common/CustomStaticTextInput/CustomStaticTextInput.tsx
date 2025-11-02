import React, { useMemo } from 'react'
import { Text, TextInput, TextInputProps, View } from 'react-native'
import { useTheme } from 'src/context/ThemeContext';
import { useGlobalStyles } from 'src/hooks/useGlobalStyles';
import { createStyles } from './styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { fonts } from 'src/styles/theme'; // import font mapping
import CustomText from '../CustomText/CustomText';
import { hexWithOpacity } from 'src/common/utils';

interface Props extends TextInputProps {
  label?: string;
  required?: boolean | undefined;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  errorMessage?: string | null;
  fontSize?: number;
  fontWeight?: keyof typeof fonts;
  textColor?: string;
}

export default function CustomStaticTextInput({
  leftIcon,
  rightIcon,
  fontSize = 16,
  fontWeight = 'regular',
  textColor,
  label = '',
  required,
  ...props
}: Props) {
  const globalStyles = useGlobalStyles();
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <>
      {label && <View style={[globalStyles.mb5, globalStyles.flexRow, globalStyles.aic]}>
        <CustomText text={label} size={18} fontWeight='medium' color={theme.colors.text} />
        {required == true && <CustomText text='*' size={16} color={theme.colors.error} fontWeight='medium' />}
        {required == false && <CustomText text='(Optional)' size={16} color={theme.colors.pureBorder} fontWeight='regular' style={globalStyles.ml5} />}
      </View>}
      <View
        style={[
          styles.container,
          props.errorMessage ? { borderColor: theme.colors.error } : null,
          { paddingHorizontal: leftIcon ? 5 : 10 }
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
              fontFamily: fonts.medium,
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
