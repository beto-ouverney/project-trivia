export const getToken = async () => {
  const request = await fetch('https://opentdb.com/api_token.php?command=request');
  const requestJson = await request.json();
  return requestJson.token;
};

export const getQuestions = async (token) => {
  const request = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
  const requestJson = await request.json();
  return requestJson;
};
