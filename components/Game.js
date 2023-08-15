import * as React from 'react';
import axios from 'axios';
import { useWindowDimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';
import {GestureHandlerRootView, gestureHandlerRootHOC} from 'react-native-gesture-handler';
import Chessboard from 'react-native-chessboard';
import { useState } from 'react';
import { useEffect } from 'react';
import { Center, Box, Button, Flex, Heading, AlertDialog } from 'native-base';

const API = 'https://barbie-fischer-chess.onrender.com'

/* Things left to do:
1. finish styling (low importance)
2. add resign button aka delete in-progress game button
-- 2a. take user back Home 
6. figure out how to display captured pieces

Nice to have:
1. popup for check, checkmate, winning, losing, etc. */

const Game = ({route, navigation}) => {
    const {height, width} = useWindowDimensions();
    const initialFen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
    const API = 'https://barbie-fischer-chess.onrender.com/games'
    const [currentFen, updateFen] = useState(initialFen); 
    const [oldFen, setOldFen] = useState();
    const [gameID, updateGameID] = useState();
    const [moveList, updateMoveList] = useState([]);
    const whitePlayer = route.params.white
    const [currentMove, setCurrentMove] = useState();
    const [isOpen, setIsOpen] = React.useState(false);
    const onClose = () => setIsOpen(false);


    useEffect(() => {
        console.log(whitePlayer)
        axios.post(`${API}/no_opening`, {"white": whitePlayer})
        .then((result) => {
            console.log("We are inside the axios post call")
            console.log(result.data.game_id);
            updateGameID(result.data.game_id);
            updateFen(result.data.fen);
            setOldFen(result.data.fen);
        })
        .catch((err) => {
            console.log(err);
        })
    }, []);


    const confirmMove = () => {
        let newMoveList = moveList;
        newMoveList.push(currentMove);
        updateMoveList(newMoveList);
        console.log({"fen": currentFen, "user_move_list": moveList});
            axios.patch(`${API}/no_opening/${gameID}`, {"fen": currentFen, "user_move_list": moveList})
            .then((result) => {
                console.log("We're inside the patch call")
                updateFen(result.data.fen);
                setOldFen(result.data.fen)
            })
            .catch((err) => {
                console.log(err);
            })
    };

    const undoMove = () => {
        updateFen(oldFen);
    };

    const deleteGame = () => {
        console.log("We're inside the delete game function"); 
        console.log(gameID)
        axios.delete(`${API}/${gameID}`)
        .then((result) => {
            
            console.log("We're inside the axios delete call"); 
            console.log(result.data);
        })
        .catch((err) => {
            console.log(err); 
        })
        navigation.navigate('Home');
        
    }
    const ChessBoardRender = gestureHandlerRootHOC(() => (
            <Chessboard
                colors={ {black: '#F3BAD5', white: '#FFFBFB'} }
                fen={ currentFen } 
                onMove={({ state }) => {
                    updateFen(state.fen);
                    setCurrentMove(state.history[0]);
                 } }
                 boardOrientation="black"
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
                        <Button onPress={() => setIsOpen(!isOpen)}> Resign</Button>
                    </Button.Group>
                    <AlertDialog isOpen={isOpen} onClose={onClose}>
                    <AlertDialog.Content>
                    <AlertDialog.CloseButton />
                    <AlertDialog.Header>Delete Game</AlertDialog.Header>
                    <AlertDialog.Body>
                        This will remove all data relating to this game. This action cannot be
                        reversed. Deleted data can not be recovered. {gameID}
                    </AlertDialog.Body>
                    <AlertDialog.Footer>
                        <Button.Group space={2}>
                        <Button variant="unstyled" colorScheme="coolGray" onPress={onClose}>
                            Cancel
                        </Button>
                        <Button colorScheme="danger" onPress={deleteGame}>
                            Delete
                        </Button>
                        </Button.Group>
                    </AlertDialog.Footer>
                    </AlertDialog.Content>
                </AlertDialog>
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