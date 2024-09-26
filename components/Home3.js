import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

export default function Home3() {
  const [notes, setNotes] = useState([]);

  
  const fetchNotes = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const result = await AsyncStorage.multiGet(keys);
      let filteredNotes = [];

      result.forEach(([key, value]) => {
        if (key !== 'history') { 
          const data = JSON.parse(value);
          if (data && data.note) {
            filteredNotes.push({ date: key, note: data.note, emotion: data.emotion || 'ไม่มีข้อมูล' });
          }
        }
      });

      setNotes(filteredNotes);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  
  useFocusEffect(
    React.useCallback(() => {
      fetchNotes();
    }, [])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>บันทึกของคุณ</Text>
      {notes.length > 0 ? (
        <FlatList
          data={notes}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.noteCard}>
              <Text style={styles.noteText}>วันที่: {item.date}</Text>
              <Text style={styles.noteText}>บันทึก: {item.note}</Text>
              <Text style={styles.noteText}>อารมณ์: {item.emotion}</Text>
            </View>
          )}
        />
      ) : (
        <Text>ไม่มีบันทึก</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  headerText: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  noteCard: {
    backgroundColor: '#333',
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
  },
  noteText: {
    color: '#fff',
    fontSize: 16,
  },
});
