import React from 'react'
import { Button, Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import type { NavigationProp, RouteProp } from '@react-navigation/native';
import { useRoute } from "@react-navigation/native";

const Detail = () => {

    //const navigation = useNavigation();
    const navigation: NavigationProp<RootStackParamList> = useNavigation();
    const route : RouteProp<RootStackParamList, 'detail'> = useRoute();

    return (
        <View>
            <Text>Review detail</Text>
            <Text>{route.params?.id}</Text>
            <Text>{route.params?.title}</Text>
            <Text>{route.params?.star}</Text>
            <Button title='Go Home' onPress={() => navigation.navigate("home")} />
        </View>
    )
}

export default Detail