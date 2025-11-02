import React, { useMemo } from 'react';
import {
  View,
  Dimensions,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  interpolateColor,
} from 'react-native-reanimated';
import { Tabs, MaterialTabBar } from 'react-native-collapsible-tab-view';
import { useTheme } from 'src/context/ThemeContext';
import { createStyles } from './styles';
import { SearchHeader } from 'src/components/Case/SearchHeader/SearchHeader';
import CasesList from 'src/components/Case/CasesList/CasesList';
import { ESearchBy, ESearchFilter } from 'src/enum/ESearchBy';
import { fonts } from 'src/styles/theme';

const screenWidth = Dimensions.get('window').width;
const horizontalMargin = 20;
const tabBarWidth = screenWidth - horizontalMargin * 2;
const tabBarItemWidth = tabBarWidth / 4;

interface Props {
  keyword: string;
  setKeyword: (value: string) => void;
  searchBy: ESearchBy;
  setSearchBy: (values: ESearchBy) => void;
}

const Example: React.FC<Props> = ({ keyword, setKeyword, searchBy, setSearchBy }) => {
  const { theme } = useTheme();

  const SearchHeader2 = () => (
    <View pointerEvents='box-none' style={{ backgroundColor: theme.colors.topBackground }}>
      <SearchHeader
        keyword={keyword}
        setKeyword={setKeyword}
        setSearchBy={setSearchBy}
      />
    </View>
  );

  const CustomTabItem = ({
    name,
    index,
    indexDecimal,
    onPress,
    onLayout,
    label,
  }: any) => {
    const { theme } = useTheme();
    const styles = useMemo(() => createStyles(theme), [theme]);


    const animatedTextStyle = useAnimatedStyle(() => {
      const color = interpolateColor(
        indexDecimal.value,
        [index - 1, index, index + 1],
        [theme.colors.text, theme.colors.primary, theme.colors.text]
      );
      return { color };
    });

    return (
      <TouchableOpacity
        onPress={() => onPress(name)}
        onLayout={onLayout}
        style={[styles.tabBarItemStyle, { width: tabBarItemWidth }]}
      >
        <Animated.Text
          style={[
            {
              textTransform: 'capitalize',
              textAlign: 'center',
              width: '100%',
              fontSize: 15,
              fontFamily: fonts.medium,
            },
            animatedTextStyle,
          ]}
        >
          {label}
        </Animated.Text>
      </TouchableOpacity>
    );
  };

  return (
    <Tabs.Container
      onTabChange={() => Keyboard.dismiss()}
      renderHeader={SearchHeader2}
      lazy={false}
      renderTabBar={(props) => (
        <View
          style={{
            paddingVertical: 10,
            backgroundColor: theme.colors.topBackground,
            alignItems: 'center',
          }}
        >
          <View style={{ width: tabBarWidth }}>
            <MaterialTabBar
              {...props}
              style={{
                borderRadius: 10,
                backgroundColor: theme.colors.background,

              }}
              scrollEnabled
              TabItemComponent={CustomTabItem}
            />
          </View>
        </View>
      )}
    >
      <Tabs.Tab name="All">
        <CasesList
          filter={ESearchFilter.ALL}
          searchBy={searchBy}
          keyword={keyword}
        />
      </Tabs.Tab>
      <Tabs.Tab name="1 Day">
        <CasesList
          filter={ESearchFilter.DAY}
          searchBy={searchBy}
          keyword={keyword}
        />
      </Tabs.Tab>
      <Tabs.Tab name="1 Week">
        <CasesList
          filter={ESearchFilter.WEEK}
          searchBy={searchBy}
          keyword={keyword}
        />
      </Tabs.Tab>
      <Tabs.Tab name="1 Month">
        <CasesList
          filter={ESearchFilter.MONTH}
          searchBy={searchBy}
          keyword={keyword}
        />
      </Tabs.Tab>
    </Tabs.Container>
  );
};

export default Example;
