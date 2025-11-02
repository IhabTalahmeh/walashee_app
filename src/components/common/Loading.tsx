import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import FastImage from 'react-native-fast-image'
import { useTheme } from 'src/context/ThemeContext'

export default function Loading() {
  const {theme} = useTheme();
  
  return (
    <View style={styles.container}>
      {/* <View style={styles.imageContainer}> */}
        {/* <FastImage source={require('../../../assets/images/logo.png')} style={GlobalStyles.full} resizeMode={FastImage.resizeMode.contain} /> */}
        <Text>Loading...</Text>
      {/* </View> */}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    width: 100,
    height: 100
  }
})