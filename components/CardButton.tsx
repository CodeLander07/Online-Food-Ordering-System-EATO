import { View, Text,Image, TouchableOpacity } from 'react-native'
import React from 'react'
import {images} from '@/constants'

const CardButton = () => {

        const totalItems = 10; 
  return (
    
    <TouchableOpacity className='card-btn '>
        {images.bag ? (
            <Image source={images.bag} style={{ width: 20, height: 20 }} resizeMode="contain" />
        ) : (
            <Text style={{ color: 'red' }}>Image not found</Text>
        )}
        { totalItems > 0 && (
            <View className='cart-badge'>
                <Text className='small-bold text-white'>
                    {totalItems}
                </Text>
            </View>
        )

        }
    </TouchableOpacity>
  )
}

export default CardButton