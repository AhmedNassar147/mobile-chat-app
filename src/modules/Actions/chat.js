import chatTypes from '../Types/chat';

const { START_CHAT } = chatTypes;

// messageKey user (currentuserId and selecteduserId)
export default {
  getStartingChat: (currentUserData, selecteduserData) => ({ type: START_CHAT, currentUserData, selecteduserData }),
}