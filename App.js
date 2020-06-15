/**
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Home from './Home';
import Trips from './Trips';
import Itinerary from './Itinerary';

const Stack = createStackNavigator();

const App: () => React$Node = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={'Home'}>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{title: 'Schedule a trip'}}
        />
        <Stack.Screen
          name="Trips"
          component={Trips}
          options={{title: 'Select a trip'}}
        />
        <Stack.Screen
          name="Itinerary"
          component={Itinerary}
          options={{title: 'Your trip'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
