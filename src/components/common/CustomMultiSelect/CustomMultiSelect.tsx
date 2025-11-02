import React, { memo, useMemo, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from 'src/context/ThemeContext';
import { createStyles } from './styles';
import CustomText from '../CustomText/CustomText';
import { useGlobalStyles } from 'src/hooks/useGlobalStyles';
import { fonts } from 'src/styles/theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { LabelValueType } from 'src/types/types/Types';
import { MultiSelectProps } from 'react-native-element-dropdown/lib/typescript/components/MultiSelect/model';
import { MultiSelect } from 'react-native-element-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { hexWithOpacity } from 'src/common/utils';

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
  placeholder?: string;
}

const CustomMultiSelect: React.FC<FastFieldProps> = ({
  field,
  form,
  label,
  required,
  data,
  placeholder = 'Select...',
  ...props
}) => {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const globalStyles = useGlobalStyles();
  const [isFocus, setIsFocus] = useState(false);

  // القيم دايمًا تيجي من فورميك
  const selected: string[] = Array.isArray(field.value) ? field.value : [];

  // الأخطاء من فورميك
  const errorMessage =
    form.touched[field.name] && form.errors[field.name]
      ? form.errors[field.name]
      : null;

  // When selection changes, update Formik only
  const handleChange = (items: string[]) => {
    form.setFieldValue(field.name, items);
  };

  const selectedLabels = data
    .filter(item => selected.includes(item.value))
    .map(item => item.label)
    .join(', ');

  return (
    <>
      {label && (
        <View style={[globalStyles.mb5, globalStyles.flexRow, globalStyles.aic]}>
          <CustomText
            text={label}
            size={18}
            fontWeight="medium"
            color={theme.colors.text}
          />
          {required === true && (
            <CustomText
              text="*"
              size={16}
              color={theme.colors.error}
              fontWeight="medium"
            />
          )}
          {required === false && (
            <CustomText
              text="(Optional)"
              size={16}
              color={theme.colors.text}
              fontWeight="regular"
              style={globalStyles.ml5}
            />
          )}
        </View>
      )}
      <View style={styles.container}>
        <MultiSelect
          {...props}
          style={[styles.dropdown]}
          placeholder={''}
          selectedTextStyle={styles.selectedTextStyle}
          iconStyle={styles.iconStyle}
          activeColor={theme.colors.primary}
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
          labelField="label"
          valueField="value"
          keyboardAvoiding={true}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          value={selected}
          onChange={handleChange}
          visibleSelectedItem={false}
          renderItem={(item) => (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 15,
                paddingHorizontal: 15,
                backgroundColor: selected.includes(item.value)
                  ? theme.colors.background
                  : 'transparent',
              }}
            >
              {selected.includes(item.value) ? (
                <FontAwesome
                  name="check-square-o"
                  size={20}
                  color={theme.colors.primary}
                  style={{ marginRight: 8 }}
                />
              ) : (
                <FontAwesome
                  name="square-o"
                  size={20}
                  color={theme.colors.text}
                  style={{ marginRight: 8 }}
                />
              )}
              <CustomText
                text={item.label}
                size={16}
                color={theme.colors.text}
                fontWeight='medium'
              />
            </View>
          )}
        />
        {/* Overlay: placeholder or selected */}
        <View
          pointerEvents="none"
          style={[
            StyleSheet.absoluteFill,
            {
              justifyContent: 'center',
              left: 15,
              right: 35,
            },
          ]}
        >
          {isFocus ? (
            <CustomText
              text={placeholder}
              color={hexWithOpacity(theme.colors.text, 1)}
              size={16}
              fontWeight='medium'
              numberOfLines={1}
              ellipsizeMode="tail"
            />
          ) : selectedLabels ? (
            <CustomText
              text={selectedLabels}
              color={theme.colors.text}
              size={16}
              fontWeight='medium'
              numberOfLines={1}
              ellipsizeMode="tail"
            />
          ) : (
            <CustomText
              text={placeholder}
              color={hexWithOpacity(theme.colors.text, 1)}
              size={16}
              fontWeight='medium'
              numberOfLines={1}
              ellipsizeMode="tail"
            />
          )}
        </View>
      </View>
      {errorMessage && (
        <CustomText
          text={errorMessage}
          color={theme.colors.error}
          size={14}
          style={globalStyles.mt5}
        />
      )}
    </>
  );
};

export default memo(CustomMultiSelect);
