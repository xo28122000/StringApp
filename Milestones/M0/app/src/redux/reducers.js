import { SET_PROFILE } from "./constants";

const initialState = {
  profile: null
  // 0 - default
  // 1 - medium
  // 2 - small
  // 3 - extra small
};

function rootReducer(state = initialState, action) {
  if (action.type === SET_PROFILE) {
    return Object.assign({}, state, {
      profile: action.profile
    });
  }

  return state;
}

export default rootReducer;
