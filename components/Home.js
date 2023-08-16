import * as React from 'react';
import { useWindowDimensions } from 'react-native';
import Chessboard from 'react-native-chessboard';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, useTheme, Modal, Center, Box, Text, Image } from "native-base";
import 'react-native-gesture-handler';
import {GestureHandlerRootView, NativeViewGestureHandler, gestureHandlerRootHOC} from 'react-native-gesture-handler';

/* TO DOs:
1. change styling to match Figma and be consistent
2. fix button spacing !!! !! !
3. replace chessboard with image or something bc i'm tired
4. fill in about app modal

NICE TO HAVEs:
1. some sort of settings menu to change color scheme */

const Home = ( { navigation }) => {
    const {height, width} = useWindowDimensions();
    const [showModal, setShowModal] = useState(false);
    const [showModal2, setShowModal2] = useState(false);

    return (
        <GestureHandlerRootView>
            <Center>
                <Box marginTop={10}>
                    <Chessboard boardSize={Math.floor(width / 10) * 10}/>
                </Box>
                <Button marginTop={3} onPress={() => setShowModal2(true)}>NEW GAME</Button>
                <Modal isOpen={showModal2} onClose={() => setShowModal2(false)}>
                    <Modal.Content maxWidth="400px">
                        <Modal.CloseButton />
                        <Modal.Header>Play as:</Modal.Header>
                        <Modal.Body>
                            <Button.Group space={3}>
                            <Button onPress={() => navigation.navigate('Game', {white: 'player'})}><Image size="xs" source={require('../assets/wp.png')} alt={"white"} /></Button>
                            <Button onPress={() => navigation.navigate('Game', {white: 'engine'})}><Image size="xs" source={require('../assets/bp.png')} alt={"black"} /></Button>
                            </Button.Group>
                        </Modal.Body>
                        <Modal.Footer>
                        <Button variant='ghost' onPress={() => {setShowModal2(false);}}>GO BACK</Button>
                        </Modal.Footer>
                    </Modal.Content>
                </Modal>
                <Button onPress={() => navigation.navigate('Practice')}>PRACTICE</Button>
                <Button onPress={() => navigation.navigate('Puzzle')}>Puzzle Game</Button>
                <Button onPress={() => navigation.navigate('Load Game')}>LOAD GAME</Button>
                <Button variant={'ghost'} onPress={() => setShowModal(true)}>ABOUT APP</Button>
                <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                    <Modal.Content maxWidth="400px">
                        <Modal.CloseButton />
                        <Modal.Header>About This App</Modal.Header>
                        <Modal.Body>
                        <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
                            nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
                            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla 
                            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in 
                            culpa qui officia deserunt mollit anim id est laborum.</Text>
                        </Modal.Body>
                        <Modal.Footer>
                        <Button onPress={() => {setShowModal(false);}}>OK</Button>
                        </Modal.Footer>
                    </Modal.Content>
                </Modal>
            </Center>
        </GestureHandlerRootView>
    )
};


export default Home;