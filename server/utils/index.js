// --- helper functions ---

// extracts the Game name from a room created
const extractGameName = fullName => fullName.split('-')[0];

// get only games with the appropriate prefix
const filterRooms = (game, gamesList) => ({ name }) => {
  let gameName = extractGameName(name);
  return gamesList.find(g => g.server === gameName) !== undefined && gameName === game;
}

const validGames = gamesList => ({ name }) => gamesList.find(g => g.server === extractGameName(name)) !== undefined;

module.exports = { filterRooms, validGames, extractGameName }