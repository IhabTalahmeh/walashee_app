import { View, TouchableOpacity } from 'react-native'
import React, { useMemo, useState } from 'react'
import { useTheme } from 'src/context/ThemeContext'
import { createStyles } from './styles';
import { useGlobalStyles } from 'src/hooks/useGlobalStyles';
import UserAvatar from 'src/components/common/UserAvatar/UserAvatar';
import { useAuth } from 'src/context/AuthContext';
import CustomText from 'src/components/common/CustomText/CustomText';
import PencilIcon from 'src/icons/PencilIcon';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

interface Props {
  onSelect: (path: string) => void;
}

export default function ProfileTopCard({ onSelect }: Props) {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const globalStyles = useGlobalStyles();
  const navigation: any = useNavigation();
  const [imagePath, setImagePath] = useState<string>('');

  const openCameraPhoto = () => {
    navigation.navigate('CameraScreen', {
      crop: false,
      onPhotoTaken: (media: any) => {
        if (media && media.path) {
          setImagePath(media.path);
          onSelect(media.path);
        }
      }
    });
  };

  const filePath = useMemo(() => {
    return imagePath ? imagePath : user?.profile_image?.href_big || null;
  }, [user, imagePath]);

  return (
    <View style={styles.container} >
      <View>
        <View style={globalStyles.aic}>
          <UserAvatar
            size={120}
            borderColor={theme.colors.primary}
            borderWidth={1}
            uri={filePath}
          />
        </View>

        <View style={[globalStyles.mt15]}>
          <TouchableOpacity style={styles.editProfileButton} onPress={openCameraPhoto}>
            <PencilIcon size={16} color={theme.colors.text} style={globalStyles.me10} />
            <CustomText text={t('edit-profile-picture')} size={16} color={theme.colors.text} fontWeight='medium' />
          </TouchableOpacity>
        </View>

      </View>
    </View >

  )
}