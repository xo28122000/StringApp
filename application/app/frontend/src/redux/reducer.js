import { EXAMPLE_CONSTANT1, EXAMPLE_CONSTANT2 } from "./constants";

const initialState = {
  someValue: null,
  someOtherValue: []
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case EXAMPLE_CONSTANT1: {
      return { ...state, someValue: "some new value" };
    }
    case EXAMPLE_CONSTANT2: {
      return { ...state, someOtherValue: action.value };
    }
    default:
      return state;
  }
}

export default rootReducer;
