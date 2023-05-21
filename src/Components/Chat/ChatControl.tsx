import { useState } from 'react';
import {myRequest} from '../../utilits'


const ChatControl = (props: any) => {

  const { state, setState } = props

  const [masseg, setMasseg] = useState('')


  return (
    <div className='controlChat'>
      <div className="list">
        <div className="emoje" ></div>
        <div className="addFile" ></div>
      </div>
      <div className="sendMasseg" >
        <input type='text' name='masseg'
          onChange={(e) => {
            setMasseg(e.target.value)
          }}
        />
        <button
        onClick={async () => {

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
            const request = await myRequest(url, requestOptions)

        }}
        />
      </div>

    </div>
  )
};

export default ChatControl;