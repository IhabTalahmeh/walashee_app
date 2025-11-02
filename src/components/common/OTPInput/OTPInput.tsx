import React, { useState, useRef, useEffect, useMemo } from 'react';
import { View, TextInput } from 'react-native';
import { useTheme } from 'src/context/ThemeContext';
import { createStyles } from './styles';
import { hexWithOpacity } from 'src/common/utils';

const OTPInput = ({ value, onChangeText, error = false }: any) => {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const initialOtpValues = value
    ? value.split('').concat(Array(6 - value.length).fill(''))
    : Array(6).fill('');
  const [otp, setOtp] = useState(initialOtpValues);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const inputsRef = useRef<any[]>([]);

  useEffect(() => {
    const newOtpValues = value
      ? value.split('').concat(Array(6 - value.length).fill(''))
      : Array(6).fill('');
    setOtp(newOtpValues);
  }, [value]);

  const handleChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
    onChangeText(newOtp.join(''));

    if (text && index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyPress = ({ nativeEvent }: any, index: number) => {
    if (nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
      handleChange('', index - 1);
    }
  };

  return (
    <View style={styles.container}>
      {otp.map((_: any, i: number) => (
        <View key={i} style={[
          styles.box,
          focusedIndex === i && styles.focusedBox,
          error ? {
            borderColor: theme.colors.error,
            backgroundColor: hexWithOpacity(theme.colors.error, 0.03),
          } : null,
          otp[i] ? { backgroundColor: hexWithOpacity(theme.colors.pureBorder, 0.05) } : null,
        ]}>
          <TextInput
            ref={(el) => (inputsRef.current[i] = el)}
            style={[
              styles.input,
              error ? { color: theme.colors.error } : null,
            ]}
            keyboardType="number-pad"
            maxLength={1}
            onChangeText={(text) => handleChange(text, i)}
            value={otp[i]}
            onFocus={() => setFocusedIndex(i)}
            onBlur={() => setFocusedIndex(null)}
            onKeyPress={(e) => handleKeyPress(e, i)}
          />
        </View>
      ))}
    </View>
  );
};

export default OTPInput;