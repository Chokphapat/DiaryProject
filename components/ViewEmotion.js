import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { getData } from '../storages/Datas'; 


export default function ViewEmotion() {
  const route = useRoute();
  const navigation = useNavigation();
  const { date } = route.params || {};  
  const [emotion, setEmotion] = useState('');
  const [note, setNote] = useState('');

  useEffect(() => {
    const loadEmotion = async () => {
      if (date) {
        const data = await getData(date);
        if (data) {
          setEmotion(data.emotion);
          setNote(data.note);
        } else {
          console.log("No data found for date:", date);
        }
      } else {
        console.log("Date is undefined in route params");
      }
    };
    loadEmotion();
  }, [date]);

  return (
    <View style={{ padding: 20 }}>
      <Text>วันที่: {date}</Text>
      <Text>อารมณ์: {emotion || 'ไม่มีข้อมูล'}</Text>
      <Text>บันทึก: {note || 'ไม่มีข้อมูล'}</Text>
      <Button title="แก้ไข" onPress={() => navigation.navigate('EditEmotion', { date })} />
    </View>
  );
}
