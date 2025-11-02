import React, { useEffect, useMemo, useRef } from "react";
import { useTheme } from "src/context/ThemeContext";
import { createStyles } from "./styles";
import { Keyboard, View } from "react-native";
import { useGlobalStyles } from "src/hooks/useGlobalStyles";
import { FastField, Formik } from "formik";
import { ESearchBy, ESearchFilter } from "src/enum/ESearchBy";
import { SEARCH_BY_LIST } from "src/common/constants";
import { CustomSelectList } from "src/components/InputFields/CustomSelectList/CustomSelectList";
import SearchInput from "src/components/common/SearchInput/SearchInput";

const defaultInitialValues = {
  search_by: ESearchBy.INFO,
  filter: ESearchFilter.ALL,
};

interface Props {
  keyword: string;
  setKeyword: (value: string) => void;
  setSearchBy: (value: ESearchBy) => void;
}

export const SearchHeader = ({ keyword, setKeyword, setSearchBy }: Props) => {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const globalStyles = useGlobalStyles();
  const formikRef = useRef<any>(null);

  return (
    <View style={styles.header}>
      <View style={globalStyles.w100}>
        <View>
          <View style={styles.formWrapper}>
            <Formik
              innerRef={formikRef}
              initialValues={defaultInitialValues}
              onSubmit={() => {}}
            >
              {(props) => {
                useEffect(() => {
                  setSearchBy(props.values.search_by);
                }, [props.values.search_by]);

                return (
                  <>
                    <View>
                      <FastField
                        name="search_by"
                        component={CustomSelectList}
                        required
                        placeholder="Search by"
                        data={SEARCH_BY_LIST}
                      />
                    </View>
                    <View style={globalStyles.mt20}>
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
    </View>
  );
};