import chatTypes from '../Types/chat';

const { START_CHAT, } = chatTypes;

const initialState = {
  selectedUser: {},
  user: ''
};

export default (state = initialState, action) => {
  switch (action.type) {

    case START_CHAT:
      return {
        ...state,
        selectedUser: action.selecteduserData,
        user: action.currentUserData
      };

    default:
      return state;
  }
};