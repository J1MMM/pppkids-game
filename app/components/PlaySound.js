import { Audio } from 'expo-av';

const playSound = async (source) => {

    const { sound } = await Audio.Sound.createAsync(source, {}, (status) => {
        if (status.didJustFinish) {
            // Unload the sound when it finishes playing
            sound.unloadAsync();
        }
    });

    await sound.playAsync();
};

export default playSound;
