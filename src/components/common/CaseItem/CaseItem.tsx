import { View, Text, TouchableOpacity } from 'react-native'
import React, { memo, useEffect, useMemo, useState } from 'react'
import { useTheme } from 'src/context/ThemeContext';
import { createStyles } from './styles';
import CustomText from '../CustomText/CustomText';
import { dateToString, getAge, hexWithOpacity, sort, toTitleCase } from 'src/common/utils';
import Divider from '../Divider/Divider';
import { useGlobalStyles } from 'src/hooks/useGlobalStyles';
import FastImage from 'react-native-fast-image';
import ImageIcon from 'src/icons/ImageIcon';
import MediaCarousel from '../MediaCarousel/MediaCarousel';
import InsuranceStatus from '../InsuranceStatus/InsuranceStatus';
import { useNavigation } from '@react-navigation/native';
import { EPermission } from 'src/enum/EPermission';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CaseDocIcon from 'src/icons/CaseDocIcon';

interface Props {
  item: any;
  permission: EPermission;
}

function CaseItem({ item, permission }: Props) {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const globalStyles = useGlobalStyles();
  const navigation: any = useNavigation();
  const [visible, setVisible] = useState<boolean>(false);

  const navigateToCaseDetails = () => {
    navigation.navigate('CaseDetails', {
      id: item.id
    });
  }

  const age = useMemo(() => {
    return `${`${getAge(new Date(item.date_of_birth))} |`} ${toTitleCase(item.gender)}`
  }, [item]);

  const maxDate = useMemo(() => {
    if (!item?.case_procedures?.length) return item.date_of_procedure;
    const sortedDates = sort([...item.case_procedures, item]);
    return sortedDates?.[0]?.date ?? null;
  }, [item?.case_procedures]);


  const showInsuranceStatus = useMemo(() => {
    if (!item?.insurance_status || !item.date_of_procedure) return false;

    const today = new Date();
    const itemDate = new Date(item.date_of_procedure);

    today.setHours(0, 0, 0, 0);
    itemDate.setHours(0, 0, 0, 0);

    return itemDate >= today;
  }, [item]);

  const isEditor = useMemo(() => {
    return permission != EPermission.VIEWER;
  }, [permission]);

  return (
    <TouchableOpacity style={styles.container} onPress={navigateToCaseDetails}>
      <View style={[globalStyles.flexRow, globalStyles.jcb, globalStyles.aic, { height: 40 }]}>
        <View style={[globalStyles.flex1]}>
          <CustomText text={dateToString(new Date(maxDate))} size={18} fontWeight='medium' color={theme.colors.text} />
        </View>
      </View>
      <View style={globalStyles.mv10}>
        <Divider />
      </View>

      <View style={[globalStyles.flexRow]}>
        <View style={[
          styles.imageContainer,
        ]}>
          {item?.media?.length ? (
            <MediaCarousel
              media={item.media}
              visible={visible}
              setVisible={setVisible}
              component={
                <TouchableOpacity onPress={() => setVisible(true)}>
                  <FastImage source={item?.media[0]?.urls?.href_small ? { uri: item?.media[0]?.urls?.href_small } : require('assets/images/doctor-placeholder.png')} resizeMode='cover' style={globalStyles.full} />
                </TouchableOpacity>
              }
            />) : <View style={[globalStyles.flexRow, globalStyles.aic, globalStyles.jcc, globalStyles.flex1]}>
            <CaseDocIcon size={70} color={hexWithOpacity(theme.colors.text, 0.3)} />
          </View>}

        </View>
        <View style={[globalStyles.ph10, globalStyles.flex1, globalStyles.mt5]}>
          <CustomText text={`${item.patient_last_name}, ${item.patient_first_name}`} size={18} fontWeight='medium' color={theme.colors.text} />
          <CustomText text={age} size={14} fontWeight='regular' color={theme.colors.gray} style={globalStyles.mt5} />
          <CustomText text={item?.hospital?.name} size={14} fontWeight='semiBold' color={theme.colors.text} numberOfLines={1} ellipsizeMode='tail' style={globalStyles.mt5} />
          <CustomText text={item?.type} size={14} fontWeight='regular' color={theme.colors.text} style={globalStyles.mt5} />
        </View>
      </View>
      {(showInsuranceStatus && isEditor) && <InsuranceStatus item={item} />}
    </TouchableOpacity>
  )
}

export default memo(CaseItem);