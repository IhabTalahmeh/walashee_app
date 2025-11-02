import { View, Text } from 'react-native'
import React, { useMemo } from 'react'
import { useTheme } from 'src/context/ThemeContext'
import { createStyles } from './styles';
import { useGlobalStyles } from 'src/hooks/useGlobalStyles';
import CustomStaticTextInput from 'src/components/common/CustomStaticTextInput/CustomStaticTextInput';
import { useNavigation } from '@react-navigation/native';

export default function ProfileChangePassword() {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const globalStyles = useGlobalStyles();
  const navigation: any = useNavigation();

  const navigate = () => {
    navigation.navigate('ChangePasswordScreen');
  }

  return (
    <View>

      <CustomStaticTextInput
        label={'Password'}
        placeholder='********'
        editable={false}
        onPress={navigate}
      />
    </View>
  )
}