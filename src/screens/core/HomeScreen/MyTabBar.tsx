import { Animated, View, TouchableOpacity, Platform, Dimensions, TouchableWithoutFeedback, StyleSheet, Pressable } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useGlobalStyles } from 'src/hooks/useGlobalStyles';
import { useTheme } from 'src/context/ThemeContext';
import { fonts } from 'src/styles/theme';
import { headerHeight } from 'src/styles/globalStyles';
import { Portal } from 'react-native-portalize';
import CustomText from 'src/components/common/CustomText/CustomText';
import { useEffect, useState } from 'react';

export default function MyTabBar({ state, descriptors, navigation, position, data, selected, setSelected }: any) {
  const { theme } = useTheme();
  const globalStyles = useGlobalStyles();
  const windowWidth = Dimensions.get('window').width;
  const tabWidth = windowWidth / state.routes.length;
  const [show, setShow] = useState<boolean>(false);

  const translateX = position.interpolate({
    inputRange: state.routes.map((_: any, i: number) => i),
    outputRange: state.routes.map((_: any, i: number) => i * tabWidth),
  });

  const togglePeriod = () => {
    setShow(!show);
  }

  useEffect(() => {
    setShow(false);
  }, [selected]);

  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: theme.colors.background,
          borderBottomRightRadius: 20,
          borderBottomLeftRadius: 20,
          position: 'relative',
          overflow: 'hidden',
        }}
      >

        <Animated.View
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: tabWidth,
            height: 3,
            backgroundColor: theme.colors.primary,
            transform: [{ translateX }],
            borderRadius: 2,
            zIndex: 1,
          }}
        />

        {state.routes.map((route: any, index: number) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
                ? options.title
                : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          const inputRange = state.routes.map((_: any, i: number) => i);

          const scale =
            inputRange.length > 1
              ? position.interpolate({
                inputRange,
                outputRange: inputRange.map((i: number) => (i === index ? 1.05 : 1)),
              })
              : 1;

          const labelColor = position.interpolate({
            inputRange,
            outputRange: inputRange.map((i: number) => (i === index ? 1 : 0)),
          });

          return (
            <TouchableOpacity
              key={route.key}
              accessibilityRole={Platform.OS === 'web' ? 'link' : 'button'}
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarButtonTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                height: 50,
                zIndex: 2,
              }}
            >
              <View style={[globalStyles.flexRow, globalStyles.aic]}>
                <Animated.Text
                  style={{
                    fontSize: 15,
                    fontFamily: fonts.medium,
                    color: theme.colors.text,
                    position: 'absolute',
                  }}
                >
                  {label}
                </Animated.Text>
                <Animated.Text
                  style={{
                    opacity: labelColor,
                    fontSize: 15,
                    fontFamily: fonts.medium,
                    color: theme.colors.primary,
                  }}
                >
                  {label}
                </Animated.Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>

      {show && (
        <Portal>
          {/* Container can still be box-none */}
          <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
            {/* Overlay: start BELOW the tab bar so tabs stay tappable */}
            <Pressable
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: 0,
                // tab bar height is 50 in your code
                top: 50,
              }}
              onPress={() => setShow(false)}
            />

            {/* Popup */}
            <View
              style={{
                position: 'absolute',
                top: headerHeight + 55,
                left: '50%',
                width: 220,
                transform: [{ translateX: -110 }],
                backgroundColor: theme.colors.background,
                borderWidth: 1,
                borderColor: theme.colors.border,
                borderRadius: 20,
                paddingHorizontal: 10,
                paddingBottom: 10,
                zIndex: 1,
                shadowColor: theme.mode == 'light' ? theme.colors.black : theme.colors.white,
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.1,
                shadowRadius: 6,
                elevation: 5,
              }}
              onStartShouldSetResponder={() => true}
            >
              {data.map((item: any) => (
                <View key={item.id} style={[globalStyles.w100, globalStyles.jcc, globalStyles.aic]}>
                  <TouchableOpacity
                    onPress={() => setSelected(item)}
                    style={{
                      width: '100%',
                      backgroundColor: selected.title == item.title ? theme.colors.primary : 'transparent',
                      height: 36,
                      marginTop: 10,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 100,
                    }}
                  >
                    <CustomText
                      text={item.title}
                      color={selected.title == item.title ? theme.colors.white : theme.colors.text}
                      style={globalStyles.centerText}
                    />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>
        </Portal>
      )}


    </>
  );
}
