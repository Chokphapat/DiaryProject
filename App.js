import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Section1 from './components/Section1';
import BottomTab from './navigations/Bottomtep';



const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            {/* <Section1/> */}
            <BottomTab/>
        </NavigationContainer>
    );
}
