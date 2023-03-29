import React from 'react'

const Chat = ({Username,message,time,replay}) => {
  let datetime = time?.toDate().toLocaleTimeString('en-US')

  return (
    <div className="group-msg-active">
        <div className='msg-con-one'>
        <p className='user-name'>{Username}:</p>
        <p className='msg-con'>{message}</p>
        </div>
        <small className='time'>{datetime}</small>
        
    </div>
  )
}

export default Chat