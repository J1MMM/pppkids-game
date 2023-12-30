import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { View, StyleSheet, Text, Dimensions, Pressable } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import { useAuth } from '../context/AuthContext';
import IconButton from '../components/IconButton';
import Checkbox from 'expo-checkbox';
import PoppingView from '../components/PoppingView';

const windowWidth = Dimensions.get('window').width;
const containerWidth = windowWidth * 0.5;
const side = (windowWidth + containerWidth + 100) / 2;

const PauseScreen = () => {
    const { onLogout, authState, music, soundfx, setMusic, setSound } = useAuth()
    const navigation = useNavigation()
    const route = useRoute()

    const restartPress = () => {
        navigation.goBack();
    }

    const menuPress = () => {
        setTimeout(() => {
            navigation.navigate('Home');
        }, 100)
    }

    const closeModal = () => {
        setTimeout(() => {
            navigation.goBack();
        }, 100)
    }

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Pressable onPress={closeModal}>
                <View style={styles.modalOverlay} />
            </Pressable>

            <Animated.View style={[styles.container]}>
                <Text style={styles.title}>PAUSED</Text>
                <View style={styles.main}>
                    <PoppingView onPress={closeModal} style={styles.btn} >
                        <Text style={styles.btnText}>RESUME</Text>
                    </PoppingView>

                    <PoppingView onPress={menuPress} style={styles.btn}>
                        <Text style={styles.btnText} onPress={menuPress}>MENU</Text>
                    </PoppingView>
                    <View style={styles.setting}>
                        <View style={styles.checkboxCont}>
                            <Text style={styles.checkboxText}>Music</Text>
                            <Checkbox
                                color={'#3d3d59'}
                                value={music}
                                onValueChange={() => setMusic(v => !v)}
                                style={{ padding: 8 }}
                            />
                        </View>

                    </View>


                </View>

                <View style={styles.closeBtn} >
                    <IconButton
                        bgColor={'#F71C62'}
                        color={'#FFF'}
                        name={'close-thick'}
                        onPress={closeModal}
                        size={28}
                        radius={50}
                    />
                </View>
            </Animated.View>

        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    modalOverlay: {
        height: '100%',
        width: '100%',
        backgroundColor: 'rgba(0,0,0,0.6)'
    },
    container: {
        width: '100%',
        maxWidth: 350,
        height: '70%',
        backgroundColor: '#91CBF9',
        position: 'absolute',
        left: (windowWidth - 350) / 2 + 30,
        top: 50,
        borderRadius: 18,
        alignItems: 'center',
        padding: 8
    },
    main: {
        flex: 1,
        backgroundColor: '#FFF',
        alignItems: 'center',
        width: '100%',
        borderRadius: 16,
        padding: 24,
        gap: 16
    },
    title: {
        fontFamily: 'bold',
        color: '#3d3d59',
        fontSize: 28,
        letterSpacing: 2,
        marginBottom: 8
    },

    closeBtn: {
        position: 'absolute',
        right: -10,
        top: -10,
    },
    checkboxCont: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    checkboxText: {
        color: '#3d3d59',
        fontSize: 22,
        fontFamily: 'bold',
        letterSpacing: 1
    },
    setting: {
        width: '75%',
    },
    btn: {
        backgroundColor: '#3d3d59',
        width: '100%',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10
    },
    btnText: {
        color: '#FFF',
        fontFamily: 'bold',
        fontSize: 20,
        letterSpacing: 2

    }


})

export default PauseScreen;
