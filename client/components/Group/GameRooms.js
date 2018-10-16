import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  fetchJoinableRooms,
  fetchJoinedRooms,
  changeChatRoom,
  checkRoomAvailability,
  joinRoom
} from '../Redux/Actions';

import { Text, View } from 'react-native'
import { List, ListItem } from 'react-native-elements'

import { CHATKIT_USER_NAME } from '../../config/info';

class GameRooms extends Component {
  state = {}

  componentDidMount() {
    const { fetchJoinableRooms, fetchJoinedRooms, navigation } = this.props;
    const game = navigation.getParam('serverName', "BAD SERVER GAME PARAM");

    fetchJoinableRooms(game, CHATKIT_USER_NAME);
    fetchJoinedRooms(game, CHATKIT_USER_NAME);
  }

  selectRoom = room => () => {
    const { navigation, changeChatRoom } = this.props;
    changeChatRoom(room.id);
    navigation.navigate('Chatroom', { title: room.name });
  }

  _joinRoom = room => () => {
    const { navigation, changeChatRoom, checkRoomAvailability } = this.props;
    let allowed = checkRoomAvailability(CHATKIT_USER_NAME, room.id);
    if(allowed) {
      changeChatRoom(room.id);
      navigation.navigate('Chatroom', { title: room.name});
    } else {
      // TODO: - Need to do something when cannot join room.
      console.log("Cannot join room");
    }
  }

  render() {
    /**
     * ISSUE:
     * 
     * Should render a loading gif whenever in process of fetching new JoinableRooms / JoinedRooms
     * Currently showing preloaded rooms before changing to new ones
     * 
     */

    const { joinableRooms, joinedRooms } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 20 }}>
          Joined Rooms
        </Text>
        <List containerStyle={{ marginBottom: 20 }}>
          {
            joinedRooms.map((room) => (
              <ListItem
                onPress={this.selectRoom(room)}
                key={room.id}
                title={room.name}
              />
            ))
          }
        </List>
        <Text style={{ fontSize: 20 }}>
          Joinable Rooms
        </Text>
        <List containerStyle={{ marginBottom: 20 }}>
          {
            joinableRooms.map((room) => (
              <ListItem
                onPress={this._joinRoom(room)}
                key={room.id}
                title={room.name}
              />
            ))
          }
        </List>
      </View>
    );
  }
}

const mapStateToProps = ({ roomReducer }) => ({
  joinableRooms: roomReducer.joinableRooms,
  joinedRooms: roomReducer.joinedRooms
})

const mapDispatchToProps = dispatch => ({
  changeChatRoom: roomId => dispatch(changeChatRoom(roomId)),
  fetchJoinableRooms: (game, userId) => dispatch(fetchJoinableRooms(game, userId)),
  fetchJoinedRooms: (game, userId) => dispatch(fetchJoinedRooms(game, userId)),
  checkRoomAvailability: (userId, roomId) => dispatch(checkRoomAvailability(userId, roomId))

})

export default connect(mapStateToProps, mapDispatchToProps)(GameRooms);