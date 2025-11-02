import { View, Text, Button, Alert, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Purchases from 'react-native-purchases';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useGetPlans } from 'src/hooks/useLookups';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from 'src/context/ThemeContext';
import { createStyles } from './styles';
import { useGlobalStyles } from 'src/hooks/useGlobalStyles';
import FastImage from 'react-native-fast-image';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { fonts } from 'src/styles/theme';
import MyTabBar from './MyTabBar';
import CustomText from 'src/components/common/CustomText/CustomText';
import PlanCard from 'src/components/common/PlanCard/PlanCard';
import LoadingScreen from 'src/screens/core/LoadingScreen/LoadingScreen';
import { PrimaryButton } from 'src/components/buttons/CustomButton/variants';
import { useSignUp } from 'src/hooks/useUserAuth';
import { useAuth } from 'src/context/AuthContext';
import * as appService from 'src/services/appService';
import { RegisterDto } from 'src/types/dto/RegisterDto';

Purchases.setDebugLogsEnabled(false);

const Tab = createMaterialTopTabNavigator();

const PlanList = React.memo(({ data, selectedPlan, onSelect, currency, newPrice }: any) => (
  <FlatList
    data={data}
    keyExtractor={(item) => item.id}
    renderItem={({ item, index }) => {
      const isSelected = `${selectedPlan?.plan?.name}-${selectedPlan?.period}` == `${item?.plan?.name}-${item?.period}`
      return (
        <View style={{
          marginBottom: index == data.length - 1 ? 110 : 0,
          marginTop: index == 0 ? 20 : 0,
        }}>
          <PlanCard
            item={item}
            onPress={() => onSelect(item)}
            isSelected={isSelected}
            currency={currency}
            newPrice={newPrice} 
            />
        </View>
      );
    }}
    contentContainerStyle={{ flexGrow: 1 }}
    showsVerticalScrollIndicator={false}
    ListEmptyComponent={() => {
      return (
        <LoadingScreen />
      )
    }}
  />
));


export default function PlansScreen() {
  const { login } = useAuth();
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const globalStyles = useGlobalStyles();
  const navigation: any = useNavigation();
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const { toggleTheme } = useTheme();

  const route: any = useRoute();
  const userInfo = route?.params?.userInfo;
  const [packages, setPackages] = useState<any[]>([]);
  const [plans, setPlans] = useState<any>({});
  const [currency, setCurrency] = useState<string>('');
  const [isPurchasing, setIsPurchasing] = useState<boolean>(false);

  const { mutate: SignUpMutation, isLoading: isSigningUp } = useSignUp(
    (data: any) => {
      if (data.status_code == 200) {
        data.data.verified = false;
        login(data.data);
      } else {
        console.log('error sign up', JSON.stringify(data));
      }
    },
    (error: any) => {
      console.log('error', error);
    }
  )

  const { data } = useGetPlans({
    onSuccess: (data: any) => {
      const updatedPlans = {
        annual: [
          {
            ...data.annual[2],
            pkg: packages[2]
          },
          {
            ...data.annual[0],
            pkg: null,
          },
          {
            ...data.annual[1],
            pkg: packages[1]
          },
          {
            ...data.annual[3],
            pkg: packages[0]
          },
        ],
        monthly: [
          {
            ...data.monthly[2],
            pkg: packages[5]
          },
          {
            ...data.monthly[0],
            pkg: null,
          },
          {
            ...data.monthly[1],
            pkg: packages[4]
          },
          {
            ...data.monthly[3],
            pkg: packages[3]
          },
        ]
      }
      setPlans(updatedPlans);
      setSelectedPlan(updatedPlans.monthly[0]);
    }
  });

  useEffect(() => {
    const getOfferings = async () => {
      const offerings: any = await Purchases.getOfferings();
      const packages = offerings.current.availablePackages;
      setPackages(packages);
    };
    getOfferings();
  }, []);

  const onPurchase = async () => {
    try {
      setIsPurchasing(true);
      const { customerInfo, productIdentifier } = await Purchases.purchasePackage(selectedPlan.pkg);
      if (customerInfo.entitlements.active['entitlements']) {
        handleSignUp();
        Alert.alert('Thank you!', 'You are now subscribed.');
      }
      setIsPurchasing(false);
    } catch (e: any) {
      if (!e.userCancelled) {
        Alert.alert('Purchase failed', e.message);
      }
      setIsPurchasing(false);
    }
  };

  const handleSignUp = () => {
    console.log('inside sign up');
    const data: RegisterDto = {
      ...route.params.userInfo,
      plan_id: selectedPlan.braintree_plan_id,
      secret: process.env.APPLE_SECRET
    }
    SignUpMutation(data);
  }

  const onContinuePress = () => {
    if (selectedPlan?.pkg && newPrice == null) {
      onPurchase();
    } else {     
      handleSignUp();
    }
  }

  const handleSelectPlan = (item: any) => {
    setSelectedPlan(item);
  }

  const goBack = () => {
    navigation.goBack();
  }

  useEffect(() => {
    if (packages.length > 0) {
      setCurrency(packages[0].product.priceString[0]);
    }
  }, [packages])

  const newPrice = useMemo(() => {
    return userInfo.code == 'mslogger100' ? 0 : null;
  }, [userInfo]);

  return (
    <>
      <LinearGradient
        colors={[theme.colors.primary, theme.colors.background]}
        locations={[0, 0.5]}
        style={styles.gradient}
      >
        <View style={styles.container}>
          <View style={styles.lightLogoContainer}>
            <FastImage source={require('assets/images/light-logo.png')} style={globalStyles.full} resizeMode='contain' />
          </View>

          <View style={[globalStyles.flexRow, globalStyles.aic, globalStyles.ase]}>
            <TouchableOpacity style={styles.closeButton} onPress={goBack}>
              <Ionicons name='close-outline' color={theme.colors.white} size={30} />
            </TouchableOpacity>
          </View>

          <View style={[globalStyles.mv20]}>
            <CustomText text='Choose The Right Plan For You' color={theme.colors.white} size={24} fontWeight='bold' style={globalStyles.centerText} />
            <CustomText text='MS Logger providers a variety of annual or monthly plans to match your practice need.' color={theme.colors.white} size={16} style={[globalStyles.centerText, globalStyles.mt10]} />
          </View>

          <Tab.Navigator
            tabBar={props => <MyTabBar {...props} />}
            screenOptions={{
              swipeEnabled: true,
              tabBarIndicatorStyle: {
                backgroundColor: theme.colors.primary,
                height: 3,
                borderRadius: 2,
                bottom: 0,
              },
              tabBarLabelStyle: {
                textTransform: 'none',
                fontSize: 14,
                fontFamily: fonts.medium,
                minWidth: 125,
                textAlignVertical: 'center',
                height: 35,
              },
              tabBarStyle: {
                justifyContent: 'space-evenly',
                borderBottomRightRadius: 20,
                borderBottomLeftRadius: 20,
                backgroundColor: theme.colors.background,
                overflow: 'hidden',
              },
              tabBarItemStyle: {
                flex: 1,
              },
              tabBarActiveTintColor: theme.colors.primary,
              tabBarInactiveTintColor: theme.colors.text,
            }}
          >
            <Tab.Screen name="Monthly" options={{ title: 'Monthly', sceneStyle: { backgroundColor: 'transparent' } }} children={() => (
              <PlanList
                data={plans?.monthly || []}
                selectedPlan={selectedPlan}
                onSelect={handleSelectPlan}
                currency={currency}
                newPrice={newPrice}
              />
            )} />
            <Tab.Screen name="Annual" options={{ title: 'Annual', sceneStyle: { backgroundColor: 'transparent' } }} children={() => (
              <PlanList
                data={plans?.annual || []}
                selectedPlan={selectedPlan}
                onSelect={handleSelectPlan}
                currency={currency}
                newPrice={newPrice}
              />
            )} />
          </Tab.Navigator>

        </View>
      </LinearGradient>

      <View style={styles.continueButton}>
        <PrimaryButton
          text={selectedPlan?.pkg && newPrice == null ? 'Continue to purchase' : 'Continue'}
          onPress={onContinuePress}
          isLoading={isPurchasing || isSigningUp}
          disabled={isPurchasing || isSigningUp}
        />
      </View>
    </>
  );
}