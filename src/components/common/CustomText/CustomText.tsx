import { View, Text, TextStyle, TextProps } from 'react-native';
import React, { useMemo } from 'react';
import { useTheme } from 'src/context/ThemeContext';
import { createStyles } from './styles';
import { fonts } from 'src/styles/theme';

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
  const styles = useMemo(() => createStyles(theme), [theme]);

  const fontFamily = fonts[fontWeight] ?? fonts.medium;

  return (
    <Text
      {...props}
      style={[
        styles.text,
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
