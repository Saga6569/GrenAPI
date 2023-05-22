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

const UsersItems = (props: any) => {
  const { state, setState } = props;

  const itemsUser = state.users.map((user: IUser, i: number) => {

    const telephoneTarger = user.telephone
    const noImg = `https://console.green-api.com/emptyAvatar.png`
    const userName = user.name === '' ? user.telephone : user.name;

    const lastMasseg = user.chat.at(-1)

    const date = new Date(lastMasseg.timestamp)
    const hour = date.getHours()
    const minutes = date.getMinutes()

    return (
      <div key={_.uniqueId()} className={user.target ? 'user-activ' : 'user'}
        onClick={async () => {

          const userTarget = state.users.filter((el: IUser) => el.target)[0]


          if (userTarget !== undefined) {
            if (telephoneTarger === userTarget.telephone) {
              console.log('элемент уже выбран')
              return
            }
          }

          const users = state.users.map((newUser: IUser) => {
            if (newUser.telephone !== telephoneTarger) {
              newUser.target = false
            } else {
              newUser.target = true
            }
            return newUser
          })
          setState({ ...state, users })
        }}
      >
        {user.avatar === '' ? <img src={noImg} className='avatar' alt="" /> : <img src={user.avatar} className='avatar' alt="" />}
        <div className='body'>
          <span>{userName}</span>
          {/* <span className='status'>xx</span> */}
        </div>
        <div className='time'>{`${hour}:${minutes}`}</div>
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