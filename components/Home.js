import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import 'react-native-gesture-handler';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';


const Home = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Image 
            style={styles.imageView}
            source={require('../assets/splash-text.png')}
            />
            <View style={styles.buttonView}>
                <Button
                    color='#ED1B80'
                    title="Get Started"
                    onPress={() => navigation.navigate('Practice')}
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
    imageView: {
        flex: 1,
        resizeMode: 'center',
    },
    buttonView: {
        paddingBottom: 50,
        width: '70%',
    }
});

export default Home;