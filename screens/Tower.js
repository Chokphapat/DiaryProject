import React from 'react';
import { ScrollView,  View } from 'react-native';
import Section1 from '../../components/week3/Section1';
import Home from '../components/week1/Home';


export default function Tower() {
    return (
        <ScrollView>
            <View style={{ flex: 1, paddingTop: 20 }}>
                <Home/>
                
                <Section1/>
                    
            </View>
        </ScrollView>
    );
}