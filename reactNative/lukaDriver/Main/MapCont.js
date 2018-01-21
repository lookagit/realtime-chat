import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
import Pusher from 'pusher-js/react-native';
import ChatItem from './ChatItem';
class MapCont extends Component {
  state = {
    message: '',
    name: '',
    messages: [],
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
      console.log("DATAAA ", data);
      this.setState({
        messages: [...this.state.messages, {
          message: data.message,
          name: data.name,
        }]
      })
      //ZVUK OVDE :D
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
          name: this.state.name,
          message: this.state.message,
        }),
      });
      this.setState({
        name: '',
        message: '',
      })
    }
  }
  render() {
    let {messages} = this.state || [];
    console.log("MESSS ", messages);
    return(
      <View style={{flex:1}}>
      <ImageBackground
        source={{uri:'http://www.tbaytel.net/Portals/_default/Skins/tbaytel-eleven-seventeen/img/livechat-tab-icon.png'}}
        style={{
          flex: 1,
          width: null,
          height: null,
        }}
        resizeMode={'contain'}>
        <ScrollView style={{flex: 8, borderWidth: 2, borderColor: 'blue'}}>
          {
            messages.length ? messages.map((item, key) => (
              <ChatItem chatName={item.name} chatMessage={item.message} />
            )) : null
          }
        </ScrollView>
        <View style={{flex: 2, backgroundColor: '#c0e3ed'}}>
          <ScrollView>
            <TextInput
              placeholder="Unesite ime..."
              style={{
                borderWidth: 1,
                borderRadius: 10,
                borderColor: '#007698',
                marginBottom: 5,
                backgroundColor: 'white'
              }}
              underlineColorAndroid={'transparent'}
              onChangeText={(val) => {
                 this.setState({
                   name: val,
                 })
              }}
            />
            <TextInput
              placeholder="Unesite Poruku..."
              style={{
                borderWidth: 1,
                borderRadius: 10,
                borderColor: '#007698',
                backgroundColor: 'white',
                marginBottom: 5,
              }}
              underlineColorAndroid={'transparent'}
              multiline={true}
              onChangeText={(val) => {
                 this.setState({
                   message: val,
                 })
              }}
            />
            <TouchableOpacity
              style={{width: '100%', height: 50, backgroundColor: '#007698', opacity: 0.6, borderWidth: 1, borderColor: 'transparent', borderRadius: 15,justifyContent: 'center' }}
              onPress={() => {
                this.createTriger();
              }}>
              <Text style={{fontSize: 18, fontWeight: 'bold',alignSelf: 'center', color: 'white'}}>Send message</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </ImageBackground>
      </View>
    )
  }
}
export default MapCont;
