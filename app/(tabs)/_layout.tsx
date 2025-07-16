
import { Redirect, Slot, Stack } from 'expo-router'

export default function _layout()  {
  const  isAuthenticated = true; // Replace with actual authentication logic
  if(!isAuthenticated) return <Redirect href='/(auth)/sign-in' />
  return (
   <Slot/>
  )
}

