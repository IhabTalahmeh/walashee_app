import { View, Text } from 'react-native'
import React, { useMemo } from 'react'
import UserAvatar from '../UserAvatar/UserAvatar'
import { useTheme } from 'src/context/ThemeContext'
import { createStyles } from './styles';

export default function MembersRow() {

  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const data = [
    "https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    "https://d2zp5xs5cp8zlg.cloudfront.net/image-88409-800.jpg",
    "https://cdn.hswstatic.com/gif/gettyimages-1490576544.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRUcux_QhsmbgtdjMe3q2djMPS2oKtPYUAEw&s",
  ]

  return (
    <View style={styles.container}>
      {data.map((item, index) => (
        <View style={[styles.itemBorder, index !== 0 ? styles.item : null]}>
          <UserAvatar size={25} uri={item} />
        </View>
      ))}
    </View>
  )
}