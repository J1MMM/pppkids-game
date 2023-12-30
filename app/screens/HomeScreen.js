import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Setting from './SettingScreen';
import Home from '../components/Home';
import GameList from '../model/GameList';
import CountingObjects from '../game/CountingObjects';
import LessonViewer from './LessonViewer';
import WhatYouHear from '../game/WhatYouHear';
import PauseScreen from './PauseScreen';
import ChoosLetter from '../game/ChoosLetter';
import VideoViewer from './VideoViewer';
import HearVowls from '../game/HearVowels';
import BasicWords from '../game/BasicWords';
import Homophones from '../game/Homophones';
import ReadWord from '../game/ReadTheWord';
import CountSixToTen from '../game/CountSixToTen';
import CountElevenToFifteen from '../game/CountElevenToFifteen';
import CountSixteenToTwenty from '../game/CountSixteenToTwenty';
import CountTwentyOneToTwentyFive from '../game/CountTwentyOneToTwentyFive';
import FillTheBlank1 from '../game/FillTheBlank1';
import FillTheBlank2 from '../game/FillTheBlank2';
import FillTheBlank3 from '../game/FillTheBlank3';
import FillTheBlank4 from '../game/FillTheBlank4';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = () => {
    const { authState, games, setGames } = useAuth()
    const Stack = createNativeStackNavigator()
    const [filteredGameList, setFilteredGameList] = useState([])

    useEffect(() => {
        setFilteredGameList([]);

        const getGameData = async () => {
            try {
                const storedLevelData = await AsyncStorage.getItem(authState?.id);
                // await AsyncStorage.clear(storedLevelData)
                if (storedLevelData) {
                    setGames(JSON.parse(storedLevelData))
                } else {
                    setGames(GameList)
                    await AsyncStorage.setItem(authState?.id, JSON.stringify(GameList))
                }
            } catch (error) {
                console.log(error);
            }
        }
        getGameData()

    }, [])

    useEffect(() => {
        setFilteredGameList([])
        games?.map(game => {
            if (game.subject == 'reading' && authState.learning_disabilities.find(item => item == 'dyslexia')) {
                setFilteredGameList(prev => ([...prev, game]))
            }
            if (game.subject == 'writing' && authState.learning_disabilities.find(item => item == 'dysgraphia')) {
                setFilteredGameList(prev => ([...prev, game]))
            }
            if (game.subject == 'math' && authState.learning_disabilities.find(item => item == 'dyscalculia')) {
                setFilteredGameList(prev => ([...prev, game]))
            }
        })
    }, [games])

    return (
        <Stack.Navigator screenOptions={{
            orientation: 'landscape',
            headerShown: false,
            statusBarHidden: true,
            navigationBarHidden: true,
        }}>
            <Stack.Screen name='Home'>
                {() => <Home filteredGameList={filteredGameList} />}
            </Stack.Screen>
            <Stack.Screen
                name='Setting'
                options={{
                    animation: 'fade',
                    presentation: 'transparentModal',
                }} >
                {() => <Setting />}
            </Stack.Screen>
            <Stack.Screen
                name='ViewLesson'
                options={{
                    animation: 'slide_from_bottom',
                    presentation: 'transparentModal',
                }}

            >
                {() => <LessonViewer />}
            </Stack.Screen>
            <Stack.Screen
                name='ViewVideo'
                options={{
                    animation: 'slide_from_bottom',
                    presentation: 'transparentModal',
                }}

            >
                {() => <VideoViewer />}
            </Stack.Screen>
            <Stack.Screen name='HearVowels' component={HearVowls} />
            <Stack.Screen name='BasicWords' component={BasicWords} />
            <Stack.Screen name='WhatYouHear' component={WhatYouHear} />
            <Stack.Screen name='Homophones' component={Homophones} />
            <Stack.Screen name='ReadWord' component={ReadWord} />

            <Stack.Screen name='CountingObjects' component={CountingObjects} />
            <Stack.Screen name='CountSixToTen' component={CountSixToTen} />
            <Stack.Screen name='CountElevenToFifteen' component={CountElevenToFifteen} />
            <Stack.Screen name='CountSixteenToTwenty' component={CountSixteenToTwenty} />
            <Stack.Screen name='CountTwentyOneToTwentyFive' component={CountTwentyOneToTwentyFive} />

            <Stack.Screen name='ChoosLetter' component={ChoosLetter} />
            <Stack.Screen name='FillTheBlank1' component={FillTheBlank1} />
            <Stack.Screen name='FillTheBlank2' component={FillTheBlank2} />
            <Stack.Screen name='FillTheBlank3' component={FillTheBlank3} />
            <Stack.Screen name='FillTheBlank4' component={FillTheBlank4} />

            <Stack.Screen name='Pause' component={PauseScreen} options={{ presentation: 'transparentModal' }} />
        </Stack.Navigator>
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

export default HomeScreen;
