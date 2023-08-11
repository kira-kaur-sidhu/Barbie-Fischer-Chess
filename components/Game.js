import * as React from 'react';
import { useWindowDimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';
import {GestureHandlerRootView, gestureHandlerRootHOC} from 'react-native-gesture-handler';
import Chessboard from 'react-native-chessboard';
import { useState } from 'react';
import { useEffect } from 'react';
import { Center, Box, Button, Flex } from 'native-base';

const API = 'https://barbie-fischer-chess.onrender.com'



const Game = () => {
    const {height, width} = useWindowDimensions();
    const initialFen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
    const [currentFen, updateFen] = useState(initialFen); 
    const [currentMove, setCurrentMove] = useState();
    let oldFen;



    const confirmMove = () => {
        const playMove = () => {

        };
    };

    const undoMove = () => {
        updateFen(oldFen);
    };



    
    const ChessBoardRender = gestureHandlerRootHOC(() => (
            <Chessboard
                colors={ {black: '#F3BAD5', white: '#FFFBFB'} }
                fen={ currentFen } 
                onMove={({ state }) => { oldFen = currentFen;
                    updateFen(state.fen);
                 } }
            />
        )
    );

    return (
        <GestureHandlerRootView>
            <Center>
                <Flex direction="column" align="center" justify="space-evenly" h="100%" safeArea>
                    <Box w={Math.floor(width / 8) * 8} h={Math.floor(width / 8) * 8}>
                    <ChessBoardRender/>
                    </Box>
                    <Button.Group space={4}>
                        <Button onPress={undoMove}>Undo</Button>
                        <Button onPress={confirmMove}>Confirm</Button>
                    </Button.Group>
                </Flex>
            </Center>
        </GestureHandlerRootView>
    )
}

// const styles = StyleSheet.create({
//     container: {
//         backgroundColor: '#fff',
//         alignItems: 'center',
//         justifyContent: 'center',
//         marginTop: 10,
//     },
//     chessBox: {
//     },
//     chessWrapTop: {
//         backgroundColor: '#F3BAD5',
//         height: 50,
//         width: '100%',
//     },
//     chessWrapBottom: {
//         backgroundColor: '#F3BAD5',
//         height: 50,
//         width: '100%',
//         marginTop: 405,
//     },
//     buttons: {
//         padding: 10,
//         margin: 20,
//     },
//     space: {
//         width: 20,
//         height: 20,
//     },
// });

{/* <View style={styles.container}>
<View style={styles.chessWrapTop}>
    <Text>Barbie</Text>
</View>
<ChessBoardRender />
<View style={styles.chessWrapBottom}>
    <Text>You</Text>
</View>
<View style={styles.infoButtons}>
    <View></View>
    <View style={styles.buttons}>
        <Button 
        title="Confirm"/>
        <View style={styles.space} />
        <Button
        title="Undo"/>
        <View style={styles.space} />
        <Button
        title="Resign"/>
    </View>
</View>
</View> */}


export default Game;