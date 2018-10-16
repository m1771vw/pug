import axios from 'axios';
import Chatkit from "@pusher/chatkit";

import {
  FETCH_VALID_GAMES,
  FETCH_JOINABLE,
  FETCH_JOINED_ROOMS,
  CONNECTION_REQUEST,
  CONNECTED,
  DISCONNECTED,
  SUBSCRIBE,
  CHANGE_CHATROOM,
  SEND_MESSAGE,
  JOIN_ROOM,
  NOT_ALLOWED,
  LEAVE_ROOM,
  UNSUBSCRIBE,
  NO_JOINED_ROOMS,
  ERROR_SUBSCRIBING
} from '../Constants'

import {CHATKIT_TOKEN_PROVIDER_ENDPOINT, CHATKIT_INSTANCE_LOCATOR, SERVER_URL} from '../../../config/info';

// This will instantiate a `chatManager` object. This object can be used to
// subscribe to any number of rooms and users and corresponding messages. For
// the purpose of this example we will use single room-user pair.
const _createChatManager = (userId, url, instanceLocator) => {
  const tokenProvider = new Chatkit.TokenProvider({url});

  return new Chatkit.ChatManager({instanceLocator, userId, tokenProvider, connectionTimeout: 20000});
}

// Our initial connection action
export const connectChatKit = userId => async dispatch => {
  dispatch({type: CONNECTION_REQUEST});
  try {
    let chatManager = _createChatManager(userId, CHATKIT_TOKEN_PROVIDER_ENDPOINT, CHATKIT_INSTANCE_LOCATOR);
    let currentUser = await chatManager.connect();
    console.log(`Successful connection ${currentUser}`);
    dispatch({type: CONNECTED, currentUser});
    dispatch(subscribeToAllJoined(userId));

  } catch (err) {
    console.error(`Error on connection ${err}`);
    dispatch({type: DISCONNECTED});
  }
}

/**
 *  interacts with currentUser (ChatKit)
 */

export const sendMessage = text => ({type: SEND_MESSAGE, text})

export const changeChatRoom = roomId => ({type: CHANGE_CHATROOM, roomId})

export const subscribeToRoom = (roomId, length) => ({type: SUBSCRIBE, roomId, length})

export const subscribeToAllJoined = userId => async dispatch => {
  try {
    let {data: rooms} = await axios.get(`${SERVER_URL}/alljoinedrooms?userId=${userId}`);

    console.table(rooms);

    rooms.forEach(({id}) => {
      dispatch(subscribeToRoom(id, rooms.length))
    })

    if (rooms.length === 0) {
      dispatch({type: NO_JOINED_ROOMS})
    }

  } catch (err) {
    console.log("USER ID: ", userId)
    console.error(err);
    dispatch({type: ERROR_SUBSCRIBING})
  }
}

export const checkRoomAvailability = (userId, roomId) => async dispatch => {
  let {data} = await axios.get(`${SERVER_URL}/checkroom?userId=${userId}&roomId=${roomId}`);
  if (data.allowed) {
    dispatch(joinRoom(roomId))
  } else {
    // TODO: - Need to do something when cannot join room.
    dispatch({type: NOT_ALLOWED})
  }
}

export const joinRoom = roomId => ({type: JOIN_ROOM, roomId})

export const leaveRoom = roomId => ({type: LEAVE_ROOM, roomId})

export const unsubscribeFromRoom = roomId => ({type: UNSUBSCRIBE, roomId})

/**
 * Interacts with our /server
 */
export const fetchValidGames = () => async dispatch => {
  let {data} = await axios.get(`${SERVER_URL}/gamelist`);
  dispatch({type: FETCH_VALID_GAMES, validGames: data});
}

export const fetchJoinableRooms = (game, userId) => async dispatch => {
  let {data} = await axios.get(`${SERVER_URL}/gamerooms?game=${game}&userId=${userId}`);
  dispatch({type: FETCH_JOINABLE, rooms: data});
}

export const fetchJoinedRooms = (game, userId) => async dispatch => {
  let {data} = await axios.get(`${SERVER_URL}/userrooms?game=${game}&userId=${userId}`);
  dispatch({type: FETCH_JOINED_ROOMS, rooms: data});
}