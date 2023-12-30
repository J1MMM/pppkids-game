import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Pressable } from 'react-native';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';
import playSound from '../../components/PlaySound';
import AntDesign from '@expo/vector-icons/AntDesign';

const ChoicesCard = ({ name, onClick, active, wrong, correct, disabled, sound }) => {
    const scale_ = useSharedValue(1)

    const handlePress = () => {
        playSound(sound)
        scale_.value = 0.8;
        scale_.value = withSpring(1);
        onClick()
    }

    return (
        <Pressable onPress={handlePress} disabled={disabled}>
            <Animated.View style={[{ borderWidth: active ? 3 : 0, borderColor: correct ? '#38D414' : wrong ? 'red' : active ? '#FFF' : '' }, { transform: [{ scale: scale_ }] }, styles.choicesCard,]}>
                <AntDesign name='sound' color={'#FFF'} size={48} />
            </Animated.View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    choicesCard: {
        backgroundColor: '#2F9FF1',
        minWidth: 100,
        height: 85,
        borderRadius: 8,
        shadowColor: "#000",
        padding: 8,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    choicesCardText: {
        fontFamily: 'bold',
        fontSize: 36,
        color: '#3d3d59',
        letterSpacing: 2
    },

})

export default ChoicesCard;
