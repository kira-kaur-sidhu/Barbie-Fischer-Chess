import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Welcome from './components/Welcome';
import Home from './components/Home';
import Game from './components/Game';
import Practice from './components/Practice';
import Opening from './components/Opening';
import LoadGame from './components/LoadGame';

const Stack = createNativeStackNavigator()

const Navigator = (props) => {
    return(
        <Stack.Navigator screenOptions={{
            contentStyle:{
              backgroundColor:'#FFFFFF'
            }
         }}  initialRouteName="Welcome">
            <Stack.Screen
                name="Welcome"
                component={Welcome}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="Home"
                component={Home}
                options={{headerShown: false}}
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
            <Stack.Screen
                name="Opening"
                component={Opening}
                options={{title: "Opening"}}
            />
            <Stack.Screen
                name="Load Game"
                component={LoadGame}
                options={{title: "Load Game"}}
            />
        </Stack.Navigator>
    )
}
export default Navigator