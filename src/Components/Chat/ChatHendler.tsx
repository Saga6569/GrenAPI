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

const ChatHendler = (props: { el: IUser }) => {
  const user = props.el;

  const telephoneTarger = user.telephone;
  const noImg = `https://console.green-api.com/emptyAvatar.png`;
  const userName = user.name === '' ? user.telephone : user.name;
    return (
        <div className='headerChat'>
        {user.avatar === '' ? <img src={noImg} className='avatar' alt="" /> : <img src={user.avatar} className='avatar' alt="" />}
        <div className='body'>
          <span>{userName}</span>
          {/* <span className='status'>xx</span> */}
        </div>
        <div className='time'></div>
        </div>
    );
};

export default ChatHendler;
