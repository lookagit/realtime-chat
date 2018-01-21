import React, { Component } from 'react';
import {
  Text,
  View,
} from 'react-native';

const ChatItem = ({chatName, chatMessage}) => (
  <View style={{flexDirection: 'column', borderWidth: 1, width: '100%', borderColor: '#bada55'}}>
    <Text>From: {chatName}</Text>
    <Text>{chatMessage}</Text>
  </View>
)
export default ChatItem;
