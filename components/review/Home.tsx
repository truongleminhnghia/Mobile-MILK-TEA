import React from 'react'
import { Button, Text, View } from 'react-native'

const Home = (props: any) => {
    const {navigation} = props;
    return (
        <View>
            <Text style={{fontSize: 30}}>Home</Text>
            <Button
            onPress={() => navigation.navigate("detail")} 
            title='View Detail'
             />
        </View>
    )
}

export default Home