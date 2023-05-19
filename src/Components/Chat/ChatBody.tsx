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

interface IRequest {
  chatId: string;
  idMessage: string;
  sendByApi: boolean;
  statusMessage: string;
  textMessage: string;
  timestamp: number;
  type: string;
  typeMessage: string;
  downloadUrl?: string
}



const BodyChat = (props: any) => {

  const { state, setState } = props

  const userTarget = state.users.filter((el: IValues) => el.target)[0]

  if (userTarget === undefined) {
    return null
  }

  if (!userTarget.hasOwnProperty('chat')) {
    return null
  }

  console.log(userTarget)

  const masseg = (userTarget.chat).map((el: IRequest, i: number) => {

    const date = new Date((el.timestamp))
    const clssName = el.hasOwnProperty('senderName') ? 'companion' : 'you'

    console.log(el)

    const span = el.hasOwnProperty('downloadUrl') ? <img className='img' src={el.downloadUrl}/> : <span className='text'>{el.textMessage}</span>

    return (
      <div key={i} className={clssName} >
        {span}
        <span className='status'>{el.statusMessage}</span>
        <span className='time'>{`${date.getHours()}:${date.getMinutes()}`}</span>
      </div>
    )
  }).reverse()

  return (
    <div className='bodyChat'>
      {masseg}
    </div>
  )
}

export default BodyChat;