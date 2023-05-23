import ChatHendler from './ChatHendler'
import ChatBody from './ChatBody'
import ChatControl from './ChatControl'
import { updateChat } from '../../utilits';
import { useEffect, useState } from 'react';

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

const Chat: any = (props: any) => {

  const { state, setState } = props
  const arr = state.users.filter((el: IUser) => el.target)

  if (arr.length !== 0) {
    const targetEl = arr[0]
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
