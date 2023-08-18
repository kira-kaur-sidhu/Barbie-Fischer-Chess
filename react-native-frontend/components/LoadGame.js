import * as React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Button, Image, AlertDialog, Spacer, Text, Flex, HStack, Center, Heading, Box, FlatList } from "native-base";
import 'react-native-gesture-handler';


const LoadGame = ({navigation}) => {
    const [savedGames, setSavedGames] = useState([]);
    const [gameID, setGameID] = useState();
    const API = 'https://barbie-fischer-chess.onrender.com/games'
    const [isOpen, setIsOpen] = React.useState(false);
    const onClose = () => setIsOpen(false);

    // getting [AxiosError: Network Error]
    useEffect(() => {
      console.log('im inside useEffect');
      getAllGames();
    }, []);

    const getAllGames = () => {
      axios.get(`${API}`)
      .then((result) => {
        console.log('im inside the GET request');
        console.log(result.data);
        const newGames = result.data.map((game) => {
          return {
            id: game.game_id,
            fen: game.fen,
            opening: game.opening, 
            white: game.white,
            userMoveList: game.user_move_list
          };
        }).reverse();
        setSavedGames(newGames);
      })
      .catch((err) => {
        console.log(err);
      })
    };

    const deleteGame = () => {
      console.log("We're inside the delete game function"); 
      console.log(gameID)
      axios.delete(`${API}/${gameID}`)
      .then((result) => {
          console.log("We're inside the axios delete call"); 
          console.log(result.data);
          getAllGames();
          setIsOpen(!isOpen);
      })
      .catch((err) => {
          console.log(err); 
      })
  }

    return (
      <Box p={2} safeArea>
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
                    <Button.Group>
                    <Button variant={'subtle'} colorScheme="success" onPress={() => {navigation.navigate('PlayLoadGame', {id: item.id})}}>
                    <Image height="5" width="5" source={require('../assets/check.png')} alt={"checkmark"}></Image>
                    </Button>
                    <Button variant={'subtle'} colorScheme="danger" onPress={() => {setIsOpen(!isOpen); setGameID(item.id);}}>
                    <Image height="5" width="5" source={require('../assets/trash.png')} alt={"trash"}></Image>
                    </Button>
                    </Button.Group>
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
                  <Button colorScheme="danger" onPress={deleteGame}>
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