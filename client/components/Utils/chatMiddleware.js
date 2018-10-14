import { SUBSCRIBE, INIT_MESSAGES, NEW_MESSAGE} from '../Redux/Constants'
import { extractMsgDetails } from './index';

const _onReceive = (store, roomId) => msg => {
  let incomingMsg = extractMsgDetails(msg);
  store.dispatch({ type: NEW_MESSAGE, roomId, incomingMsg })
}

export default chatMiddleware = store => next => async action => {

  const { chatReducer } = store.getState();
  let { currentUser } = chatReducer;
  console.log("IN MIDDLEWARE:", action.type);
  // console.log("CURRENT USER:", currentUser);

  if (action.type === SUBSCRIBE && !currentUser.roomSubscriptions[action.roomId]) {
    try {
      let { roomId } = action;

      let messages = await currentUser.fetchMessages({
        roomId,
        direction: 'older',
        limit: 100,
      });

      console.table(messages);

      messages = messages.map(extractMsgDetails).reverse();

      store.dispatch({
        type: INIT_MESSAGES,
        roomId,
        messages
      });

      currentUser.subscribeToRoom({
        roomId,
        hooks: {
          onNewMessage: _onReceive(store, roomId)
        },
        messageLimit: 0
      });
    } catch (err) {
      console.error(err);
    }
  }

  return next(action);
}
