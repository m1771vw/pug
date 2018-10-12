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
  CHECK_ROOM_AVAILABILITY, 
  JOIN_ROOM,
  LEAVE_ROOM,
  UNSUBSCRIBE
} from '../Constants'

import {
  CHATKIT_TOKEN_PROVIDER_ENDPOINT,
  CHATKIT_INSTANCE_LOCATOR
} from '../../../config/info';


// This will instantiate a `chatManager` object. This object can be used to subscribe to any number of rooms and users and corresponding messages.
// For the purpose of this example we will use single room-user pair.
const _createChatManager = (userId, url, instanceLocator) => {
  const tokenProvider = new Chatkit.TokenProvider({ url });

  return new Chatkit.ChatManager({
    instanceLocator,
    userId,
    tokenProvider,
    connectionTimeout: 20000
  });
}

// Our initial connection action
export const connectChatKit = userId => async dispatch => {
  dispatch({ type: CONNECTION_REQUEST });
  try {
    let chatManager = _createChatManager(userId, CHATKIT_TOKEN_PROVIDER_ENDPOINT, CHATKIT_INSTANCE_LOCATOR);
    let currentUser = await chatManager.connect();
    console.log(`Successful connection ${currentUser}`);
    dispatch({ type: CONNECTED, currentUser });
    dispatch(subscribeToAllJoined(userId));

  } catch (err) {
    console.error(`Error on connection ${err}`);
    dispatch({ type: DISCONNECTED });
  }
}

/**
 *  interacts with currentUser (ChatKit)
 */

export const sendMessage = text => ({ type: SEND_MESSAGE, text })

export const changeChatRoom = roomId => ({ type: CHANGE_CHATROOM, roomId })

export const subscribeToRoom = (roomId, length) => ({ type: SUBSCRIBE, roomId, length })

export const subscribeToAllJoined = userId => async dispatch => {
  let { data: rooms } = await axios.get(`http://localhost:5000/alljoinedrooms?userId=${userId}`);
  rooms.forEach(({ id }) => {
    dispatch(subscribeToRoom(id, rooms.length))
  })
}

// TODO: - Finish actions
export const checkRoomAvailability = () => ({ type:CHECK_ROOM_AVAILABILITY,  })

export const joinRoom = () => ({ type:JOIN_ROOM, })

export const leaveRoom = () => ({ type:LEAVE_ROOM, })

export const unsubscribeFromRoom = () => ({ type:UNSUBSCRIBE })

/**
 * Interacts with our /server
 */
export const fetchValidGames = () => async dispatch => {
  let { data } = await axios.get('http://localhost:5000/gamelist');
  dispatch({ type: FETCH_VALID_GAMES, validGames: data });
}

export const fetchJoinableRooms = (game, userId) => async dispatch => {
  let { data } = await axios.get(`http://localhost:5000/gamerooms?game=${game}&userId=${userId}`);
  dispatch({ type: FETCH_JOINABLE, rooms: data });
}

export const fetchJoinedRooms = (game, userId) => async dispatch => {
  let { data } = await axios.get(`http://localhost:5000/userrooms?game=${game}&userId=${userId}`);
  dispatch({ type: FETCH_JOINED_ROOMS, rooms: data });
}