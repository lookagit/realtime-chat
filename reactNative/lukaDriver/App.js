/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import MapCont from './Main/MapCont';

export default class App extends Component<{}> {
  render() {
    return (
      <View style={styles.container}>
        <MapCont />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
  },
});
