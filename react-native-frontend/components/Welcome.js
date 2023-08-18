import * as React from 'react';
import { useWindowDimensions } from 'react-native';
import { Center, Button, Image } from 'native-base';


const Welcome = ({ navigation }) => {
    const { height, width } = useWindowDimensions();
    return (
        <Center h='100%'>
            <Image source={require('../assets/splash-text.png')} alt={""}
            style={{ flex: 1, width: width, resizeMode: 'center' }}/>
            <Button 
            w={width / 1.25} 
            m={6} 
            _text={{fontWeight: 'bold', letterSpacing: '1'}} 
            onPress={() => navigation.navigate('Home')}>
                GET STARTED
            </Button>
        </Center>
    )
}


export default Welcome;