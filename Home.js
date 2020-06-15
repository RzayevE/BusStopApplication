import DateTimePicker from '@react-native-community/datetimepicker';
import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
  StyleSheet,
  Button,
  ScrollView,
} from 'react-native';
import {get} from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

function Home({navigation}) {
  const [date, setDate] = useState(null);
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

  const twoDigitsString = number => {
    if (number < 10) return '0' + number.toString();
    return number.toString();
  };

  const getDate = date => {
    if (!date) return getDate(new Date());

    let day = twoDigitsString(date.getDate());
    let month = twoDigitsString(date.getMonth());
    return month + '/' + day;
  };

  const getTime = date => {
    if (!date) return getTime(new Date());

    let hours = twoDigitsString(date.getHours());
    let minutes = twoDigitsString(date.getMinutes());
    return hours + ':' + minutes;
  };

  const filterList = list => {
    let res = [];
    for (let i = 0; i < list.length; i++) {
      if (list[i].id) res.push(list[i]);
    }
    if (res.length === 0) res.push({id: 0, name: 'No result'});
    return res;
  };

  // Departure states and methods
  const [departureSelected, setDepartureSelected] = useState(null);
  const [departureSearch, setDepartureSearch] = useState(null);
  const [departureData, setDepartureData] = useState([]);

  const getDepartureStations = () => {
    fetch(url + departureSearch + filter)
      .then(response => response.json())
      .then(responseJson => {
        let stations = responseJson['stations'];
        if (stations) setDepartureData(filterList(stations));
      })
      .catch(error => console.log(error));
  };

  const renderDepartureStation = data => {
    return (
      <TouchableOpacity
        style={styles.list}
        onPress={() => {
          if (data.item.name !== 'No result') {
            setDepartureSelected(parseInt(data.item.id));
            setDepartureSearch(data.item.name);
            setDepartureData([]);
          }
        }}>
        <Text style={styles.lightText}>{data.item.name}</Text>
      </TouchableOpacity>
    );
  };

  // Arrival states and methods
  const [arrivalSelected, setArrivalSelected] = useState(null);
  const [arrivalSearch, setArrivalSearch] = useState(null);
  const [arrivalData, setArrivalData] = useState([]);

  const getArrivalStations = () => {
    fetch(url + arrivalSearch + filter)
      .then(response => response.json())
      .then(responseJson => {
        let stations = responseJson['stations'];
        if (stations) setArrivalData(filterList(stations));
      })
      .catch(error => console.log(error));
  };

  const renderArrivalStation = data => {
    return (
      <TouchableOpacity
        style={styles.list}
        onPress={() => {
          if (data.item.name !== 'No result') {
            setArrivalSelected(parseInt(data.item.id));
            setArrivalSearch(data.item.name);
            setArrivalData([]);
          }
        }}>
        <Text style={styles.lightText}>{data.item.name}</Text>
      </TouchableOpacity>
    );
  };

  const url = 'http://transport.opendata.ch/v1/locations?type=stations&query=';
  const filter = '&fields[]=stations/id&fields[]=stations/name';
  return (
    <ScrollView>
      <View style={styles.main}>
        {/* Departures */}
        <View style={styles.container}>
          <TextInput
            defaultValue="Departure"
            style={styles.inputField}
            onFocus={() => setDepartureSearch('')}
            onChangeText={text => setDepartureSearch(text)}
            onSubmitEditing={_ => getDepartureStations()}
            value={departureSearch}
          />
          <FlatList
            data={departureData}
            renderItem={item => renderDepartureStation(item)}
          />
        </View>
        {/* Arrivals */}
        <View style={styles.container}>
          <TextInput
            defaultValue="Arrival"
            style={styles.inputField}
            onFocus={() => setArrivalSearch('')}
            onChangeText={text => setArrivalSearch(text)}
            onSubmitEditing={_ => getArrivalStations()}
            value={arrivalSearch}
          />
          <FlatList
            data={arrivalData}
            renderItem={item => renderArrivalStation(item)}
          />
        </View>
        {/*Buttons*/}
        <View style={styles.container2}>
          <View style={styles.container3}>
            <View style={styles.button}>
              <Button
                color="#2196F3"
                onPress={showDatepicker}
                title={'Select Date\n' + getDate(date)}
              />
            </View>
            <View style={styles.button}>
              <Button
                color="#2196F3"
                onPress={showTimepicker}
                title={'Select Time\n' + getTime(date)}
              />
            </View>
          </View>
          <View style={styles.button2}>
            <Button
              color="green"
              disabled={!(departureSelected && arrivalSelected)}
              onPress={() => {
                let date = date ? date : new Date();
                let loaded = false;
                navigation.navigate('Trips', {
                  date,
                  departureSelected,
                  arrivalSelected,
                  loaded,
                });
              }}
              title={'View\n' + 'trips'}
            />
          </View>
          {show && (
            <DateTimePicker
              value={date ? date : new Date()}
              mode={mode}
              is24Hour={true}
              display="default"
              onChange={onChange}
            />
          )}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  button: {
    marginHorizontal: 100,
    marginVertical: 10,
  },
  button2: {
    marginTop: 10,
    marginHorizontal: 100,
    height: 60,
  },
  inputField: {
    borderColor: 'gray',
    borderWidth: 1,
  },
  main: {
    flex: 1,
    backgroundColor: '#FFF',
    marginVertical: 10,
  },
  container: {
    flex: 6,
    backgroundColor: '#FFF',
    marginHorizontal: 10,
  },
  container2: {
    flex: 5,
    backgroundColor: '#FFF',
    marginHorizontal: 10,
  },
  container3: {
    marginTop: 10,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  list: {
    paddingVertical: 4,
    margin: 5,
    backgroundColor: '#fff',
    marginHorizontal: 8,
  },
  lightText: {
    color: 'black',
  },
});

export default Home;
