const ChatHendler = (props: {el: any}) => {
  const user = props.el;

  const telephoneTarger = user.telephone
  const noImg = `https://console.green-api.com/emptyAvatar.png`
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
    )
};

export default ChatHendler;