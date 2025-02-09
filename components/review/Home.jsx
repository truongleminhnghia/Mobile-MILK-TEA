import React from 'react'
import { Button, Text, View } from 'react-native'

const Home = () => {
    return (
        <View>
            <Text style={{fontSize: 30}}>Home</Text>
            <Button
            onPress={() => alert("me")} 
            title='View Detail'
             />
        </View>
    )
}

export default Home