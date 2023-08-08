import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Welcome from './components/Welcome';
import Home from './components/Home';
import Game from './components/Game';
import Practice from './components/Practice';

const Stack = createNativeStackNavigator()

const Navigator = (props) => {
    return(
        <Stack.Navigator>
            <Stack.Screen
                name="Welcome"
                component={Welcome}
                options={{title: "Welcome"}}
            />
            <Stack.Screen
                name="Home"
                component={Home}
                options={{title: "Home"}}
            />
            <Stack.Screen
                name="Game"
                component={Game}
                options={{title: "Game"}}
            />
            <Stack.Screen
                name="Practice"
                component={Practice}
                options={{title: "Practice"}}
            />
        </Stack.Navigator>
    )
}
export default Navigator