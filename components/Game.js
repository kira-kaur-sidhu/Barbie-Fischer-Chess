import * as React from 'react';
import { useWindowDimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';
import {GestureHandlerRootView, gestureHandlerRootHOC} from 'react-native-gesture-handler';
import Chessboard from 'react-native-chessboard';
import { useState } from 'react';
import { useEffect } from 'react';
import { Center, Box, Button, Flex, Heading } from 'native-base';

const API = 'https://barbie-fischer-chess.onrender.com'

/* Things left to do:
1. finish styling (low importance)
2. add resign button aka delete in-progress game button
-- 2a. take user back Home 
3. add API PATCH call to confirmMove function
4. add API POST to a useEffect
5. add option to play as black
6. figure out how to display captured pieces

Nice to have:
1. popup for check, checkmate, winning, losing, etc. */

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
                <Flex direction="column" align="center" justify="space-between" h="100%" w="100%" safeAreaBottom>
                    <Box w="100%">
                    <Box bg={"#F3BAD5"} h={Math.floor(width / 8) * 1.5} w="100%" _text={{fontSize: 'md', fontWeight: 'bold'}}>Barbie</Box>
                    <Box w={Math.floor(width / 8) * 8} h={Math.floor(width / 8) * 8}>
                    <ChessBoardRender/>
                    </Box>
                    <Box bg={"#F3BAD5"} paddingTop={Math.floor(width / 8) * 1} w="100%" _text={{textAlign: 'right', fontSize: 'md', fontWeight: 'bold'}}>Player</Box>
                    </Box>
                    <Button.Group space={4} paddingBottom={10}>
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