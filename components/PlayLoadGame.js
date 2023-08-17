import * as React from 'react';
import axios from 'axios';
import { useWindowDimensions } from 'react-native';
import {GestureHandlerRootView, gestureHandlerRootHOC} from 'react-native-gesture-handler';
import Chessboard from 'react-native-chessboard';
import { useState, useEffect } from 'react';
import { Center, Box, Button, Flex, Heading, useTheme, AlertDialog, Text } from 'native-base';

const API = 'https://barbie-fischer-chess.onrender.com'


const PlayLoadGame = ({route, navigation}) => {
    // need this info from backend
    // const whitePlayer = route.params.white;
    // const blackPlayer = route.params.white === 'engine' ? 'player' : 'engine';
    const { colors } = useTheme();
    const black = colors['pink'][200]
    const white = colors['pink'][50]
    const {height, width} = useWindowDimensions();
    const API = 'https://barbie-fischer-chess.onrender.com/games'
    const [currentFen, updateFen] = useState(); 
    const [oldFen, setOldFen] = useState();
    const [gameID, updateGameID] = useState(route.params.id);
    const [moveList, updateMoveList] = useState();
    const [currentMove, setCurrentMove] = useState();
    const [isOpen, setIsOpen] = React.useState(false);
    const onClose = () => setIsOpen(false);

    useEffect(() => {
        axios.get(`${API}/${gameID}`)
        .then((result) => {
            updateFen(result.data.fen);
            setOldFen(result.data.fen);
            updateMoveList(result.data.user_move_list);
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
            axios.patch(`${API}/no_opening/${gameID}`, {"fen": currentFen, "user_move_list": moveList, "white": whitePlayer})
            .then((result) => {
                console.log("We're inside the patch call");
                updateFen(result.data.fen);
                setOldFen(result.data.fen);
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
                colors={ {black: black, white: white} }
                fen={ currentFen } 
                onMove={({ state }) => {
                    updateFen(state.fen);
                    setCurrentMove(state.history[0]);
                } }
            />
        )
    );

    return (
        <GestureHandlerRootView>
            <Center>
                <Flex direction="column" align="center" justify="space-between" h="95%" w="100%">
                    <Box w="100%">
                        {/* <Box m={2} w="100%" _text={{textTransform: 'capitalize', fontSize: 'md', fontWeight: 'bold'}}>{blackPlayer}</Box> */}
                        <Box w={Math.floor(width / 8) * 8} h={Math.floor(width / 8) * 8}>
                            <ChessBoardRender/>
                        </Box>
                        {/* <Box marginY={2} marginX={-2} w="100%" _text={{textTransform: 'capitalize', textAlign: 'right', fontSize: 'md', fontWeight: 'bold'}}>{whitePlayer}</Box> */}
                    </Box>
                    <Button.Group space={4}>
                        <Button variant={'outline'} onPress={undoMove}>Undo</Button>
                        <Button onPress={confirmMove}>Confirm</Button>
                        <Button colorScheme={'muted'} onPress={() => setIsOpen(!isOpen)}> Resign</Button>
                    </Button.Group>
                    <AlertDialog isOpen={isOpen} onClose={onClose}>
                    <AlertDialog.Content>
                    <AlertDialog.CloseButton />
                    <AlertDialog.Header><Heading>Delete Game {gameID}</Heading></AlertDialog.Header>
                    <AlertDialog.Body>
                        <Text fontSize={'md'}>This will remove all data relating to this game. This action cannot be
                        reversed. Deleted data can not be recovered.</Text>
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


export default PlayLoadGame;