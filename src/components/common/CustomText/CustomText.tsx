import { View, Text, TextStyle, TextProps, Platform } from 'react-native';
import React, { useContext, useMemo } from 'react';
import { useTheme } from 'src/context/ThemeContext';
import { createStyles } from './styles';
import { fonts } from 'src/styles/theme';
import { useGlobalStyles } from 'src/hooks/useGlobalStyles';
import { LanguageContext } from 'src/context/LanguageContext';

const isIOS = Platform.OS == 'ios';

interface Props extends TextProps {
  text: string;
  size?: number;
  color?: string;
  style?: TextStyle | TextStyle[];
  fontWeight?: keyof typeof fonts;
}

export default function CustomText({
  text,
  size = 16,
  color = 'black',
  fontWeight = 'medium',
  style,
  ...props
}: Props) {
  const { theme }: any = useTheme();
  const { language } = useContext(LanguageContext);
  const styles = useMemo(() => createStyles(theme), [theme]);
  const globalStyles = useGlobalStyles();
  const isArabic = language == 'ar';

  const fontFamily = fonts[fontWeight] ?? fonts.medium;

  return (
    <Text
      {...props}
      style={[
        styles.text,
        true ? globalStyles.text : null,
        style,
        {
          fontSize: size,
          color,
          fontFamily,
        },
      ]}
    >
      {text}
    </Text>
  );
}
