import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Section1 from '../components/Section1';
import EditEmotion from '../components/EditEmotion';
import Home2 from '../components/Home2';
import Home3 from '../components/Home3';
import History from '../components/History';
import { FontAwesome } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function CalendarStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Section1" component={Section1} options={{ title: '' }} />
      <Stack.Screen name="EditEmotion" component={EditEmotion} options={{ title: 'แก้ไขอารมณ์' }} />
    </Stack.Navigator>
  );
}

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Calendar"
        component={CalendarStack}  
        options={{
          tabBarLabel: 'ปฏิทิน',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="calendar" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="เป็นอย่างไรบ้าง"
        component={Home2}
        options={{
          tabBarLabel: 'อารมณ์',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="smile-o" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Note"
        component={Home3}
        options={{
          tabBarLabel: 'บันทึก',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="book" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="History"
        component={History}
        options={{
          tabBarLabel: 'ประวัติ',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="history" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
