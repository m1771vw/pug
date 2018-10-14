import React from "react";
import { connect } from 'react-redux'
import { GiftedChat, Bubble } from "react-native-gifted-chat";

import {
  CHATKIT_TOKEN_PROVIDER_ENDPOINT,
  CHATKIT_INSTANCE_LOCATOR,
  CHATKIT_ROOM_ID,
  CHATKIT_USER_NAME
} from '../../config/info';

import { View, Text } from 'react-native';

import { bubbleBackgroundColors } from '../../constants';

import { getChatMessages } from '../Utils'

import { sendMessage, leaveRoom, unsubscribeFromRoom } from '../Redux/Actions'

/**
 * Helper function to create messages to render from server response
 * 
 * Things to do:
 * -> dynamically apply avatar based on a user's profile
 */
const extractMsgDetails = (data) => {
  const { id, senderId, text, createdAt } = data;
  const incomingMessage = {
    _id: id,
    text: text,
    createdAt: new Date(createdAt),
    user: {
      _id: senderId,
      name: senderId,
      avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmXGGuS_PrRhQt73sGzdZvnkQrPXvtA-9cjcPxJLhLo8rW-sVA"
    }
  };
  return incomingMessage;
}


class ChatScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('title', 'A Nested Details Screen'),
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
            right: {
              color: 'white'
            },
            left: {
              color: 'white'
            }
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
            right: {
              color: 'white'
            },
            left: {
              color: 'white'
            }
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

  render() {
    const { messages, sendMessage} = this.props;
    return (
      <View style={{ backgroundColor: "#F0F8FF", flex: 1 }}>
        <GiftedChat
          messages={messages}
          onSend={sendMessage}
          user={{
            _id: CHATKIT_USER_NAME
          }}
          renderBubble={this.renderBubble}
        />
      </View>
    )
  }
}

const mapStateToProps = ({ chatReducer }) => ({
  currentUser: chatReducer.currentUser,
  messages: getChatMessages(chatReducer)
})

const mapDispatchToProps = dispatch => ({
  sendMessage: ([message]) => dispatch(sendMessage(message.text)),
  leaveRoom: () => dispatch(leaveRoom()),
  unsubscribeFromRoom: () => dispatch(unsubscribeFromRoom())
})

export default connect(mapStateToProps, mapDispatchToProps)(ChatScreen);