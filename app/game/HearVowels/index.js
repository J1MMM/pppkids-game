import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ImageBackground, Text, Pressable } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';
import ChoicesCard from './ChoicesCard';
import PseudoLoading from '../../screens/PseudoLoading';
import PoppingView from '../../components/PoppingView';
import { useNavigation, useRoute } from '@react-navigation/native';
import StarBar from '../../components/StarBar';
import { useAuth } from '../../context/AuthContext';
import playSound from '../../components/PlaySound';
import getRandomNum from '../../components/getRandomNum';
import compliments from '../../model/compliments';
import tryagain from '../../model/tryagain';
import LibraryBg from '../../components/LibraryBg';
import updateStudentStars from '../../components/updateStudentStars';
import computeStars from '../../components/compunteStars';
import AsyncStorage from '@react-native-async-storage/async-storage';
const bgImage = require('../../../assets/images/vowelsound.jpg');

const A = require('../../../assets/audio/a.mp3')
const E = require('../../../assets/audio/e.mp3')
const I = require('../../../assets/audio/i.mp3')
const O = require('../../../assets/audio/o.mp3')
const U = require('../../../assets/audio/u.mp3')

function shuffleArray(array) {
    // Copy the original array of objects
    const arrayCopy = [...array];

    // Fisher-Yates shuffle algorithm
    for (let i = arrayCopy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arrayCopy[i], arrayCopy[j]] = [arrayCopy[j], arrayCopy[i]];
    }

    return arrayCopy;
}


const HearVowels = () => {
    const barWidth = useSharedValue('100%')
    const speakerScale = useSharedValue(1)
    const btnScale = useSharedValue(1)

    const choices = [{ word: 'A', sound: A }, { word: 'E', sound: E }, { word: 'I', sound: I }, { word: 'O', sound: O }, { word: 'U', sound: U },];

    const choices1 = [{ word: 'A', sound: A }, { word: 'U', sound: U },];
    const choices2 = [{ word: 'E', sound: E }, { word: 'I', sound: I }, { word: 'U', sound: U },];
    const choices3 = [{ word: 'A', sound: A }, { word: 'I', sound: I }, { word: 'O', sound: O }, { word: 'U', sound: U },];
    const choices4 = [{ word: 'A', sound: A }, { word: 'E', sound: E }, { word: 'I', sound: I }, { word: 'O', sound: O }, { word: 'U', sound: U },];
    const choices5 = [{ word: 'A', sound: A }, { word: 'E', sound: E }, { word: 'I', sound: I }, { word: 'O', sound: O }, { word: 'U', sound: U },];

    const allChoices = [choices1, choices2, choices3, choices4, choices5]

    const { authState, setAuthState, setConfetti, games, setBgmusic, music } = useAuth()
    const route = useRoute()
    const navigate = useNavigation()
    const AnimatedView = Animated.createAnimatedComponent(View)
    const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

    const [isLoading, setIsLoading] = useState(true)
    const [level, setLevel] = useState(1)
    const [currentChoices, setCurrentChoices] = useState([])
    const [answer, setAnswer] = useState('')
    const [correctAns, setCorrectAns] = useState('')
    const [disabled, setDisabled] = useState(false)
    const [incorrect, setIncorrect] = useState(false)
    const [answerCorrect, setAnswerCorrect] = useState(false)

    useEffect(() => {
        setBgmusic(false)

        return () => setBgmusic(true)
    }, [])

    useEffect(() => {
        if (!isLoading) {
            playSound(require('../../../assets/audio/vowelsound.mp3'))
        }
    }, [isLoading])

    useEffect(() => {
        if (level > 5) {
            const foundLvl = games.find(lvl => lvl.url == route.name)
            const nextLvl = games.find(lvl => lvl.subject == foundLvl.subject && lvl.locked == true && lvl.id == foundLvl.id + 3)

            if (foundLvl.stars < 3) {
                const stars = computeStars(barWidth)
                foundLvl.stars = stars;
                if (nextLvl) nextLvl.locked = false
                updateStudentStars(stars, setAuthState, authState)

                const saveToStorage = async () => {
                    await AsyncStorage.setItem(authState?.id, JSON.stringify(games))
                }
                saveToStorage()
            }
            playSound(require('../../../assets/audio/cheer.mp3'))
            setConfetti(true)
            navigate.navigate('Home')
        }

        const index = level == 6 ? 4 : level - 1;

        const generateChoices = allChoices[index]
        setCurrentChoices(shuffleArray(generateChoices))
        setCorrectAns(generateChoices[getRandomNum(generateChoices.length)])


    }, [level])

    const handleSpeakerPress = () => {
        playSound(correctAns.sound)

        speakerScale.value = 0.8;
        speakerScale.value = withSpring(1);
    }

    const decreaseStar = () => {
        playSound(require('../../../assets/audio/wrong.mp3'))
        setIncorrect(true)
        const numberString = barWidth.value.replace('%', '');
        const currentVal = JSON.parse(numberString);

        let res;
        if (currentVal >= 20) {
            res = `${currentVal - 10}%`
        } else {
            res = '10%'
        }
        barWidth.value = withSpring(res)
        setDisabled(false)
        playSound(tryagain[getRandomNum(4)])
    }





    const handleCheckBtnPress = () => {
        setDisabled(true)
        btnScale.value = 0.9;
        btnScale.value = withSpring(1);

        if (answer == correctAns.word) {
            playSound(require('../../../assets/audio/correct.mp3'))
            setAnswerCorrect(true)
            playSound(compliments[getRandomNum(7)])
            setTimeout(() => {
                setLevel(prev => prev + 1);
                setAnswerCorrect(false)
                setAnswer("")
                setDisabled(false)
            }, 1000)

        } else {
            decreaseStar()
        }

    }

    const choicesLvl1El = currentChoices.map((item, index) => {
        return (
            <ChoicesCard
                key={index}
                name={item.word}
                sound={item.sound}
                onClick={() => { setIncorrect(false); setAnswer(item.word); }}
                active={item.word == answer}
                wrong={incorrect && item.word == answer}
                correct={answer == correctAns?.word && answerCorrect}
                disabled={disabled}
            />
        )
    })


    if (isLoading) return <PseudoLoading setIsLoading={setIsLoading} />
    return (
        <View style={{ flex: 1, backgroundColor: '#9accef' }}>
            {music && <LibraryBg />}
            <ImageBackground source={bgImage} style={styles.bgImage} resizeMode='cover'>
                <StarBar value={barWidth} />

                <PoppingView style={styles.menuBtn} onPress={() => navigate.navigate('Pause')} >
                    <Feather name='pause' color={'#FFF'} size={28} />
                </PoppingView>

                <Text style={styles.title}>What vowel sound do you hear?</Text>

                <View style={styles.container}>
                    <Pressable onPress={handleSpeakerPress} disabled={disabled}>
                        <AnimatedView style={[{ transform: [{ scale: speakerScale }] }, styles.speaker]}>
                            <AntDesign name='sound' color={'#FFF'} size={48} />
                        </AnimatedView>
                    </Pressable>

                    <View style={{ flexWrap: 'wrap', flex: 1, gap: 24 }}>
                        {choicesLvl1El}
                    </View>

                    <AnimatedPressable style={[{ transform: [{ scale: btnScale }] }, styles.checkBtn, { backgroundColor: disabled || answer == "" ? '#D1D1D1' : '#38D414', color: '#FFF' }]} onPress={handleCheckBtnPress} disabled={disabled || answer == ""}  >
                        <Text style={{ fontFamily: 'bold', color: '#FFF', letterSpacing: 1, fontSize: 20 }}>CHECK</Text>
                    </AnimatedPressable>
                </View>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    bgImage: {
        flex: 1,
        resizeMode: 'cover',
        padding: 16,

    },
    container: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        gap: 16,
    },
    speaker: {

        backgroundColor: '#2F9FF1',
        padding: 16,
        width: 80,
        height: 80,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#2F9FF1",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 30,
        marginTop: 8
    },

    checkBtn: {
        backgroundColor: '#38D414',
        width: 300,
        display: 'flex',
        alignItems: 'center',
        padding: 12,
        borderRadius: 10
    },
    menuBtn: {
        backgroundColor: '#D81C5A',
        borderRadius: 50,
        padding: 8,
        position: 'absolute',
        right: 16,
        top: 16
    },
    title: {
        fontSize: 28,
        fontFamily: 'bold',
        color: '#FFF',
        letterSpacing: 2,
        marginTop: 10,
        marginLeft: 16,
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10
    }

})

export default HearVowels;