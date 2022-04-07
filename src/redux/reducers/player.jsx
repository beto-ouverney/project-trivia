import { USER_LOGIN } from '../actions/LoginAction';
import { USER_SCORE, USER_ASSERTIONS, RESET_DATA } from '../actions/FeedbackAction';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
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
  case USER_ASSERTIONS:
    return { ...state,
      assertions: action.assertions,
    };
  case USER_SCORE:
    return { ...state,
      score: action.score,
    };
  case RESET_DATA:
    return INITIAL_STATE;
  default:
    return state;
  }
}

export default reducerUser;
