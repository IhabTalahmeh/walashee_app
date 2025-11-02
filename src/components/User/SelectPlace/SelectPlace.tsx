import React, { useState, useCallback, useEffect, useMemo, memo } from 'react';
import { View, Modal, TouchableOpacity, FlatList, TextInputProps, SafeAreaView, Keyboard, Text } from 'react-native';
import CustomHeader from 'src/components/common/CustomHeader/CustomHeader';
import CustomText from 'src/components/common/CustomText/CustomText';
import { useTheme } from 'src/context/ThemeContext';
import { useGlobalStyles } from 'src/hooks/useGlobalStyles';
import { createStyles } from './styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SearchInput from 'src/components/common/SearchInput/SearchInput';
import { useSearchPlaces } from 'src/hooks/useGooglePlacesApi';
import EmptyView from 'src/components/common/EmptyView/EmptyView';
import CustomStaticTextInput from 'src/components/common/CustomStaticTextInput/CustomStaticTextInput';
import LoadingScreen from 'src/screens/core/LoadingScreen/LoadingScreen';

interface Props extends TextInputProps {
  required?: boolean;
  title: string;
  selectedPlace: any | null;
  setSelectPlace: (place: any) => void;
  placeholder?: string;
}

function SelectPlace({
  title,
  selectedPlace,
  setSelectPlace,
  placeholder = '',
  ...props
}: Props) {
  const [visible, setVisible] = useState(false);
  const [keyword, setKeyword] = useState<string>('');
  const [places, setPlaces] = useState<any[]>([]);

  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const globalStyles = useGlobalStyles();

  const { data, refetch, isFetching, isLoading } = useSearchPlaces(keyword, {
    enabled: false,
    onSuccess: (data: any) => {
      if (data?.data?.predictions?.length > 0) {
        setPlaces(data.data.predictions);
      } else {
        setPlaces([]);
      }
    }
  });

  const openModal = () => {
    setVisible(true);
    if (!places) {
      refetch();
    }
  };

  const renderPlace = useCallback(
    ({ item }: { item: any }) => (
      <TouchableOpacity
        style={styles.item}
        onPress={() => {
          setSelectPlace({
            address: item.description,
            google_place_id: item.place_id,
            name: item.description,
          });
          setVisible(false);
        }}
      >
        <View style={[globalStyles.flex1, globalStyles.flexRow]}>
          <View style={[{ width: 40 }, globalStyles.jcc, globalStyles.aic]}>
            <Ionicons name='location-outline' size={26} color={theme.colors.text} />
          </View>
          <View style={globalStyles.ml15}>
            <CustomText
              text={`${item.description}`}
              size={18}
              color={theme.colors.text}
              fontWeight="semiBold"
            />
          </View>
        </View>
      </TouchableOpacity>
    ),
    [setSelectPlace, globalStyles, styles, theme.colors.text]
  );

  useEffect(() => {
    if (keyword?.trim() !== '') {
      refetch();
    } else {
      setPlaces([]);
    }
  }, [keyword]);

  return (
    <>
      <View>

        <View style={{}}>
          <CustomStaticTextInput
            required
            placeholder='Institution'
            label='Institution'
            leftIcon={<Ionicons name='location-outline' color={theme.colors.primary} size={22} />}
            onPress={openModal}
            editable={false}
            value={selectedPlace?.name || ''}
          />
        </View>

      </View>
      <Modal visible={visible} animationType="slide" transparent>
        <SafeAreaView style={globalStyles.flex1}>

          <View style={styles.modal}>
            <CustomHeader title={title} onBackPress={() => setVisible(false)} />
            <View style={styles.content}>

              <View style={globalStyles.mv20}>
                <SearchInput
                  onChangeText={setKeyword}
                  placeholder="Search Places"
                  value={keyword}
                />
              </View>

              <View style={globalStyles.flex1}>
                <FlatList
                  data={places as any || []}
                  keyExtractor={item => item.place_id}
                  renderItem={renderPlace}
                  keyboardShouldPersistTaps="handled"
                  showsVerticalScrollIndicator={false}
                  onScrollBeginDrag={() => Keyboard.dismiss()}
                  ListEmptyComponent={() => {
                    if (isLoading || isFetching) {
                      return <LoadingScreen />
                    } else if (keyword.trim() !== '') {
                      return <EmptyView text='No places found' />
                    }
                  }}
                />
              </View>
            </View>
          </View>
        </SafeAreaView>
      </Modal>
    </>
  );
}

export default memo(SelectPlace);