import { signInWithPopup } from 'firebase/auth'
import React, { useContext, useState } from 'react'
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from 'react-router-dom'
import { Massagecontext } from '../App'
import { auth , provider } from '../Firebase'
import Cookies from 'universal-cookie'


const cookies = new Cookies()


const Login = () => {
  const [err,seterr] = useState(false)
    const navigate = useNavigate()
    const {setAuth} = useContext(Massagecontext)

    const Login = async()=>{
        try{
          const result = await signInWithPopup(auth,provider);
          cookies.set("auth-tooken",result.user.refreshToken)
          setAuth(true)
          navigate('/GroupChat')

        }catch(err){
          seterr(true)
        }
    }

  return (
    <section className='log-in-page'>
        <div>
        <h1>LogIn</h1>
        </div>
        <button className='login-btn' onClick={Login} >Sign In With <FcGoogle className='font-one' /></button>
        {err && <small style={{color : 'red'}}>Something Went Wrong</small>}
    </section>
  )
}

export default Login