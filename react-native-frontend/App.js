import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text } from 'react-native';
import 'react-native-gesture-handler';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler'
import Chessboard from 'react-native-chessboard';
import Navigator from './Navigator';
import { NativeBaseProvider, extendTheme } from 'native-base';

export default function App() {
  const theme = extendTheme({
    components: {
      Button: {
        baseStyle: {
          rounded: 'md',
        },
        defaultProps: {
          colorScheme: 'pink',
          size: 'lg',
          _text: {
            fontWeight: 'bold',
            textTransform: 'uppercase',
            letterSpacing: 1,
          }
        },
      },
      Heading: {
        defaultProps: {
          color: '#000000'
        }
      }
    },
  });
  
  return (
    <NativeBaseProvider theme={theme}>
      <NavigationContainer>
        <Navigator/>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
