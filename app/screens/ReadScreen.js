import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Pressable } from 'react-native';
import LoadingScreen from './LoadingScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FlatList } from 'react-native-gesture-handler';
import axios from 'axios';
import { API_URL, useAuth } from '../context/AuthContext';
import ReadCard from '../components/ReadCard';
import EmptyScreen from './EmptyScreen';


const ReadScreen = () => {
    const Stack = createNativeStackNavigator()
    const { authState, lessons, setLessons } = useAuth()
    const [empty, setEmpty] = useState(false)

    useEffect(() => {

        const getData = async () => {
            try {
                const result = await axios.post(
                    `${API_URL}/lesson`,
                    {
                        id: authState.id,
                        disabilities: authState.learning_disabilities,
                        videoOnly: false
                    }
                );

                if (result?.data?.length == 0) {
                    setEmpty(true)
                    return
                }
                setEmpty(false)

                setLessons(result?.data)
            } catch (error) {
                console.log(error);
            }
        }

        getData()

    }, [])

    if (lessons?.length == 0 && !empty) {
        return <LoadingScreen />
    }

    if (empty) {
        return <EmptyScreen />
    }

    return (
        <FlatList
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ alignItems: 'center' }}
            data={lessons}
            overScrollMode='auto'
            horizontal
            // onScrollBeginDrag={() => { sound.play() }}
            renderItem={({ item }) => {
                return <ReadCard
                    key={item.id}
                    item={item}
                />
            }}
        />
    );
}

const styles = StyleSheet.create({

})

export default ReadScreen;
