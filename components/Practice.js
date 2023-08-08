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
    const [opening, chooseOpening] = useState();
    const theme = useTheme();

    return (
        <Center>
            <Button onPress={() => setShowModal(true)}>Queen's Gambit</Button>
            <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                <Modal.Content maxWidth="400px">
                    <Modal.CloseButton />
                    <Modal.Header>Queen's Gambit</Modal.Header>
                    <Modal.Body>
                
                    </Modal.Body>
                    <Modal.Footer>
                    <Button onPress={() => {setShowModal(false);}}>OK</Button>
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
                    <Button onPress={() => {setShowModal2(false);}}>OK</Button>
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
                    <Button onPress={() => {setShowModal3(false);}}>OK</Button>
                    </Modal.Footer>
                </Modal.Content>
            </Modal>
        </Center>
    )
};


export default Practice;