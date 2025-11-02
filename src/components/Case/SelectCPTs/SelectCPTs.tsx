import React, { useEffect, useState, useCallback, memo, useMemo } from 'react';
import { View, Modal, TouchableOpacity, FlatList, TextInputProps, SafeAreaView, Keyboard } from 'react-native';
import SearchInput from 'src/components/common/SearchInput/SearchInput';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CustomHeader from 'src/components/common/CustomHeader/CustomHeader';
import CustomText from 'src/components/common/CustomText/CustomText';
import CustomButton from 'src/components/buttons/CustomButton/CustomButton';
import { useTheme } from 'src/context/ThemeContext';
import { useGlobalStyles } from 'src/hooks/useGlobalStyles';
import { createStyles } from './styles';
import { useSearchCPTs } from 'src/hooks/useLookups';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { CPT } from 'src/types/types/Types';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface Props extends TextInputProps {
  required?: boolean;
  title: string;
  selectedCPTs: CPT[];
  setSelectedCPTs: (cpts: CPT[]) => void;
}

function SelectCPTs({ title, selectedCPTs, setSelectedCPTs, placeholder = '', ...props }: Props) {
  const [visible, setVisible] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [cpts, setCPTs] = useState<CPT[]>([]);
  const [apiSelected, setApiSelected] = useState<CPT[]>([]);
  const [totalRVUs, setTotalRVUs] = useState<number>(0);
  const [totalReimbursable, setTotalReimbursable] = useState<number>(0);
  const insets = useSafeAreaInsets();

  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const globalStyles = useGlobalStyles();

  const { refetch } = useSearchCPTs(keyword, {
    enabled: false,
    onSuccess: (data: CPT[]) => {
      setCPTs(data);
    },
  });

  const openModal = () => {
    setVisible(true);
    setKeyword('');
    setCPTs([]);
    setApiSelected(selectedCPTs.filter(u => !!u.id));
  };

  useEffect(() => {
    if (keyword.trim()) {
      refetch();
    } else {
      setCPTs([]);
    }
  }, [keyword]);

  const calculateRVUs = () => {
    let maxRvu = 0;
    let sumOfRestOfRvus = 0;
    let sumRvu = selectedCPTs.reduce(function (sum: number, item: CPT) {
      return (sum = sum + (item.rvu_value * item.quantity));
    }, 0);
    setTotalRVUs(sumRvu);
    for (let i = 0; i < selectedCPTs.length; i++) {
      if (selectedCPTs[i].rvu_value > maxRvu) {
        maxRvu = selectedCPTs[i].rvu_value;
      }
    }
    sumOfRestOfRvus = sumRvu - maxRvu;
    const sumOfTotalReimbursable = maxRvu + (sumOfRestOfRvus * 0.5);
    setTotalReimbursable(sumOfTotalReimbursable);
  }

  useEffect(() => {
    calculateRVUs();
  }, [selectedCPTs])

  const toggleSelectCPT = (cpt: CPT) => {
    setApiSelected(prev => {
      const exists = prev.find(u => u.id === cpt.id);
      if (exists) {
        return prev.filter(u => u.id !== cpt.id);
      } else {
        return [...prev, { ...cpt, quantity: cpt.quantity ?? 1 }];
      }
    });
  };

  const allSelected = [...apiSelected];

  const updateQuantity = (id: string, quantity: number) => {
    setApiSelected(prev =>
      prev.map(u =>
        u.id === id ? { ...u, quantity: Math.max(1, quantity) } : u
      )
    );
  };

  const updateOuterQuantity = (id: string, quantity: number) => {
    const updated = selectedCPTs.map(u =>
      u.id === id ? { ...u, quantity: Math.max(1, quantity) } : u
    );
    setSelectedCPTs(updated);
  };

  const onSave = () => {
    setSelectedCPTs(allSelected.map(cpt => ({
      ...cpt,
      quantity: cpt.quantity ?? 1,
    })));
    setVisible(false);
  };

  const renderCPT = useCallback(
    ({ item }: { item: CPT }) => {
      const isSelected = apiSelected.some(u => u.id === item.id);
      return (
        <TouchableOpacity
          style={styles.cptItem}
          onPress={() => {
            toggleSelectCPT(item);
          }}
        >
          <View style={{ width: 30, height: 30, justifyContent: 'center', alignItems: 'center' }}>
            <FontAwesome
              name={isSelected ? 'check-square-o' : 'square-o'}
              size={22}
              color={isSelected ? theme.colors.primary : theme.colors.text}
            />
          </View>
          <View style={[globalStyles.flex1, globalStyles.ml20]}>
            <CustomText
              text={item.code}
              size={18}
              color={theme.colors.text}
              fontWeight="semiBold"
            />
            <CustomText
              text={item.value}
              size={18}
              color={theme.colors.text}
              fontWeight="regular"
            />
          </View>
        </TouchableOpacity>
      );
    },
    [apiSelected]
  );

  const renderSelectedCPT = ({ item }: { item: CPT }) => (
    <View style={styles.selectedCPTItem}>
      <View style={globalStyles.flex1}>
        <View style={[globalStyles.flexRow, globalStyles.aic]}>
          <CustomText
            text={item.code}
            size={18}
            color={theme.colors.text}
            fontWeight="semiBold"
          />
          <View style={[globalStyles.flexRow, globalStyles.aic, globalStyles.ml10]}>
            <TouchableOpacity onPress={() => updateQuantity(item.id as string, (item.quantity ?? 1) - 1)} style={styles.quantityButton}>
              <Ionicons name="remove" size={20} color={theme.colors.primary} />
            </TouchableOpacity>
            <CustomText
              text={String(item.quantity ?? 1)}
              size={18}
              color={theme.colors.text}
              style={{ marginHorizontal: 10 }}
              fontWeight='medium'
            />
            <TouchableOpacity onPress={() => updateQuantity(item.id as string, (item.quantity ?? 1) + 1)} style={styles.quantityButton}>
              <Ionicons name="add" size={20} color={theme.colors.primary} />
            </TouchableOpacity>
          </View>
        </View>
        <CustomText
          text={item.value}
          size={18}
          color={theme.colors.text}
          fontWeight="regular"
        />
      </View>
      <TouchableOpacity onPress={() => toggleSelectCPT(item)} style={globalStyles.ph5}>
        <Ionicons
          name={'remove-circle-outline'}
          size={24}
          color={theme.colors.error}
        />
      </TouchableOpacity>
    </View>
  );

  const renderOuterSelectedCPT = ({ item, index }: { item: CPT, index: number }) => (
    <View style={[styles.selectedCPTItem, index == selectedCPTs.length - 1 ? { marginBottom: 0 } : null]}>
      <View style={globalStyles.flex1}>
        <View style={[globalStyles.flexRow, globalStyles.aic]}>
          <CustomText
            text={item.code}
            size={18}
            color={theme.colors.text}
            fontWeight="semiBold"
          />
          <View style={[globalStyles.flexRow, globalStyles.aic, globalStyles.ml10]}>
            <TouchableOpacity onPress={() => updateOuterQuantity(item.id as string, (item.quantity ?? 1) - 1)} style={styles.quantityButton}>
              <Ionicons name="remove" size={20} color={theme.colors.primary} />
            </TouchableOpacity>
            <CustomText
              text={`${item.quantity ?? 1}`}
              size={18}
              color={theme.colors.text}
              fontWeight="medium"
              style={{ marginHorizontal: 10 }}
            />
            <TouchableOpacity onPress={() => updateOuterQuantity(item.id as string, (item.quantity ?? 1) + 1)} style={styles.quantityButton}>
              <Ionicons name="add" size={20} color={theme.colors.primary} />
            </TouchableOpacity>
          </View>
        </View>
        <CustomText
          text={item.value}
          size={18}
          color={theme.colors.text}
          fontWeight="regular"
        />
      </View>
      <TouchableOpacity onPress={() => setSelectedCPTs(selectedCPTs.filter(u => u.id !== item.id))} style={globalStyles.ph5}>
        <Ionicons
          name={'remove-circle-outline'}
          size={24}
          color={theme.colors.error}
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <>
      <View>
        <View style={styles.container}>
          <View style={[globalStyles.flexRow, globalStyles.aic]}>
            <CustomText text='CPT Codes and RVUs' size={16} color={theme.colors.text} fontWeight='medium' />
            <CustomText text='(Optional)' size={16} color={theme.colors.pureBorder} fontWeight='regular' style={globalStyles.ml5} />
          </View>
          <TouchableOpacity onPress={openModal}>
            <Ionicons name='add-circle-outline' color={theme.colors.primary} size={24} />
          </TouchableOpacity>
        </View>
        <View>
          <FlatList
            data={selectedCPTs}
            keyExtractor={item => item.id || item.value}
            renderItem={renderOuterSelectedCPT}
            scrollEnabled={false}
            ListHeaderComponent={() => (
              <>
                {totalRVUs > 0 && <View style={[globalStyles.flexRow, globalStyles.aic, globalStyles.jcb, globalStyles.pt10, globalStyles.pb5]}>
                  <CustomText text='Total RVUs' size={16} color={theme.colors.text} fontWeight='bold' />
                  <CustomText text={totalRVUs.toFixed(3)} size={16} color={theme.colors.text} fontWeight='medium' />
                </View>}
                {(selectedCPTs.length > 1 && totalRVUs > 0) && <View style={[globalStyles.flexRow, globalStyles.aic, globalStyles.jcb, globalStyles.pv5]}>
                  <CustomText text='Total Reimbursable RVUs' size={16} color={theme.colors.text} fontWeight='bold' />
                  <CustomText text={totalReimbursable.toFixed(3)} size={16} color={theme.colors.text} fontWeight='medium' />
                </View>}
              </>
            )}
          />
        </View>
      </View>
      <Modal visible={visible} animationType="slide" transparent>
        <View style={{ height: insets.top, backgroundColor: theme.colors.background }} />

        <View style={globalStyles.flex1}>
          <View style={styles.modal}>
            <CustomHeader title={title} onBackPress={() => setVisible(false)} />
            <View style={styles.content}>
              <SearchInput
                onChangeText={setKeyword}
                placeholder="Search CPTs"
                value={keyword}
              />
              <View style={globalStyles.flex1}>
                <FlatList
                  data={cpts}
                  keyExtractor={item => item.id || item.value}
                  renderItem={renderCPT}
                  keyboardShouldPersistTaps="handled"
                  showsVerticalScrollIndicator={false}
                  onScrollBeginDrag={() => Keyboard.dismiss()}
                  ListFooterComponent={
                    allSelected.length > 0 ? (
                      <View>
                        <CustomText
                          text="Selected CPTs"
                          size={18}
                          color={theme.colors.text}
                          fontWeight="semiBold"
                          style={globalStyles.pv10}
                        />
                        <FlatList
                          data={allSelected}
                          keyExtractor={item => (item.id || item.value) + '-selected'}
                          renderItem={renderSelectedCPT}
                          showsHorizontalScrollIndicator={false}
                          keyboardShouldPersistTaps="handled"
                        />
                      </View>
                    ) : null
                  }
                />
              </View>
              <CustomButton
                text="Add"
                fontSize={18}
                fontWeight="medium"
                onPress={onSave}
              />
            </View>
          </View>
        </View>

        <View style={{ height: insets.bottom, backgroundColor: theme.colors.topBackground }} />

      </Modal>
    </>
  );
}

export default memo(SelectCPTs);