import AsyncStorage from '@react-native-async-storage/async-storage';
import { Route } from 'expo-router/build/Route';


export const saveData = async (date, emotion, note) => {
  try {
    const data = { emotion, note };
    await AsyncStorage.setItem(date, JSON.stringify(data));
    console.log("saved date:", date);
  } catch (error) {
    console.log("Error saved:", error);
  }
};


export const getData = async (date) => {
  try {
    const jsonValue = await AsyncStorage.getItem(date);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.log("Error fetching:", error);
  }
};


const handleDayPress = (item) => {
  if (!item.date) {
    console.error("missing selected item");
    return;
  }
  navigation.navigate('EditEmotion', { date: item.date });
};


const saveEmotion = async () => {
  if (!date) {
    console.error('Date undefined');
    
  }

  const data = { emotion, note };
  await AsyncStorage.setItem(date, JSON.stringify(data));
};
const { date } = Route.params || {};
if (!date) {
  console.error('undefined in route params');
  
}