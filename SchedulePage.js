import {Button, Text, View} from 'react-native';
import * as React from 'react';

export function SchedulePage({route, navigation}) {
  const {date} = route.params;
  const {arrivalCity} = route.params;
  const {departureCity} = route.params;

  return (
    <View>
      <Text>
        Selected date is {date.getUTCDate()}/{date.getUTCMonth() + 1}/
        {date.getUTCFullYear()}
      </Text>
      <Text>Departure City is {departureCity}</Text>
      <Text>Arrival City is {arrivalCity}</Text>

      <Button title="button">Button</Button>
    </View>
  );
}
