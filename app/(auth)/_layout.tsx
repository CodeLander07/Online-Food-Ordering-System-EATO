import { View, Text } from 'react-native'
import React from 'react'
import { Slot } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'

const _layout = () => {
  return (
   <SafeAreaView>
    <View>
      <Text>Welcome to the Homepage</Text>
    </View>
    <Slot />
   </SafeAreaView>
  )
}

export default _layout