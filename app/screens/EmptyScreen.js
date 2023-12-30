import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import LottieView from 'lottie-react-native'

const EmptyScreen = () => {
    return (
        <View style={styles.container}>
            <View style={{ width: 250, height: 250, marginTop: -80 }}>
                <LottieView
                    source={require('../../assets/json/empty.json')}
                    autoPlay
                    loop={true}
                    resizeMode='cover'
                />
            </View>
            <Text style={styles.text}>Oops! It looks like there are currently no lessons uploaded.</Text>
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
    },
    text: {
        fontFamily: 'bold',
        letterSpacing: 1,
        fontSize: 18,
        color: '#3d3d59',
        textAlign: 'center',
        width: 300,
        marginTop: -40
    }
})

export default EmptyScreen;
