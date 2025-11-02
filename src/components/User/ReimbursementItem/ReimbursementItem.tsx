import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useMemo } from 'react'
import CustomText from 'src/components/common/CustomText/CustomText';
import { useTheme } from 'src/context/ThemeContext';
import { useGlobalStyles } from 'src/hooks/useGlobalStyles';
import { useNavigation } from '@react-navigation/native';
import { createStyles } from './styles';
import { Reimbursement } from 'src/types/types/Types';
import { toTitleCase } from 'src/common/utils';
import { EReimbursementModel } from 'src/enum/EReimbursementModel';
import { showAmount, showRVUMultiplier, showThreshold } from 'src/common/helpers';
import { EThreshold } from 'src/enum/EThreshold';

interface Props {
  item: Reimbursement;
}

const textSize = 17;

export default function ExperienceItem({ item }: Props) {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const globalStyles = useGlobalStyles();
  const navigation: any = useNavigation();

  const navigate = () => {
    navigation.navigate('AddReimbursement');
  }

  const reimbursementModel = useMemo(() => {
    switch (item.reimbursement_model) {
      case EReimbursementModel.SALARY_BASED:
        return 'Salary based';
      case EReimbursementModel.RVUS_BASED:
        return 'RVUs based';
      case EReimbursementModel.MIXED:
        return 'Mixed';
      default:
        return '';
    }
  }, [item]);

  const threshold = useMemo(() => {
    switch (item.threshold) {
      case EThreshold.DOLLARS:
        return 'Dollars';
      case EThreshold.RVUS:
        return 'RVUs';
      default:
        return '';
    }
  }, [item]);

  return (
    <TouchableOpacity style={styles.container} onPress={navigate}>

      <View style={[globalStyles.flexRow, globalStyles.aic]}>
        <CustomText text='Practice State: ' size={textSize} color={theme.colors.text} fontWeight='bold' />
        <CustomText text={toTitleCase(item.practice_state)} size={textSize} color={theme.colors.text} fontWeight='medium' />
      </View>

      <View style={[globalStyles.flexRow, globalStyles.aic]}>
        <CustomText text='Model: ' size={textSize} color={theme.colors.text} fontWeight='bold' />
        <CustomText text={reimbursementModel} size={textSize} color={theme.colors.text} fontWeight='medium' />
      </View>

      {showThreshold(item.reimbursement_model) && <View style={[globalStyles.flexRow, globalStyles.aic]}>
        <CustomText text='Threshold: ' size={textSize} color={theme.colors.text} fontWeight='bold' />
        <CustomText text={threshold} size={textSize} color={theme.colors.text} fontWeight='medium' />
      </View>}

      {showAmount(item.reimbursement_model) && <View style={[globalStyles.flexRow, globalStyles.aic]}>
        <CustomText text='Amount: ' size={textSize} color={theme.colors.text} fontWeight='bold' />
        <CustomText text={Number(item.amount).toFixed(2)} size={textSize} color={theme.colors.text} fontWeight='medium' />
      </View>}

      {showRVUMultiplier(item.reimbursement_model) && <View style={[globalStyles.flexRow, globalStyles.aic]}>
        <CustomText text='RVUs Multiplier: ' size={textSize} color={theme.colors.text} fontWeight='bold' />
        <CustomText text={`$${Number(item.rvus_multiplier).toFixed(2)}`} size={textSize} color={theme.colors.text} fontWeight='medium' />
      </View>}


    </TouchableOpacity>
  )
}