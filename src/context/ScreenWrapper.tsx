// components/ScreenWrapper.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from 'src/context/ThemeContext';

const ScreenWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { theme } = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: theme.colors.topBackground }]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ScreenWrapper;
