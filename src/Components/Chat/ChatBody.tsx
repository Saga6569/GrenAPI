import { useEffect, useRef, useState } from "react";
import { updateChat } from "../../utilits";
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
  chat: IRequest[]
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

interface IState {
  users: IUser[];
  ApiTokenInstance: string;
  IdInstance: number | string
}

const BodyChat = (props: { state: IState, setState: Function }) => {
  const { state, setState } = props;
  const [count, setCount] = useState(0);
  const lastMasseg = useRef<any>(undefined);
  const userTarget = state.users.filter((el: IUser) => el.target)[0];

  const slep = (time: number = 5000) => {
    setTimeout(() => {
      console.log(count);
      updateChat(state, setState, userTarget.telephone);
      setCount(count + 1);
    }, time);
  };

  useEffect(() => {
    slep()
  }, [count])

  useEffect(() => {
    if (userTarget !== undefined) {
      lastMasseg?.current.scrollIntoView();
    };
  }, []);

  if (userTarget === undefined) {
    return null;
  };
  if (!userTarget.hasOwnProperty('chat')) {
    return null;
  };

  const masseg = (userTarget.chat).map((el: IRequest, i: number) => {
    const clssName = el.type;
    const color = clssName === "outgoing" ? 'green' : 'rgb(131, 136, 131)';
    const imgMasseg = ["stickerMessage", 'imageMessage'];
    const span = imgMasseg.includes(el.typeMessage) ? <img className='img' alt='изображение' src={el.downloadUrl} /> : <p className='text'>{el.textMessage}</p>
    const myStyle: any = imgMasseg.includes(el.typeMessage) ? {} : { backgroundColor: color };

    const date = new Date(el.timestamp *1000);

    const hours = String(date.getHours()).length === 1 ? `0${date.getHours()}` : date.getHours();
    const minutes = String(date.getMinutes()).length === 1 ? `0${date.getMinutes()}` : date.getMinutes();

    const time = `${hours}:${minutes}`;

    if (el.type === '') {
      return null;
    }
    if (i === 0) {
      return (
        <div key={i} className={clssName} ref={lastMasseg} style={myStyle} >
          {span}
          <span className='time'>{time}</span>
        </div>
      )
    }
    return (
      <div key={i} className={clssName} style={myStyle} >
        {span}
        <span className='time'>{time}</span>
      </div>
    )
  }).reverse();

  return (
    <div className='bodyChat'>
      {masseg}
    </div>
  );
};

export default BodyChat;
