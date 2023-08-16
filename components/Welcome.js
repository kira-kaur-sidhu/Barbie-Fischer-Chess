import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useWindowDimensions } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { Text } from 'react-native';
import { Center, Button, Image, AspectRatio, Box, View } from 'native-base';
import 'react-native-gesture-handler';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';

/* TO DOs:
1. doublecheck that image size is scalable for different devices
-- 1a. or turn it into text + image
2. update button to match styling of other buttons

NICE TO HAVEs:
1. (REQUIRES LOGIN FUNCTIONALITY) change screen if user is logged in / can log in
 */

const Welcome = ({ navigation }) => {
    const { height, width } = useWindowDimensions();

    return (
        <Center h='100%'>
            <Image source={require('../assets/splash-text.png')} alt={""}
            style={{ flex: 1, width: width, resizeMode: 'center' }}/>
            <Button w={width / 1.25} m={6} _text={{fontWeight: 'bold', letterSpacing: '1'}} onPress={() => navigation.navigate('Home')}>GET STARTED</Button>
        </Center>
    )
}

export default Welcome;