import { View } from 'react-native';
import React, { useContext, useMemo, useState } from 'react';
import { useTheme } from 'src/context/ThemeContext';
import CustomFormTextInput from '../CustomFormTextInput/CustomFormTextInput';
import DatePicker from 'react-native-date-picker';
import { dateToString, toRegularDateFormat } from 'src/common/utils';
import { LanguageContext } from 'src/context/LanguageContext';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
  const { language } = useContext(LanguageContext);
  const [show, setShow] = useState(false);
  const { theme } = useTheme();

  // Optional: Show error if field has been touched and has error
  const error =
    form.touched?.[field.name] && form.errors?.[field.name]
      ? form.errors[field.name]
      : undefined;

  const [today, setToday] = useState<string>(dateToString(new Date()));

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
          defaultValue={toRegularDateFormat(field.value as Date, language)}
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
        locale={language == 'ar' ? 'ar' : 'en-US'}
        minimumDate={new Date(1900, 0, 1)}
        confirmText={t('confirm')}
        cancelText={t('cancel')}
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
