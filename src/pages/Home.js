import { signOut } from 'firebase/auth'
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp, where } from 'firebase/firestore'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Massagecontext } from '../App'
import Chat from '../components/Chat'
import { auth, db } from '../Firebase'
import Cookies from 'universal-cookie'

const cookies = new Cookies();

const Home = () => {
    const {grouptext,setAuth} = useContext(Massagecontext)
    const [msg,setmsg]= useState("")
    const [replay , setreplay] = useState(false)
    const [chat, setchat] = useState([])
    const navigate = useNavigate()

    useEffect(()=>{
     const MessageQury = query(
      collection(db,"messages")
      ,where("group", "==",grouptext),
      orderBy("time"))
      
     const unsub = onSnapshot(MessageQury,(snapshot)=>{
      let messages = []
      snapshot.forEach((doc)=>{
          messages.push({...doc.data(), id: doc.id})        
      })
      setchat(messages)
     })
     return ()=> unsub()
    },[grouptext])
    const messagehandler = async(e)=>{
      e.preventDefault()
      const docdata = {
        Username: auth.currentUser.displayName,
        time : serverTimestamp(),
        message : msg,
        group : grouptext,
      }
      if(msg === ''){
        return
      }else{
        await addDoc(collection(db,"messages"),docdata)
        setreplay(true)
      }
      setmsg("")
    }
    useEffect(()=>{
      if(grouptext === ''){
        return (
          navigate("/GroupChat")
        )
      }
    },)

    
    

  return (
    <section className='Home-page'>
    <h1 className='group-chat-head'>groupchat</h1>
        <div className= "msg-screen">
            {chat.map((chat)=>{
              return(
                <Chat key={chat.id} {...chat} replay={replay} />
              )
            })}
        </div>
        <div className='msg-sent-place'>
        <textarea className='text-btn' placeholder='enter any text...' value={msg} onChange={(e)=> setmsg(e.target.value)}/>
        <button className='sent-btn' onClick={messagehandler}>Sent</button>
        </div>
        <button className='logout-btn' onClick={()=> signOut(auth).then(()=>{
          cookies.remove("auth-token")
          setAuth(false)
          navigate('/')
        })}>Logout</button>
    </section>
  )

      }
export default Home