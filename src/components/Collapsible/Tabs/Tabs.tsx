// components/Tabs/Tabs.js
import React, { useMemo, useRef } from 'react';
import { Dimensions, Animated, View, StyleSheet, Text } from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTheme } from 'src/context/ThemeContext';
import { createStyles } from './styles';
import { searchHeaderHeight } from 'src/styles/globalStyles';

const Tabs = ({
  tabs,
  tabIndex,
  setIndex,
  scrollY,
  listRefArr,
  listOffset,
  isListGliding,
}: any) => {

  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const renderTabBar = (props: any) => {
    const translateY = scrollY.interpolate({
      inputRange: [0, searchHeaderHeight],
      outputRange: [0, -searchHeaderHeight],
      extrapolate: 'clamp',
    });

    return (
      <Animated.View
        style={[
          styles.tabBarContainer,
          {
            transform: [{ translateY }],
            position: 'absolute',
            top: searchHeaderHeight,
            left: 0,
            right: 0,
            zIndex: 10,
            backgroundColor: theme.colors.topBackground,
            paddingHorizontal: 20,
            paddingBottom: 10
          },
        ]}
      >
        <TabBar
          {...props}
          style={{
            backgroundColor: theme.colors.background,
            height: 50,
            elevation: 0,
            shadowOpacity: 0,
            borderRadius: 10,
            overflow: 'hidden'
          }}
          indicatorStyle={{
            backgroundColor: theme.colors.primary,
            height: 2,
          }}
          activeColor={theme.colors.primary}
          inactiveColor={theme.colors.text}
        />
      </Animated.View>
    );
  };

  const renderScene = ({ route }: any) => {
    const TabComponent = tabs.find((tab: any) => tab.name === route.key)?.component;
    if (!TabComponent) return null;

    return (
      <View style={{ paddingHorizontal: 20 }}>
        <TabComponent
          scrollY={scrollY}
          onMomentumScrollBegin={() => {
            isListGliding.current = true;
          }}
          onMomentumScrollEnd={() => {
            isListGliding.current = false;
            syncScrollOffset();
          }}
          onScrollEndDrag={() => {
            syncScrollOffset();
          }}
          onGetRef={(ref: any) => {
            if (ref) {
              const exists = listRefArr.current.some(
                (list: any) => list.key === route.key
              );
              if (!exists) {
                listRefArr.current.push({ key: route.key, value: ref });
              }
            }
          }}
        />
      </View>
    );
  };

  const syncScrollOffset = () => {
    const currentRouteKey = tabs[tabIndex].name;
    listRefArr.current.forEach((item: any) => {
      if (item.key !== currentRouteKey) {
        if (scrollY.__getValue() < searchHeaderHeight && scrollY.__getValue() >= 0) {
          if (item.value) {
            item.value.scrollToOffset({
              offset: scrollY.__getValue(),
              animated: false,
            });
            listOffset.current[item.key] = scrollY.__getValue();
          }
        } else if (scrollY.__getValue() >= searchHeaderHeight) {
          if (
            listOffset.current[item.key] < searchHeaderHeight ||
            listOffset.current[item.key] == null
          ) {
            if (item.value) {
              item.value.scrollToOffset({
                offset: searchHeaderHeight,
                animated: false,
              });
              listOffset.current[item.key] = searchHeaderHeight;
            }
          }
        }
      }
    });
  };

  return (
    <TabView
      navigationState={{
        index: tabIndex,
        routes: tabs.map((tab: any) => ({ key: tab.name, title: tab.title, icon: tab.icon })),
      }}
      onIndexChange={(index) => {
        setIndex(index);

        requestAnimationFrame(() => {
          const currentRouteKey = tabs[index].name;
          const currentScroll = scrollY.__getValue();

          const currentTabRef = listRefArr.current.find((ref: any) => ref.key === currentRouteKey)?.value;

          if (currentTabRef && currentScroll != null) {
            currentTabRef.scrollToOffset({
              offset: currentScroll >= searchHeaderHeight ? searchHeaderHeight : currentScroll,
              animated: false,
            });

            listOffset.current[currentRouteKey] = currentScroll;
          }

          // Then sync others
          syncScrollOffset();
        });
      }}
      renderScene={renderScene}
      renderTabBar={renderTabBar}
      initialLayout={{
        width: Dimensions.get('window').width,
        height: 0, // Height is handled by the tab bar
      }}
      swipeEnabled={true} // Disable swipe to prevent accidental tab changes during scroll
    />
  );
};


export default Tabs;
