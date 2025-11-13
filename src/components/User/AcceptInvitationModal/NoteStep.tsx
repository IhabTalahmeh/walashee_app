import { View, Text } from 'react-native'
import React, { useMemo } from 'react'
import { useTheme } from 'src/context/ThemeContext'
import { createStyles } from './styles';
import { useGlobalStyles } from 'src/hooks/useGlobalStyles';
import CustomText from 'src/components/common/CustomText/CustomText';
import { useTranslation } from 'react-i18next';
import Spacer from 'src/components/common/Spacer/Spacer';
import { PrimaryButton } from 'src/components/buttons/CustomButton/variants';

export default function NoteStep(props: any) {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const globalStyles = useGlobalStyles();

  const {
    goToNextPage,
    goToPrevPage,
  } = props.shared;

  return (
    <View style={[globalStyles.flex1, globalStyles.mt10]}>
      <CustomText
        text={t('accept-invitation-title')}
        size={26}
        color={theme.colors.text}
        fontWeight='bold'
      />

      <View style={globalStyles.mt20}>
        <CustomText
          text={t('accept-invitation-desc-1')}
          size={18}
          color={theme.colors.text}
        />
      </View>

      <View style={globalStyles.mt10}>
        <CustomText
          text={t('accept-invitation-desc-2')}
          size={18}
          color={theme.colors.text}
        />
      </View>

      <View style={globalStyles.mt10}>
        <CustomText
          text={t('accept-invitation-desc-3')}
          size={18}
          color={theme.colors.text}
        />
      </View>

      <Spacer flex={true} />

      <PrimaryButton
        text={t('continue')}
        onPress={goToNextPage}
      />

    </View>

  )
}