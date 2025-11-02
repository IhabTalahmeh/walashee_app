import { View, TouchableOpacity } from 'react-native';
import React, { useMemo } from 'react';
import { createStyles } from './styles';
import { useTheme } from 'src/context/ThemeContext';

// 👇 Import SVGs as components
import FacebookLogo from 'assets/images/facebook-logo.svg';
import GoogleLogo from 'assets/images/google-logo.svg';
import AppleLogo from 'assets/images/apple-logo.svg';

export default function SignInOptions() {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);


  const signInOptions = [
    // {
    //   Icon: FacebookLogo,
    //   color: 'black',
    //   onPress: () => console.log('Facebook'),
    // },
    {
      Icon: GoogleLogo,
      color: 'black',
      onPress: () => console.log("Google"),
    },
    {
      Icon: AppleLogo,
      color: theme.mode == 'light' ? 'black' : 'white',
      onPress: () => console.log('Apple'),
    },
  ];

  return (
    <View style={styles.container}>
      {signInOptions.map(({ Icon, color, onPress }, index) => (
        <TouchableOpacity key={index} style={styles.button} onPress={onPress}>
          <Icon height={26} color={color} />
        </TouchableOpacity>
      ))}
    </View>
  );
}
