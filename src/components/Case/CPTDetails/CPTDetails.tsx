import { View } from 'react-native';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import CustomText from 'src/components/common/CustomText/CustomText';
import { useTheme } from 'src/context/ThemeContext';
import { createStyles } from './styles';
import { useGlobalStyles } from 'src/hooks/useGlobalStyles';

interface Props {
  cpts: any[];
}

export default function CPTDetails({ cpts = [] }: Props) {
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

  const renderCPT = useCallback(
    ({ item }: { item: any }) => {
      return (
        <View style={styles.cptItem}>
          <View style={[globalStyles.flex1]}>
            <CustomText
              text={`${item.cpt_lookup.code} (x${item.quantity})`}
              size={18}
              color={theme.colors.text}
              fontWeight="semiBold"
            />
            <CustomText
              text={item.cpt_lookup.value}
              size={18}
              color={theme.colors.text}
              fontWeight="regular"
            />
          </View>
        </View>
      );
    },
    [cpts]
  );

  return (
    <View>
      <View style={styles.titleContainer}>
        <CustomText
          text="CPT Codes and RVUs"
          size={18}
          color={theme.colors.text}
          fontWeight="semiBold"
        />
      </View>
      <View>
        {totalRVUs > 0 && <View style={[globalStyles.flexRow, globalStyles.aic, globalStyles.jcb, globalStyles.pt10, globalStyles.pb5]}>
          <CustomText text='Total RVUs' size={16} color={theme.colors.text} fontWeight='bold' />
          <CustomText text={totalRVUs.toFixed(3)} size={16} color={theme.colors.text} fontWeight='medium' />
        </View>}
        {(cpts.length > 1 && totalRVUs > 0)&& <View style={[globalStyles.flexRow, globalStyles.aic, globalStyles.jcb, globalStyles.pv5]}>
          <CustomText text='Total Reimbursable RVUs' size={16} color={theme.colors.text} fontWeight='bold' />
          <CustomText text={totalReimbursable.toFixed(3)} size={16} color={theme.colors.text} fontWeight='medium' />
        </View>}
      </View>
      {cpts.map((item) => (
        <React.Fragment key={item.id}>
          {renderCPT({ item })}
        </React.Fragment>
      ))}


    </View>
  );
}
