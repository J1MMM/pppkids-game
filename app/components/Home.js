import React, { useEffect } from 'react';
import { StyleSheet, ImageBackground, } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useAuth } from '../context/AuthContext';
import Header from './Header';
import Watch from '../screens/WatchScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PlayScreen from '../screens/PlayScreen';
import ReadScreen from '../screens/ReadScreen';
import BgMusic from './BgMusic';
import LottieView from 'lottie-react-native'

const bgImage = require('../../assets/images/background.jpg');


const Home = ({ filteredGameList }) => {
    const { confetti, setConfetti, bgmusic, setBgmusic, music } = useAuth();
    const Stack = createNativeStackNavigator()
    useEffect(() => {
        setBgmusic(true)
    }, [])

    return (
        <GestureHandlerRootView style={styles.container} >
            {bgmusic && music && <BgMusic />}
            <ImageBackground source={bgImage} style={styles.bgImage}>
                {
                    confetti && <LottieView
                        source={require('../../assets/json/confetti.json')}
                        autoPlay
                        loop={false}
                        resizeMode='cover'
                        onAnimationFinish={() => setConfetti(false)}

                    />
                }

                <Header />
                <Stack.Navigator
                    initialRouteName='Play'
                    screenOptions={{
                        contentStyle: {
                            backgroundColor: 'transparent',
                            justifyContent: 'center',
                            alignItems: 'center'
                        },
                        headerShown: false,
                        animation: 'slide_from_right'
                    }}
                >
                    <Stack.Screen name="Play">
                        {() => <PlayScreen filteredGameList={filteredGameList} />}
                    </Stack.Screen>
                    <Stack.Screen name="Watch" component={Watch} />
                    <Stack.Screen name="Read" component={ReadScreen} />
                </Stack.Navigator>

            </ImageBackground>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#BBDBFF',
    },
    bgImage: {
        flex: 1,
        resizeMode: 'cover',
    },
})

export default Home;
