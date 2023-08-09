import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';
import {GestureHandlerRootView, gestureHandlerRootHOC} from 'react-native-gesture-handler';
import Chessboard from 'react-native-chessboard';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';


// useEffect(() => {
//     axios.get(`${API}/board`) // this would return fen string from either opening or engine
//     .then((result) => {
//         updateFen(result.data);
//     })
//     .catch((err) => {
//         console.log(err);
//     })
//     }, []);

const Opening = ({ route, navigation }) => {
    const initialFen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
    const API = 'https://barbie-fischer-chess.onrender.com'
    const [currentFen, updateFen] = useState(initialFen); 
    const [gameID, updateGameID] = useState();
    const whitePlayer = route.color === 'white' ? 'user' : 'engine'; 
    
    useEffect(() => {
        axios.post(`${API}/games`, {"white": "engine", "opening": "Queen's Gambit" }) // this would return fen string from either opening or engine
        .then((result) => {
            console.log("We're inside the axios post call")
            console.log(result.data.fen);
            updateFen(result.data.fen);
            updateGameID(result.data.game_id);
            console.log(result.data.game_id);
            // store game id in a var to use in patch request
        })
        .catch((err) => {
            console.log(err);
        })
    }, []);

    const getEngineMove = (fen) => {
        console.log("Were in get Engine move function")
        // console.log(fen);
        axios.patch(`${API}/games/${gameID}`, {"fen": fen})
        .then((result) => {
            console.log("We're inside the axios patch call")
            
            console.log(result.data);
            updateFen(result.data.game.fen);
            // const newFen = fen
        })
        .catch((err) => {
            console.log(err); 
        })
    };
    
    const ChessBoardRender = gestureHandlerRootHOC(() => (
            <Chessboard
                colors={ {black: '#F3BAD5', white: '#FFFBFB'} }
                fen={ currentFen } 
                onMove={({ state }) => {getEngineMove(state.fen)}}
            />
        )
    );

    return (
        <GestureHandlerRootView>
            <View style={styles.container}>
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
            </View>
        </GestureHandlerRootView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },
    chessBox: {
    },
    chessWrapTop: {
        backgroundColor: '#F3BAD5',
        height: 50,
        width: '100%',
    },
    chessWrapBottom: {
        backgroundColor: '#F3BAD5',
        height: 50,
        width: '100%',
        marginTop: 405,
    },
    buttons: {
        padding: 10,
        margin: 20,
    },
    space: {
        width: 20,
        height: 20,
    },
});


export default Opening;