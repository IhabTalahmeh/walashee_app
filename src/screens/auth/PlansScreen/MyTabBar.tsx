import { Animated, View, TouchableOpacity, Platform, Dimensions } from 'react-native';
import { useLinkBuilder } from '@react-navigation/native';
import { useGlobalStyles } from 'src/hooks/useGlobalStyles';
import { useTheme } from 'src/context/ThemeContext';
import { fonts } from 'src/styles/theme';
import { hexWithOpacity } from 'src/common/utils';

export default function MyTabBar({ state, descriptors, navigation, position }: any) {
  const { theme } = useTheme();
  const { buildHref } = useLinkBuilder();
  const globalStyles = useGlobalStyles();

  const horizontalMargin = 30 * 2; // left + right
  const windowWidth = Dimensions.get('window').width;
  const tabBarWidth = windowWidth - horizontalMargin;
  const tabWidth = tabBarWidth / state.routes.length;

  const translateX = position.interpolate({
    inputRange: state.routes.map((_: any, i: number) => i),
    outputRange: state.routes.map((_: any, i: number) => i * tabWidth),
  });

  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: hexWithOpacity(theme.colors.white, 0.3),
        borderRadius: 100,
        position: 'relative',
        overflow: 'hidden',
        marginHorizontal: 30,
        marginVertical: 10,
        width: tabBarWidth,
        alignSelf: 'center',
      }}
    >

      <Animated.View
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: tabWidth - 6 * 2,
          height: 40, // Slightly smaller for more rounded look, or keep 50 if you prefer
          backgroundColor: theme.colors.primary,
          borderRadius: 100,
          transform: [
            { translateX: Animated.add(translateX, new Animated.Value(6)) },
          ],
          zIndex: 0,
          marginTop: 5
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
                  fontSize: 14,
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
                  fontSize: 14,
                  fontFamily: fonts.medium,
                  color: theme.colors.white,
                }}
              >
                {label}
              </Animated.Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
