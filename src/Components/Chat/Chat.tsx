import ChatHendler from './ChatHendler'
import ChatBody from './ChatBody'
import ChatControl from './ChatControl'
import React, { FC } from 'react';
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

const Chat = (props: { state: IState, setState: Function }) => {

  const { state, setState } = props;
  const arr = state.users.filter((el: IUser) => el.target);

  if (arr.length !== 0) {
    const targetEl = arr[0];
    return (
      <div className='chat' >
        <ChatHendler el={targetEl} />
        <ChatBody state={state} setState={setState} />
        <ChatControl state={state} setState={setState} />
      </div>
    )
  }

  return (
    <div className='chat' >
      <div className='textMain' > Начните общение c green-api</div>
    </div>
  )
}
export default Chat;
