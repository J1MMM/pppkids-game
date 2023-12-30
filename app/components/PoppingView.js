import { StyleSheet, Pressable } from 'react-native';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';

const PoppingView = ({ children, style, onPress, disabled }) => {
    const _scale = useSharedValue(1)
    const AnimatedPressable = Animated.createAnimatedComponent(Pressable)
    const handlePress = () => {
        _scale.value = 0.9;
        _scale.value = withSpring(1);

        onPress()
    }

    return (
        <AnimatedPressable onPress={handlePress} style={[{ transform: [{ scale: _scale }] }, style]} disabled={disabled}>
            {children}
        </AnimatedPressable>
    );
}

const styles = StyleSheet.create({})

export default PoppingView;
