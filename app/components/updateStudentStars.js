import axios from "axios";
import { API_URL } from "../context/AuthContext";
import * as SecureStore from 'expo-secure-store';
import NetInfo from '@react-native-community/netinfo';


const updateStudentStars = async (stars, setAuthState, authState) => {
    try {
        const updatedObj = { ...authState }
        updatedObj.stars = updatedObj.stars + stars;
        setAuthState(updatedObj)
        await SecureStore.setItemAsync('my-data', JSON.stringify(updatedObj))

        NetInfo.fetch().then(state => {
            if (state.isConnected) {
                const updateOnline = async () => {
                    await axios.post(`${API_URL}/game`, { id: authState.id, stars: updatedObj.stars })
                }
                updateOnline()
            }
        })

    } catch (error) {
        console.log(error);
    }
}

export default updateStudentStars