import React, { useEffect, useState, useCallback, memo, useMemo } from 'react';
import { View, Modal, TouchableOpacity, FlatList, Keyboard, TextInputProps, Text, SafeAreaView } from 'react-native';
import CustomFormTextInput from 'src/components/common/CustomFormTextInput/CustomFormTextInput';
import SearchInput from 'src/components/common/SearchInput/SearchInput';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CustomHeader from 'src/components/common/CustomHeader/CustomHeader';
import CustomText from 'src/components/common/CustomText/CustomText';
import CustomButton from 'src/components/buttons/CustomButton/CustomButton';
import { useTheme } from 'src/context/ThemeContext';
import { useGlobalStyles } from 'src/hooks/useGlobalStyles';
import { createStyles } from './styles';
import { useSearchICDs } from 'src/hooks/useLookups';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ICD } from 'src/types/types/Types';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface Props extends TextInputProps {
  required?: boolean;
  title: string;
  selectedICDs: ICD[];
  setSelectedICDs: (icds: ICD[]) => void;
}

function SelectICDs({ title, selectedICDs, setSelectedICDs, placeholder = '', ...props }: Props) {
  const [visible, setVisible] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [icds, setICDs] = useState<ICD[]>([]);
  const [apiSelected, setApiSelected] = useState<ICD[]>([]);
  const insets = useSafeAreaInsets();

  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const globalStyles = useGlobalStyles();

  const { refetch } = useSearchICDs(keyword, {
    enabled: false,
    onSuccess: (data: ICD[]) => {
      setICDs(data)
    },
  });

  const openModal = () => {
    setVisible(true);
    setKeyword('');
    setICDs([]);
    setApiSelected(selectedICDs.filter(u => !!u.id));
  };

  useEffect(() => {
    if (keyword.trim()) {
      refetch();
    } else {
      setICDs([]);
    }
  }, [keyword]);

  const toggleSelectICD = (icd: ICD) => {
    setApiSelected(prev =>
      prev.some(u => u.id === icd.id)
        ? prev.filter(u => u.id !== icd.id)
        : [...prev, icd]
    );
  };


  const allSelected = [...apiSelected];

  const onSave = () => {
    setSelectedICDs(allSelected);
    setVisible(false);
  };

  const renderICD = useCallback(
    ({ item }: { item: ICD }) => {
      const isSelected = apiSelected.some(u => u.id === item.id);
      return (
        <TouchableOpacity
          style={styles.icdItem}
          onPress={() => {
            toggleSelectICD(item);
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

  const renderSelectedICD = ({ item }: { item: ICD }) => (
    <View
      style={styles.selectedICDItem}
    >
      <View style={globalStyles.flex1}>
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
      <TouchableOpacity onPress={() => toggleSelectICD(item)} style={globalStyles.ph5}>
        <Ionicons
          name={'remove-circle-outline'}
          size={24}
          color={theme.colors.error}
        />
      </TouchableOpacity>
    </View>
  );

  const renderOuterSelectedICD = ({ item }: { item: ICD }) => (
    <View
      style={styles.selectedICDItem}
    >
      <View style={globalStyles.flex1}>
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
      <TouchableOpacity onPress={() => setSelectedICDs(selectedICDs.filter(u => u.id !== item.id))} style={globalStyles.ph5}>
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
            <CustomText text='ICD-9/10' size={16} color={theme.colors.text} fontWeight='medium' />
            <CustomText text='(Optional)' size={16} color={theme.colors.pureBorder} fontWeight='regular' style={globalStyles.ml5} />
          </View>
          <TouchableOpacity onPress={openModal}>
            <Ionicons name='add-circle-outline' color={theme.colors.primary} size={24} />
          </TouchableOpacity>
        </View>
        <View>
          <FlatList
            data={selectedICDs}
            keyExtractor={item => item.id || item.value}
            renderItem={renderOuterSelectedICD}
            scrollEnabled={false} />
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
                placeholder="Search ICDs"
                value={keyword}
              />
              <View style={globalStyles.flex1}>
                <FlatList
                  data={icds}
                  keyExtractor={item => item.id || item.value}
                  renderItem={renderICD}
                  keyboardShouldPersistTaps="handled"
                  showsVerticalScrollIndicator={false}
                  onScrollBeginDrag={() => Keyboard.dismiss()}
                  ListFooterComponent={
                    allSelected.length > 0 ? (
                      <View style={globalStyles.mt10}>
                        <CustomText
                          text="Selected ICDs"
                          size={18}
                          color={theme.colors.text}
                          fontWeight="semiBold"
                        />
                        <FlatList
                          data={allSelected}
                          keyExtractor={item => (item.id || item.value) + '-selected'}
                          renderItem={renderSelectedICD}
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

export default memo(SelectICDs);