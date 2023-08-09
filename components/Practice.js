import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, useTheme, Modal, Center, Image } from "native-base";
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
            <Text>Choose a color:</Text>
            <Button onPress={() => pickColor("white")} bgColor={"white"}><Image source={require('../assets/favicon.png')} alt={"white"} /></Button>
            <Button onPress={() => pickColor("black")} bgColor={"black"}><Image source={require('../assets/favicon.png')} alt={"black"} /></Button>
            <Text>Choose an opening to play ( or play against?):</Text>
            <Button onPress={() => setShowModal(true)}>Queen's Gambit</Button>
            <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                <Modal.Content maxWidth="400px">
                    <Modal.CloseButton />
                    <Modal.Header>Queen's Gambit</Modal.Header>
                    <Modal.Body>
                
                    </Modal.Body>
                    <Modal.Footer>
                        <Button.Group space={2}>
                            <Button onPress={() => {setShowModal(false);}}>GO BACK</Button>
                            <Button onPress={() => {pickOpening("Queen's Gambit")}}>CHOOSE</Button>
                        </Button.Group>
                    </Modal.Footer>
                </Modal.Content>
            </Modal>
        
            <Button onPress={() => setShowModal2(true)}>Fried Liver</Button>
            <Modal isOpen={showModal2} onClose={() => setShowModal2(false)}>
                <Modal.Content maxWidth="400px">
                    <Modal.CloseButton />
                    <Modal.Header>Fried Liver</Modal.Header>
                    <Modal.Body>
                
                    </Modal.Body>
                    <Modal.Footer>
                        <Button.Group space={2}>
                            <Button onPress={() => {setShowModal(false);}}>GO BACK</Button>
                            <Button onPress={() => {pickOpening("Fried Liver")}}>CHOOSE</Button>
                        </Button.Group>
                    </Modal.Footer>
                </Modal.Content>
            </Modal>

            <Button onPress={() => setShowModal3(true)}>Ruy Lopez</Button>
            <Modal isOpen={showModal3} onClose={() => setShowModal3(false)}>
                <Modal.Content maxWidth="400px">
                    <Modal.CloseButton />
                    <Modal.Header>Ruy Lopez</Modal.Header>
                    <Modal.Body>
                
                    </Modal.Body>
                    <Modal.Footer>
                        <Button.Group space={2}>
                            <Button onPress={() => {setShowModal(false);}}>GO BACK</Button>
                            <Button onPress={() => {pickOpening("Ruy Lopez")}}>CHOOSE</Button>
                        </Button.Group>
                    </Modal.Footer>
                </Modal.Content>
            </Modal>
            <Text>You're playing as {colorChoice}.</Text>
            <Text>The opening is {openingChoice}.</Text>
            <Button onPress={() => navigation.navigate('Opening', {opening: openingChoice, color: colorChoice,})}>START PLAYING</Button>
        </Center>
    )
};


export default Practice;