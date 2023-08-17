import * as React from 'react';
import axios from 'axios';
import { useWindowDimensions, Image } from 'react-native';
import {GestureHandlerRootView, gestureHandlerRootHOC} from 'react-native-gesture-handler';
import Chessboard from 'react-native-chessboard';
import { useState } from 'react';
import { useEffect } from 'react';
import { Center, Box, Button, Flex, Heading, useTheme, AlertDialog, Text } from 'native-base';


const API = 'https://barbie-fischer-chess.onrender.com'


const Game = ({route, navigation}) => {
    const { colors } = useTheme();
    const black = colors['pink'][200]
    const white = colors['pink'][50]
    const {height, width} = useWindowDimensions();
    const initialFen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
    const API = 'https://barbie-fischer-chess.onrender.com/games'
    const [currentFen, updateFen] = useState(initialFen); 
    const [oldFen, setOldFen] = useState();
    const [gameID, updateGameID] = useState();
    const [moveList, updateMoveList] = useState([]);
    const [engineMoveList, updateEngineList] = useState([]);
    const whitePlayer = route.params.white;
    const blackPlayer = route.params.white === 'engine' ? 'player' : 'engine';
    const [currentMove, setCurrentMove] = useState();
    const [isOpen, setIsOpen] = React.useState(false);
    const onClose = () => setIsOpen(false);
    const [capturedP, setCapturedP]= useState([]);


    useEffect(() => {
        console.log(whitePlayer)
        axios.post(`${API}/no_opening`, {"white": whitePlayer})
        .then((result) => {
            console.log("We are inside the axios post call")
            console.log(result.data.game_id);
            updateGameID(result.data.game_id);
            updateEngineList(result.data.engine_move_list)
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
        capturedPieces(currentFen);
        console.log({"fen": currentFen, "user_move_list": moveList});
            axios.patch(`${API}/no_opening/${gameID}`, {"fen": currentFen, "user_move_list": moveList, "white": whitePlayer})
            .then((result) => {
                console.log("We're inside the patch call");
                updateFen(result.data.fen);
                setOldFen(result.data.fen);
                updateEngineList(result.data.engine_move_list)
                capturedPieces(currentFen);
            })
            .catch((err) => {
                console.log(err);
            })
    };

    const undoMove = () => {
        updateFen(oldFen);
        capturedPieces(oldFen);
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

    const capturedPieces = (fen) => {
        const fenArray = fen.split(" ")

        const initialPieces = {
            p: 8, b: 2, n: 2, r: 2, q: 1, k: 1,
            P: 8,B: 2, N: 2, R: 2, Q: 1, K: 1
        };

        const current = {
            p: 0, b: 0, n: 0, r: 0, q: 0, k: 0,
            P: 0, B: 0, N: 0, R: 0, Q: 0, K: 0
        };

        const captured = {
            p: 0, b: 0, n: 0, r: 0, q: 0, k: 0,
            P: 0, B: 0, N: 0, R: 0, Q: 0, K: 0
        };

        for (const letter of fenArray[0]) {
            if (letter != '/') {
                current[letter] += 1
            }
        };

        for (const piece in initialPieces) {
            captured[piece] = initialPieces[piece] - current[piece];
        };

        setCapturedP(captured)
    };

    const capturedPiece = (color) => {
        pieces = []
        for (piece in capturedP) {
            if (piece.toUpperCase() === piece && color === "white") {
                for (let i = 0; i< capturedP[piece]; i++) {
                    if (piece === "P"){pieces.push(require("../assets/pieces/P.png"))}
                    else if (piece === "B"){pieces.push(require("../assets/pieces/B.png"))}
                    else if (piece === "N"){pieces.push(require("../assets/pieces/N.png"))}
                    else if (piece === "R"){pieces.push(require("../assets/pieces/R.png"))}
                    else if (piece === "Q"){pieces.push(require("../assets/pieces/Q.png"))}
                };

            }
            else if (piece.toLowerCase() === piece && color === "black") {
                    for (let i = 0; i< capturedP[piece]; i++) {
                        if (piece === "p"){pieces.push(require("../assets/pieces/pp.png"))}
                        else if (piece === "b"){pieces.push(require("../assets/pieces/bb.png"))}
                        else if (piece === "n"){pieces.push(require("../assets/pieces/nn.png"))}
                        else if (piece === "r"){pieces.push(require("../assets/pieces/rr.png"))}
                        else if (piece === "q"){pieces.push(require("../assets/pieces/qq.png"))}
                    };
            }
        };
        return pieces
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
                    <Box w="100%" style={{backgroundColor:"#F3BAD5", paddingTop:6, paddingBottom:6, borderRadius: 4}}>
                        <Box m={2} w="100%" _text={{textTransform: 'capitalize', fontSize: 'md', fontWeight: 'bold'}}>{blackPlayer}</Box>
                        <Box style={{flexDirection: 'row'}}>{capturedPiece("white").map(img => <Image source={img} style={{height: 30, width: 30}}/>)}</Box>
                        <Box w={Math.floor(width / 8) * 8} h={Math.floor(width / 8) * 8}>
                            <ChessBoardRender/>
                        </Box>
                        <Box style={{flexDirection: 'row'}}>{capturedPiece("black").map(img => <Image source={img} style={{height: 30, width: 30}}/>)}</Box>
                        <Box marginY={2} marginX={-2} w="100%" _text={{textTransform: 'capitalize', textAlign: 'right', fontSize: 'md', fontWeight: 'bold'}}>{whitePlayer}</Box>
                    </Box>
                    <Button.Group space={4}>
                        <Button variant={'outline'} onPress={undoMove}>Undo</Button>
                        <Button variant={'subtle'} onPress={confirmMove}>Confirm</Button>
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


export default Game;