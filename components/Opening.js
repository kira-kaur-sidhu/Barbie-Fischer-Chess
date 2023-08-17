import * as React from 'react';
import {GestureHandlerRootView, gestureHandlerRootHOC} from 'react-native-gesture-handler';
import Chessboard from 'react-native-chessboard';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Center, Box, Button, Flex, Heading, useTheme, AlertDialog, Text, Modal } from 'native-base';
import { useWindowDimensions, Image } from 'react-native';
import data from '../openingDescriptions.json';


const Opening = ({ route, navigation }) => {
    const { colors } = useTheme();
    const black = colors['pink'][200]
    const white = colors['pink'][50]
    const {height, width} = useWindowDimensions();
    const initialFen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
    const API = 'https://barbie-fischer-chess.onrender.com/games'
    const [currentFen, updateFen] = useState(initialFen); 
    const [oldFen, setOldFen] = useState();
    const [gameID, updateGameID] = useState();
    const [variation, setVariation] = useState('');
    const [moveList, updateMoveList] = useState([]);
    const whitePlayer = route.params.color === 'white' ? 'player' : 'engine'; 
    const blackPlayer = route.params.color === 'black' ? 'player' : 'engine';
    const [currentMove, setCurrentMove] = useState();
    const [isOpen, setIsOpen] = React.useState(false);
    const onClose = () => setIsOpen(false);
    const opening = route.params.opening;
    const [showModal, setShowModal] = useState(false);
    const [capturedP, setCapturedP]= useState([]);

    useEffect(() => {
        console.log(whitePlayer);
        console.log(opening);
        console.log (route.params.opening);
        console.log({"white": whitePlayer, "opening": opening});
        axios.post(`${API}`, {"white": whitePlayer, "opening": opening,}) // this would return fen string from either opening or engine
        .then((result) => {
            console.log("We are inside the axios post call")
            console.log(result.data.game_id);
            updateGameID(result.data.game_id);
            updateFen(result.data.fen);
            setOldFen(result.data.fen);
            capturedPieces();
        })
        .catch((err) => {
            console.log(err);
        })
    }, []);

    const checkVariation = (info) => {
        if (info !== variation) {
            setVariation(info);
        }
    };

    const confirmMove = () => {
        let newMoveList = moveList;
        newMoveList.push(currentMove);
        updateMoveList(newMoveList);
        console.log({"fen": currentFen, "user_move_list": moveList});
            axios.patch(`${API}/${gameID}`, {"fen": currentFen, "user_move_list": moveList, "white": whitePlayer})
            .then((result) => {
                console.log("We're inside the patch call");
                console.log(result.data.game.fen);
                updateFen(result.data.game.fen);
                setOldFen(result.data.game.fen);
                checkVariation(result.data.game.opening_variation);
                capturedPieces();
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

    const capturedPieces = () => {
        const fenArray = currentFen.split(" ")
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
        console.log(pieces)
        return pieces
    };


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
                <Flex direction="column" align="center" justify="space-evenly" h="95%" w="100%">
                    <Box w="100%">
                        <Button _text={{textAlign: 'center'}} variant={'ghost'} size={'sm'} w={'100%'} onPress={() => setShowModal(true)}>{`Playing ${opening} ${variation} (Click for info)`}</Button>
                        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                            <Modal.Content maxWidth="400px">
                                <Modal.Header>
                                    <Heading size={"md"}>{opening} {variation}</Heading>
                                </Modal.Header>
                                <Modal.Body>
                                    <Text>{variation ? data[opening]["Variations"][variation] : data[opening]["Summary"]}</Text>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="unstyled" onPress={() => {setShowModal(false);}}>GO BACK</Button>
                                </Modal.Footer>
                            </Modal.Content>
                        </Modal>
                        <Box m={2} w="100%" _text={{textTransform: 'capitalize', fontSize: 'md', fontWeight: 'bold'}}>{blackPlayer}</Box>
                        <Box style={{flexDirection: 'row'}}>{capturedPiece("white").map(img => <Image source={img} style={{height: 30, width: 30}}/>)}</Box>
                        <Box w={Math.floor(width / 8) * 8} h={Math.floor(width / 8) * 8}>
                            <ChessBoardRender/>
                        </Box>
                        <Box style={{flexDirection: 'row'}}>{capturedPiece("black").map(img => <Image source={img} style={{height: 30, width: 30}}/>)}</Box>
                        <Box marginY={2} marginX={-2} w="100%" _text={{textTransform: 'capitalize', textAlign: 'right', fontSize: 'md', fontWeight: 'bold'}}>{whitePlayer}</Box>
                    </Box>
                    <Button.Group space={4} mt={4}>
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

export default Opening;



