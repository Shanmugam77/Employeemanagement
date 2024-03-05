import React from 'react'
import "./index.css"
import {Route,Routes,BrowserRouter} from "react-router-dom"
import Login from './components/Login'
import Employees from './components/Employees'
import Profile from './components/Profile'
import Register from './components/Register'
import Edit from './components/Edit'
import Protect from './components/Protect'

const App = () => {
  return (
    <div>
        <BrowserRouter>
        <Routes>
            <Route element={<Login/>} path='/'/>
            <Route element={<Protect component={Employees}/>} path='/employees'/>
            <Route element={<Profile/>} path='/profile/:id'/>
            <Route element={<Register/>} path='/register'/>
            <Route element={<Edit/>} path='/edit/:id'/>
        </Routes>
        </BrowserRouter>
      
    </div>
  )
}

export default App
