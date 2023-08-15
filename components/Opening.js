import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';
import {GestureHandlerRootView, gestureHandlerRootHOC} from 'react-native-gesture-handler';
import Chessboard from 'react-native-chessboard';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Center, Box, Button, Flex, Heading } from 'native-base';
import { useWindowDimensions } from 'react-native';

/* TO DOs:
1. update buttons to match GAME.js
2. update API POST method to create a game without assuming engine is white 
3. update API PATCH method to send user_move_list back to backend
4. create function to check what variation of opening we're playing
--- 4a. create popup to tell player about this
--- 4b. create popup to tell player when they've left opening and are playing real game

NICE TO HAVE:
1. create function to check if check or stalement or checkmate or gameover etc. */

const Opening = ({ route, navigation }) => {
    const initialFen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
    const API = 'https://barbie-fischer-chess.onrender.com'
    const [currentFen, updateFen] = useState(initialFen); 
    const [gameID, updateGameID] = useState();
    const [moveList, updateMoveList] = useState();
    const whitePlayer = route.color === 'white' ? 'user' : 'engine'; 
    const opening = route.opening;
    const {height, width} = useWindowDimensions();
    let confirmedMove = false;
    
    useEffect(() => {
        console.log(whitePlayer);
        console.log(opening);
        axios.post(`${API}/games`, {"white": whitePlayer, "opening": opening,}) // this would return fen string from either opening or engine
        .then((result) => {
            console.log("We're inside the axios post call")
            console.log(result.data.game_id);
            updateFen(result.data.fen);
            updateGameID(result.data.game_id);
            updateMoveList(result.data.user_move_list);
            // store game id in a var to use in patch request
        })
        .catch((err) => {
            console.log(err);
        })
    }, []);

    const getEngineMove = (state) => {
        console.log("Were in get Engine move function")
        console.log(state.history[0])
        // history() always returns a list, even if it has one element
        // state.history only returns the last move we just played
        // so it looks like ["d4"]
        let newMoveList = moveList;
        if (newMoveList) {newMoveList.push(state.history[0]);};
        updateMoveList(newMoveList);
        axios.patch(`${API}/games/${gameID}`, {"fen": state.fen, "user_move_list":  moveList})
        .then((result) => {
            console.log("We're inside the axios patch call")
            console.log(moveList)
            updateFen(result.data.game.fen);
        })
        .catch((err) => {
            console.log(err); 
        })
    };
    
    const ChessBoardRender = gestureHandlerRootHOC(() => (
            <Chessboard
                colors={ {black: '#F3BAD5', white: '#FFFBFB'} }
                fen={ currentFen } 
                onMove={({ state }) => {
                    if (confirmedMove === true) {
                        getEngineMove(state);
                        confirmedMove = false;
                        console.log(state);
                        }
                    }
                }
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
                        <Button>Undo</Button>
                        <Button onPress={() => {confirmedMove = true}}>Confirm</Button>
                    </Button.Group>
                </Flex>
            </Center>
        </GestureHandlerRootView>
    )
}

export default Opening;






// return (
//     <GestureHandlerRootView>
//         <View style={styles.container}>
//             <View style={styles.chessWrapTop}>
//                 <Text>Barbie</Text>
//             </View>
//             <ChessBoardRender />
//             <View style={styles.chessWrapBottom}>
//                 <Text>You</Text>
//             </View>
//             <View style={styles.infoButtons}>
//                 <View></View>
//                 <View style={styles.buttons}>
//                     <Button 
//                     title="Confirm"/>
//                     <View style={styles.space} />
//                     <Button
//                     title="Undo"/>
//                     <View style={styles.space} />
//                     <Button
//                     title="Resign"/>
//                 </View>
//             </View>
//         </View>
//     </GestureHandlerRootView>
// )
// }

// const styles = StyleSheet.create({
// container: {
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginTop: 10,
// },
// chessBox: {
// },
// chessWrapTop: {
//     backgroundColor: '#F3BAD5',
//     height: 50,
//     width: '100%',
// },
// chessWrapBottom: {
//     backgroundColor: '#F3BAD5',
//     height: 50,
//     width: '100%',
//     marginTop: 405,
// },
// buttons: {
//     padding: 10,
//     margin: 20,
// },
// space: {
//     width: 20,
//     height: 20,
// },
// });