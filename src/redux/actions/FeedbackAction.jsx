export const USER_SCORE = 'USER_SCORE';
export const scoreState = (score) => ({ type: USER_SCORE, score });

export const USER_ASSERTIONS = 'USER_ASSERTIONS';
export const assertionsState = (assertions) => ({ type: USER_ASSERTIONS, assertions });
