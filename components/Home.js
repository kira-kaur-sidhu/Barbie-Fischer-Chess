import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button} from 'react-native';
import 'react-native-gesture-handler';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';


const Home = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.text}>LET'S</Text>
                <Text style={styles.text}>  CHANGE</Text>
                <Text style={styles.text}>THE FACE</Text>
                <Text style={styles.text}>   OF</Text>
            </View>
            <View>
                <Button
                    title="Get Started"
                    onPress={() => navigation.navigate('Game')}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textContainer: {
        flexDirection: 'column',
        paddingBottom: 80,
    },
    text: {
        fontSize: 80,
        fontWeight: 'bold',
        padding: 0,
        margin: 0,
        includeFontPadding:false
    },
    button: {
        margin: 20,
    }
});

export default Home;