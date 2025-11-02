import React, { useMemo, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { createStyles } from './styles';
import { useTheme } from 'src/context/ThemeContext';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export const CustomCheckbox = () => {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [checked, setChecked] = useState(false);

  return (
    <TouchableOpacity onPress={() => setChecked(!checked)} style={styles.wrapper}>
      <View
        style={[
          styles.checkbox,
          { backgroundColor: checked ? '#007AFF' : 'transparent' }
        ]}
      >
        {checked && <FontAwesome name="check-square" size={15} color="#fff" />}
      </View>
    </TouchableOpacity>
  );
};
