import React, { useState, useCallback, useMemo, useContext } from 'react';
import { View, Modal, TouchableOpacity, FlatList, TextInputProps, Keyboard } from 'react-native';
import CustomHeader from 'src/components/common/CustomHeader/CustomHeader';
import CustomText from 'src/components/common/CustomText/CustomText';
import { useTheme } from 'src/context/ThemeContext';
import { useGlobalStyles } from 'src/hooks/useGlobalStyles';
import { createStyles } from './styles';
import { useGetCountries } from 'src/hooks/useLookups';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { CountryType } from 'src/types/types/Types';
import Flag from 'react-native-country-flag';
import SearchInput from '../SearchInput/SearchInput';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LanguageContext } from 'src/context/LanguageContext';
import { useTranslation } from 'react-i18next';

interface Props extends TextInputProps {
  required?: boolean;
  title: string;
  country: CountryType | null;
  setCountry: (country: CountryType) => void;
  placeholder?: string;
}

function CountryCode({
  title,
  country,
  setCountry,
}: Props) {
  const { t } = useTranslation();
  const { language } = useContext(LanguageContext);
  const [visible, setVisible] = useState(false);
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const globalStyles = useGlobalStyles();
  const [keyword, setKeyword] = useState<string>('');
  const insets = useSafeAreaInsets();

  const { data: countries, refetch } = useGetCountries({
    onSuccess: (data: any) => {
      if (!country) {
        const selected = data?.find((c: CountryType) => c.phoneCode == 970);
        if (selected) {
          setCountry(selected);
        }
      }
    }
  });


  const filteredCountries = useMemo(() => {
    return countries?.filter((c: any) => c.nameAR.toLowerCase().includes(keyword.toLowerCase()) || c.name.toLowerCase().includes(keyword.toLocaleLowerCase()));
  }, [keyword, countries]);

  const openModal = () => {
    setVisible(true);
    if (!countries.length) {
      refetch();
    }
  };

  const renderCountry = useCallback(
    ({ item, index }: { item: CountryType, index: number }) => (
      <TouchableOpacity
        style={[
          styles.countryCodeButton,
          index == countries.length - 1 ? globalStyles.mb30 : null,
        ]}
        onPress={() => {
          setCountry(item);
          setVisible(false);
        }}
      >
        <View style={[globalStyles.flex1, globalStyles.flexRow]}>

          <View style={[globalStyles.flex1, globalStyles.flexRow, globalStyles.aic, globalStyles.jcc]}>
            <Flag isoCode={item.iso} size={16} />
            <CustomText
              text={language == 'ar' ? item.nameAR : item.name}
              size={18}
              color={theme.colors.text}
              fontWeight="semiBold"
              style={[globalStyles.flex1, globalStyles.ph10]}
            />
          </View>

          <CustomText
            text={`+${item.phoneCode}`}
            size={18}
            color={theme.colors.text}
            fontWeight='semiBold'
          />

        </View>
      </TouchableOpacity>
    ),
    [country, globalStyles, styles, theme.colors.text]
  );

  return (
    <>
      <View>
        <View style={styles.container}>
          {country ? (<TouchableOpacity
            onPress={openModal}
            style={styles.countryCodeButton}>
            <View style={[globalStyles.flag, { marginTop: 2 }]}>
              <Flag isoCode={country.iso} size={16} />
            </View>
            <Ionicons
              name="caret-down-outline"
              size={20}
              color={theme.colors.text}
              style={globalStyles.ph10}
            />
          </TouchableOpacity>) : null}

        </View>
      </View>
      <Modal visible={visible} animationType="slide" transparent>

        <View style={{ height: insets.top, backgroundColor: theme.colors.background }} />

        <View style={globalStyles.flex1}>
          <View style={styles.modal}>
            <CustomHeader title={title} onBackPress={() => setVisible(false)} />
            <View style={styles.content}>
              <View>
                <SearchInput
                  onChangeText={setKeyword}
                  placeholder={t('search')}
                  value={keyword}
                />
              </View>
              <View style={[globalStyles.flex1, globalStyles.mt10]}>
                <FlatList
                  data={filteredCountries}
                  keyExtractor={item => item.id}
                  renderItem={renderCountry}
                  keyboardShouldPersistTaps="handled"
                  showsVerticalScrollIndicator={false}
                  onScrollBeginDrag={() => Keyboard.dismiss()}
                />
              </View>
            </View>
          </View>
        </View>

      </Modal>
    </>
  );
}

export default CountryCode;