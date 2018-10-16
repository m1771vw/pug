export const extractMsgDetails = (data) => {
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

export const getChatMessages = state => {
  const { rooms, currentRoomId } = state;
  let room = rooms.find(rm => rm.roomId === currentRoomId);
  if (room) {
    return room.messages;
  } else {
    return [];
  }
} 