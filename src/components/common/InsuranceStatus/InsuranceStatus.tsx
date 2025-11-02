import { View, Text, TouchableOpacity } from 'react-native'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import CustomText from '../CustomText/CustomText'
import { useTheme } from 'src/context/ThemeContext'
import { createStyles } from './styles';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useGlobalStyles } from 'src/hooks/useGlobalStyles';
import { hexWithOpacity } from 'src/common/utils';
import { useUpdateProcedure } from 'src/hooks/useProcedure';
import { useAuth } from 'src/context/AuthContext';
import * as appService from 'src/services/appService';

interface Props {
  item: any;
}

export default function InsuranceStatus({ item }: Props) {
  const { user } = useAuth();
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const globalStyles = useGlobalStyles();
  const [show, setShow] = useState<boolean>(false);

  const data = useMemo(() => [
    { id: '1', title: 'Approved', color: theme.colors.success },
    { id: '2', title: 'Denied', color: theme.colors.error },
    { id: '3', title: 'Pending', color: theme.colors.warning },
    { id: '4', title: 'Appeal', color: theme.colors.primary },
  ], [theme.colors]);

  const [selectedItem, setSelectedItem] = useState<any>(
    data.find(current => current.title.toLowerCase() === item?.insurance_status?.toLowerCase())
  );

  const closedContainer = useMemo(() => !show ? { backgroundColor: hexWithOpacity(selectedItem?.color, 0.15) } : { backgroundColor: theme.colors.background }, [show]);
  const closedCircle = useMemo(() => !show ? { backgroundColor: theme.colors.background } : { backgroundColor: theme.colors.inputBackground, transform: [{ scaleY: -1 }] }, [show]);

  const handleSelect = (index: number) => {
    setSelectedItem(data[index]);
    setShow(false);
    mutation.mutate({
      userId: user.id,
      procedureId: item.id,
      data: {
        insurance_status: data[index].title.toUpperCase(),
        case_procedures: item.case_procedures
      }
    });
  }

  const isSelected = useCallback((index: number) => {
    return data[index].id === selectedItem.id;
  }, [selectedItem, data]);

  const mutation = useUpdateProcedure((data: any) => {
    appService.showToast('Insurance status updated successfully', 'success');
  }, (error: any) => console.error('Error:', error));

  return (
    <>
      {selectedItem ? (<TouchableOpacity style={[styles.container, closedContainer]} onPress={() => setShow(!show)}>
        <View>
          <View style={[globalStyles.flexRow, globalStyles.aic, globalStyles.jcb]}>
            <CustomText text={show ? 'Insurance Status' : selectedItem?.title} size={show ? 18 : 14} fontWeight='medium' color={show ? theme.colors.text : selectedItem.color} style={styles.statusText} />
            <View style={[styles.circle, closedCircle]}>
              <Entypo name='chevron-down' color={theme.colors.text} size={14} />
            </View>
          </View>
          {show && <View style={globalStyles.mt10}>
            {data.map((item, index) => {
              return (
                <TouchableOpacity style={[styles.itemButton, globalStyles.flexRow, globalStyles.aic, isSelected(index) ? { backgroundColor: hexWithOpacity(item.color, 0.15) } : {}]} key={item.id} onPress={() => handleSelect(index)}>
                  <Ionicons name={!isSelected(index) ? 'radio-button-off' : 'checkmark-circle'} size={16} color={!isSelected(index) ? theme.colors.border : item.color} />
                  <CustomText text={item.title} size={14} fontWeight='medium' color={item.color} style={styles.statusText} />
                </TouchableOpacity>
              )
            })}
          </View>}
        </View>
      </TouchableOpacity >) : null}
    </>
  )
}