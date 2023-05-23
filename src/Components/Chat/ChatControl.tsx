import { useState } from 'react';
import { myRequest, updateChat } from '../../utilits'

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

const smail = <svg viewBox="0 0 24 24" height="35" width="35" preserveAspectRatio="xMidYMid meet" version="1.1" x="0px" y="0px" enableBackground="new 0 0 24 24" xmlSpace="preserve">
  <path fill="currentColor" d="M9.153,11.603c0.795,0,1.439-0.879,1.439-1.962S9.948,7.679,9.153,7.679 S7.714,8.558,7.714,9.641S8.358,11.603,9.153,11.603z M5.949,12.965c-0.026-0.307-0.131,5.218,6.063,5.551 c6.066-0.25,6.066-5.551,
  6.066-5.551C12,14.381,5.949,12.965,5.949,12.965z M17.312,14.073c0,0-0.669,1.959-5.051,1.959 c-3.505,0-5.388-1.164-5.607-1.959C6.654,14.073,12.566,15.128,17.312,14.073z M11.804,1.011c-6.195,0-10.826,5.022-10.826,11.217 s4.826,10.761,
  11.021,10.761S23.02,18.423,23.02,12.228C23.021,6.033,17.999,1.011,11.804,1.011z M12,21.354 c-5.273,0-9.381-3.886-9.381-9.159s3.942-9.548,9.215-9.548s9.548,4.275,9.548,9.548C21.381,17.467,17.273,21.354,12,21.354z  M15.108,11.603c0.795,0
  ,1.439-0.879,1.439-1.962s-0.644-1.962-1.439-1.962s-1.439,0.879-1.439,1.962S14.313,11.603,15.108,11.603z"></path>
</svg>

const file = <svg viewBox="0 0 24 24" height="35" width="35" preserveAspectRatio="xMidYMid meet" version="1.1" x="0px" y="0px" enableBackground="new 0 0 24 24" xmlSpace="preserve">
  <path fill="currentColor" d="M1.816,15.556v0.002c0,1.502,0.584,2.912,1.646,3.972s2.472,1.647,3.974,1.647 c1.501,0,2.91-0.584,3.972-1.645l9.547-9.548c0.769-0.768,1.147-1.767,1.058-2.817c-0.079-0.968-0.548-1.927-1.319-2.698
  c-1.594-1.592-4.068-1.711-5.517-0.262l-7.916,7.915c-0.881,0.881-0.792,2.25,0.214,3.261c0.959,0.958,2.423,1.053,3.263,0.215 c0,0,3.817-3.818,5.511-5.512c0.28-0.28,0.267-0.722,0.053-0.936c-0.08-0.08-0.164-0.164-0.244-0.244
  c-0.191-0.191-0.567-0.349-0.957,0.04c-1.699,1.699-5.506,5.506-5.506,5.506c-0.18,0.18-0.635,0.127-0.976-0.214 c-0.098-0.097-0.576-0.613-0.213-0.973l7.915-7.917c0.818-0.817,2.267-0.699,3.23,0.262c0.5,0.501,0.802,1.1,0.849,1.685
  c0.051,0.573-0.156,1.111-0.589,1.543l-9.547,9.549c-0.756,0.757-1.761,1.171-2.829,1.171c-1.07,0-2.074-0.417-2.83-1.173 c-0.755-0.755-1.172-1.759-1.172-2.828l0,0c0-1.071,0.415-2.076,1.172-2.83c0,0,5.322-5.324,7.209-7.211
  c0.157-0.157,0.264-0.579,0.028-0.814c-0.137-0.137-0.21-0.21-0.342-0.342c-0.2-0.2-0.553-0.263-0.834,0.018 c-1.895,1.895-7.205,7.207-7.205,7.207C2.4,12.645,1.816,14.056,1.816,15.556z"></path>
</svg>


const ChatControl = (props: any) => {
  const { state, setState } = props

  const [masseg, setMasseg] = useState('')

  const elTarget = state.users.filter((el: any) => el.target)[0]

  const lastMasseg = elTarget

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

    const clonLastMasseg = { ...lastMasseg.chat[0], type: 'outgoing', textMessage: masseg, timestamp: Date.now() }
    // console.log(clonLastMasseg)

    // const users = state.users.map((user: IUser) => {
    //   if (user.target) {
    //     user.chat = [clonLastMasseg, ...user.chat, ]
    //   }
    //   return user
    // })
    setMasseg('')
    // setState({ ...state, users })
    // setTimeout(async () => {
    //   await updateChat(state, setState, telephone)
    // }, 1500)
  }

  return (
    <div className='controlChat'>
      <div className="list">
        {smail}
        {file}
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
      </div>

    </div>
  )
};

export default ChatControl;