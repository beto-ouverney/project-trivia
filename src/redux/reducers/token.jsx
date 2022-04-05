import { TOKEN } from '../actions/TokenAction';

const INITIAL_STATE = {
  token: '',
};

function reducerUser(state = INITIAL_STATE, action) {
  switch (action.type) {
  case TOKEN:
    return { token: action.value };
  default:
    return state;
  }
}

export default reducerUser;
