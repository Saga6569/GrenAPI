import { useState } from 'react';
import { myRequest, updateChat } from '../../utilits'

const ChatControl = (props: any) => {
  const { state, setState } = props
  const [masseg, setMasseg] = useState('')

  const [count, setCount] = useState(0)

  const elTarget = state.users.filter((el: any) => el.target)[0]

  const lastMasseg = elTarget.chat[0]

  const sendMasseg = async () => {
    const telephone = elTarget.telephone
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
    const res = await myRequest(url, requestOptions);

    setMasseg('')

    setTimeout(async () => {
      await updateChat(state, setState, telephone)
    }, 1000)
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
          onClick={async () => sendMasseg()}
        />
      </div>

    </div>
  )
};

export default ChatControl;