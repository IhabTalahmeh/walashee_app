import React, { useEffect, useMemo, useState } from 'react';
import { MultipleSelectList, SelectList } from '@pncodebreaker/react-native-dropdown-select-list'
import { useTheme } from 'src/context/ThemeContext';
import { fonts } from 'src/styles/theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { View } from 'react-native';
import { useGlobalStyles } from 'src/hooks/useGlobalStyles';
import { KeyValuePair } from '@react-native-async-storage/async-storage/lib/typescript/types';
import { LabelValueType } from 'src/types/types/Types';
import CustomText from 'src/components/common/CustomText/CustomText';
import { createStyles } from './styles';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

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
}

export const CustomMultiSelectList = ({
  field,
  form,
  label,
  required,
  data,
  placeholder,
  labelField = 'label',
  valueField = 'value',
  ...props
}: FastFieldProps) => {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const globalStyles = useGlobalStyles();
  const [selected, setSelected] = useState(field.value ?? []);

  const transformed = data.map(item => ({
    key: item.key,
    value: item.label
  }));

  useEffect(() => {
    form.setFieldValue(field.name, selected);
  }, [selected]);

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
      <View style={styles.container}>
        <MultipleSelectList
          {...props}
          setSelected={setSelected}
          setData={() => { }}                // <-- Add this line
          setDefaultOption={() => { }}       // <-- And this line
          boxStyles={styles.dropdown}
          inputStyles={styles.inputStyle}
          data={transformed}
          search={false}
          maxHeight={300}
          save="key"
          fontFamily={fonts.medium}
          dropdownTextStyles={styles.placeholderStyle}
          label={label}
          placeholder={placeholder}
          labelStyles={styles.placeholderStyle}
          checkBoxStyles={styles.checkboxStyle}
          badgeStyles={{ backgroundColor: theme.colors.primary }}
          defaultOption={selected as any}
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
          checkicon={    // <-- Your custom checkbox icon!
            <FontAwesome6 name="check" size={14} color={theme.colors.primary} />
          }
          showSelected={false}
        />
      </View>

    </>
  )

};
