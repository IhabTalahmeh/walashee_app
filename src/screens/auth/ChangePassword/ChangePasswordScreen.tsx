import { View, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useMemo, useState } from 'react'
import { ChangePasswordDto } from 'src/types/dto/ChangePasswordDto'
import { Field, Formik } from 'formik'
import { useTheme } from 'src/context/ThemeContext'
import { createStyles } from './styles'
import { useGlobalStyles } from 'src/hooks/useGlobalStyles'
import CustomFormTextInput from 'src/components/common/CustomFormTextInput/CustomFormTextInput'
import FastImage from 'react-native-fast-image'
import CustomText from 'src/components/common/CustomText/CustomText'
import LockIcon from 'src/icons/LockIcon'
import Ionicons from 'react-native-vector-icons/Ionicons'
import CustomButton from 'src/components/buttons/CustomButton/CustomButton'
import * as Yup from 'yup';
import Spacer from 'src/components/common/Spacer/Spacer'
import { useChangePassword } from 'src/hooks/useUserAuth'
import { useAuth } from 'src/context/AuthContext'
import * as appService from 'src/services/appService';
import { useNavigation } from '@react-navigation/native'

const defaultInitialValues: ChangePasswordDto = {
	old_password: '',
	new_password: ''
}

export default function ChangePasswordScreen() {
	const { user } = useAuth();
	const { theme } = useTheme();
	const styles = useMemo(() => createStyles(theme), [theme]);
	const globalStyles = useGlobalStyles();
	const navigation: any = useNavigation();

	const [showOldPassword, setShowOldPassword] = useState<boolean>(false);
	const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
	const [initialValues, setInitialValues] = useState<ChangePasswordDto>(defaultInitialValues)

	const validationSchema = Yup.object({
		old_password: Yup.string().min(8).required(),
		new_password: Yup.string().min(8).required(),
	});

	const { mutate: updateMutation, isLoading } = useChangePassword(
		(data: any) => {
			if(data.status_code == 200){
				appService.showToast('Your password has been changed successfully', 'success');
				navigation.goBack();
			} else if(data.status_code == 618){
				appService.showToast('Make sure your current password is correct', 'error');
			} else {
				appService.showToast(data?.data, 'error');
			}
		},
		(error: any) => {
			console.log('error', error);

		}
	)

	const handleSubmit = (values: ChangePasswordDto) => {
		updateMutation({
			userId: user.id,
			dto: { ...values },
		})
	}

	const renderContent = () => {
		return (
			<ScrollView
				showsVerticalScrollIndicator={false}
				keyboardShouldPersistTaps='handled'
				keyboardDismissMode='none'
				contentContainerStyle={{ flexGrow: 1 }}
			>
				<Formik
					initialValues={initialValues}
					validationSchema={validationSchema}
					validateOnMount={true}
					onSubmit={(values: any) => handleSubmit(values)}
				>
					{(props) => (
						<View style={globalStyles.flex1}>

							<View style={[styles.topSection]}>
								<View style={globalStyles.authLockerImageContainer}>
									<FastImage source={require('assets/images/reset-password-locker.png')} resizeMode='contain' style={globalStyles.authLockerImage} />
								</View>

								<View style={globalStyles.mt10}>
									<CustomText text='Change Password' size={20} fontWeight='bold' color={theme.colors.text} />
								</View>

								<View style={globalStyles.mt10}>
									<CustomText text='Set a new password for your account' size={16} fontWeight='regular' color={theme.colors.pureBorder} style={globalStyles.centerText} />
								</View>
							</View>

							{/* Old Password */}
							<View style={globalStyles.mt20}>
								<Field
									name="old_password"
									component={CustomFormTextInput}
									required
									label='Current password'
									placeholder='Enter current password'
									height={68}
									leftIcon={<LockIcon size={18} color={theme.colors.primary} />}
									leftIconWidth={50}
									rightIconWidth={50}
									rightIcon={<TouchableOpacity onPress={() => setShowOldPassword(!showOldPassword)}>
										<Ionicons name={showOldPassword ? 'eye-outline' : 'eye-off-outline'} size={24} color={theme.colors.secondary} />
									</TouchableOpacity>}
									secureTextEntry={!showOldPassword}
								/>
							</View>

							{/* New Password */}
							<View style={globalStyles.mt20}>
								<Field
									name="new_password"
									component={CustomFormTextInput}
									required
									label='New password'
									placeholder='Create new password'
									height={68}
									leftIcon={<LockIcon size={18} color={theme.colors.primary} />}
									leftIconWidth={50}
									rightIconWidth={50}
									rightIcon={<TouchableOpacity onPress={() => setShowNewPassword(!showNewPassword)}>
										<Ionicons name={showNewPassword ? 'eye-outline' : 'eye-off-outline'} size={24} color={theme.colors.secondary} />
									</TouchableOpacity>}
									secureTextEntry={!showNewPassword}
								/>
							</View>

							<Spacer flex={true} />
							<View style={globalStyles.continueButtonContainer}>
								<CustomButton
									text='Submit'
									onPress={props.submitForm}
									fontSize={18}
									fontWeight='semiBold'
									disabled={!props.isValid || isLoading}
									isLoading={isLoading}
								/>
							</View>
						</View>

					)}



				</Formik>

			</ScrollView>
		)
	}

	return (
		<KeyboardAvoidingView
			style={styles.container}
			behavior={Platform.OS === 'ios' ? 'padding' : undefined}
			keyboardVerticalOffset={130}
		>
			{renderContent()}
		</KeyboardAvoidingView>
	);
}