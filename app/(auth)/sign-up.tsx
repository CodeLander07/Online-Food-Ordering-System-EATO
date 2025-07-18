import { View, Text ,Button, Alert  } from 'react-native'
import React from 'react'
import CustomInput from '@/components/CustomInput'
import CustomButton from '@/components/CustomButton'
import { Link ,router } from 'expo-router'


const signUp= () => {

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [form , setFrom  ]  = React.useState({
    name: '',
    email: '',
    password: ''
  });

  const submit = async() =>{
      if(!form.name || !form.email || !form.password) return Alert.alert('Error', 'Enter valid name, email and password');
      setIsSubmitting(true);
      try {
        //appwrite sign in

        Alert.alert('Success', 'You have signed up successfully');
        router.replace('/')
        
      }
      catch (error) {
        Alert.alert('Error', 'Something went wrong');
      }
      finally {
        setIsSubmitting(false);
      }
  }


  return (
    <View className='gap-10 bg-white rounded-lg p-5 mt-5'>
    <CustomInput  
      placeholder="Enter your Full Name"
      value={form.name}
      onChangeText={(text) => setFrom((prev) => ({...prev, name: text }))}
      label="Full Name"
      />
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
      title='sign-in'
      isLoading={isSubmitting}
      onPress={submit}
      />
    <View className='flex justify-center mt-5 flex-row gap-2'>
      <Text className='base-regular text-grey-100'>
        Already have an account?
     
      </Text>
        <Link className='base-bold text-primary' href= '/sign-in'>
          Sign In
        </Link>
    </View> 
    </View>
  )
}

export default signUp