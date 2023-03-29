import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Massagecontext } from '../App'

const GroupChat = () => {
    const {setgrouptext,roomInputRef} = useContext(Massagecontext)
    const [err,seterr] = useState(false)
    const navigate = useNavigate()

    const Tohome = ()=>{
        if(roomInputRef.current.value === ''){
          seterr(true)
        }else{
          setgrouptext(roomInputRef.current.value)
          navigate('/Home')
        }
    }
    
  return (
    <section className='Group-chat'>
        <h1>Enter Group Name</h1>
        <input type="text" className='input-btn'  ref={roomInputRef} />
        <button className='go-btn' onClick={Tohome}>Go</button>
        {err && <small>need group to join..</small>}
    </section>
  )
}

export default GroupChat
