import {View, Button, Platform, Picker, StyleSheet, Text} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {PickerItem} from 'react-native/Libraries/Components/Picker/Picker';
import React, {useState} from 'react';

export function Home({navigation}) {
  const [departureCity, setDepartureCity] = useState('Select departure city');
  const [arrivalCity, setArrivalCity] = useState('Select arrival city');
  const [date, setDate] = useState(new Date(Date.now()));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  return (
    <View>
      <View style={styles.container}>
        <Text>Select departure city:</Text>
        <Picker
          selectedValue={departureCity}
          style={{height: 50}}
          onValueChange={(itemValue, itemIndex) => setDepartureCity(itemValue)}>
          <PickerItem
            label="Select departure city"
            value="Select departure city"
          />
          <PickerItem label="Basel" value="basel" />
          <PickerItem label="Zurich" value="zurich" />
          <PickerItem label="Lausanne" value="lausanne" />
          <PickerItem label="Bern" value="bern" />
        </Picker>
        <Text>Select arrival city:</Text>
        <Picker
          selectedValue={arrivalCity}
          style={{height: 50}}
          onValueChange={(itemValue, itemIndex) => setArrivalCity(itemValue)}>
          <PickerItem label="Select arrival city" value="Select arrival city" />
          <PickerItem label="Basel" value="Basel" />
          <PickerItem label="Zurich" value="Zurich" />
          <PickerItem label="Lausanne" value="Lausanne" />
          <PickerItem label="Bern" value="Bern" />
        </Picker>
        {/*<Demopicker></Demopicker>*/}
      </View>
      <View style={{marginRight: 30, marginLeft: 30, marginTop: 150}}>
        <View style={{marginTop: 10}}>
          <Text>
            Selected date is {date.getDate()}/{date.getUTCMonth() + 1}/
            {date.getFullYear()}
          </Text>
        </View>
        <View style={{marginTop: 10}}>
          <Button onPress={showDatepicker} title="Select Date" />
        </View>
        <View style={{marginTop: 10}}>
          <Text>
            Selected time is {date.getHours()}:{date.getMinutes()}
          </Text>
        </View>
        <View style={{marginTop: 10}}>
          <Button onPress={showTimepicker} title="Select Hour" />
        </View>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
        )}
      </View>
      <View style={{marginTop: 40, marginLeft: 30, marginRight: 30}}>
        <Button
          title="Show Schedule"
          onPress={() =>
            navigation.navigate('Profile', {date, departureCity, arrivalCity})
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingLeft: 20,
    paddingRight: 20,
  },
});
