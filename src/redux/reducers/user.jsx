import { USER_LOGIN } from '../actions/LoginAction';

const INITIAL_STATE = {
  email: '',
};

function reducerUser(state = INITIAL_STATE, action) {
  switch (action.type) {
  case USER_LOGIN:
    return { ...state, email: action.email };
  default:
    return state;
  }
}

export default reducerUser;
