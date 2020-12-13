import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { Component } from 'react';

import Bicycles from './pages/Bicycles.js'
import SingleBicycle from './pages/SingleBicycle.js'

class App extends Component{

    render(){
        const Stack = createStackNavigator();
        return (
            <NavigationContainer>
                <Stack.Navigator>      
                    <Stack.Screen name="BICYCLES" component={Bicycles}/>  
                    <Stack.Screen name="SINGLE BICYCLE" component={SingleBicycle} />  
                </Stack.Navigator>
            </NavigationContainer>
        );
    }
}

export default App