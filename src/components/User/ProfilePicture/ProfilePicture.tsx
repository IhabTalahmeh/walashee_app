import { View, TouchableOpacity, StyleSheet, Modal } from 'react-native'
import React, { useMemo, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTheme } from 'src/context/ThemeContext';
import { createStyles } from './styles';
import { useGlobalStyles } from 'src/hooks/useGlobalStyles';
import ImageViewer from 'src/components/common/ImageViewer/ImageViewer';
import UserAvatar from 'src/components/common/UserAvatar/UserAvatar';
import { useAuth } from 'src/context/AuthContext';

interface Props {
	onSelect: (filePath: string) => void;
	onCancel: (filePath: string) => void;
	crop?: boolean;
	size: number;
	icon: string;
}

export default function ProfilePicture({ onSelect, onCancel, crop = false, size, icon }: Props) {
	const { user } = useAuth();
	const { theme } = useTheme();
	const styles = useMemo(() => createStyles(theme), [theme]);
	const globalStyles = useGlobalStyles();
	const navigation: any = useNavigation();
	const [imagePath, setImagePath] = useState<string>('');
	const [visible, setVisible] = useState<boolean>(false);

	const openCameraPhoto = () => {
		navigation.navigate('CameraScreen', {
			crop,
			onPhotoTaken: (media: any) => {
				if (media && media.path) {
					setImagePath(media.path);
					onSelect(media.path);
				}
			}
		});
	};

	const cancelImage = () => {
		onCancel(imagePath);
		setImagePath('');
	}

	const handleOpen = () => {
		setVisible(true);
	}

	const handleClose = () => {
		setVisible(false);
	}

	const filePath = useMemo(() => {
		return imagePath ? imagePath : user?.profile_image?.href_big || null;
	}, [user, imagePath]);

	return (
		<>
			<View style={[globalStyles.flexRow, globalStyles.aic, globalStyles.jcc]}>
				<View style={{ width: size, height: size }}>
					<View style={[styles.imageButton, containerStyles(size)]}>
						<UserAvatar size={120} uri={filePath} />
					</View>
					<TouchableOpacity style={styles.circleButton} onPress={openCameraPhoto}>
						<Ionicons name={icon} color={theme.colors.primary} size={22} />
					</TouchableOpacity>
				</View>
			</View>
			<Modal
				visible={visible}
				style={{ backgroundColor: 'red' }}
				animationType='fade'
				onRequestClose={() => {
					setVisible(false);
				}}>
				<ImageViewer onClose={handleClose} uri={imagePath} />
			</Modal>
		</>
	)
}

function containerStyles(size: number) {
	return {
		width: size,
		height: size,
	};
}