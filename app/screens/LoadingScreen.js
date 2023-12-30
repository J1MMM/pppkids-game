import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import LottieView from 'lottie-react-native'

const LoadingScreen = () => {
    return (
        <View style={styles.container}>
            <View style={{ width: 200, height: 200, marginTop: -32 }}>
                <LottieView
                    source={require('../../assets/json/loading.json')}
                    autoPlay
                    loop={true}
                    resizeMode='cover'
                />
            </View>
            <Text style={styles.text}>Please wait...</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 16
    },
    text: {
        fontFamily: 'bold',
        letterSpacing: 1,
        fontSize: 18,
        color: '#3d3d59',
        textAlign: 'center'
    }
})

export default LoadingScreen;