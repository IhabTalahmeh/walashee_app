import { View } from 'react-native'
import React from 'react'
import { useGlobalStyles } from 'src/hooks/useGlobalStyles';
import EmptyView from 'src/components/common/EmptyView/EmptyView';
import FastImage from 'react-native-fast-image';

export default function NoCasesAvailable() {
  const globalStyles = useGlobalStyles();

  return (
    <View style={[globalStyles.flex1]}>
      <EmptyView
        text="No Cases Available"
        icon={<FastImage source={require('assets/images/emptyCase.png')}
          style={{ width: 200, height: 200 }}
          resizeMode='contain' />} />
    </View>
  )
}