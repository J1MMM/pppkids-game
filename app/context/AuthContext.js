import 'react-native-gesture-handler';
import * as SecureStore from 'expo-secure-store';
import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import NetInfo from '@react-native-community/netinfo';

const TOKEN_KEY = 'my-data';
// export const API_URL = 'http://192.168.100.51:3500';
export const API_URL = 'https://capstone-server-kqsi.onrender.com';
const AuthContext = createContext({})

export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({
        id: null,
        stars: null,
        authenticated: false,
        fullname: '',
        learning_disabilities: [],
        gender: ''
    })

    const [games, setGames] = useState([])

    const [lessons, setLessons] = useState([])
    const [videos, setVideos] = useState([])

    const [confetti, setConfetti] = useState(false)
    const [bgmusic, setBgmusic] = useState(true)

    const [music, setMusic] = useState(true)
    const [soundfx, setSound] = useState(true)

    useEffect(() => {

        const loadToken = async () => {

            let storedData = await SecureStore.getItemAsync('my-data');
            // await SecureStore.deleteItemAsync('my-data')
            if (storedData) {
                storedData = await JSON.parse(storedData)
            }

            if (storedData) {
                setAuthState({
                    authenticated: true,
                    fullname: storedData?.fullname,
                    gender: storedData?.gender,
                    id: storedData?.id,
                    learning_disabilities: storedData?.learning_disabilities,
                    stars: storedData?.stars
                });

                NetInfo.fetch().then(state => {
                    if (state.isConnected) {
                        const updateOnline = async () => {
                            await axios.post(`${API_URL}/game`, { id: storedData?.id, stars: storedData?.stars })
                        }
                        updateOnline()
                    }
                })
            }
        }


        loadToken();

    }, [])

    const login = async (email, password) => {
        try {
            const result = await axios.post(`${API_URL}/login`, { email, password });

            setAuthState({
                authenticated: true,
                id: result?.data.foundUser._id,
                stars: result?.data.foundUser.stars,
                fullname: result?.data.fullname,
                learning_disabilities: result?.data.foundUser.learning_disabilities,
                gender: result?.data.foundUser.gender,
            })

            await SecureStore.setItemAsync('my-data', JSON.stringify({
                id: result?.data.foundUser._id,
                stars: result?.data.foundUser.stars,
                fullname: result?.data.fullname,
                learning_disabilities: result?.data.foundUser.learning_disabilities,
                gender: result?.data.foundUser.gender,
            }))

        } catch (error) {
            return { error: true, msg: error?.response?.data?.message }
        }
    }

    const logout = async () => {
        // axios.defaults.headers.common['Authorization'] = '';
        await SecureStore.deleteItemAsync(TOKEN_KEY);
        setAuthState({
            authenticated: false,
            id: null,
            fullname: '',
            gender: '',
            learning_disabilities: [],
            stars: null,

        })
        setLessons([])
        setVideos([])
        setGames([])
        setConfetti(false)
        setBgmusic(false)
    }

    const value = {
        authState,
        setAuthState,
        onLogin: login,
        onLogout: logout,
        lessons,
        setLessons,
        videos,
        setVideos,
        music,
        soundfx,
        setMusic,
        setSound,
        confetti,
        setConfetti,
        games,
        setGames,
        bgmusic,
        setBgmusic
    };


    return <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
}