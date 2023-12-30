import { StyleSheet, Pressable } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';

const IconButton = ({ onPress, name, color, size, bgColor, radius }) => {
    const AnimatedPressable = Animated.createAnimatedComponent(Pressable)
    const scale = useSharedValue(1);

    const handlePress = () => {
        scale.value = .8;
        scale.value = withSpring(1);
        setTimeout(() => {
            onPress()
        }, 50)
    }

    return (
        <AnimatedPressable style={[styles.button, { backgroundColor: bgColor, borderRadius: radius, transform: [{ scale: scale }] }]} onPress={handlePress}>
            <MaterialCommunityIcons name={name} color={color} size={size} />
        </AnimatedPressable>
    );
}

const styles = StyleSheet.create({

    button: {
        padding: 8,
        borderRadius: 50
    },

})

export default IconButton;
