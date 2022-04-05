import { USER_LOGIN } from '../actions/LoginAction';

const INITIAL_STATE = {
  name: '',
  assertions: '',
  score: 0,
  gravatarEmail: '',
};

function reducerUser(state = INITIAL_STATE, action) {
  switch (action.type) {
  case USER_LOGIN:
    return { ...state,
      gravatarEmail: action.value.email,
      name: action.value.login,
    };
  default:
    return state;
  }
}

export default reducerUser;
