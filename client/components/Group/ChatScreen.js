import React from "react";
import { connect } from 'react-redux'
import { GiftedChat, Bubble } from "react-native-gifted-chat";

import {
  CHATKIT_TOKEN_PROVIDER_ENDPOINT,
  CHATKIT_INSTANCE_LOCATOR,
  CHATKIT_ROOM_ID,
  CHATKIT_USER_NAME
} from '../../config/info';

import { View, Text, TouchableOpacity } from 'react-native';

import { bubbleBackgroundColors } from '../../constants';

import { getChatMessages } from '../Utils'

import { sendMessage, leaveRoom, unsubscribeFromRoom } from '../Redux/Actions'


class ChatScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('title', 'A Nested Details Screen')
    };
  };

  renderBubble = (props) => {
    let username = props.currentMessage.user.name
    let backgroundColor = this.getBubbleBackgroundColor(username)

    if (props.isSameUser(props.currentMessage, props.previousMessage) && props.isSameDay(props.currentMessage, props.previousMessage)) {
      return (
        <Bubble
          {...props}
          textStyle={{
            right: { color: 'white' },
            left: { color: 'white' }
          }}
          wrapperStyle={{ left: { backgroundColor } }}
        />
      );
    }

    return (
      <View>
        <Text style={{ fontSize: 10 }}>{props.currentMessage.user.name}</Text>
        <Bubble
          {...props}
          textStyle={{
            right: { color: 'white' },
            left: { color: 'white' }
          }}
          wrapperStyle={{ left: { backgroundColor } }}
        />
      </View>
    );
  }

  getBubbleBackgroundColor = (username) => {
    let currentUsersInRoom = this.props.currentUser.users.map(user => user.id);
    let usernameIndex = currentUsersInRoom.findIndex(user => user === username)
    return bubbleBackgroundColors[usernameIndex];
  }

  _leaveRoom = () => {
    let { navigation, currentRoomId, unsubscribeFromRoom, leaveRoom } = this.props;
    console.log("CHATSCREEN: Leave Room pressed:", currentRoomId);
    unsubscribeFromRoom(currentRoomId);
    leaveRoom(currentRoomId);
    navigation.goBack();
  }

  render() {
    const { messages, sendMessage } = this.props;
    return (
      <View style={{ backgroundColor: "#F0F8FF", flex: 1 }}>
        { messages.length === 0 && (<Text>Welcome to the Chatroom! Be the first to say Hello! 👋 </Text>)}
        <GiftedChat
          messages={messages}
          onSend={sendMessage}
          user={{
            _id: CHATKIT_USER_NAME      // FUTURE: add to redux or async storage later
          }}
          renderBubble={this.renderBubble}
        />
        {/* Temporary leave room button */}
        <TouchableOpacity style={{borderWidth: 1, borderColor: 'black', width: 100, height: 25}} onPress={this._leaveRoom}>
        <Text>Leave Room</Text>
        </TouchableOpacity>
      </View>

    )
  }
}

const mapStateToProps = ({ chatReducer }) => ({
  currentUser: chatReducer.currentUser,
  messages: getChatMessages(chatReducer),
  currentRoomId: chatReducer.currentRoomId
})

const mapDispatchToProps = dispatch => ({
  sendMessage: ([message]) => dispatch(sendMessage(message.text)),
  unsubscribeFromRoom: roomId => dispatch(unsubscribeFromRoom(roomId)),
  leaveRoom: roomId => dispatch(leaveRoom(roomId))
})

export default connect(mapStateToProps, mapDispatchToProps)(ChatScreen);