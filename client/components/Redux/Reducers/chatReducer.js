import {
  CONNECTED,
  DISCONNECTED,
  CONNECTION_REQUEST,
  INIT_MESSAGES,
  NEW_MESSAGE,
  SUBSCRIBE,
  CHANGE_CHATROOM,
  SEND_MESSAGE,
  NOT_ALLOWED,
  JOIN_ROOM,
  LEAVE_ROOM,
  UNSUBSCRIBE,
  NO_JOINED_ROOMS
} from '../Constants'

const _createRoom = ({ roomId, messages }) => ({
  roomId,
  messages,
  // capacity,
  // users: []
})

const _addMessage = ({ roomId, incomingMsg }, rooms) => {
  let index = rooms.findIndex(rm => rm.roomId === roomId);
  let roomToAdd = { ...rooms[index] };

  return [
    ...rooms.slice(0, index),
    {
      ...roomToAdd,
      messages: [
        incomingMsg,
        ...roomToAdd.messages
      ]
    },
    ...rooms.slice(index + 1)
  ]
}

const initialState = {
  currentUser: {},
  rooms: [],
  connected: false,
  doneInitialSubscriptions: false,       // can be used to signal end of pre-loading; end of loading screen
  currentRoomId: 0
};

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case NO_JOINED_ROOMS:     // case of a user that haven't joined a room
      return {
        ...state,
        doneInitialSubscriptions: true
      }
    case SUBSCRIBE:
      // turn on 'doneInitialSubscriptions' when last initial subscription comes in
      let { rooms, doneInitialSubscriptions } = state;
      return action.length === rooms.length && !doneInitialSubscriptions
        ? {
          ...state,
          doneInitialSubscriptions: true
        }
        : state;
    case CONNECTED:
      return {
        ...state,
        connected: true,
        currentUser: action.currentUser
      }
    case INIT_MESSAGES:
      return {
        ...state,
        rooms: [
          ...state.rooms,
          _createRoom(action)
        ]
      }
    case NEW_MESSAGE:
      return {
        ...state,
        rooms: _addMessage(action, state.rooms)
      }
    case CHANGE_CHATROOM:
      return {
        ...state,
        currentRoomId: action.roomId
      }
    case SEND_MESSAGE:
      let { text } = action;
      state.currentUser.sendMessage({
        roomId: state.currentRoomId,
        text
      });
      return state;
    case JOIN_ROOM:
      console.log("REDUCER: Joining Room", action.roomId);
      return state;
    case LEAVE_ROOM:
      console.log("REDUCER: LEAVING ROOM: ", action.roomId)
      return state;
    case UNSUBSCRIBE:
      console.log("REDUCER: UNSUBSCRIBING ROOM: ", action.roomId)
      return state;
    case DISCONNECTED:
    case CONNECTION_REQUEST:
    case NOT_ALLOWED:
    default:
      return state;
  }
}
 
export default chatReducer;