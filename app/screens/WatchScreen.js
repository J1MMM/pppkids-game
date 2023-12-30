import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import axios from 'axios';
import { API_URL, useAuth } from '../context/AuthContext';
import { FlatList } from 'react-native-gesture-handler';
import LoadingScreen from './LoadingScreen';
import WatchCard from '../components/WatchCard';
import EmptyScreen from './EmptyScreen';

const Watch = () => {
    const { setVideos, videos, authState } = useAuth()
    const [empty, setEmpty] = useState(false)

    useEffect(() => {
        const getData = async () => {
            try {
                const result = await axios.post(
                    `${API_URL}/lesson`,
                    {
                        id: authState.id,
                        disabilities: authState.learning_disabilities,
                        videoOnly: true
                    }
                );

                if (result?.data?.length == 0) {
                    setEmpty(true)
                    return
                }
                setEmpty(false)
                setVideos(result?.data)
            } catch (error) {
                console.log(error);
            }
        }

        getData()
    }, [])

    if (videos?.length == 0 && !empty) {
        return <LoadingScreen />
    }

    if (empty) {
        return <EmptyScreen />
    }

    return (
        <FlatList
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ alignItems: 'center' }}
            data={videos}
            overScrollMode='auto'
            horizontal
            // onScrollBeginDrag={() => { sound.play() }}
            renderItem={({ item }) => {
                return <WatchCard
                    key={item.id}
                    item={item}
                />
            }}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'red',
        flex: 1,
        width: '100%'
    }
})

export default Watch;
