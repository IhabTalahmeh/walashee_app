import { View, Text } from 'react-native'
import React from 'react'

interface Props {
  height?: number;
  width?: number;
  flex?: boolean;
}

export default function Spacer({ height = 0, width = 0, flex = false }: Props) {
  return (
    <View style={[
      {
        height,
        width,
      },
      flex ? { flex: 1 } : null,
    ]
    } />
  )
}