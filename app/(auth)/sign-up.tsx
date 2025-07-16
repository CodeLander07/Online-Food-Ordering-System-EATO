import { View, Text,Button } from 'react-native'
import { router } from 'expo-router'
import React from 'react'

const signUp = () => {
  return (
    <View>
      <Text> Sign Up</Text>
      <Button
            title="Sign up"
              onPress={() => {
                router.push('/sign-in');
              }}
                />
    </View>
  )
}

export default signUp