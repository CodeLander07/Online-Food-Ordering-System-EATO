import { View, Text ,Button, Alert  } from 'react-native'
import {useState} from 'react'
import CustomInput from '@/components/CustomInput'
import CustomButton from '@/components/CustomButton'
import { Link ,router } from 'expo-router'
import { createUser } from '@/lib/appwrite'


const signUp= () => {
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form , setForm  ]  = useState({
    name: '',
    email: '',
    password: ''
  });

  const submit = async () => {
    const { name, email, password } = form;

    if (!name || !email || !password) return Alert.alert('Error', 'Please enter valid email address & password.');

    setIsSubmitting(true);

    try {
      await createUser({ email, password, name });

      router.replace('/');
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <View className='gap-10 bg-white rounded-lg p-5 mt-5'>
    <CustomInput  
      placeholder="Enter your Full Name"
      value={form.name}
      onChangeText={(text) => setForm((prev) => ({...prev, name: text }))}
      label="Full Name"
      />
    <CustomInput  
      placeholder="Enter your email"
      value={form.email}
      onChangeText={(text) => setForm((prev: typeof form) => ({ ...prev, email: text }))}
      label="Email"
      secureTextEntry={false}
      keyboardType="email-address"
      />
      <CustomInput  
      placeholder="Enter your Password"
      value={form.password}
      onChangeText={(text) => setForm((prev: typeof form) => ({ ...prev, password: text }))}
      label="Password"
      secureTextEntry={true}
      
      />
         <CustomButton
                title="Sign Up"
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
  );
};

export default signUp