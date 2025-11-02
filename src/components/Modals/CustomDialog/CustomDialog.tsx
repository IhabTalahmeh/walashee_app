import React, { useMemo } from 'react';
import {
  Modal,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { useTheme } from 'src/context/ThemeContext';
import { useGlobalStyles } from 'src/hooks/useGlobalStyles';
import { createStyles } from './styles';
import CustomText from 'src/components/common/CustomText/CustomText';

interface CustomDialogProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  message: string;
  buttons: any[];
  content?: React.ReactNode;
}

const CustomDialog = ({
  visible,
  onClose,
  title,
  message,
  content,
  buttons,
}: CustomDialogProps) => {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const globalStyles = useGlobalStyles();

  return (
    <Modal
      transparent
      visible={visible}
      onRequestClose={onClose}
      animationType='fade'
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.modalOverlay}
        >
          <Animated.View style={styles.modalContainer} entering={FadeIn.duration(300)}>
            {content ? (
              <View style={globalStyles.w100}>
                {content}
              </View>
            ) : (
              <>
                <View style={[globalStyles.w100]}>
                  <CustomText text={title} size={24} color={theme.colors.text} fontWeight='bold' />
                </View>

                <View style={[globalStyles.w100, globalStyles.mt10, globalStyles.mb20]}>
                  <CustomText text={message} size={20} color={theme.colors.text} fontWeight='medium' />
                </View>
              </>
            )}

            {buttons.map((item: any) => {
              const ButtonType = item.button;
              return (
                <View style={[globalStyles.w100, globalStyles.mb10]} key={item.text}>
                  <ButtonType
                    text={item.text}
                    variant='outlined'
                    height={60}
                    onPress={item.onPress}
                    fontSize={18}
                    isLoading={item.loading}
                    disabled={item.loading || item.disabled}
                  />
                </View>
              );
            })}
          </Animated.View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default CustomDialog;
