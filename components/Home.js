import * as React from 'react';
import { useWindowDimensions } from 'react-native';
import Chessboard from 'react-native-chessboard';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, useTheme, Modal, Center, Box, Text, Image, VStack, Flex, Heading } from "native-base";
import 'react-native-gesture-handler';
import {GestureHandlerRootView, NativeViewGestureHandler, gestureHandlerRootHOC} from 'react-native-gesture-handler';

/* TO DOs:
1-3: all completed !
4. fill in about app modal

NICE TO HAVEs:
1. some sort of settings menu to change color scheme */

const Home = ( { navigation }) => {
    const { colors } = useTheme();
    const {height, width} = useWindowDimensions();
    const [showModal, setShowModal] = useState(false);
    const [showModal2, setShowModal2] = useState(false);
    const defaultWidth = Math.floor(width / 10) * 7
    const black = colors['pink'][300]
    const white = colors['pink'][50]

    return (
        <GestureHandlerRootView>
            <Center>
                <Flex alignItems={'center'} justifyContent={'space-evenly'} h="100%">
                <Box marginTop={10}>
                    <Chessboard boardSize={defaultWidth}
                    colors={ {black: black, white: white} }/>
                </Box>
                <VStack w="100%" space={4} px="2" mt="4" alignItems="center" justifyContent="center">
                <Button w={defaultWidth} onPress={() => setShowModal2(true)}>NEW GAME</Button>
                <Button variant="subtle" w={defaultWidth} onPress={() => navigation.navigate('Practice')}>PRACTICE</Button>
                <Button colorScheme="light" variant="subtle" w={defaultWidth} onPress={() => navigation.navigate('Puzzle')}>PUZZLE GAME</Button>
                <Button colorScheme="light" w={defaultWidth} onPress={() => navigation.navigate('Load Game')}>LOAD GAME</Button>
                <Button w={defaultWidth} variant={'ghost'} onPress={() => setShowModal(true)}>ABOUT APP</Button>
                </VStack>
                </Flex>

                <Modal isOpen={showModal2} onClose={() => setShowModal2(false)}>
                    <Modal.Content maxWidth="400px">
                        <Modal.CloseButton />
                        <Modal.Header><Heading>Play as ...</Heading></Modal.Header>
                        <Modal.Body>
                            <Flex direction="row" align="center" justify="space-evenly" w="100%">
                            <Button variant={'subtle'} onPress={() => navigation.navigate('Game', {white: 'player'})}><Image size="sm" source={require('../assets/wp.png')} alt={"white"} /></Button>
                            <Button variant={'subtle'} onPress={() => navigation.navigate('Game', {white: 'engine'})}><Image size="sm" source={require('../assets/bp.png')} alt={"black"} /></Button>
                            </Flex>
                        </Modal.Body>
                        <Modal.Footer>
                        <Button variant='ghost' onPress={() => {setShowModal2(false);}}>GO BACK</Button>
                        </Modal.Footer>
                    </Modal.Content>
                </Modal>

                <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                    <Modal.Content maxWidth="400px">
                        <Modal.CloseButton />
                        <Modal.Header><Heading>About</Heading></Modal.Header>
                        <Modal.Body>
                        <Text fontSize={'md'}>A capstone project created by Kira, Kim, Sarah, and Jasmine.</Text>
                        </Modal.Body>
                        {/* <Modal.Footer>
                        <Button onPress={() => {setShowModal(false);}}>OK</Button>
                        </Modal.Footer> */}
                    </Modal.Content>
                </Modal>
            </Center>
        </GestureHandlerRootView>
    )
};


export default Home;