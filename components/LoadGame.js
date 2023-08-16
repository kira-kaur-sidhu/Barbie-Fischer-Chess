import * as React from 'react';
import axios from 'axios';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, useTheme, Image, AlertDialog, Spacer, Flex, HStack, Center, Heading, Box, FlatList } from "native-base";
import 'react-native-gesture-handler';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';

/* THIS WHOLE PAGE IS A NICE TO HAVE LOL 
but if you do want to work on it:

1. attach API DELETE call to delete button
2. create API GET to get all saved games
3. create button to resume game (???? idk how to do that tho ???) */

const LoadGame = () => {
    const [savedGames, setSavedGames] = useState([]);
    const API = 'https://barbie-fischer-chess.onrender.com/games'
    const [isOpen, setIsOpen] = React.useState(false);
    const onClose = () => setIsOpen(false);

    // getting [AxiosError: Network Error]
    useEffect(() => {
      console.log('im inside useEffect');
      axios.get(`${URL}`)
      .then((result) => {
        console.log('im inside the GET request')
        const newGames = result.data.map((game) => {
          return {
            id: game.game_id,
            fen: game.fen,
            opening: game.opening
          };
        });
        setSavedGames(newGames);
      })
      .catch((err) => {
        console.log(err);
      })
    }, []);

    return (
      <Box safeArea>
        <Heading fontSize="xl" p="4" pb="3">
          All Saved Games
        </Heading>
        <FlatList data={savedGames} renderItem={({item}) => <Box borderBottomWidth="1" _dark={{
            borderColor: "muted.50"
          }} borderColor="muted.800" safeArea>
            <Flex direction='row' align='center' justify='space-between'>
                <HStack space={3}>
                    <Image height="5" width="5" source={require('../assets/star.png')} alt={"star"}></Image>
                      <Text _dark={{
                  color: "warmGray.50"
                }} color="coolGray.800" bold>
                        Saved Game {item.id}
                      </Text>
                      </HStack>
                    <Spacer />
                    <Button variant={'ghost'} colorScheme="danger" onPress={() => setIsOpen(!isOpen)}>
                    <Image height="5" width="5" source={require('../assets/trash.png')} alt={"trash"}></Image>
                    </Button>
                    </Flex>
                </Box>} keyExtractor={item => item.id} />
                <Center>
          <AlertDialog isOpen={isOpen} onClose={onClose}>
            <AlertDialog.Content>
              <AlertDialog.CloseButton />
              <AlertDialog.Header>Delete Game</AlertDialog.Header>
              <AlertDialog.Body>
                This will remove all data relating to this game. This action cannot be
                reversed. Deleted data can not be recovered.
              </AlertDialog.Body>
              <AlertDialog.Footer>
                <Button.Group space={2}>
                  <Button variant="unstyled" colorScheme="coolGray" onPress={onClose}>
                    Cancel
                  </Button>
                  <Button colorScheme="danger" onPress={onClose}>
                    Delete
                  </Button>
                </Button.Group>
              </AlertDialog.Footer>
            </AlertDialog.Content>
          </AlertDialog>
        </Center>
          </Box>)
};

export default LoadGame;