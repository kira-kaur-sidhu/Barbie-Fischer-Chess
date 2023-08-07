import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './components/Home';
import Game from './components/Game';

const Stack = createNativeStackNavigator()

const Navigator = (props) => {
    return(
        <Stack.Navigator>
            <Stack.Screen
                name="Home"
                component={Home}
                options={{title: "Home Page"}}
            />
            <Stack.Screen
                name="Game"
                component={Game}
                options={{title: "Game Page"}}
            />
        </Stack.Navigator>
    )
}
export default Navigator