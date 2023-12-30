import { View, StyleSheet, ImageBackground, Text } from 'react-native';
import Animated from 'react-native-reanimated';

const StarBar = ({ value }) => {
    return (
        <View style={styles.rewardBar}>
            <Animated.View style={[{ width: value }, styles.bar]}>
                <View style={styles.bubble} />
                <View style={styles.bubble2} />
            </Animated.View>

            <View style={[styles.line, { left: '66%' }]} />
            <View style={[styles.line, , { left: '33%' }]} />

            <ImageBackground source={require('../../assets/images/star.png')} style={[styles.circle, , { left: -20 }]} >
                <Text style={styles.circleText}>1</Text>
            </ImageBackground>

            <ImageBackground source={require('../../assets/images/star.png')} style={[styles.circle, , { left: '26%' }]} >
                <Text style={styles.circleText}>2</Text>
            </ImageBackground>

            <ImageBackground source={require('../../assets/images/star.png')} style={[styles.circle, { left: '59%' }]}>
                <Text style={styles.circleText}>3</Text>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    rewardBar: {
        borderWidth: 3,
        width: 300,
        height: 35,
        borderRadius: 8,
        marginLeft: 'auto',
        marginRight: 'auto',
        borderColor: '#3d3d59',
        position: 'relative',
        backgroundColor: '#fffade'
    },
    bar: {
        height: '100%',
        backgroundColor: '#ffd900',
        borderRadius: 5,
    },
    line: {
        position: 'absolute',
        height: '100%',
        width: 3,
        zIndex: 99,
        backgroundColor: '#3d3d59',
        top: 0,
    },
    circle: {
        position: 'absolute',
        zIndex: 99,
        height: 40,
        width: 40,
        top: -3,
        justifyContent: 'center',
        alignItems: 'center'
    },
    circleText: {
        color: '#3d3d59',
        fontFamily: 'bold',
    },
    stars: {
        position: 'absolute',
        width: 70,
        height: 70,
        left: -35,
        top: -17
    },
    bubble: {
        backgroundColor: '#FFF',
        width: '70%',
        borderRadius: 50,
        height: 8,
        position: 'absolute',
        right: '10%',
        top: 5
    },
    bubble2: {
        backgroundColor: '#FFF',
        width: 10,
        height: 8,
        borderRadius: 50,
        position: 'absolute',
        right: '83%',
        top: 5
    }
})

export default StarBar;
