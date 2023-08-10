import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, useTheme, Image, AlertDialog, Spacer, Flex, HStack, Center, Heading, Box, FlatList } from "native-base";
import 'react-native-gesture-handler';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';


const LoadGame = () => {
        const data = [{
          id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
          fullName: "Aafreen Khan",
          timeStamp: "12:47 PM",
          recentText: "Good Day!",
          avatarUrl: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
        }, {
          id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
          fullName: "Sujitha Mathur",
          timeStamp: "11:11 PM",
          recentText: "Cheer up, there!",
          avatarUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyEaZqT3fHeNrPGcnjLLX1v_W4mvBlgpwxnA&usqp=CAU"
        }, {
          id: "58694a0f-3da1-471f-bd96-145571e29d72",
          fullName: "Anci Barroco",
          timeStamp: "6:22 PM",
          recentText: "Good Day!",
          avatarUrl: "https://miro.medium.com/max/1400/0*0fClPmIScV5pTLoE.jpg"
        }, {
          id: "68694a0f-3da1-431f-bd56-142371e29d72",
          fullName: "Aniket Kumar",
          timeStamp: "8:56 PM",
          recentText: "All the best",
          avatarUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr01zI37DYuR8bMV5exWQBSw28C1v_71CAh8d7GP1mplcmTgQA6Q66Oo--QedAN1B4E1k&usqp=CAU"
        }, {
          id: "28694a0f-3da1-471f-bd96-142456e29d72",
          fullName: "Kiara",
          timeStamp: "12:47 PM",
          recentText: "I will call today.",
          avatarUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU"
        }];
        const [isOpen, setIsOpen] = React.useState(false);
        const onClose = () => setIsOpen(false);

        return <Box safeArea>
            <Heading fontSize="xl" p="4" pb="3">
              All Saved Games
            </Heading>
            <FlatList data={data} renderItem={({
            item
          }) => <Box borderBottomWidth="1" _dark={{
            borderColor: "muted.50"
          }} borderColor="muted.800" safeArea>
            <Flex direction='row' align='center' justify='space-between'>
                <HStack space={3}>
                    <Image height="5" width="5" source={require('../assets/star.png')} alt={"star"}></Image>
                      <Text _dark={{
                  color: "warmGray.50"
                }} color="coolGray.800" bold>
                        Saved Game {item.timeStamp}
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
          </Box>;
};

export default LoadGame;