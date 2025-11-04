import { TouchableOpacity, View } from 'react-native';
import React, { useEffect, useMemo, useState } from 'react';
import { useTheme } from 'src/context/ThemeContext';
import CustomFormTextInput from '../CustomFormTextInput/CustomFormTextInput';
import DatePicker from 'react-native-date-picker';
import { dateToString } from 'src/common/utils';
import { Pressable } from 'react-native-gesture-handler';

interface FormikDatePickerProps {
  field: { name: string; value?: Date };
  form: { setFieldValue: (name: string, value: any) => void; setFieldTouched: (name: string, touched?: boolean) => void; touched?: any; errors?: any; };
  label?: string;
  required?: boolean;
  placeholder?: string;
  height?: number;
  withBorder?: boolean;
  leftIcon?: React.ReactNode,
  leftIconWidth?: number;
}

export default function CustomDatePicker({
  field,
  form,
  label,
  required,
  placeholder,
  height = 55,
  withBorder = false,
  leftIcon,
  leftIconWidth = 40,
}: FormikDatePickerProps) {
  const [show, setShow] = useState(false);
  const { theme } = useTheme();

  // Optional: Show error if field has been touched and has error
  const error =
    form.touched?.[field.name] && form.errors?.[field.name]
      ? form.errors[field.name]
      : undefined;

  const [today, setToday] = useState<string>(dateToString(new Date()));

  const isNewDate = useMemo(() => {
    return dateToString(field.value as Date) != today;
  }, [field.value]);

  return (
    <>
      <View onTouchEnd={() => {
        setShow(true);
      }}>
        <CustomFormTextInput
          field={field}
          form={form}
          label={label}
          required={required}
          defaultValue={!isNewDate && field.name == 'date_of_birth' ? 'DD / MM / YYYY' : dateToString(field.value as Date)}
          editable={false}
          placeholder={placeholder}
          height={height}
          withBorder={withBorder}
          leftIcon={leftIcon}
          leftIconWidth={leftIconWidth}
        />
      </View>

      <DatePicker
        modal
        mode="date"
        theme={theme.mode === "light" ? "light" : "dark"}
        open={show}
        date={field.value ?? new Date()}
        title={label}
        locale={'en-US'}
        minimumDate={new Date(1900, 0, 1)}
        confirmText={'Confirm'}
        cancelText={'Cancel'}
        onConfirm={(selectedDate) => {
          setShow(false);
          form.setFieldValue(field.name, selectedDate);
          form.setFieldTouched(field.name, true);
        }}
        onCancel={() => setShow(false)}
      />
    </>
  );
}
