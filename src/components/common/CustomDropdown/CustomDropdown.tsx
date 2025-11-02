import React, { memo, useMemo, useState } from 'react';
import { View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { useTheme } from 'src/context/ThemeContext';
import { createStyles } from './styles';
import CustomText from '../CustomText/CustomText';
import { useGlobalStyles } from 'src/hooks/useGlobalStyles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { fonts } from 'src/styles/theme';
import { LabelValueType } from 'src/types/types/Types';

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

const CustomDropdown = ({
  field,
  form,
  label,
  required,
  data,
  labelField = 'label',
  valueField = 'value',
  ...props
}: FastFieldProps) => {
  const [isFocus, setIsFocus] = useState(false);
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const globalStyles = useGlobalStyles();

  const errorMessage =
    form.touched[field.name] && form.errors[field.name]
      ? form.errors[field.name]
      : null;

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
        <Dropdown
          {...props}
          style={[styles.dropdown]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          iconStyle={styles.iconStyle}
          activeColor={theme.colors.inputBackground}
          containerStyle={styles.listContainerStyle}
          itemTextStyle={styles.itemTextStyle}
          renderRightIcon={() => (
            <Ionicons
              name="caret-down-outline"
              size={16}
              color={theme.colors.text}
              style={{ marginRight: 5 }}
            />
          )}
          data={data}
          labelField={labelField}
          valueField={valueField}
          keyboardAvoiding={true}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          value={field.value}
          onChange={item => {
            form.setFieldValue(field.name, item[valueField]);
          }}
          renderItem={item => (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 15,
                paddingHorizontal: 15,
              }}
            >
              <CustomText
                text={item[labelField]}
                size={16}
                color={theme.colors.text}
                fontWeight='medium'
              />
            </View>
          )}
        />
      </View>
    </>
  );
};

export default memo(CustomDropdown);
