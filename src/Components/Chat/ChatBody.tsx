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
  downloadUrl?: string;
  imageMessage?: string
}

const BodyChat = (props: any) => {

  const { state, setState } = props

  console.log(state)

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
    const clssName = el.type

    const span = el.typeMessage === 'imageMessage' ? <img className='img' src={el.downloadUrl} /> : <p className='text'>{el.textMessage}</p>

    if (el.type === '') {
      return null
    }

    return (
      <div key={i} className={clssName} >
        {span}
        {/* <span className='status'>{el.statusMessage}</span> */}
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