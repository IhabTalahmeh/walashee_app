import { View, Text, TouchableOpacity } from 'react-native'
import React, { useMemo, useState } from 'react'
import CustomText from 'src/components/common/CustomText/CustomText'
import { useGlobalStyles } from 'src/hooks/useGlobalStyles'
import { useTheme } from 'src/context/ThemeContext';
import { createStyles } from './styles';
import ScanIcon from 'src/icons/ScanIcon';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

interface Props {
  onSelect: (filePath: string) => void;
  onCancel: (filePath: string) => void;
}

export default function IDScanner({ onSelect, onCancel }: Props) {
  const { t } = useTranslation();
  const globalStyles = useGlobalStyles();
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const navigation: any = useNavigation();
  const [imagePath, setImagePath] = useState<string>('');
  const [visible, setVisible] = useState<boolean>(false);

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


  return (
    <TouchableOpacity
      style={[
        styles.infoTag,
        globalStyles.mt20,
        globalStyles.flexRow,
        globalStyles.jcc,
        globalStyles.aic
      ]}
      onPress={openCameraPhoto}>
      <ScanIcon size={18} color={theme.colors.primary} style={globalStyles.mr10} />
      <CustomText text={t('scan-id-or-passport')} color={theme.colors.primary} size={16} fontWeight='medium' />
    </TouchableOpacity>
  )
}