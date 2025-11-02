import { View, Text, TextInput, TextInputProps } from 'react-native'
import React, { useMemo, useRef } from 'react'
import { useTheme } from 'src/context/ThemeContext';
import { createStyles } from './styles';
import SearchIcon from 'src/icons/SearchIconOutline';

interface Props extends TextInputProps {

}

export default function SearchInput({ ...props }: Props) {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const ref = useRef<TextInput>(null);

  return (
    <View style={styles.container} onTouchStart={() => ref.current?.focus()}>
      <SearchIcon size={24} color={theme.colors.text} />
      <TextInput
        ref={ref}
        {...props}
        placeholderTextColor={theme.colors.text}
        style={styles.textInput} />
    </View>
  )
}