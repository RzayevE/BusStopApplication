import React from 'react';
import {View, FlatList, Text, StyleSheet, Item, ScrollView} from 'react-native';

const getTime = string => {
  return string.toString().substring(11, 16);
};

const getDate = string => {
  return (
    string.toString().substring(5, 7) + '/' + string.toString().substring(8, 10)
  );
};

function Itinerary({route, navigation}) {
  const {data} = route.params;
  const trip = data.item;

  // TODO:
  //    Display trip information
  //    Departure (place, time, platform, vehicle, ...)
  //    Intermediate stops (place, time, platform, vehicle, ...)
  //    Arrival
  //    Would be nice to have steps number

  const getDepartureHeader = (from, short) => {
    let dep = short ? 'Dep: ' : 'Departure:  ';
    return dep + getDate(from.departure) + ' at ' + getTime(from.departure);
  };

  const getArrivalHeader = to => {
    return 'Arrival:  ' + getDate(to.arrival) + ' at ' + getTime(to.arrival);
  };

  const renderDepartureStation = from => {
    return (
      <View>
        <Text style={{fontSize: 20, marginLeft: 5}}>
          {getDepartureHeader(from)}
        </Text>
        <Text style={{fontSize: 15}}>{'   From: ' + from.station.name}</Text>
      </View>
    );
  };

  const renderArrivalStation = to => {
    return (
      <View>
        <Text style={{fontSize: 20, marginLeft: 5}}>
          {getArrivalHeader(to)}
        </Text>
        <Text style={{fontSize: 15}}>{'   To: ' + to.station.name}</Text>
      </View>
    );
  };

  const renderTransferStation = transfer => {
    return (
      <View style={styles.transferBox}>
        {/*Transfer departure*/}
        <View style={styles.transferItem}>
          <Text>
            {' '}
            {transfer.item.departure.station.name +
              '\n' +
              getDepartureHeader(transfer.item.departure, true)}
          </Text>
        </View>
        <View style={styles.transferArrow}>
          <Text> → </Text>
        </View>
        {/*Arrival departure*/}
        <View style={styles.transferItem}>
          <Text>
            {' '}
            {transfer.item.arrival.station.name +
              '\n' +
              getArrivalHeader(transfer.item.arrival)}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <ScrollView>
      <View style={styles.main}>
        {/*Departure info*/}
        <View style={styles.list}>{renderDepartureStation(trip.from)}</View>
        {/*Transfers info - may be empty*/}
        <View style={styles.list}>
          <FlatList
            data={trip.sections}
            renderItem={item => renderTransferStation(item)}
          />
        </View>
        {/*Arrival info*/}
        <View style={styles.list}>{renderArrivalStation(trip.to)}</View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 3,
    backgroundColor: '#FFF',
    marginVertical: 10,
  },
  container: {
    flex: 6,
    backgroundColor: '#FFF',
    marginHorizontal: 10,
  },
  transferBox: {
    flex: 5,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    backgroundColor: '#FFF',
    marginHorizontal: 10,
  },
  transferItem: {
    flex: 3,
    padding: 10,
  },
  transferArrow: {
    flex: 1,
    padding: 10,
    fontSize: 30,
    justifyContent: 'center',
    alignContent: 'center',
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

export default Itinerary;
