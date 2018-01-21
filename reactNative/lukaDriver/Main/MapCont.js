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
  ScrollView,
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
      let getServer = await fetch('https://server-hryyliokwv.now.sh', {
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
      <View style={{flex:1}}>
      <ImageBackground
        source={{uri:'http://www.tbaytel.net/Portals/_default/Skins/tbaytel-eleven-seventeen/img/livechat-tab-icon.png'}}
        style={{
          flex: 1,
          width: null,
          height: null,
        }}  
        resizeMode={'contain'}>   
        <View style={{flex: 8, borderWidth: 2, borderColor: '#007698', borderRadius: 10,}}> 
          <Text style={{fontSize: 18, fontWeight: 'bold',alignSelf: 'center'}}>****Chat****</Text>
          <Text>{this.state.name}</Text>
          <Text>{this.state.message}</Text>
        </View>
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
