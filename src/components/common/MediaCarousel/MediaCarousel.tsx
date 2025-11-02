import { View, Text, TouchableOpacity, Modal, FlatList, TouchableWithoutFeedback, StatusBar } from 'react-native'
import React, { useCallback, useMemo, useState } from 'react'
import ImageIcon from 'src/icons/ImageIcon'
import { useTheme } from 'src/context/ThemeContext'
import { createStyles } from './styles';
import FastImage from 'react-native-fast-image';
import { useGlobalStyles } from 'src/hooks/useGlobalStyles';
import { hexWithOpacity } from 'src/common/utils';
import ImageViewer from 'react-native-image-zoom-viewer';

interface Props {
  media: any[];
  visible: boolean;
  setVisible: (value: boolean) => void;
  component: React.ReactNode;
}

export default function MediaCarousel({ media, visible, setVisible, component }: Props) {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const globalStyles = useGlobalStyles();
  const [selectedItem, setSelectedItem] = useState<any>(media[0]);


  const handleOpen = () => {
    setVisible(true);
  }

  const handleClose = () => {
    setVisible(false);
  }

  const renderSmallImage = useCallback(({ item, index }: any) => {
    return (
      <TouchableOpacity style={[isSelected(index) ? styles.selectedImageButton : styles.imageButton, index == media.length - 1 ? { marginRight: 10 } : null]} onPress={() => setSelectedItem(item)}>
        <FastImage source={{ uri: item.urls.href_big }} resizeMode='cover' style={globalStyles.full} />
        {isSelected(index) && <View style={[globalStyles.full, styles.imageOverlay]} />}
      </TouchableOpacity>
    )
  }, [selectedItem]);

  const isSelected = useCallback((index: number) => {
    return media[index].id === selectedItem.id;
  }, [selectedItem, media]);

  return (
    <>
      {component}
      <Modal visible={visible} transparent={true} animationType="fade" onRequestClose={handleClose}>
        <View style={styles.mainContainer}>
          <ImageViewer
            imageUrls={media.map(item => ({ url: item.urls.href_big }))}
            backgroundColor={hexWithOpacity(theme.colors.white, 0.3)}
            enableSwipeDown
            swipeDownThreshold={15}
            style={styles.imageViewerContainer}
            onSwipeDown={handleClose}
            renderIndicator={() => <View />}
            index={media.findIndex(item => item.id === selectedItem.id)}
            onChange={(index: any) => setSelectedItem(media[index])}
          />

          {/* Images Thumbnails */}
          <View style={[styles.downListContainer, globalStyles.mt20]}>
            <FlatList
              data={media}
              keyExtractor={item => item.id.toString()}
              renderItem={renderSmallImage}
              horizontal
            />
          </View>
        </View>
      </Modal>

    </>
  )
}