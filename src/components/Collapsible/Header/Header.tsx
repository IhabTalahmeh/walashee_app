import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Animated, View } from 'react-native';
import { FastField, Formik } from 'formik';
import { ESearchBy, ESearchFilter } from 'src/enum/ESearchBy';
import { SEARCH_BY_LIST } from 'src/common/constants';
import SearchInput from 'src/components/common/SearchInput/SearchInput';
import { CustomSelectList } from 'src/components/InputFields/CustomSelectList/CustomSelectList';
import { useTheme } from 'src/context/ThemeContext';
import { useGlobalStyles } from 'src/hooks/useGlobalStyles';
import { createStyles } from './styles';
import { searchHeaderHeight } from 'src/styles/globalStyles';

const defaultInitialValues = {
  search_by: ESearchBy.INFO,
  filter: ESearchFilter.ALL,
};

interface Props {
  keyword: string;
  setKeyword: (value: string) => void;
  setSearchBy: (value: ESearchBy) => void;
  scrollY: any;
}

const Header = ({ scrollY, keyword, setKeyword, setSearchBy }: Props) => {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const globalStyles = useGlobalStyles();
  const formikRef = useRef<any>(null);

  const translateY =
    searchHeaderHeight > 0
      ? scrollY.interpolate({
        inputRange: [0, searchHeaderHeight],
        outputRange: [0, -searchHeaderHeight],
        extrapolate: 'clamp',
      })
      : new Animated.Value(0);

  return (
    <Animated.View style={[styles.header, { transform: [{ translateY }] }]}>
      <View style={globalStyles.w100}>
        <View>
          <View style={styles.formWrapper}>
            <Formik
              innerRef={formikRef}
              initialValues={defaultInitialValues}
              onSubmit={() => { }}
            >
              {(props) => {
                useEffect(() => {
                  setSearchBy(props.values.search_by);
                }, [props.values.search_by]);

                return (
                  <>
                    <View style={globalStyles.mb20}>
                      <FastField
                        name="search_by"
                        component={CustomSelectList}
                        required
                        placeholder="Search by"
                        data={SEARCH_BY_LIST}
                      />
                    </View>
                    <View style={globalStyles.mb20}>
                      <SearchInput
                        onChangeText={setKeyword}
                        placeholder="Search"
                        value={keyword}
                      />
                    </View>
                  </>
                );
              }}
            </Formik>
          </View>
        </View>
      </View>
    </Animated.View>
  );
};

export default Header;
