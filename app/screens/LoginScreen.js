import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TextInput, TextInputComponent, Button, ImageBackground, Image, Pressable, KeyboardAvoidingView, ScrollView } from 'react-native';
import { useAuth } from '../context/AuthContext';
import Ionicons from '@expo/vector-icons/Ionicons';
import NetInfo from '@react-native-community/netinfo';

const bgImage = require('../../assets/images/sky-bg.jpg')

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [formDisabled, setFormDisabled] = useState(false);
    const { onLogin } = useAuth();

    const [pwdVisible, setPwdVisible] = useState(false)

    const login = async () => {
        setFormDisabled(true)
        NetInfo.fetch().then(state => {
            if (!state.isConnected) {
                setErrMsg('No Internet Connection');
                setFormDisabled(false);
                return
            }
        })

        if (!email || !password) {
            setErrMsg('Email and Password are required')
            setFormDisabled(false)
            return
        }

        const result = await onLogin(email, password);
        if (result && result.msg) {
            setErrMsg(result.msg)
            setFormDisabled(false)
            return;
        }

    }

    useEffect(() => {
        setErrMsg('')
    }, [email, password])

    return (
        <View style={styles.container}>
            <ImageBackground style={styles.bgImage} source={bgImage}>
                <View style={styles.form}>
                    <KeyboardAvoidingView behavior='position'>
                        <View>
                            <Text style={styles.title}>Sign in to start using PPPKids</Text>
                            <Text style={styles.subTitle}>Your account is provided by your instructor</Text>
                            {errMsg &&
                                <Text style={{ color: '#FC0F3B', marginBottom: -5, maxWidth: 350 }}>{errMsg}</Text>
                            }
                            <View style={styles.inputContainer}>
                                <View style={[styles.inputControl, { borderColor: errMsg ? '#FC0F3B' : '#3d3d59' }]}>
                                    <TextInput style={styles.input} placeholder='Email' onChangeText={(e) => setEmail(e)} value={email} autoComplete='email' inputMode='email' editable={!formDisabled} />
                                </View>
                                <View style={[styles.inputControl, { borderColor: errMsg ? '#FC0F3B' : '#3d3d59' }]}>
                                    <TextInput style={styles.input} placeholder='Password' secureTextEntry={!pwdVisible} onChangeText={(e) => setPassword(e)} value={password} editable={!formDisabled} />
                                    <Pressable onPress={() => setPwdVisible(v => !v)} style={{ marginRight: 8 }}>
                                        {pwdVisible ?
                                            <Ionicons name='eye' size={24} color={'#3d3d59'} />
                                            :
                                            <Ionicons name='eye-off' size={24} color={'#3d3d59'} />
                                        }
                                    </Pressable>
                                </View>
                                <Pressable style={styles.loginButton} onPress={login} disabled={formDisabled}>
                                    <Text style={{ color: '#FFF', fontSize: 16, textAlign: 'center', fontFamily: 'regular', letterSpacing: 1 }}>{formDisabled ? 'Loading...' : 'Sign in'}</Text>
                                </Pressable>
                            </View>
                        </View>
                    </KeyboardAvoidingView>
                </View>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    },
    bgImage: {
        flex: 1,
        width: '100%',
        resizeMode: 'cover'
    },
    form: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 28,
        fontFamily: 'bold',
        letterSpacing: 1,
        color: '#3D3D59'
    },
    subTitle: {
        fontSize: 16,
        fontFamily: 'regular',
        color: '#3D3D59'
    },
    inputContainer: {
        gap: 16,
        marginVertical: 16,
    },

    inputControl: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#3d3d59',
        borderRadius: 32,
        backgroundColor: '#FFF',
        paddingHorizontal: 12
    },
    input: {
        fontSize: 16,
        fontFamily: 'bold',
        padding: 10,
        letterSpacing: 1,
        flex: 1,
    },
    loginButton: {
        backgroundColor: '#3d3d59',
        padding: 14,
        borderRadius: 32,
        display: 'flex',
        justifyContent: 'center'
    },
})

export default Login;
