import ChatHendler from './ChatHendler'
import ChatBody from './ChatBody'
import ChatControl from './ChatControl'
import { myRequest } from '../../utilits';

import { useState } from 'react';


const getMyRequest = async (url: string, option: any) => {
  return await myRequest(url, option)
}

const Chat: any = (props: any) => {

  const { state, setState } = props

  return (
    <div className='chat' >
      <ChatHendler />
      <ChatBody state={state} setState={setState}/>
      <ChatControl state={state} setState={setState} />
    </div>
  )
}
export default Chat;
