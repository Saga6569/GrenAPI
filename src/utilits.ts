export const myRequest = async (url: string, option: {}) => {

  try {
    const response = await fetch(url, option);
    console.log(response)
    if (response.status !== 200) {
      return { status: 'ERROR', value: response.status };
    }
    if (response === undefined) {
      return { status: 'ERROR', value: 'ошибка сети' };
    };
    const json = await response.json();
    return json;
  } catch (error) {
    console.log(error);
    return { status: 'ERROR', value: error };
  };
};

export const updateChat = async (state: any, setState: Function, telephone: string) => {

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  const raw = JSON.stringify({
    "chatId": `${telephone}@c.us`,
    "count": 100
  });
  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  const url = `https://api.green-api.com/waInstance${state.IdInstance}/getChatHistory/${state.ApiTokenInstance}`
  const chat = await myRequest(url, requestOptions)
  const users = state.users.map((user: any) => {
    if (user.telephone === telephone) {
      user.chat = chat
    }
    return user
  })
  console.log('обновляем лист')
  setState({ ...state, users })
};
