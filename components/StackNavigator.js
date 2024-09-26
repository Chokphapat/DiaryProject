import { createStackNavigator } from '@react-navigation/stack';
import ViewEmotion from '../ViewEmotion';
import EditEmotion from '../EditEmotion';
import Home3 from '../Home3';
import BottomTab from './BottomTab';  

const Stack = createStackNavigator();

export default function MainStackNavigator() {
  return (
    <Stack.Navigator>
      
      <Stack.Screen
        name="Main"
        component={BottomTab} 
        options={{ headerShown: false }}
      />
      
      <Stack.Screen
        name="ViewEmotion"
        component={ViewEmotion}
        options={{ title: 'View Emotion' }}  
      />
      <Stack.Screen
        name="EditEmotion"
        component={EditEmotion}
        options={{ title: 'Edit Emotion' }}  
      />
      <Stack.Screen
        name="Home3"
        component={Home3}
        options={{ title: 'Home3' }}  
      />
    </Stack.Navigator>
  );
}
