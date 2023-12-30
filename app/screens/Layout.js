import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import * as NavigationBar from 'expo-navigation-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { useAuth } from '../context/AuthContext';
import Login from './LoginScreen';
import HomeScreen from './HomeScreen';
import Splash from './SplashScreen';

const Stack = createNativeStackNavigator();
const boldFont = require("../../assets/fonts/VAGRoundedStd-Black.otf");
const regularFont = require("../../assets/fonts/VAGRoundedRegular.ttf");

const Layout = () => {
    const { authState, onLogout } = useAuth();
    const [isLoading, setIsLoading] = useState(true)

    const useStickyImmersiveReset = function () {
        const visibility = NavigationBar.useVisibility();
        useEffect(() => {
            if (visibility === "visible") {
                NavigationBar.setPositionAsync('absolute')
                NavigationBar.setVisibilityAsync("hidden");
            }
        }, [visibility]);
    }();

    // defining custom fonts 
    const [fontsLoaded] = useFonts({
        "bold": boldFont,
        "regular": regularFont,
    });
    // display splash screen when font not ready 
    useEffect(() => {
        async function prepare() {
            await SplashScreen.preventAutoHideAsync();
        }
        prepare()
    }, [])

    // hide splash screen when font is ready NOTE: It required always at the bottom of all function idk
    if (!fontsLoaded) {
        return undefined
    } else {
        SplashScreen.hideAsync();
    }

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{
                orientation: 'landscape',
                headerShown: false,
                statusBarHidden: true,
                navigationBarHidden: true,
                animation: 'fade'
            }}>
                {
                    isLoading ?
                        <Stack.Screen name='Splash'>
                            {() => <Splash setIsLoading={setIsLoading} />}
                        </Stack.Screen> :
                        authState?.authenticated ?
                            <Stack.Screen
                                name='HomeScreen'
                                component={HomeScreen}
                            ></Stack.Screen>
                            :
                            <Stack.Screen name='Login' component={Login} />
                }
            </Stack.Navigator>
            <StatusBar hidden />
            {/* <BgMusic /> */}
        </NavigationContainer>
    )
}

const styles = StyleSheet.create({})

export default Layout;
