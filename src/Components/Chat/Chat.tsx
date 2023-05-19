import ChatHendler from './ChatHendler'
import ChatBody from './ChatBody'
import ChatControl from './ChatControl'

import { useState } from 'react';


const Chat = (state: any, setState: Function) => {
	return (
		<div className='chat' >
			<ChatHendler />
			<ChatBody />
			<ChatControl />
		</div>
	)
}
export default Chat;
