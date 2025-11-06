import { View, Text } from 'react-native'
import React from 'react'
import { useAuth } from 'src/context/AuthContext'

export default function PreparingScreen() {
  const { user } = useAuth();
  return (
    <View>
      <Text>PreparingScreen {user.useAs}</Text>
    </View>
  )
}