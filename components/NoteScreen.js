import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function NoteScreen() {
  const navigation = useNavigation();

  const handleEdit = () => {

    navigation.navigate('Edit', { date: new Date().toISOString() });
  };

  return (
    <View>
      <Text>บันทึกของคุณ</Text>
      <Button title="แก้ไขบันทึก" onPress={handleEdit} />
    </View>
  );
}
