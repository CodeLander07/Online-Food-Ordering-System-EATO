import CustomButton from '@/components/CustomButton'
import CustomInput from '@/components/CustomInput'
import { checkActiveSession, signIn } from '@/lib/appwrite'
import { Link, router } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { Alert, Text, View } from 'react-native'


const SignIn = () => {

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form , setFrom  ]  = useState({
    email: '',
    password: ''
  });

  // Check if user is already signed in
  useEffect(() => {
    const checkSession = async () => {
      const hasActiveSession = await checkActiveSession();
      if (hasActiveSession) {
        router.replace('/');
      }
    };
    checkSession();
  }, []);

  const submit = async() =>{
    const { email, password } = form;
      if(!email || !password) return Alert.alert('Error', 'Enter valid email and password');
      setIsSubmitting(true);
      try {
        //appwrite sign in
        const session = await signIn({ email, password });
        
        if (session) {
          Alert.alert('Success', 'Signed in successfully!');
          router.replace('/');
        }
        
      }
      catch (error) {
        console.error('SignIn Error:', error);
        
        // More specific error handling
        if (error instanceof Error) {
          if (error.message.includes('Invalid credentials')) {
            Alert.alert('Error', 'Invalid email or password. Please try again.');
          } else if (error.message.includes('session is active')) {
            Alert.alert('Info', 'You are already signed in!');
            router.replace('/');
          } else {
            Alert.alert('Error', 'Something went wrong. Please try again.');
          }
        } else {
          Alert.alert('Error', 'An unexpected error occurred.');
        }
      }
      finally {
        setIsSubmitting(false);
      }
  }


  return (
    <View className='gap-10 bg-white rounded-lg p-5 mt-5'>
    <CustomInput  
      placeholder="Enter your email"
      value={form.email}
      onChangeText={(text) => setFrom((prev) => ({...prev, email: text }))}
      label="Email"
      secureTextEntry={false}
      keyboardType="email-address"
      />
      <CustomInput  
      placeholder="Enter your Password"
      value={form.password}
      onChangeText={(text) => setFrom((prev) => ({...prev, password: text }))}
      label="Password"
      secureTextEntry={true}
      
      />
      <CustomButton
      title='Sign In'
      isLoading={isSubmitting}
      onPress={submit}
      />
    <View className='flex justify-center mt-5 flex-row gap-2'>
      <Text className='base-regular text-grey-100'>
        Dont have an account?
     
      </Text>
        <Link className='base-bold text-primary' href= '/sign-up'>
          Sign Up
        </Link>
    </View> 
    </View>
  )
}

export default SignIn