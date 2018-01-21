import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Alert,
  TextInput,
  TouchableOpacity,
  Image,
  ImageBackground,
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
    if(this.state.name !== 'Unknown' && this.state.message !== 'Unknown') {
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
    <ImageBackground
      source={{uri:'http://www.tbaytel.net/Portals/_default/Skins/tbaytel-eleven-seventeen/img/livechat-tab-icon.png'}}
      style={{
        flex: 1,
        width: null,
        height: null,
      }}  
      resizeMode={'contain'}>   
      <View style={{flex:1}}>
        <View style={{flex: 8, borderWidth: 2, borderColor: 'blue'}}> 
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>****Chat****</Text>
          <Text>{this.state.message}</Text>
          <Text>{this.state.name}</Text>
        </View>
        <View style={{flex: 2}}>
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
      </View>
    </ImageBackground> 
    )
  }
}

class BackGroundImage extends React.Component {
  render() {
    return(
      <Image 
        style={{
          flex: 1,
            width: null,
            height: null,
            resizeMode: 'cover'
        }} 
        source={{uri:'http://www.tbaytel.net/Portals/_default/Skins/tbaytel-eleven-seventeen/img/livechat-tab-icon.png'}}
        >
        {this.props.children}
      </Image>
    );
  }
}
export default MapCont;
