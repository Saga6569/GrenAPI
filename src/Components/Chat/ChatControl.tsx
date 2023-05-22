import { useState } from 'react';
import { myRequest, updateChat } from '../../utilits'

const ChatControl = (props: any) => {
  const {state, setState } = props
  const [masseg, setMasseg] = useState('')

  const sendMasseg = async () => {
    const telephone = state.users.filter((el: any) => el.target)[0].telephone
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const raw = JSON.stringify({
      "chatId": `${telephone}@c.us`,
      "message": `${masseg}`
    });
    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    const url = `https://api.green-api.com/waInstance${state.IdInstance}/sendMessage/${state.ApiTokenInstance}`
    await myRequest(url, requestOptions)
    setMasseg('')
    await updateChat(state, setState, telephone)
  }

  return (
    <div className='controlChat'>
      <div className="list">
        <div className="emoje" ></div>
        <div className="addFile" ></div>
      </div>
      <div className="sendMasseg" >
        <input type='text' name='masseg' value={masseg}
          onChange={(e) => {
            setMasseg(e.target.value)
          }}
          onKeyUp={async (e) => {
            if (e.nativeEvent.code === 'Enter') {
              sendMasseg()
            }
          }}
        />
        <button
          onClick={async () => sendMasseg() }
        />
      </div>

    </div>
  )
};

export default ChatControl;