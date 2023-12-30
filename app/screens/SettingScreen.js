import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { View, StyleSheet, Text, Dimensions, Pressable } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import { useAuth } from '../context/AuthContext';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import IconButton from '../components/IconButton';
import Checkbox from 'expo-checkbox';

const windowWidth = Dimensions.get('window').width;
const containerWidth = windowWidth * 0.5;
const side = (windowWidth + containerWidth + 100) / 2;

const Setting = () => {
    const { onLogout, authState, music, soundfx, setMusic, setSound } = useAuth()
    const navigation = useNavigation()

    const closeModal = () => {
        navigation.goBack();
    }

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Pressable onPress={closeModal}>
                <View style={styles.modalOverlay} />
            </Pressable>

            <Animated.View style={[styles.container]}>
                <Text style={styles.title}>Settings</Text>
                <View style={styles.main}>
                    <View>
                        <View style={{ flexDirection: 'row', gap: 3, justifyContent: 'center' }}>
                            <Text style={styles.fullname}>{authState?.fullname}</Text>
                            <MaterialCommunityIcons name={authState?.gender == 'male' ? 'gender-male' : 'gender-female'} color={authState?.gender == 'male' ? '#1EB3EA' : '#E22FD7'} size={16} />
                        </View>
                        <View style={styles.disabilitiesContainer}>
                            {
                                authState.learning_disabilities.map((item, index) => {
                                    return (
                                        <Text
                                            key={index}
                                            style={[
                                                styles.disabilities,
                                                { backgroundColor: item == 'dyslexia' ? '#4CB04D' : item == 'dysgraphia' ? '#2196F5' : '#F54337' }
                                            ]}

                                        >{item}
                                        </Text>
                                    )
                                })
                            }
                        </View>
                    </View>

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

                    <Pressable style={styles.signoutBtn} onPress={onLogout}>
                        <Text style={styles.signoutBtnText}>SIGN OUT</Text>
                    </Pressable>
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
        height: '85%',
        backgroundColor: '#91CBF9',
        position: 'absolute',
        left: (windowWidth - 350) / 2 + 30,
        top: 28,
        borderRadius: 18,
        alignItems: 'center',
        padding: 16
    },
    main: {
        flex: 1,
        backgroundColor: '#FFF',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        borderRadius: 16,
        padding: 16
    },
    title: {
        fontFamily: 'bold',
        color: '#3d3d59',
        fontSize: 28,
        letterSpacing: 2,
        marginBottom: 8
    },

    signoutBtn: {
        backgroundColor: '#3d3d59',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 12,
        width: 150,
        borderRadius: 16
    },
    signoutBtnText: {
        color: '#FFF',
        fontFamily: 'bold',
        letterSpacing: 1,
        fontSize: 16,
    },
    fullname: {
        fontFamily: 'bold',
        fontSize: 28,
        letterSpacing: 1,
        color: '#3d3d59',
        textAlign: 'center'
    },
    disabilitiesContainer: {
        flexDirection: 'row',
        gap: 8,
        alignItems: 'center',
        justifyContent: 'center'
    },

    disabilities: {
        color: '#FFF',
        backgroundColor: 'red',
        borderRadius: 16,
        padding: 3,
        fontFamily: 'bold',
        paddingHorizontal: 8,
        letterSpacing: 1,
        fontSize: 10
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
    }


})

export default Setting;
