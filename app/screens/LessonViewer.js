import React, { useEffect } from 'react';
import { View, StyleSheet, Text, SafeAreaView, Pressable } from 'react-native';
import WebView from 'react-native-webview';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';


const LessonViewer = () => {
    const { setBgmusic } = useAuth()
    const navigation = useNavigation()
    const route = useRoute()

    const { url, fileType } = route.params
    let URI = ''
    const PptExt = ['ppt', 'pptm', 'pptx']

    if (PptExt.includes(fileType)) {
        URI = `https://view.officeapps.live.com/op/embed.aspx?src=${url}`
    } else {
        URI = url
    }

    useEffect(() => {
        setBgmusic(false)

        return () => {
            setBgmusic(true)
        }
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Pressable onPress={() => navigation.goBack()}>
                    <Ionicons name='chevron-back' color={'#FFF'} size={36} />
                </Pressable>
            </View>
            <WebView source={{ uri: URI }} style={{ flex: 1 }} audio />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        backgroundColor: 'transparent',
        width: '100%',
        padding: 10,
        paddingHorizontal: 25,
        justifyContent: 'center',
        position: 'absolute',
        zIndex: 99,
    }
})

export default LessonViewer;
