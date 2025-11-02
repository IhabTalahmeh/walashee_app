import { View, Text, TouchableOpacity } from 'react-native'
import React, { useMemo } from 'react'
import { FastField, FieldArray } from 'formik'
import CustomText from 'src/components/common/CustomText/CustomText'
import { useGlobalStyles } from 'src/hooks/useGlobalStyles'
import CustomFormTextArea from 'src/components/common/CustomTextArea/CustomFormTextArea'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useTheme } from 'src/context/ThemeContext'
import { createStyles } from './styles'

export default function CaseNotes() {
  const globalStyles = useGlobalStyles();
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <FieldArray name="notes">
      {({ push, remove, form }) => (
        <View>
          <View style={styles.container}>
            <View style={[globalStyles.flexRow, globalStyles.aic]}>
              <CustomText text='Notes' size={16} color={theme.colors.text} fontWeight='medium' />
              <CustomText text='(Optional)' size={16} color={theme.colors.pureBorder} fontWeight='regular' style={globalStyles.ml5} />
            </View>
            <TouchableOpacity onPress={() => push('')}>
              <Ionicons name='add-circle-outline' color={theme.colors.primary} size={24} />
            </TouchableOpacity>
          </View>
          {form.values.notes.map((note: string, index: number) => (
            <View key={index} style={[globalStyles.flexRow, globalStyles.aic, globalStyles.mt10]}>
              <View style={globalStyles.flex1}>
                <FastField
                  name={`notes[${index}]`}
                  component={CustomFormTextArea}
                  placeholder={`Note ${index + 1}`}
                  required={false}
                />
              </View>
              <TouchableOpacity
                onPress={() => remove(index)}
                style={[globalStyles.m10]}
              >
                <Ionicons name="remove-circle-outline" size={24} color={theme.colors.error} />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}
    </FieldArray>
  )
}