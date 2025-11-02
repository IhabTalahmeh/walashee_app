import { View } from 'react-native'
import React from 'react'
import BottomSheetButton from '../BottomSheetButton/BottomSheetButton'
import { PrimaryButtonProps } from 'src/types/props/PrimaryButtonProps'

interface Props {
  buttons: PrimaryButtonProps[]
}

export default function BottomSheetButtons({ buttons }: Props) {
  return (
    <View>
      {buttons.map((item: PrimaryButtonProps) => {
        return (
          <View key={item.text}>
            <BottomSheetButton
              text={item.text}
              textColor={item.color}
              disabled={item.disabled ?? false}
              isLoading={item.disabled}
              onPress={item.onPress}
              left={item?.left ?? null}              
            />
          </View>
        )
      })}
    </View>
  )
}