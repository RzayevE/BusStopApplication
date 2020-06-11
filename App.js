import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Button, Text, View} from 'react-native';
import {SchedulePage} from './SchedulePage';
import {Home} from './Home';
import * as React from 'react';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{title: 'Find My Bus'}}
        />
        <Stack.Screen
          name="Profile"
          component={SchedulePage}
          options={{title: 'Schedule'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
