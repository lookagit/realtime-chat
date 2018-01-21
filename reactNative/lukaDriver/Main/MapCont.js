import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Alert,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Pusher from 'pusher-js/react-native';

class MapCont extends Component {
  state = {
    message: 'Unknown',
    name: 'Unknown',
  }
  constructor(props) {
    super(props);
    this.available_drivers_channel = null;
    this.ride_channel = null;
    this.pusher = null;
  }

  componentDidMount() {
    this.pusher = new Pusher('6f48f906c45c9541f9da', {
      cluster: 'eu',
      encrypted: true
    });

    var channel = this.pusher.subscribe('my-channel');
    channel.bind('my-event', (data) => {
      this.setState({
        message: data.message,
        name: data.ime,
      })
      console.log("JA SAM DATAAAA ", data);
    });
  }
  createTriger = async () => {
    if(this.state.name !== '' && this.state.message !== '') {
      let getServer = await fetch('https://lubaks-chat.herokuapp.com/', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ime: this.state.name,
          message: this.state.message,
        }),
      });
    }
  }
  render() {
    return(
      <View>
        <Text>{this.state.message}</Text>
        <Text>{this.state.name}</Text>
        <TextInput
          placeholder="Unesite ime..."
          onChangeText={(val) => {
             this.setState({
               name: val,
             })
          }}
        />
        <TextInput
          placeholder="Unesite Poruku..."
          multiline={true}
          onChangeText={(val) => {
             this.setState({
               message: val,
             })
          }}
        />
        <TouchableOpacity onPress={() => {
          this.createTriger();
        }}>
          <Text>AJDE KLIKNI</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
export default MapCont;
