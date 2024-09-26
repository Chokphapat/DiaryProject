import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

export default function History() {
  const [history, setHistory] = useState([]);

  
  const fetchHistory = async () => {
    try {
      const historyKey = 'history';
      const data = await AsyncStorage.getItem(historyKey);
      if (data) {
        const parsedHistory = JSON.parse(data);
        setHistory(parsedHistory);
      } else {
        setHistory([]);
      }
    } catch (error) {
      console.error("Error fetching history:", error);
    }
  };


  useFocusEffect(
    React.useCallback(() => {
      fetchHistory();
    }, [])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>ประวัติการแก้ไข</Text>
      {history.length > 0 ? (
        <FlatList
          data={history}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.historyCard}>
              <Text style={styles.historyText}>{item}</Text>
            </View>
          )}
        />
      ) : (
        <Text>ไม่มีประวัติการแก้ไข</Text>
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
  historyCard: {
    backgroundColor: '#333',
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
  },
  historyText: {
    color: '#fff',
    fontSize: 16,
  },
});
