import { myRequest } from "../../utilits";
interface IValues {
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

const Users = (props: any) => {
  const { state, setState } = props;

  const itemsUser = state.users.map((el: IValues, i: number) => {
    return (
      <div key={i} className={el.target ? 'user-activ' : 'user'}
        onClick={async () => {

          const myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");

          console.log(el.telephone)

          const raw = JSON.stringify({
            "chatId": `${el.telephone}@c.us`,
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

          const users = state.users.map((user: IValues) => {
            if (user.telephone !== el.telephone) {
              user.target = false
            } else {
              user.target = true
              user.chat = request
            }
            return user
          })

          setState({ ...state, users })
        }}
      >
        <img src={el.avatar} className='avatar' alt=""></img>
        <div className='body'>
          <span>{el.telephone}</span>
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

export default Users;