import React, { useState, useCallback, useEffect, useMemo, memo } from 'react';
import { View, Modal, TouchableOpacity, FlatList, TextInputProps, SafeAreaView } from 'react-native';
import CustomHeader from 'src/components/common/CustomHeader/CustomHeader';
import CustomText from 'src/components/common/CustomText/CustomText';
import { useTheme } from 'src/context/ThemeContext';
import { useGlobalStyles } from 'src/hooks/useGlobalStyles';
import { createStyles } from './styles';
import { useGetCPTModifiers } from 'src/hooks/useLookups';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { CPT, CPTModifier } from 'src/types/types/Types';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface Props extends TextInputProps {
  required?: boolean;
  title: string;
  selectedModifier: CPTModifier | null;
  setCPTModifier: (cptModifier: CPTModifier | string) => void;
  placeholder?: string;
  cpts: CPT[];
}

function SelectCPTModifier({
  title,
  selectedModifier,
  setCPTModifier,
  placeholder = '',
  cpts,
  ...props
}: Props) {
  const [visible, setVisible] = useState(false);
  const [modifiers, setModifiers] = useState<CPTModifier[]>([]);
  const [totalRVUs, setTotalRVUs] = useState<number>(0);
  const [totalReimbursable, setTotalReimbursable] = useState<number>(0);
  const insets = useSafeAreaInsets();

  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const globalStyles = useGlobalStyles();

  const { refetch } = useGetCPTModifiers({
    enabled: true,
    onSuccess: (data: CPTModifier[]) => setModifiers(data),
  });

  const openModal = () => {
    setVisible(true);
    if (!modifiers.length) {
      refetch();
    }
  };

  const calculateRVUs = () => {
    let maxRvu = 0;
    let sumOfRestOfRvus = 0;
    let sumRvu = cpts.reduce(function (sum: number, item: CPT) {
      return (sum = sum + (item.rvu_value * item.quantity));
    }, 0);
    setTotalRVUs(sumRvu);
    for (let i = 0; i < cpts.length; i++) {
      if (cpts[i].rvu_value > maxRvu) {
        maxRvu = cpts[i].rvu_value;
      }
    }
    sumOfRestOfRvus = sumRvu - maxRvu;
    const sumOfTotalReimbursable = maxRvu + (sumOfRestOfRvus * 0.5);
    setTotalReimbursable(sumOfTotalReimbursable);
  }

  useEffect(() => {
    calculateRVUs();
  }, [cpts, selectedModifier]);

  const totalRVUsAfterCPTModifier = useMemo(() => {
    if (selectedModifier) {
      return (totalReimbursable * selectedModifier.percentage / 100)
    }
    return 0;
  }, [selectedModifier, cpts, totalReimbursable]);

  const renderCPTModifier = useCallback(
    ({ item, index }: { item: CPTModifier, index: number }) => (
      <TouchableOpacity
        style={[
          styles.modifierItem,
          index == modifiers.length - 1 ? globalStyles.mb30 : null,
        ]}
        onPress={() => {
          setCPTModifier(item);
          setVisible(false);
        }}
      >
        <View style={[
          globalStyles.flex1,
          globalStyles.flexRow,
        ]}>
          <View style={[{ width: 40 }, globalStyles.jcc, globalStyles.aic]}>
            <CustomText
              text={item.id as string}
              size={18}
              color={theme.colors.text}
              fontWeight="semiBold"
            />
          </View>


          <View style={[globalStyles.flex1]}>
            <View style={globalStyles.ml15}>
              <CustomText
                text={`${item.percentage}%`}
                size={18}
                color={theme.colors.text}
                fontWeight="semiBold"
              />
              <CustomText
                text={item.description}
                size={18}
                color={theme.colors.text}
                fontWeight="regular"
              />
            </View>

          </View>
        </View>
      </TouchableOpacity>
    ),
    [setCPTModifier, globalStyles, styles, theme.colors.text]
  );

  const renderOuterSelectedModifier = (modifier: CPTModifier) => (
    <View style={styles.selectedItem}>
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
      <TouchableOpacity onPress={() => {
        setCPTModifier("");
      }}
        style={globalStyles.ph5}>
        <Ionicons name="remove-circle-outline" size={24} color={theme.colors.error} />
      </TouchableOpacity>
    </View>
  );

  return (
    <>
      <View>
        <View style={styles.container}>
          <View style={[globalStyles.flexRow, globalStyles.aic]}>
            <CustomText
              text={title}
              size={16}
              color={theme.colors.text}
              fontWeight="medium"
            />
            <CustomText
              text="(Optional)"
              size={16}
              color={theme.colors.pureBorder}
              fontWeight="regular"
              style={globalStyles.ml5}
            />
          </View>
          <TouchableOpacity onPress={openModal}>
            <Ionicons name="add-circle-outline" color={theme.colors.primary} size={24} />
          </TouchableOpacity>
        </View>
        {(selectedModifier && totalRVUsAfterCPTModifier > 0) && <View style={[globalStyles.flexRow, globalStyles.aic, globalStyles.jcb, globalStyles.pt10, globalStyles.pb5]}>
          <View style={[globalStyles.pr20, globalStyles.flex1]}>
            <CustomText text='Total Reimbursable RVUs After CPT Modifier' size={16} color={theme.colors.text} fontWeight='bold' />
          </View>
          <CustomText text={totalRVUsAfterCPTModifier.toFixed(3)} size={16} color={theme.colors.text} fontWeight='medium' />
        </View>}
        <View>
          {selectedModifier
            ? renderOuterSelectedModifier(selectedModifier)
            : null
          }
        </View>
      </View>
      <Modal visible={visible} animationType="slide" transparent>

        <View style={{ height: insets.top, backgroundColor: theme.colors.background }} />

        <View style={globalStyles.flex1}>
          <View style={styles.modal}>
            <CustomHeader title={title} onBackPress={() => setVisible(false)} />
            <View style={styles.content}>
              <View style={globalStyles.flex1}>
                <FlatList
                  data={modifiers}
                  keyExtractor={item => item.id}
                  renderItem={renderCPTModifier}
                  keyboardShouldPersistTaps="handled"
                  showsVerticalScrollIndicator={false}
                />
              </View>
            </View>
          </View>
        </View>


      </Modal>
    </>
  );
}

export default memo(SelectCPTModifier);