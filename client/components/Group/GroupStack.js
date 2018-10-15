import React from 'react';

import { createStackNavigator } from 'react-navigation'

import GroupScreen from './GroupScreen'
import ChatScreen from './ChatScreen'
import GameRooms from './GameRooms'

const GroupStack = createStackNavigator(
  {
    GroupHome: GroupScreen,
    Rooms: GameRooms,
    Chatroom: ChatScreen
  },
  {
    initialRouteName: 'GroupHome'
  }
);

export default GroupStack;