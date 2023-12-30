import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import MenuCard from '../components/MenuCard';
import { FlatList } from 'react-native-gesture-handler';
import playSound from '../components/PlaySound';

const PlayScreen = ({ filteredGameList }) => {
    return (
        <FlatList
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ alignItems: 'center' }}
            data={filteredGameList}
            overScrollMode='auto'
            horizontal
            onScrollBeginDrag={() => playSound(require('../../assets/audio/scroll.wav'))}
            renderItem={({ item }) => {
                return <MenuCard
                    key={item?.id}
                    item={item}
                />
            }}
        />
    );
}

const styles = StyleSheet.create({})

export default PlayScreen;
