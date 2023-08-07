import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler'
import Chessboard from 'react-native-chessboard';

const Game = () => {
    const ExampleWithHoc = gestureHandlerRootHOC(() => (
            <Chessboard
                colors={ {black: '#F3BAD5', white: '#FFFBFB'} }
            />
    ));

    return (
        <View style={styles.container}>
            <Text>Open up App.js to start working on your app!</Text>
            <View style={styles.chessBox}>
                <ExampleWithHoc />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});


export default Game;