import { myRequest } from "../../utilits";
import _ from 'lodash'
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

const update = async (IdInstance: string, ApiTokenInstance: string, oldDate: any, state: any, setState: Function) => {

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    "chatId": `${oldDate.telephone}@c.us`,
    "count": 100
  });

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  const url = `https://api.green-api.com/waInstance${IdInstance}/getChatHistory/${ApiTokenInstance}`
  const request = await myRequest(url, requestOptions)

  if (request.length === (oldDate.chat).length) {
    console.log('новых  сообщений неет')
    setTimeout(async () => {
      update(IdInstance, ApiTokenInstance, oldDate, state, setState)
    }, 2000)
  } else {

    const users = state.users.map((user: IUser) => {
      if (user.telephone === oldDate.telephone) {
        user.chat = request
      }
      return user
    })
    console.log('обновляем лист')
    setState({...state, users})
    setTimeout(async () => {
      update(IdInstance, ApiTokenInstance, oldDate, state, setState)
    }, 2000)
  }
};


// const User = (props: any) => {

//   const { state, setState, user } = props

//   return (
//     <div key={_.uniqueId()} className={user.target ? 'user-activ' : 'user'}    >
//       <img src={user.avatar} className='avatar' alt=""></img>
//       <div className='body'>
//         <span>{user.telephone}</span>
//         <span className='status'>xx</span>
//       </div>
//       <div className='time'></div>
//     </div>
//   )

// }

const UsersItems = (props: any) => {
  const { state, setState } = props;

  const itemsUser = state.users.map((user: IUser, i: number) => {

    const telephoneTarger = user.telephone

    return (
      <div key={_.uniqueId()} className={user.target ? 'user-activ' : 'user'}
        onClick={async (e) => {

          const userTarget = state.users.filter((user: IUser) => user.target)[0]

          // if (userTarget === undefined) {
          //   return
          // }

          // if (userTarget.telephone === telephoneTarger || userTarget === undefined) {
          //   return
          // }

          const myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");
          const raw = JSON.stringify({
            "chatId": `${user.telephone}@c.us`,
            "count": 100
          });

          const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
          };

          const url = `https://api.green-api.com/waInstance${state.IdInstance}/getChatHistory/${state.ApiTokenInstance}`
          const request = await myRequest(url, requestOptions)

          const users = state.users.map((newUser: IUser) => {
            if (newUser.telephone !== telephoneTarger) {
              newUser.target = false
            } else {
              newUser.target = true
              newUser.chat = request
            }
            return newUser
          })

          setTimeout(() => {
            update(state.IdInstance, state.ApiTokenInstance, user, state, setState)
          }, 1000)



          setState({ ...state, users })
        }}
      >
        <img src={user.avatar} className='avatar' alt=""></img>
        <div className='body'>
          <span>{user.telephone}</span>
          <span className='status'>xx</span>
        </div>
        <div className='time'></div>
      </div>
    )
  })

  return (
    <div className="usersItem" >
      {itemsUser}
    </div>
  )
};

export default UsersItems;