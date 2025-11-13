import { View, Text, Modal, Keyboard, FlatList, Dimensions } from 'react-native'
import React, { useMemo, useRef, useState } from 'react'
import CustomHeader from 'src/components/common/CustomHeader/CustomHeader'
import SearchInput from 'src/components/common/SearchInput/SearchInput'
import { useTheme } from 'src/context/ThemeContext'
import { createStyles } from './styles'
import { useGlobalStyles } from 'src/hooks/useGlobalStyles'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import CustomText from 'src/components/common/CustomText/CustomText'
import { useTranslation } from 'react-i18next'
import { PrimaryButton } from 'src/components/buttons/CustomButton/variants'
import Spacer from 'src/components/common/Spacer/Spacer'
import PagerView from 'react-native-pager-view'
import AcceptInvitationForm from 'src/components/Forms/AcceptInvitationForm/AcceptInvitationForm'
import NoteStep from './NoteStep'

const { width } = Dimensions.get('window');

interface Props {
  visible: boolean;
  setVisible: (value: boolean) => void;
}

export default function AcceptInvitationModal({ visible, setVisible }: Props) {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), []);
  const globalStyles = useGlobalStyles();
  const insets = useSafeAreaInsets();
  const pagerRef = useRef<PagerView>(null);
  const [step, setStep] = useState<number>(0);

  const pages = useMemo(() => [
    NoteStep,
    AcceptInvitationForm,
  ], []);

  const goToNextPage = () => {
    if (step < 3) {
      const newStep = step + 1;
      setStep(newStep);
      pagerRef.current?.setPage(newStep);
    }
  };

  const goToPrevPage = () => {
    if (step > 0) {
      const newStep = step - 1;
      setStep(newStep);
      pagerRef.current?.setPage(newStep);
    } else {
      setVisible(false);
    }
  };

  const sharedProps = {
    goToNextPage,
    goToPrevPage,
  }

  return (
    <Modal visible={visible} animationType="slide" transparent>

      <View style={{ height: insets.top, backgroundColor: theme.colors.background }} />

      <View style={globalStyles.flex1}>
        <View style={styles.modal}>
          <CustomHeader
            title={''}
            onBackPress={goToPrevPage}
            rounded={false}
          />
          <View style={styles.content}>
            {/* <View>
              <SearchInput
                onChangeText={setKeyword}
                placeholder={t('search')}
                value={keyword}
              />
            </View> */}
            <PagerView
              ref={pagerRef}
              style={{ flex: 1 }}
              initialPage={step}
              onPageSelected={(e) => setStep(e.nativeEvent.position)}
              scrollEnabled={true}
              keyboardDismissMode="on-drag"
            >
              {pages.map((PageComponent, index) => (
                <View key={index.toString()} style={[{ width }, globalStyles.ph15]}>
                  <PageComponent shared={sharedProps} />
                </View>
              ))}
            </PagerView>
          </View>
        </View>
      </View>

    </Modal>

  )
}