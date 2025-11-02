import { View, TouchableOpacity, StyleSheet } from "react-native";
import { useAuth } from "src/context/AuthContext";
import { useTheme } from "src/context/ThemeContext";
import { createStyles } from "./styles";
import HomeIcon from "src/icons/HomeIcon";
import UsersIcon from "src/icons/UsersIconOutline";
import SearchIcon from "src/icons/SearchIconOutline";
import RVUsIcon from "src/icons/RVUsIcon";
import ContactIcon from "src/icons/ContactIconOutline";
import { useGlobalStyles } from "src/hooks/useGlobalStyles";
import CustomText from "../CustomText/CustomText";
import { useMemo } from "react";

const CustomTabBar = ({ state, descriptors, navigation }: any) => {
  const globalStyles = useGlobalStyles();
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const { user } = useAuth();

  if (!state) return null;

  const getIconComponent = (routeName: string, isFocused: boolean) => {
    const iconColor = isFocused ? theme.colors.secondary : 'gray';
    const iconSize = 22;

    switch (routeName) {
      case 'Home':
        return <View style={globalStyles.tabBarIconContainer}><HomeIcon size={iconSize} color={iconColor} /></View>;
      case 'Users':
        return <View style={globalStyles.tabBarIconContainer}><UsersIcon size={iconSize} color={iconColor} /></View>;
      case 'Explore':
        return <View style={globalStyles.tabBarIconContainer}><SearchIcon size={iconSize} color={iconColor} /></View>;
      case 'RVUs':
        return <View style={globalStyles.tabBarIconContainer}><RVUsIcon size={iconSize} color={iconColor} /></View>;
      case 'Contact':
        return <View style={globalStyles.tabBarIconContainer}><ContactIcon size={iconSize} color={iconColor} /></View>;
    }
  };

  const getRouteName = (routeName: string, isFocused: boolean) => {
    const textColor = isFocused ? theme.colors.secondary : 'gray';

    switch (routeName) {
      case 'Home':
        return <CustomText text='Home' size={11} fontWeight="semiBold" color={textColor} />
      case 'Users':
        return <CustomText text='Users' size={11} fontWeight="semiBold" color={textColor} />
      case 'Explore':
        return <CustomText text='Explore' size={11} fontWeight="semiBold" color={textColor} />
      case 'RVUs':
        return <CustomText text='RVUs' size={11} fontWeight="semiBold" color={textColor} />
      case 'Contact':
        return <CustomText text='Contact' size={11} fontWeight="semiBold" color={textColor} />
    }
  };

  return (
    <View style={styles.tabBar}>
      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (route.name === 'ProfileTab') {
            navigation.navigate('Profile');
            return;
          }

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            onPress={onPress}
            style={styles.tabItem}
          >
            {getIconComponent(route.name, isFocused)}
            {getRouteName(route.name, isFocused)}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
});

export default CustomTabBar;
