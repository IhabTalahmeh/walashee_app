import { View, Text, TouchableOpacity } from 'react-native'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import CustomText from 'src/components/common/CustomText/CustomText'
import { useTheme } from 'src/context/ThemeContext'
import { useGlobalStyles } from 'src/hooks/useGlobalStyles';
import { CPT } from 'src/types/types/Types';
import { createStyles } from './styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useGetCPTSuggestions } from 'src/hooks/useLookups';
import { hexWithOpacity } from 'src/common/utils';

interface Props {
  procedureName: string;
  selectedCPTs: CPT[];
  setSelectedCPTs: (cpts: CPT[]) => void;
}

function SuggestedCPTs({ procedureName, setSelectedCPTs, selectedCPTs }: Props) {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const globalStyles = useGlobalStyles();
  const [show, setShow] = useState<boolean>(false);
  const [suggestions, setSuggestions] = useState<CPT[]>([]);
  const [originalSuggestions, setOriginalSuggestions] = useState<CPT[]>([]);

  const suggestionsLength = useMemo(() => {
    return suggestions.length;
  }, [suggestions]);

  const { data, refetch } = useGetCPTSuggestions(procedureName, {
    enabled: false,
    onSuccess: (data: any) => {
      setOriginalSuggestions(data);
    },
    onError: (error: any) => console.log('error', error),
  })

  const toggleShow = useCallback(() => {
    setShow(prev => !prev);
  }, [show]);

  useEffect(() => {
    refetch();
  }, [procedureName]);

  const handleSelect = (item: CPT) => {
    if (!selectedCPTs.some(cpt => cpt.id == item.id)) {
      setSelectedCPTs([...selectedCPTs, { ...item, quantity: 1 }]);
      filterSuggestions();
    }
  }

  const filterSuggestions = () => {
    setSuggestions(originalSuggestions.filter((cpt: any) => !selectedCPTs.some(cptItem => cptItem.id == cpt.id)));
  }

  useEffect(() => {
    filterSuggestions();
  }, [selectedCPTs, originalSuggestions]);

  const renderOuterCPT = ({ item }: { item: CPT }) => (
    <View style={[styles.selectedCPTItem]}>
      <View style={globalStyles.flex1}>
        <View style={[globalStyles.flexRow, globalStyles.aic]}>
          <CustomText
            text={item.code}
            size={18}
            color={hexWithOpacity(theme.colors.text, 0.7)}
            fontWeight="semiBoldItalic"
          />
        </View>
        <CustomText
          text={item.value}
          size={18}
          color={hexWithOpacity(theme.colors.text, 0.8)}
          fontWeight="italic"
        />
      </View>
      <TouchableOpacity onPress={() => handleSelect(item)} style={globalStyles.ph5}>
        <Ionicons
          name={'add-circle'}
          size={24}
          color={theme.colors.success}
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <>
      {suggestions?.length > 0 && <View>

        {show && <View>
          {suggestions.map((item, index) => {
            return (
              <View key={item.id} style={[index == suggestions.length - 1 ? globalStyles.mb5 : null]}>
                {renderOuterCPT({ item })}
              </View>
            )
          })}
        </View>}



        <View>
          <TouchableOpacity onPressIn={toggleShow} style={!show ? globalStyles.mt5 : null}>
            <CustomText
              text={`${show ? 'Hide' : 'Show'} Suggestions (${suggestionsLength})`}
              color={theme.colors.primary}
              size={18}
              style={globalStyles.centerText}
              fontWeight='regular' />
          </TouchableOpacity>
        </View>
      </View>}
    </>
  )
}

export default memo(SuggestedCPTs);