import { Pressable, StyleSheet, Text, View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import { Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import playSound from "./PlaySound";

const borderColor = {
    "reading": "#4CB04D", //green
    "math": "#F54337", //red
    "writing": "#2196F5" //blue
}

const subjectSymbol = {
    "math": require("../../assets/images/math-symbol.png"),
    "reading": require("../../assets/images/abc-symbol.png"),
    "writing": require("../../assets/images/writing-symbol.png")
}

const MenuCard = ({ item }) => {
    const navigation = useNavigation();
    const scaleVal = useSharedValue(1)

    const pathArray = [
        require("../../assets/images/card-vowel-sound.jpg"),
        require("../../assets/images/correctletter.jpg"),
        require("../../assets/images/countobjects.jpg"),
        require("../../assets/images/card-basic-words.jpg"),
        require("../../assets/images/fb1.jpg"),
        require("../../assets/images/CO2.jpg"),
        require("../../assets/images/whatyouhear.jpg"),
        require("../../assets/images/fb2.jpg"),
        require("../../assets/images/CO3.jpg"),
        require("../../assets/images/homophones-thumbnail.jpg"),
        require("../../assets/images/fb3.jpg"),
        require("../../assets/images/CO4.jpg"),
        require("../../assets/images/readword-thumbnail.jpg"),
        require("../../assets/images/fb4.jpg"),
        require("../../assets/images/CO5.jpg"),
    ]

    const animatedLayer = useAnimatedStyle(() => {
        return {
            transform: [{ scale: scaleVal.value }, { rotate: '-9deg' }]
        }
    })

    const handlePress = () => {
        playSound(require('../../assets/audio/selected.wav'))
        scaleVal.value = 0.8;
        scaleVal.value = withSpring(1, { damping: 10, stiffness: 100 });

        navigation.navigate(item.url)
    }


    return (
        <Animated.View style={styles.container}>
            <Animated.View style={[styles.layers, { backgroundColor: '#E0E0E0' }, animatedLayer]}>
                <View style={[styles.layers, { transform: [{ rotate: '3deg' }], backgroundColor: '#EDEEE5' }]}>
                    <View style={[styles.layers, { transform: [{ rotate: '3deg' }], backgroundColor: '#FFF' }]} >
                        <Pressable style={[styles.listContainer, { borderColor: borderColor[item.subject] }]} onPress={handlePress} disabled={item?.locked}>

                            {item?.locked && <Image source={require('../../assets/images/lock.png')} style={styles.lock} />}

                            {item.stars == 0 && <Image source={require('../../assets/images/0star.png')} style={styles.stars} />}
                            {item.stars == 1 && <Image source={require('../../assets/images/1star.png')} style={styles.stars} />}
                            {item.stars == 2 && <Image source={require('../../assets/images/2stars.png')} style={styles.stars} />}
                            {item.stars == 3 && <Image source={require('../../assets/images/3stars.png')} style={styles.stars} />}

                            <Image
                                source={pathArray[item?.id]}
                                resizeMode="cover"
                                style={[styles.listImage, { opacity: item?.locked ? 0.5 : 0.8 }]}
                            />
                            <View style={[styles.subjectBadge, { backgroundColor: borderColor[item.subject] }]}>
                                <Image
                                    source={subjectSymbol[item.subject]}
                                    style={styles.subjectSymbol}
                                    resizeMode="contain"
                                />
                            </View>
                        </Pressable>
                    </View>
                </View>
            </Animated.View>
            <Text style={[styles.label]}>{item.title}</Text>
        </Animated.View >
    )
}

const styles = StyleSheet.create({
    container: {
        // borderWidth: 1,
        marginHorizontal: 15,
        justifyContent: 'center',
        alignItems: 'center',

    },
    layers: {
        // borderWidth: 1,
        borderRadius: 10,
    },
    listContainer: {
        backgroundColor: '#000',
        borderWidth: 5,
        height: 180,
        width: 230,
        maxHeight: 180,
        maxWidth: 180 + 50,
        borderRadius: 10,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        transform: [{ rotate: '3deg' }],
    },
    label: {
        marginTop: 25,
        fontSize: 18,
        maxWidth: 230,
        textAlign: 'center',
        color: '#3C3C57',
        fontFamily: 'bold'
    },
    subjectBadge: {
        width: 45,
        height: 45,
        position: "absolute",
        bottom: 0,
        left: 0,
        borderTopRightRadius: 50,
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        padding: 5
    },
    subjectSymbol: {
        width: 24,
        height: 24,
        tintColor: 'white'

    },
    listImage: {
        width: '100%',
        height: '100%',
        borderRadius: 5,


    },
    lock: {
        position: 'absolute',
        zIndex: 99,
        top: 0,
        left: 0,
        width: 50,
        height: 50,
        resizeMode: 'cover',

    },
    stars: {
        position: 'absolute',
        zIndex: 99,
        bottom: -5,
        right: -30,
        resizeMode: 'contain',
        height: 50,




    }
})

export default MenuCard