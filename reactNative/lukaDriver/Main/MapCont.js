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
    <ImageBackground
      source={{uri:'http://www.tbaytel.net/Portals/_default/Skins/tbaytel-eleven-seventeen/img/livechat-tab-icon.png'}}
      style={{
        flex: 1,
        width: null,
        height: null,
      }}
      resizeMode={'contain'}>
      <View style={{flex:1}}>
        <ScrollView style={{flex: 8, borderWidth: 2, borderColor: 'blue'}}>
          {
            messages.length ? messages.map((item, key) => (
              <ChatItem chatName={item.name} chatMessage={item.message} />
            )) : null
          }
        </ScrollView>
        <View style={{flex: 2}}>
          <TextInput
            placeholder="Unesite ime..."
            value={this.state.name}
            onChangeText={(val) => {
               this.setState({
                 name: val,
               })
            }}
          />
          <TextInput
            placeholder="Unesite Poruku..."
            multiline={true}
            value={this.state.message}
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
