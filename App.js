import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler'
import {gestureHandlerRootHOC} from 'react-native-gesture-handler'
import Chessboard from 'react-native-chessboard';

export default function App() {
  const ExampleWithHoc = gestureHandlerRootHOC(() => (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
      <Chessboard
        colors={ {black: 'pink', white: 'white'} }
      />
    </View>
  ));
  return (
    <ExampleWithHoc/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
