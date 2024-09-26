import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home2() {
  const [selectedEmotion, setSelectedEmotion] = useState(null);
  const navigation = useNavigation();

  const emotions = [
    { name: 'Happy', icon: 'smile-o', color: 'green' },
    { name: 'Sad', icon: 'frown-o', color: 'blue' },
    { name: 'Angry', icon: 'fire', color: 'red' },
    { name: 'Excited', icon: 'star', color: 'yellow' },
    { name: 'Tired', icon: 'bed', color: 'purple' },
    { name: 'Neutral', icon: 'meh-o', color: 'gray' }
  ];


  const saveEmotion = async (emotionName) => {
    const date = new Date().toLocaleDateString('en-CA'); 
    setSelectedEmotion(emotionName);
    
    try {
      await AsyncStorage.setItem(date, JSON.stringify({ emotion: emotionName, note: '' }));
      navigation.navigate('Note'); 
    } catch (error) {
      console.error("Error saving emotion:", error);
    }
  };

  const radius = 100; 

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>คุณรู้สึกอย่างไรบ้าง?</Text>
      <View style={styles.circle}>
        {emotions.map((emotion, index) => {
          const angle = (index / emotions.length) * 2 * Math.PI;
          const x = radius * Math.cos(angle);
          const y = radius * Math.sin(angle);

          return (
            <View
              key={emotion.name}
              style={[
                styles.iconWrapper,
                {
                  top: y + 80,
                  left: x + 80
                }
              ]}
            >
              <FontAwesome
                name={emotion.icon}
                size={40}
                color={emotion.color}
                onPress={() => saveEmotion(emotion.name)}  
              />
              <Text style={styles.iconText}>{emotion.name}</Text>
            </View>
          );
        })}
      </View>
      {selectedEmotion && (
        <Text style={styles.selectedText}>คุณเลือก: {selectedEmotion}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerText: {
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 20
  },
  circle: {
    position: 'relative',
    width: 240,
    height: 240
  },
  iconWrapper: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
    height: 80
  },
  iconText: {
    marginTop: 5,
    textAlign: 'center'
  },
  selectedText: {
    fontSize: 20,
    color: 'green',
    marginTop: 20
  }
});
