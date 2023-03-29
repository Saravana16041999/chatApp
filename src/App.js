import { createContext, useState, useRef } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import GroupChat from './pages/GroupChat';
import Home from './pages/Home';
import Login from './pages/Login';
import Cookies from 'universal-cookie';


export const Massagecontext = createContext()
const cookies = new Cookies();

function App() {
  const [Auth, setAuth] = useState(cookies.get("auth-tooken"))
  const [grouptext, setgrouptext] = useState("")
  const roomInputRef = useRef(null)


  return (
    <main className='app'>
    <Massagecontext.Provider value={{grouptext,setgrouptext,roomInputRef,setAuth}}>
        <BrowserRouter>
          <Routes>
          { !Auth ?
           <Route  path="/" element={<Login/>}/>
            :
            <>
            <Route path='GroupChat' element={<GroupChat/>}/>
            <Route path='Home' element={<Home/>}/>
            </> }
            
          </Routes>
        </BrowserRouter>
        </Massagecontext.Provider>
    </main>
  );
}

export default App;
