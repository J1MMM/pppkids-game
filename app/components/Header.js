import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Pressable, Image, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Animated, { useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import { useAuth } from '../context/AuthContext';
import playSound from './PlaySound';

const Header = () => {
    const { authState, setConfetti } = useAuth()
    const navigate = useNavigation()
    const AnimatedText = Animated.createAnimatedComponent(Text);
    const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
    const scale = useSharedValue(1);

    const btn1TextSize = useSharedValue(16);
    const btn2TextSize = useSharedValue(0);
    const btn3TextSize = useSharedValue(0);

    const [fullname, setFullname] = useState()
    const [stars, setStars] = useState()

    const onSettingPress = () => {
        playSound(require('../../assets/audio/selected.wav'))
        scale.value = 0.8;
        scale.value = withSpring(1);

        navigate.navigate('Setting')
    }

    const handleNavPress = (loc) => {
        navigate.navigate(loc);
        setConfetti(false)
        switch (loc) {
            case 'Play': {
                btn1TextSize.value = withTiming(16, { duration: 300 })
                btn2TextSize.value = withTiming(0, { duration: 300 })
                btn3TextSize.value = withTiming(0, { duration: 300 })
                break;
            }
            case 'Watch': {
                btn1TextSize.value = withTiming(0, { duration: 200 })
                btn2TextSize.value = withTiming(16, { duration: 200 })
                btn3TextSize.value = withTiming(0, { duration: 200 })
                break;
            }
            case 'Read': {
                btn1TextSize.value = withTiming(0, { duration: 200 })
                btn2TextSize.value = withTiming(0, { duration: 200 })
                btn3TextSize.value = withTiming(16, { duration: 200 })
                break;
            }
        }
    }

    useEffect(() => {
        setFullname(authState?.fullname)
        setStars(authState?.stars)
    }, [authState])

    return (
        <View style={styles.header}>
            <View style={styles.avatarContainer}>
                <View style={{ width: 42, height: 42, borderWidth: 2, borderColor: '#3d3d59', borderRadius: 50 }}>
                    <Image source={require('../../assets/images/pfp.png')} style={{ width: '100%', height: '100%', resizeMode: 'cover' }} />
                </View>
                <View style={{ alignItems: 'flex-start' }}>
                    <Text style={styles.avatarText}>{fullname}</Text>
                    <View style={styles.starBadge}>
                        <Image source={require('../../assets/images/star.png')} style={{ width: 24, height: 24, marginLeft: -5 }} />
                        <Text style={styles.starBadgeText}>{stars}</Text>
                    </View>
                </View>
            </View>

            <View style={styles.nav}>
                <Pressable style={[styles.navBtn, { backgroundColor: '#68DD1C' }]} onPress={() => { handleNavPress('Play') }}>
                    <Image source={require('../../assets/images/gameIcon.png')} style={styles.navImg} />
                    <AnimatedText style={[styles.navText, { fontSize: btn1TextSize }]}>Play</AnimatedText>
                </Pressable>

                <Pressable style={[styles.navBtn, { backgroundColor: '#e44c4c' }]} onPress={() => { handleNavPress('Watch') }}>
                    <Image source={require('../../assets/images/videoIcon.png')} style={[styles.navImg, { tintColor: '#FFF' }]} />
                    <AnimatedText style={[styles.navText, { fontSize: btn2TextSize }]}>Watch</AnimatedText>
                </Pressable>

                <Pressable style={[styles.navBtn, { backgroundColor: '#e393f1' }]} onPress={() => { handleNavPress('Read') }}>
                    <Image source={require('../../assets/images/bookIcon.png')} style={styles.navImg} />
                    <AnimatedText style={[styles.navText, { fontSize: btn3TextSize }]}>Read</AnimatedText>
                </Pressable>
            </View>


            <AnimatedPressable onPress={onSettingPress} style={[{ transform: [{ scale: scale }] }, styles.settingBtn]}>
                <Image source={require('../../assets/images/settings.png')} style={{ tintColor: '#FFF', width: 24, height: 24 }} />
            </AnimatedPressable>
        </View >
    );
}

const styles = StyleSheet.create({
    header: {
        // borderWidth: 1,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        paddingBottom: 0
    },

    settingBtn: {
        backgroundColor: '#3d3d59',
        padding: 8,
        borderRadius: 8
    },

    nav: {
        flexDirection: 'row',
        gap: 8
    },

    navBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        borderRadius: 50,
    },

    navImg: {
        width: 26,
        height: 26,
        marginLeft: 8,
    },

    navText: {
        fontFamily: 'bold',
        letterSpacing: 1,
        marginLeft: 8,
    },
    starBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#3d3d59',
        borderRadius: 50,
        paddingHorizontal: 8

    },
    starBadgeText: {
        color: '#FFF',
        fontSize: 16,
        fontFamily: 'bold',
        letterSpacing: 1,
    },
    avatarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 3,
    },
    avatarText: {
        fontFamily: 'bold',
        letterSpacing: 1,
        fontSize: 18,
        color: '#3d3d59'
    }

})

export default Header;
