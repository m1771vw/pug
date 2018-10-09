import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchJoinableRooms, fetchJoinedRooms } from '../Redux/Actions';

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

  selectGroup = ({ name, ...details }) => () => {
    this.props.navigation.navigate('Game', { title: name, details });
  }

  render() {
    const { joinableRooms, joinedRooms } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <List containerStyle={{ marginBottom: 20 }}>
          {
            joinedRooms.map((room) => (
              <ListItem
                onPress={this.selectGroup(room)}
                key={room.id}
                title={room.name}
              />
            ))
          }
        </List>
        {
          /* 
          Need to implement joining a room that I am currently not in; 
          otherwise if I click the room it will yell that I am not authorized
          */
        }
        <List containerStyle={{ marginBottom: 20 }}>
          {
            joinableRooms.map((room) => (
              <ListItem
                onPress={this.selectGroup(room)}
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

const mapStateToProps = ({ gameReducer }) => ({
  joinableRooms: gameReducer.joinableRooms,
  joinedRooms: gameReducer.joinedRooms
})

const mapDispatchToProps = dispatch => ({
  fetchJoinableRooms: (game, userId) => dispatch(fetchJoinableRooms(game, userId)),
  fetchJoinedRooms: (game, userId) => dispatch(fetchJoinedRooms(game, userId))
})

export default connect(mapStateToProps, mapDispatchToProps)(GameRooms);