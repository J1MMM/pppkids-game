import { StyleSheet, Text, Pressable } from 'react-native';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';

const ChoicesCard = ({ name, onClick, active, wrong, correct, disabled, sound }) => {
    const scale_ = useSharedValue(1)

    const handlePress = () => {
        scale_.value = 0.8;
        scale_.value = withSpring(1);
        onClick()
    }

    return (
        <Pressable onPress={handlePress} disabled={disabled}>
            <Animated.View style={[{ borderWidth: active ? 3 : 0, borderColor: correct ? '#38D414' : wrong ? 'red' : active ? '#2F9FF1' : '' }, { transform: [{ scale: scale_ }] }, styles.choicesCard,]}>
                <Text style={styles.choicesCardText}>{name}</Text>
            </Animated.View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    choicesCard: {
        backgroundColor: '#FFF',
        minWidth: 140,
        height: 120,
        borderRadius: 8,
        shadowColor: "#000",
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    choicesCardText: {
        fontFamily: 'regular',
        fontSize: 100,
        color: '#3d3d59',
    },

})

export default ChoicesCard;
