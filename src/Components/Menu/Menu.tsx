import { useState } from "react"
import HeaderMenu from "./HeaderMenu"
import UsersItem from "./UsersItems"
import { myRequest } from '../../utilits'

const getInfo = async (telephone: string, state: any, setState: Function) => {
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
  const url = `https://api.green-api.com/waInstance${state.IdInstance}/GetContactInfo/${state.ApiTokenInstance}`
  const request = await myRequest(url, requestOptions)

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

  const url2 = `https://api.green-api.com/waInstance${state.IdInstance}/getChatHistory/${state.ApiTokenInstance}`
  const chat = await myRequest(url2, requestOptions2)

  const newUser = { telephone: telephone, ...request, target: false, chat }
  const users = [...state.users, newUser]
  setState({ ...state, users })
  return { ...state, users }
}

const update = async (state: any, setState: Function, telephone: string) => {

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

  const oldChat = state.users.filter((el: any) => el.telephone === telephone)[0].chat

  const url = `https://api.green-api.com/waInstance${state.IdInstance}/getChatHistory/${state.ApiTokenInstance}`
  const chat = await myRequest(url, requestOptions)

  if (chat.length === oldChat.length) {
    console.log('новых  сообщений неет')
    setTimeout(async () => {
      update(state, setState, telephone)
    }, 5000)
  } else {
    const users = state.users.map((user: any) => {
      if (user.telephone === telephone) {
        user.chat = chat
      }
      return user
    })
    console.log('обновляем лист')
    setState({ ...state, users })
    setTimeout(async () => {
      update({ ...state, users }, setState, telephone)
    }, 5000)
  }
};

const AddChat = (props: any) => {

  const { state, setState } = props;
  const [telephone, setTelephone] = useState('')

  return (
    <div className='AddChat' >
      <button className='Add'
        onClick={async () => {
          if (telephone.length !== 10) {
            console.log('должно быть 10 цифр')
            return
          }
          const tel = `7${telephone}`
          const arrTelephone: [string] = state.users.map((el: any) => el.telephone)
          if (arrTelephone.includes(tel)) {
            console.log('этот пользователь уже добавлен')
            return
          }
          const newState = await getInfo(tel, state, setState)
          // setTimeout(async () => {
          //   await update(newState, setState, tel)
          // }, 2000)
          setTelephone('')
        }}
      >add</button>
      <span>+7</span>
      <input type="tel" id="phone" name="phone" value={`${telephone}`}
        pattern="[0-9]{3}[0-9]{3}[0-9]{4}"
        required
        onChange={(e) => {
          const newValue = (e.target.value)
          setTelephone(newValue)
        }}
      />
    </div>
  )
}
const Menu = (props: any) => {

  const { state, setState } = props

  return (
    <div className='menu'>
      <HeaderMenu />
      <UsersItem state={state} setState={setState} />
      <AddChat state={state} setState={setState} />
    </div>
  )
}

export default Menu;