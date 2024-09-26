import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Picker as EmotionPicker } from '@react-native-picker/picker';  
import { TextInput } from 'react-native-gesture-handler';

export default function EditEmotion() {
  const route = useRoute();
  const navigation = useNavigation();
  const { date } = route.params;  
  const [emotion, setEmotion] = useState('');
  const [note, setNote] = useState('');
  const [previousEmotion, setPreviousEmotion] = useState('');

  useEffect(() => {
    const fetchEmotionData = async () => {
      try {
        const data = await AsyncStorage.getItem(date);
        if (data) {
          const parsedData = JSON.parse(data);
          setEmotion(parsedData.emotion || '');  
          setPreviousEmotion(parsedData.emotion || '');  
          setNote(parsedData.note || '');
        }
      } catch (error) {
        console.error("Error loading emotion data:", error);
      }
    };

    fetchEmotionData();
  }, [date]);


  const saveEmotion = async () => {
    try {
      const newData = { emotion, note };
      await AsyncStorage.setItem(date, JSON.stringify(newData));
  

      const historyKey = 'history';
  

      const currentTime = new Date().toLocaleString('th-TH', { timeZone: 'Asia/Bangkok' });
      const historyRecord = `วันที่ ${date} แก้ไขอารมณ์จาก ${previousEmotion} เป็น ${emotion} เวลา ${currentTime}`;
  
      const existingHistory = await AsyncStorage.getItem(historyKey);
      let historyArray = existingHistory ? JSON.parse(existingHistory) : [];
      historyArray.push(historyRecord);
  
      await AsyncStorage.setItem(historyKey, JSON.stringify(historyArray));
  
      navigation.goBack(); 
    } catch (error) {
      console.error("Error saving emotion:", error);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 18, marginBottom: 10 }}>แก้ไขอารมณ์สำหรับวันที่: {date}</Text>
      
 
      <EmotionPicker
        selectedValue={emotion}
        style={{ height: 50, width: 200 }}
        onValueChange={(itemValue) => setEmotion(itemValue)}
      >
        <EmotionPicker.Item label="มีความสุข" value="Happy" />
        <EmotionPicker.Item label="เศร้า" value="Sad" />
        <EmotionPicker.Item label="โกรธ" value="Angry" />
        <EmotionPicker.Item label="ตื่นเต้น" value="Excited" />
        <EmotionPicker.Item label="เหนื่อย" value="Tired" />
        <EmotionPicker.Item label="เฉยๆ" value="Neutral" />
      </EmotionPicker>

      <Text style={{ marginTop: 20 }}>หมายเหตุ:</Text>
      <TextInput
        placeholder="หมายเหตุ"
        value={note}
        onChangeText={setNote}
        style={{ borderBottomWidth: 1, marginBottom: 20 }}
      />

      <Button title="บันทึก" onPress={saveEmotion} />
    </View>
  );
}
