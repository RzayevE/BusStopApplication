import React, {useState} from 'react';
import {View, Text, TouchableOpacity, FlatList, StyleSheet} from 'react-native';

const twoDigitsString = number => {
  if (number < 10) {
    return '0' + number.toString();
  }
  return number.toString();
};

const getTime = string => {
  return string.toString().substring(11, 16);
};

const getDate = string => {
  return string.toString().substring(0, 10);
};

const getDateFilter = date => {
  return (
    '&date=' +
    (date.getFullYear() +
      '-' +
      twoDigitsString(date.getMonth() + 1) +
      '-' +
      twoDigitsString(date.getDate())) +
    '&time=' +
    (date.getHours() + ':' + date.getMinutes())
  );
};

const getTripHeader = data => {
  let departure = data.item.from.station.name;
  let arrival = data.item.to.station.name;

  return departure + ' → ' + arrival;
};

const getTripTime = data => {
  let departureTime = getTime(data.item.from.departure);
  let arrivalTime = getTime(data.item.to.arrival);

  return 'Departure ' + departureTime + '    Arrival ' + arrivalTime;
};

const getStops = data => {
  let transfers = data.item.transfers;
  if (transfers === 0) {
    return '(Direct)';
  }
  if (transfers === 1) {
    return '(' + transfers + ' trans.)';
  }
  return '(' + transfers + ' trans.)';
};

const FlatListItemSeparator = () => {
  return (
    <View
      style={{
        height: 1,
        width: '100%',
        backgroundColor: '#000',
      }}
    />
  );
};

const FlatListHeader = () => {
  return (
    <View
      elevation={1}
      style={{
        height: 50,
        width: '97%',
        margin: 5,
        backgroundColor: '#fff',
        border: 2.9,
        borderColor: 'black',
        alignSelf: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 16,
        },
        shadowOpacity: 1,
        shadowRadius: 2.5,
      }}>
      <Text
        style={{
          color: '#2196F3',
          fontSize: 20,
          fontWeight: 'bold',
          flex: 1,
          alignSelf: 'center',
          paddingTop: 10,
          verticalAlign: 'middle',
        }}>
        Trips Available
      </Text>
    </View>
  );
};

function Trips({route, navigation}) {
  const {date} = route.params;
  const {departureSelected} = route.params;
  const {arrivalSelected} = route.params;
  let {loaded} = route.params;

  const base_url = 'http://transport.opendata.ch/v1/connections?from=';
  const filters =
    '&fields[]=connections/transfers&fields[]=connections/from&fields[]=connections/to&fields[]=connections/sections/departure&fields[]=connections/sections/arrival'; // insert fields filters here if needed (shorter response)
  const url =
    base_url +
    departureSelected +
    '&to=' +
    arrivalSelected +
    filters +
    getDateFilter(date);

  const [tripsData, setTripsData] = useState([]);

  const renderTrip = data => {
    return (
      <TouchableOpacity
        style={styles.list}
        onPress={() => {
          navigation.navigate('Itinerary', {data});
        }}>
        <Text style={styles.lightText}>
          {getTripHeader(data) +
            '  ' +
            getStops(data) +
            '\n' +
            getTripTime(data)}
        </Text>
      </TouchableOpacity>
    );
  };

  if (!loaded) {
    fetch(url)
      .then(response => response.json())
      .then(responseJson => {
        setTripsData(responseJson.connections);
        navigation.setParams({
          date,
          departureSelected,
          arrivalSelected,
          loaded: true,
        });
      })
      .catch(error => console.log(error));
  }

  return (
    <View style={styles.main}>
      <FlatList
        data={tripsData}
        renderItem={item => renderTrip(item)}
        ListHeaderComponent={FlatListHeader}
        ItemSeparatorComponent={FlatListItemSeparator}
      />
    </View>
  );
}

const styles = StyleSheet.create({
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

export default Trips;
