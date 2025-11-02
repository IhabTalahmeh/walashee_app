import { useEffect, useMemo, useState } from 'react';
import { MultipleSelectList, SelectList } from 'react-native-dropdown-select-list'
import { useTheme } from 'src/context/ThemeContext';
import { createStyles } from './styles';
import { fonts } from 'src/styles/theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { View } from 'react-native';
import { useGlobalStyles } from 'src/hooks/useGlobalStyles';
import { KeyValuePair } from '@react-native-async-storage/async-storage/lib/typescript/types';
import { LabelValueType } from 'src/types/types/Types';
import CustomText from 'src/components/common/CustomText/CustomText';
import { bigInputHeight, smallInputHeight } from 'src/styles/globalStyles';
import { useNavigation } from '@react-navigation/native';

interface FastFieldProps {
  field: any;
  form: any;
  label?: string;
  required?: boolean;
  data: LabelValueType[];
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fontSize?: number;
  fontWeight?: keyof typeof fonts;
  textColor?: string;
  labelField?: string;
  valueField?: string;
  placeholder?: string;
  containerStyle?: any;
  height?: number;
  lightBorder?: boolean;
  leftIconWidth?: number;
}

export const CustomSelectList = ({
  field,
  form,
  label,
  required,
  data,
  labelField = 'label',
  valueField = 'value',
  containerStyle = {},
  height = smallInputHeight,
  lightBorder = false,
  leftIcon,
  leftIconWidth = 40,
  ...props
}: FastFieldProps) => {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const globalStyles = useGlobalStyles();
  const [selected, setSelected] = useState(field.value ?? "");
  const navigation: any = useNavigation();

  const transformed = data.map(item => ({
    key: item.key,
    value: item.label
  }));

  useEffect(() => {
    form.setFieldValue(field.name, selected);
    if(field.name == 'hospital_id' && selected == 'ADD_POSITION'){
      form.setFieldValue('hospital_id', null);
      navigation.navigate('AddPosition');
    }
  }, [selected]);

  useEffect(() => {
    setSelected(field.value ?? "");
  }, [field.value]);

  const dropdownStyle = useMemo(() => {
    return {
      ...styles.dropdown,
      ...containerStyle,
      height,
      borderColor: lightBorder ? theme.colors.border : theme.colors.pureBorder,
    }
  }, [containerStyle]);


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
      {leftIcon && (
        <View style={[
          styles.leftIconContainer,
          { height },
          { width: leftIconWidth + 15},
          {paddingLeft: 2},
          globalStyles.flexRow,
          globalStyles.aic,
          globalStyles.jcc,
        ]}>
          {leftIcon}
        </View>
      )}
      <SelectList
        {...props}
        key={selected}
        defaultOption={transformed.find(opt => opt.key === selected)}
        setSelected={setSelected}
        boxStyles={dropdownStyle}
        inputStyles={{
          ...styles.inputStyle,
          paddingLeft: leftIcon ? leftIconWidth : 0,
        }}
        data={transformed}
        search={false}
        maxHeight={300}
        save="key"
        fontFamily={fonts.medium}
        dropdownTextStyles={styles.placeholderStyle}
        dropdownStyles={{ borderWidth: 1, borderColor: theme.colors.pureBorder }}
        arrowicon={
          <View style={[globalStyles.aic, globalStyles.jcc]}>
            <Ionicons
              name="caret-down-outline"
              size={16}
              color={theme.colors.text}
              style={{ marginRight: 5 }}
            />
          </View>
        }
      />
    </>
  )

};
