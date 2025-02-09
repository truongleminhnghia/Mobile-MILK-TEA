import React from 'react'
import { Button, Text, View } from 'react-native'
import { NavigationProp, useNavigation } from '@react-navigation/native'

const Detail = () => {

    //const navigation = useNavigation();
    const navigationL: NavigationProp<RootStackParamList = useNavigation();
    return (
        <View>
            <Text>Detail</Text>
            <Button title='Go Home' onPress={() => navigation.navigate("Home")} />
        </View>
    )
}

export default Detail