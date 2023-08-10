import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, useTheme, Modal, Center, Image, Flex, Heading, Box } from "native-base";
import 'react-native-gesture-handler';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';



const Practice = ({ navigation }) => {
    const [showModal, setShowModal] = useState(false);
    const [showModal2, setShowModal2] = useState(false);
    const [showModal3, setShowModal3] = useState(false);
    const [colorChoice, setColorChoice] = useState();
    const [openingChoice, setOpening] = useState();
    const theme = useTheme();

    const pickColor = (color) => {
        setColorChoice(color);
        console.log(color)
        console.log(colorChoice)
};

    const pickOpening = (name) => {
            setOpening(name);
            setShowModal(false);
            setShowModal2(false);
            setShowModal3(false);
            console.log(name)
            console.log(openingChoice)
    };

    return (
        <Center>
            <Box h="100%" safeArea>
            <Box h="30%">
            <Heading>Choose a color:</Heading>
            <Flex direction="row" align="center" justify="space-evenly" h="70%">
            <Button isDisabled={true} onPress={() => pickColor("White")}><Image size="sm" source={require('../assets/wp.png')} alt={"white"} /></Button>
            <Button onPress={() => pickColor("Black")}><Image size="sm" source={require('../assets/bp.png')} alt={"black"} /></Button>
            </Flex>
            </Box>
            <Box h="50%">
            <Heading>Choose an opening to play against:</Heading>
            <Flex direction="column" align="center" justify="space-evenly" h="70%">
            <Button onPress={() => setShowModal(true)}>Queen's Gambit</Button>
            <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                <Modal.Content maxWidth="400px">
                    <Modal.CloseButton />
                    <Modal.Header><Heading size={"md"}>Queen's Gambit</Heading></Modal.Header>
                    <Modal.Body>
                
                    </Modal.Body>
                    <Modal.Footer>
                        <Button.Group space={2}>
                            <Button variant="unstyled" onPress={() => {setShowModal(false);}}>GO BACK</Button>
                            <Button onPress={() => {pickOpening("Queen's Gambit")}}>CHOOSE</Button>
                        </Button.Group>
                    </Modal.Footer>
                </Modal.Content>
            </Modal>
        
            <Button onPress={() => setShowModal2(true)}>Fried Liver</Button>
            <Modal isOpen={showModal2} onClose={() => setShowModal2(false)}>
                <Modal.Content maxWidth="400px">
                    <Modal.CloseButton />
                    <Modal.Header><Heading size={"md"}>Fried Liver</Heading></Modal.Header>
                    <Modal.Body>
                
                    </Modal.Body>
                    <Modal.Footer>
                        <Button.Group space={2}>
                            <Button variant="unstyled" onPress={() => {setShowModal(false);}}>GO BACK</Button>
                            <Button onPress={() => {pickOpening("Fried Liver")}}>CHOOSE</Button>
                        </Button.Group>
                    </Modal.Footer>
                </Modal.Content>
            </Modal>

            <Button onPress={() => setShowModal3(true)}>Ruy Lopez</Button>
            <Modal isOpen={showModal3} onClose={() => setShowModal3(false)}>
                <Modal.Content maxWidth="400px">
                    <Modal.CloseButton />
                    <Modal.Header><Heading size={"md"}>Ruy Lopez</Heading></Modal.Header>
                    <Modal.Body>
                
                    </Modal.Body>
                    <Modal.Footer>
                        <Button.Group space={2}>
                            <Button variant="unstyled" onPress={() => {setShowModal(false);}}>GO BACK</Button>
                            <Button onPress={() => {pickOpening("Ruy Lopez")}}>CHOOSE</Button>
                        </Button.Group>
                    </Modal.Footer>
                </Modal.Content>
            </Modal>
            </Flex>
            </Box>
            <Flex direction="column" height="15%" align="center" justify="space-evenly">
            <Text>You're playing as {colorChoice}</Text>
            <Text>The opening is {openingChoice}</Text>
            <Button onPress={() => navigation.navigate('Opening', {opening: openingChoice, color: colorChoice,})}>START PLAYING</Button>
            </Flex>
            </Box>
        </Center>
    )
};


export default Practice;