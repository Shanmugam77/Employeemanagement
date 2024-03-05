import React, { useState } from 'react'
import {TextField,FormControl,Button} from "@mui/material"
import { useNavigate } from 'react-router-dom'

const Login = () => {
    let navigate=useNavigate()
    let [user,setUser]=useState("")
    let [password,setPassword]=useState("")
    let [usercolor,setusercolor]=useState(false)
    let [passcolor,setPasscolor]=useState(false)

    let getuser=(e)=>{
        setUser(e.target.value)
    }
    let getpassword=(e)=>{
        setPassword(e.target.value)
    }
    let submit=(e)=>{
        e.preventDefault()
        if (user=="sun" ) {
            setusercolor(false)
            if (password=="sun1234@") {
                localStorage.setItem("login",true)
                navigate("/employees")   
            }
            else{
                setPasscolor(true)
            }
            
        }
        else{
           setusercolor(true)
        }
    }

  return (
    <div className='h-[100vh] w-[100%] flex justify-center items-center'>
        <FormControl className='h-[50vh] w-[19%] flex flex-col justify-evenly items-center shadow-md shadow-zinc-800 rounded-[20px]'>
            <h1>LOGIN</h1>
            <TextField helperText={usercolor?"invalid user name":""} label="USER"  variant='outlined' value={user} onChange={getuser}/>
            <TextField helperText={passcolor?"invalid password":""} label="PASSWORD" type='password'  variant='outlined' value={password} onChange={getpassword}/>
            <Button onClick={submit} variant='contained'>SUBMIT</Button>

        </FormControl>

      
    </div>
  )
}

export default Login
