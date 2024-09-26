import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { Calendar } from 'react-native-calendars';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

export default function Section1() {
  const [markedDates, setMarkedDates] = useState({});
  const navigation = useNavigation();


  const fetchEmotionData = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();  
      const result = await AsyncStorage.multiGet(keys); 
      let newMarkedDates = {};

      result.forEach(([key, value]) => {
        const data = JSON.parse(value); 
        if (data && data.emotion) {

          let dotColor = 'blue'; 
          if (data.emotion === 'Happy') {
            dotColor = 'green';
          } else if (data.emotion === 'Sad') {
            dotColor = 'blue';
          } else if (data.emotion === 'Angry') {
            dotColor = 'red';
          } else if (data.emotion === 'Excited') {
            dotColor = 'yellow';
          } else if (data.emotion === 'Tired') {
            dotColor = 'purple';
          } else if (data.emotion === 'Neutral') {
            dotColor = 'gray';
          }

          newMarkedDates[key] = { marked: true, dotColor }; 
        }
      });

      setMarkedDates(newMarkedDates);
    } catch (error) {
      console.error("Error fetching emotion data:", error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchEmotionData();
    }, [])
  );

  
const handleDayPress = (day) => {
  
  navigation.navigate('EditEmotion', { date: day.dateString });
};


  return (
    <View>
      <Text style={{ fontSize: 20, textAlign: 'center', marginVertical: 20 }}>ปฏิทินของคุณ</Text>
      <Calendar
        markedDates={markedDates}  
        onDayPress={handleDayPress}  
      />
    </View>
  );
}
