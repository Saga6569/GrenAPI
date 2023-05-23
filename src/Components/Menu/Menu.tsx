import { useState } from "react"
import HeaderMenu from "./HeaderMenu"
import UsersItem from "./UsersItems"
import { myRequest } from '../../utilits'

interface IState {
  users: IUser[];
  ApiTokenInstance: string;
  IdInstance: number | string
}

interface IUser {
  avatar: string;
  category: string;
  chatId: string;
  description: string;
  email: string;
  isArchive: boolean;
  isDisappearing: boolean;
  isMute: boolean;
  lastSeen: null;
  muteExpiration: null;
  name: string;
  products: [];
  telephone: string;
  target: boolean;
  chat: any
}

const getInfo = async (telephone: string, state: IState, setState: Function) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  const raw = JSON.stringify({
    "chatId": `${telephone}@c.us`
  });
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };
  const url = `https://api.green-api.com/waInstance${state.IdInstance}/GetContactInfo/${state.ApiTokenInstance}`;
  const request = await myRequest(url, requestOptions);

  const myHeaders2 = new Headers();
  myHeaders.append("Content-Type", "application/json");
  const raw2 = JSON.stringify({
    "chatId": `${telephone}@c.us`,
    "count": 100
  });
  const requestOptions2 = {
    method: 'POST',
    headers: myHeaders2,
    body: raw2,
    redirect: 'follow'
  };

  const url2 = `https://api.green-api.com/waInstance${state.IdInstance}/getChatHistory/${state.ApiTokenInstance}`;
  const chat = await myRequest(url2, requestOptions2);

  const newUser = { telephone: telephone, ...request, target: false, chat };
  const users = [...state.users, newUser];
  setState({ ...state, users });
  return { ...state, users };
};

const AddChat = (props: {state: IState, setState: Function}) => {

  const { state, setState } = props;
  const [telephone, setTelephone] = useState('');

  return (
    <div className='AddChat' >
      <button className='Add'
        onClick={async () => {
          if (telephone.length !== 10) {
            console.log('должно быть 10 цифр');
            return;
          }
          const tel = `7${telephone}`;
          const arrTelephone: string[] = state.users.map((el: IUser) => el.telephone);
          if (arrTelephone.includes(tel)) {
            console.log('этот пользователь уже добавлен');
            return;
          };
         await getInfo(tel, state, setState);
          // setTimeout(async () => {
          //   await update(newState, setState, tel)
          // }, 2000)
          setTelephone('');
        }}
      >add</button>
      <span>+7</span>
      <input type="tel" id="phone" name="phone" value={`${telephone}`} autoComplete='off'
        onChange={(e) => {
          const newValue = (e.target.value);
          setTelephone(newValue);
        }}
      />
    </div>
  )
}
const Menu = (props: { state: IState, setState: Function }) => {

  const { state, setState } = props;

  return (
    <div className='menu'>
      <HeaderMenu state={state} setState={setState} />
      <UsersItem state={state} setState={setState} />
      <AddChat state={state} setState={setState} />
    </div>
  )
}

export default Menu;