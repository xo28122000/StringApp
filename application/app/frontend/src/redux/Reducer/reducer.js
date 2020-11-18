import { LOGIN, LOGOUT } from "../constants";

const initialState = {
  userObj: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN: {
      return { ...state, userObj: action.userObj };
    }
    case LOGOUT: {
      return { ...state, userObj: null };
    }
    default:
      return state;
  }
};
