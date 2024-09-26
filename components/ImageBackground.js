import React from 'react';
import { View, Text, ImageBackground, StyleSheet } from 'react-native';

export default function ExampleScreen() {
  return (
    <ImageBackground
      source={{ uri: 'https://raw.githubusercontent.com/Chokphapat/Imgf/7db17b9ad15865d33bf693d4fea8a77765431866/20q45y3f.png' }}  // ลิงก์รูปภาพตรง
      style={styles.background}
    >
      <View style={styles.content}>
        <Text style={styles.text}>เนื้อหาของหน้า</Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 20,
    color: '#fff',
  },
});
