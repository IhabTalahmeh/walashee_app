import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from 'src/screens/auth/Login/LoginScreen';
import DR_MainScreen from 'src/screens/core/MainScreen/DR_MainScreen';
import CU_MainScreen from 'src/screens/core/MainScreen/CU_MainScreen';
import { fonts } from 'src/styles/theme';
import { useTheme } from 'src/context/ThemeContext';
import { StatusBar, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useGlobalStyles } from 'src/hooks/useGlobalStyles';
import { useNavigation } from '@react-navigation/native';
import CaseDetailsScreen from 'src/screens/case/CaseDetails/CaseDetailsScreen';
import AddCaseScreen from 'src/screens/case/AddCaseScreen/AddCaseScreen';
import CameraScreen from 'src/screens/Camera/CameraScreen/CameraScreen';
import { headerHeight } from 'src/styles/globalStyles';
import InvitationsScreen from 'src/screens/core/InvitationsScreen/InvitationsScreen';
import MenuScreen from 'src/screens/core/MenuScreen/MenuScreen';
import ProfileScreen from 'src/screens/core/ProfileScreen/ProfileScreen';
import AddPosition from 'src/screens/user/AddPosition/AddPosition';
import AddEducation from 'src/screens/user/AddEducation/AddEducation';
import AddReimbursement from 'src/screens/user/AddReimbursement/AddReimbursement';
import EditProfileScreen from 'src/screens/user/EditProfile/EditProfileScreen';
import SharedDashboardScreen from 'src/screens/user/SharedDashboardScreen/SharedDashboardScreen';
import ChangePasswordScreen from 'src/screens/auth/ChangePassword/ChangePasswordScreen';
import NotificationsScreen from 'src/screens/core/NotificationsScreen/NotificationsScreen';
import ForgotPasswordScreen from 'src/screens/auth/ForgotPassword/ForgotPasswordScreen';
import ResetPasswordScreen from 'src/screens/auth/ResetPassword/ResetPasswordScreen';
import PlansScreen from 'src/screens/auth/PlansScreen/PlansScreen';
import PrivacyPolicyScreen from 'src/screens/core/PrivacyPolicyScreen/PrivacyPolicyScreen';
import TermsOfUseScreen from 'src/screens/core/TermsOfUseScreen/TermsOfUseScreen';
import VerifyItsYouScreen from 'src/screens/auth/VerifyUser/VerifyItsYouScreen';
import PhoneSignUpScreen from 'src/screens/auth/PhoneSignUpScreen/PhoneSignUpScreen';
import VerifyAccountScreen from 'src/screens/auth/VerifyAccountScreen/VerifyAccountScreen';
import { useTranslation } from 'react-i18next';
import { LanguageContext } from 'src/context/LanguageContext';
import CompleteProfileScreen from 'src/screens/user/CompleteProfileScreen/CompleteProfileScreen';
import AG_MainScreen from 'src/screens/core/MainScreen/AG_MainScreen';
import InviteAgents from 'src/screens/user/InviteUsers/InviteAgents';
import InviteDrivers from 'src/screens/user/InviteUsers/InviteDrivers';
import CreateTeamScreen from 'src/screens/core/CreateTeamScreen/CreateTeamScreen';

type GuestStackParamList = {
  Login: undefined;
  ForgotPasswordScreen: undefined;
  VerifyAccountScreen: undefined;
  ResetPasswordScreen: undefined;
  PhoneSignUpScreen: undefined;
  VerifyItsYouScreen: undefined;
  PlansScreen: undefined;
  PrivacyPolicyScreen: undefined;
  TermsOfUseScreen: undefined;
};

type NotCompletedProfileStackParamList = {
  CompleteProfileScreen: undefined;
  CameraScreen: undefined;
};

type CustomerStackParamList = {
  CU_Main: undefined;
  AddCase: undefined;
  CaseDetails: undefined;
  CameraScreen: undefined;
  InviteUsers: undefined;
  InvitationsScreen: undefined;
  MenuScreen: undefined;
  ProfileScreen: undefined;
  AddPosition: undefined;
  AddExperience: undefined;
  AddEducation: undefined;
  AddReimbursement: undefined;
  EditProfileScreen: undefined;
  SharedDashboardScreen: undefined;
  ChangePasswordScreen: undefined;
  NotificationsScreen: undefined;
  PrivacyPolicyScreen: undefined;
  TermsOfUseScreen: undefined;
};

type AgentStackParamList = {
  AG_Main: undefined;
  CreateTeamScreen: undefined;
  InviteAgents: undefined;
  AddCase: undefined;
  CaseDetails: undefined;
  CameraScreen: undefined;
  InvitationsScreen: undefined;
  MenuScreen: undefined;
  ProfileScreen: undefined;
  AddPosition: undefined;
  AddExperience: undefined;
  AddEducation: undefined;
  AddReimbursement: undefined;
  EditProfileScreen: undefined;
  SharedDashboardScreen: undefined;
  ChangePasswordScreen: undefined;
  NotificationsScreen: undefined;
  PrivacyPolicyScreen: undefined;
  TermsOfUseScreen: undefined;
};

type DriverStackParamList = {
  DR_Main: undefined;
  InviteDrivers: undefined;
  AddCase: undefined;
  CaseDetails: undefined;
  CameraScreen: undefined;
  InviteUsers: undefined;
  InvitationsScreen: undefined;
  MenuScreen: undefined;
  ProfileScreen: undefined;
  AddPosition: undefined;
  AddExperience: undefined;
  AddEducation: undefined;
  AddReimbursement: undefined;
  EditProfileScreen: undefined;
  SharedDashboardScreen: undefined;
  ChangePasswordScreen: undefined;
  NotificationsScreen: undefined;
  PrivacyPolicyScreen: undefined;
  TermsOfUseScreen: undefined;
};

type RootStackParamList =
  GuestStackParamList &
  CustomerStackParamList &
  AgentStackParamList &
  DriverStackParamList &
  NotCompletedProfileStackParamList;

const Stack = createStackNavigator<RootStackParamList>();


export const GuestStack = () => {
  const { t } = useTranslation();
  const { language } = useContext(LanguageContext);
  const { theme } = useTheme();
  const globalStyles = useGlobalStyles();
  const navigation: any = useNavigation();

  return (
    <>
      <StatusBar barStyle={theme.mode == 'light' ? 'dark-content' : 'light-content'} backgroundColor={theme.colors.background} />
      <Stack.Navigator
        screenOptions={{
          cardStyle: {
            backgroundColor: theme.colors.background
          },
          headerStyle: {
            height: headerHeight,
            borderBottomRightRadius: 20,
            borderBottomLeftRadius: 20,
            backgroundColor: theme.colors.background,
          },
          headerTitleAlign: 'center',
          headerTitleStyle: {
            color: theme.colors.text,
            fontFamily: fonts.semiBold,
            fontSize: 22,
          },
          headerBackTitle: '',
          headerBackImage: () => (
            <TouchableOpacity style={[globalStyles.headerBackImage, globalStyles.ml10]} onPress={() => navigation.goBack()}>
              <Ionicons name={language == 'ar' ? 'arrow-forward' : 'arrow-back'} size={24} color={theme.colors.text} />
            </ TouchableOpacity>
          )
        }}>

        <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />

        <Stack.Screen options={{
          headerShown: true,
          title: t('create-account')
        }}
          name="PhoneSignUpScreen"
          component={PhoneSignUpScreen}
        />

        <Stack.Screen options={{
          headerStyle: {
            height: headerHeight,
            backgroundColor: theme.colors.background,
            borderRadius: 0,
            shadowOpacity: 0,
          },
          headerShown: false,
          title: ''
        }}
          name="PlansScreen"
          component={PlansScreen}
        />

        <Stack.Screen options={{
          headerStyle: {
            height: headerHeight,
            backgroundColor: theme.colors.background,
            borderRadius: 0,
            shadowOpacity: 0,
            elevation: 0,
          },
          headerShown: true,
          title: ''
        }}
          name="VerifyItsYouScreen"
          component={VerifyItsYouScreen}
        />

        <Stack.Screen options={{
          headerStyle: {
            height: headerHeight,
            backgroundColor: theme.colors.background,
            borderRadius: 0,
            shadowOpacity: 0,
          },
          headerShown: true,
          title: ''
        }}
          name="ForgotPasswordScreen"
          component={ForgotPasswordScreen}
        />

        <Stack.Screen options={{
          headerShown: true,
          title: ''
        }}
          name="VerifyAccountScreen"
          component={VerifyAccountScreen}
        />

        <Stack.Screen options={{
          headerStyle: {
            height: headerHeight,
            backgroundColor: theme.colors.background,
            borderRadius: 0,
            shadowOpacity: 0,
          },
          headerShown: true,
          title: ''
        }}
          name="ResetPasswordScreen"
          component={ResetPasswordScreen}
        />

        <Stack.Screen
          options={{
            headerShown: true,
            title: 'Privacy Policy',
          }}
          name="PrivacyPolicyScreen"
          component={PrivacyPolicyScreen} />

        <Stack.Screen
          options={{
            headerShown: true,
            title: 'Terms of Use',
          }}
          name="TermsOfUseScreen"
          component={TermsOfUseScreen} />

      </Stack.Navigator>
    </>
  )
};

export const NotCompletedProfileStack = () => {
  const { t } = useTranslation();
  const { language } = useContext(LanguageContext);
  const { theme } = useTheme();
  const globalStyles = useGlobalStyles();
  const navigation: any = useNavigation();

  return (
    <>
      <StatusBar barStyle={theme.mode == 'light' ? 'dark-content' : 'light-content'} backgroundColor={theme.colors.background} />
      <Stack.Navigator
        screenOptions={{
          cardStyle: {
            backgroundColor: theme.colors.topBackground
          },
          headerStyle: {
            height: headerHeight,
            borderBottomRightRadius: 20,
            borderBottomLeftRadius: 20,
            backgroundColor: theme.colors.background,
          },
          headerTitleAlign: 'center',
          headerTitleStyle: {
            color: theme.colors.text,
            fontFamily: fonts.semiBold,
            fontSize: 22,
          },
          headerBackTitle: '',
          headerBackImage: () => (
            <TouchableOpacity style={[globalStyles.headerBackImage, globalStyles.ml10]} onPress={() => navigation.goBack()}>
              <Ionicons name={language == 'ar' ? 'arrow-forward' : 'arrow-back'} size={24} color={theme.colors.text} />
            </ TouchableOpacity>
          )
        }}>

        <Stack.Screen options={{
          headerShown: true,
          title: t('complete-your-profile')
        }}
          name="CompleteProfileScreen"
          component={CompleteProfileScreen}
        />

        <Stack.Screen
          options={{
            headerShown: false,
            animation: 'fade_from_bottom'
          }}
          name="CameraScreen"
          component={CameraScreen} />

      </Stack.Navigator >
    </>
  )
};

export const CustomerStack = () => {
  const { language } = useContext(LanguageContext);
  const { theme } = useTheme();
  const globalStyles = useGlobalStyles();
  const navigation: any = useNavigation();

  return (
    <>
      <StatusBar barStyle={theme.mode == 'light' ? 'dark-content' : 'light-content'} backgroundColor={theme.colors.background} />
      <Stack.Navigator
        screenOptions={{
          cardStyle: {
            backgroundColor: theme.colors.topBackground,
          },
          headerStyle: {
            height: headerHeight,
            borderBottomRightRadius: 20,
            borderBottomLeftRadius: 20,
            backgroundColor: theme.colors.background,
          },
          headerTitleAlign: 'center',
          headerTitleStyle: {
            color: theme.colors.text,
            fontFamily: fonts.semiBold,
            fontSize: 22,
          },
          headerBackTitle: '',
          headerBackImage: () => (
            <TouchableOpacity style={[globalStyles.headerBackImage, globalStyles.ml10]} onPress={() => navigation.goBack()}>
              <Ionicons name={language == 'ar' ? 'arrow-forward' : 'arrow-back'} size={24} color={theme.colors.text} />
            </ TouchableOpacity>
          )
        }}>
        <Stack.Screen options={{ headerShown: false }} name="CU_Main" component={CU_MainScreen} />
        <Stack.Screen options={{ headerShown: true, title: 'Case' }} name="AddCase" component={AddCaseScreen} />
        <Stack.Screen options={{ headerShown: true, title: '' }} name="CaseDetails" component={CaseDetailsScreen} />
        <Stack.Screen options={{ headerShown: true, title: 'Menu', animation: 'slide_from_left' }} name="MenuScreen" component={MenuScreen} />
        <Stack.Screen options={{ headerShown: true, title: 'My Profile' }} name="ProfileScreen" component={ProfileScreen} />
        <Stack.Screen options={{ headerShown: true, title: 'Position' }} name="AddPosition" component={AddPosition} />
        <Stack.Screen options={{ headerShown: true, title: 'Experience' }} name="AddExperience" component={AddPosition} />
        <Stack.Screen options={{ headerShown: true, title: 'Education' }} name="AddEducation" component={AddEducation} />
        <Stack.Screen options={{ headerShown: true, title: 'Reimbursement' }} name="AddReimbursement" component={AddReimbursement} />
        <Stack.Screen options={{ headerShown: true, title: 'Edit Profile' }} name="EditProfileScreen" component={EditProfileScreen} />
        <Stack.Screen options={{ headerShown: true, title: 'Notifications' }} name="NotificationsScreen" component={NotificationsScreen} />

        <Stack.Screen
          options={{
            headerShown: true,
            title: 'Privacy Policy',
          }}
          name="PrivacyPolicyScreen"
          component={PrivacyPolicyScreen} />

        <Stack.Screen
          options={{
            headerShown: true,
            title: 'Terms of Use',
          }}
          name="TermsOfUseScreen"
          component={TermsOfUseScreen} />

        <Stack.Screen options={{
          headerStyle: {
            height: headerHeight,
            backgroundColor: theme.colors.background,
            borderRadius: 0
          },
          headerShown: true,
          title: 'Password'
        }}
          name="ChangePasswordScreen"
          component={ChangePasswordScreen}
        />
        <Stack.Screen options={{
          headerShown: true,
          title: "",
          headerStyle: {
            height: headerHeight,
            backgroundColor: theme.colors.background,
            borderRadius: 0
          }
        }} name="SharedDashboardScreen" component={SharedDashboardScreen} />
        <Stack.Screen
          options={{
            headerShown: false,
            animation: 'fade_from_bottom'
          }}
          name="CameraScreen"
          component={CameraScreen} />
      </Stack.Navigator>
    </>
  )
};

export const DriverStack = () => {
  const { t } = useTranslation();
  const { language } = useContext(LanguageContext);
  const { theme } = useTheme();
  const globalStyles = useGlobalStyles();
  const navigation: any = useNavigation();

  return (
    <>
      <StatusBar barStyle={theme.mode == 'light' ? 'dark-content' : 'light-content'} backgroundColor={theme.colors.background} />
      <Stack.Navigator
        screenOptions={{
          cardStyle: {
            backgroundColor: theme.colors.topBackground,
          },
          headerStyle: {
            height: headerHeight,
            borderBottomRightRadius: 20,
            borderBottomLeftRadius: 20,
            backgroundColor: theme.colors.background,
          },
          headerTitleAlign: 'center',
          headerTitleStyle: {
            color: theme.colors.text,
            fontFamily: fonts.semiBold,
            fontSize: 22,
          },
          headerBackTitle: '',
          headerBackImage: () => (
            <TouchableOpacity style={[globalStyles.headerBackImage, globalStyles.ml10]} onPress={() => navigation.goBack()}>
              <Ionicons name={language == 'ar' ? 'arrow-forward' : 'arrow-back'} size={24} color={theme.colors.text} />
            </ TouchableOpacity>
          )
        }}>
        <Stack.Screen options={{ headerShown: false }} name="DR_Main" component={DR_MainScreen} />
        <Stack.Screen options={{ headerShown: true, title: 'Case' }} name="AddCase" component={AddCaseScreen} />
        <Stack.Screen options={{ headerShown: true, title: '' }} name="CaseDetails" component={CaseDetailsScreen} />
        <Stack.Screen options={{ headerShown: true, title: t('invite-driver') }} name="InviteDrivers" component={InviteDrivers} />
        <Stack.Screen options={{ headerShown: true, title: 'Invitations' }} name="InvitationsScreen" component={InvitationsScreen} />
        <Stack.Screen options={{ headerShown: true, title: 'Menu', animation: 'slide_from_left' }} name="MenuScreen" component={MenuScreen} />
        <Stack.Screen options={{ headerShown: true, title: 'My Profile' }} name="ProfileScreen" component={ProfileScreen} />
        <Stack.Screen options={{ headerShown: true, title: 'Position' }} name="AddPosition" component={AddPosition} />
        <Stack.Screen options={{ headerShown: true, title: 'Experience' }} name="AddExperience" component={AddPosition} />
        <Stack.Screen options={{ headerShown: true, title: 'Education' }} name="AddEducation" component={AddEducation} />
        <Stack.Screen options={{ headerShown: true, title: 'Reimbursement' }} name="AddReimbursement" component={AddReimbursement} />
        <Stack.Screen options={{ headerShown: true, title: 'Edit Profile' }} name="EditProfileScreen" component={EditProfileScreen} />
        <Stack.Screen options={{ headerShown: true, title: 'Notifications' }} name="NotificationsScreen" component={NotificationsScreen} />

        <Stack.Screen
          options={{
            headerShown: true,
            title: 'Privacy Policy',
          }}
          name="PrivacyPolicyScreen"
          component={PrivacyPolicyScreen} />

        <Stack.Screen
          options={{
            headerShown: true,
            title: 'Terms of Use',
          }}
          name="TermsOfUseScreen"
          component={TermsOfUseScreen} />

        <Stack.Screen options={{
          headerStyle: {
            height: headerHeight,
            backgroundColor: theme.colors.background,
            borderRadius: 0
          },
          headerShown: true,
          title: 'Password'
        }}
          name="ChangePasswordScreen"
          component={ChangePasswordScreen}
        />
        <Stack.Screen options={{
          headerShown: true,
          title: "",
          headerStyle: {
            height: headerHeight,
            backgroundColor: theme.colors.background,
            borderRadius: 0
          }
        }} name="SharedDashboardScreen" component={SharedDashboardScreen} />
        <Stack.Screen
          options={{
            headerShown: false,
            animation: 'fade_from_bottom'
          }}
          name="CameraScreen"
          component={CameraScreen} />
      </Stack.Navigator>
    </>
  )
};

export const AgentStack = () => {
  const { t } = useTranslation();
  const { language } = useContext(LanguageContext);
  const { theme } = useTheme();
  const globalStyles = useGlobalStyles();
  const navigation: any = useNavigation();

  return (
    <>
      <StatusBar barStyle={theme.mode == 'light' ? 'dark-content' : 'light-content'} backgroundColor={theme.colors.background} />
      <Stack.Navigator
        screenOptions={{
          cardStyle: {
            backgroundColor: theme.colors.topBackground,
          },
          headerStyle: {
            height: headerHeight,
            borderBottomRightRadius: 20,
            borderBottomLeftRadius: 20,
            backgroundColor: theme.colors.background,
          },
          headerTitleAlign: 'center',
          headerTitleStyle: {
            color: theme.colors.text,
            fontFamily: fonts.semiBold,
            fontSize: 22,
          },
          headerBackTitle: '',
          headerBackImage: () => (
            <TouchableOpacity style={[globalStyles.headerBackImage, globalStyles.ml10]} onPress={() => navigation.goBack()}>
              <Ionicons name={language == 'ar' ? 'arrow-forward' : 'arrow-back'} size={24} color={theme.colors.text} />
            </ TouchableOpacity>
          )
        }}>
        <Stack.Screen options={{ headerShown: false }} name="DR_Main" component={AG_MainScreen} />
        <Stack.Screen options={{ headerShown: true, title: 'Case' }} name="AddCase" component={AddCaseScreen} />
        <Stack.Screen options={{ headerShown: true, title: '' }} name="CaseDetails" component={CaseDetailsScreen} />
        <Stack.Screen options={{ headerShown: true, title: t('invite-agent') }} name="InviteAgents" component={InviteAgents} />
        <Stack.Screen options={{ headerShown: true, title: '' }} name="CreateTeamScreen" component={CreateTeamScreen} />
        <Stack.Screen options={{ headerShown: true, title: 'Menu', animation: 'slide_from_left' }} name="MenuScreen" component={MenuScreen} />
        <Stack.Screen options={{ headerShown: true, title: 'My Profile' }} name="ProfileScreen" component={ProfileScreen} />
        <Stack.Screen options={{ headerShown: true, title: 'Position' }} name="AddPosition" component={AddPosition} />
        <Stack.Screen options={{ headerShown: true, title: 'Experience' }} name="AddExperience" component={AddPosition} />
        <Stack.Screen options={{ headerShown: true, title: 'Education' }} name="AddEducation" component={AddEducation} />
        <Stack.Screen options={{ headerShown: true, title: 'Reimbursement' }} name="AddReimbursement" component={AddReimbursement} />
        <Stack.Screen options={{ headerShown: true, title: 'Edit Profile' }} name="EditProfileScreen" component={EditProfileScreen} />
        <Stack.Screen options={{ headerShown: true, title: 'Notifications' }} name="NotificationsScreen" component={NotificationsScreen} />

        <Stack.Screen
          options={{
            headerShown: true,
            title: t('invitations'),
            headerStyle: {
              height: headerHeight,
              backgroundColor: theme.colors.background,
              borderRadius: 0,
              shadowOpacity: 0,
              elevation: 0,
            },
          }}
          name="InvitationsScreen"
          component={InvitationsScreen}
        />

        <Stack.Screen
          options={{
            headerShown: true,
            title: 'Privacy Policy',
          }}
          name="PrivacyPolicyScreen"
          component={PrivacyPolicyScreen} />

        <Stack.Screen
          options={{
            headerShown: true,
            title: 'Terms of Use',
          }}
          name="TermsOfUseScreen"
          component={TermsOfUseScreen} />

        <Stack.Screen options={{
          headerStyle: {
            height: headerHeight,
            backgroundColor: theme.colors.background,
            borderRadius: 0
          },
          headerShown: true,
          title: 'Password'
        }}
          name="ChangePasswordScreen"
          component={ChangePasswordScreen}
        />
        <Stack.Screen options={{
          headerShown: true,
          title: "",
          headerStyle: {
            height: headerHeight,
            backgroundColor: theme.colors.background,
            borderRadius: 0
          }
        }} name="SharedDashboardScreen" component={SharedDashboardScreen} />
        <Stack.Screen
          options={{
            headerShown: false,
            animation: 'fade_from_bottom'
          }}
          name="CameraScreen"
          component={CameraScreen} />
      </Stack.Navigator>
    </>
  )
};