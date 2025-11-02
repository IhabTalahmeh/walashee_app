import { ScrollView, TouchableOpacity, View } from 'react-native';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import CustomText from 'src/components/common/CustomText/CustomText';
import { useTheme } from 'src/context/ThemeContext';
import { createStyles } from './styles';
import { useGlobalStyles } from 'src/hooks/useGlobalStyles';
import { CPT, CPTModifier } from 'src/types/types/Types';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

interface Props {
  cpts: any[];
  cptModifier: any;
}

export default function CPTModifierDetails({ cptModifier, cpts = [] }: Props) {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const globalStyles = useGlobalStyles();
  const [totalRVUs, setTotalRVUs] = useState<number>(0);
  const [totalReimbursable, setTotalReimbursable] = useState<number>(0);

  const calculateRVUs = () => {
    let maxRvu = 0;
    let sumOfRestOfRvus = 0;
    let sumRvu = cpts.reduce(function (sum: number, item: any) {
      return (sum = sum + (item.cpt_lookup.rvu_value * item.quantity));
    }, 0);
    setTotalRVUs(sumRvu);
    for (let i = 0; i < cpts.length; i++) {
      if (cpts[i].cpt_lookup.rvu_value > maxRvu) {
        maxRvu = cpts[i].cpt_lookup.rvu_value;
      }
    }
    sumOfRestOfRvus = sumRvu - maxRvu;
    const sumOfTotalReimbursable = maxRvu + (sumOfRestOfRvus * 0.5);
    setTotalReimbursable(sumOfTotalReimbursable);
  }

  useEffect(() => {
    if (cpts?.length > 0) {
      calculateRVUs();
    }
  }, [cpts])

  const totalRVUsAfterCPTModifier = useMemo(() => {
    if (cptModifier) {
      return (totalReimbursable * cptModifier.percentage / 100)
    }
    return 0;
  }, [cptModifier, cpts, totalReimbursable]);

  const renderCPTModifier = (modifier: CPTModifier) => (
    <View style={styles.itemContainer}>
      <View style={[globalStyles.flex1, globalStyles.flexRow]}>
        <View style={[{ width: 40 }, globalStyles.jcc, globalStyles.aic]}>
          <CustomText
            text={modifier.id as string}
            size={18}
            color={theme.colors.text}
            fontWeight="semiBold"
          />
        </View>
        <View style={[globalStyles.flex1, globalStyles.pr10, globalStyles.ml15]}>
          <CustomText
            text={`${modifier.percentage}%`}
            size={18}
            color={theme.colors.text}
            fontWeight="semiBold"
          />
          <CustomText
            text={modifier.description}
            size={18}
            color={theme.colors.text}
            fontWeight="regular"
          />
        </View>
      </View>
    </View>
  );

  return (
    <View>
      <View style={styles.titleContainer}>
        <CustomText
          text="CPT Modifier"
          size={18}
          color={theme.colors.text}
          fontWeight="semiBold"
        />
      </View>
      {cptModifier && <View style={[globalStyles.flexRow, globalStyles.aic, globalStyles.jcb, globalStyles.pt10, globalStyles.pb5]}>
        <View style={[globalStyles.pr20, globalStyles.flex1]}>
          <CustomText text='Total Reimbursable RVUs After CPT Modifier' size={16} color={theme.colors.text} fontWeight='bold' />
        </View>
        <CustomText text={totalRVUsAfterCPTModifier.toFixed(3)} size={16} color={theme.colors.text} fontWeight='medium' />
      </View>}
      <View>
        {cptModifier
          ? renderCPTModifier(cptModifier)
          : null
        }
      </View>


    </View>
  );
}
