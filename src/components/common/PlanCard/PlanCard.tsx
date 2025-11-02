import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useMemo } from 'react'
import { useTheme } from 'src/context/ThemeContext';
import { createStyles } from './styles';
import { useGlobalStyles } from 'src/hooks/useGlobalStyles';
import CustomText from '../CustomText/CustomText';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { MostPopularBadge } from '../MostPopularBadge/MostPopularBadge';

interface Props {
  item: any;
  isSelected?: boolean;
  onPress: (item: any) => void;
  currency: string;
  newPrice: number;
}



export default function PlanCard({ item, onPress, isSelected, currency, newPrice }: Props) {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const globalStyles = useGlobalStyles();

  const isMostPopular = useMemo(() => {
    return item.plan.name == 'Busy';
  }, [])

  return (
    <>
      {isMostPopular && <MostPopularBadge />}
      <TouchableOpacity style={[
        styles.container,
        isSelected ? { borderColor: theme.colors.primary } : null,

      ]} onPress={onPress}>

        <View style={[globalStyles.flexRow, globalStyles.aic, globalStyles.jcb]}>
          <CustomText text={item.plan.name} color={theme.colors.text} size={24} fontWeight='bold' />
          <Ionicons name={isSelected ? 'checkmark-circle' : 'radio-button-off-outline'} color={isSelected ? theme.colors.primary : theme.colors.text} size={24} />
        </View>

        <View style={[globalStyles.flexRow, globalStyles.aic]}>

          {/* Left */}
          <View style={globalStyles.flex1}>
            {/* Features */}
            <View style={globalStyles.mt10}>
              <View style={[globalStyles.flexRow, globalStyles.aic]}>
                <Ionicons name='checkmark-done' color={theme.colors.primary} size={16} style={{ width: 20 }} />
                <CustomText text={item.features.cases_per_month_limit > 1000 ? 'Unlimited cases per month' : `Up to ${item.features.cases_per_month_limit} cases per month`} size={12} color={theme.colors.text} />
              </View>

              <View style={[globalStyles.flexRow, globalStyles.aic]}>
                <Ionicons name='checkmark-done' color={theme.colors.primary} size={16} style={{ width: 20 }} />
                <CustomText text={`${item.features.upload_image ? 'Unlimited' : 'No'} patients images`} size={12} color={theme.colors.text} />
              </View>

              <View style={[globalStyles.flexRow, globalStyles.aic]}>
                <Ionicons name='checkmark-done' color={theme.colors.primary} size={16} style={{ width: 20 }} />
                <CustomText text={
                  item.features.registries_limit > 1000 ? 'Unlimited registries'
                    : item.features.registries_limit == 0 ? 'No registries'
                      : item.features.registries_limit == 1 ? 'Up to 1 registry'
                        : `Up to ${item.features.registries_limit} registries`
                } size={12} color={theme.colors.text} />
              </View>

              <View style={[globalStyles.flexRow, globalStyles.aic]}>
                <Ionicons name='checkmark-done' color={theme.colors.primary} size={16} style={{ width: 20 }} />
                <CustomText text={item.features.automated_analysis} size={12} color={theme.colors.text} />
              </View>

            </View>
          </View>

          {/* Right */}
          <View style={styles.rightContainer}>
            <CustomText text={newPrice == 0 ? `${currency}${newPrice.toFixed(2)}` : item?.pkg ? `${item?.pkg?.product.priceString[0]} ${(item?.pkg?.product.price * 1.5).toFixed(2)}` : `${currency}0.00`} color={theme.colors.text} size={16} style={[globalStyles.ase, globalStyles.lineThrough]} fontWeight='regular' />
            <CustomText text={newPrice == 0 ? `${currency}${newPrice.toFixed(2)}` : item?.pkg?.product?.priceString ?? `${currency}0.00`} color={theme.colors.primary} size={24} style={[globalStyles.ase, globalStyles.mv5]} fontWeight='bold' />
            <CustomText text={`/${item.period}`} color={theme.colors.text} size={16} style={globalStyles.ase} fontWeight='regular' />
          </View>
        </View>
      </TouchableOpacity>
    </>
  )
}