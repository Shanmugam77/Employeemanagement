import React, { useEffect, useState } from 'react'
import axios from "axios"
import profile from "./assets/defaultprofile.jpg"
import { useNavigate } from 'react-router-dom'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AddIcon from '@mui/icons-material/Add';
import { Button,TextField,Alert } from '@mui/material';

const Employees = () => {
    let navigate=useNavigate()
    let [data,setdata]=useState([])
    let [searchdata,setSearchdata]=useState("")
    let [remove,setremove]=useState(0)


    useEffect(()=>{
        axios.get("http://localhost:5555/getdata")
        .then((x)=>{setdata(x.data)})
        .catch(()=>{console.log("error");})
    },[remove])

    let getsearchdata=(e)=>{
        setSearchdata(e.target.value)
      if (e.target.value.length==0) {
        setremove(remove+1)
      }
    }
    // let find=(e)=>{
    //   e.preventDefault()
    //   if (searchdata.length>0) {
    //     axios.get(`http://localhost:5555/find/${searchdata}`)
    //     .then((x)=>{
    //       console.log(x.data);
         
    //       if (x.data!="usernotfound") {
    //         setdata(x.data)
    //       }
    //       else{
    //         // <Alert severity='error'>user not found</Alert>
    //         alert("user not found")
    //       }
    //     })
    //     .catch(()=>{console.log("error in find");})
    //   }
    //   else{
        
    //     alert("please fill the textbox")
    //   }
     

    // }


    let filterdata=data.filter((x)=>{return x.firstname==searchdata})
    let find=(e)=>{
      e.preventDefault()
      if (searchdata.length>0) {
        console.log(filterdata);
        if (filterdata[0]!=null) {
          setdata(filterdata)  
        }
        else{
          alert("user not found")
        } 
      }
      else{
        alert("please fill the input")
      }
      
    }
    let logout=()=>{
      localStorage.clear()
      navigate("/")
    }



  return (
    <div className='h-[100vh] overflow-y-auto bg-slate-300 '>
      <h1 className='h-[10vh] w-[100%] text-[30px]  font-[700] shadow-md shadow-gray-700 bg-black text-white flex  items-center justify-around '> <Button onClick={()=>{navigate("/register")}} className='w-[180px] ml-[400px]' size='medium' variant='outlined' color='inherit'><AddIcon/>ADD EMPLOYEE</Button> EMPLOYEES LISTS  <Button onClick={logout} color='inherit' variant='outlined'>Logout</Button></h1>
      <h1 className='text-center  mt-[20px]'><TextField value={searchdata} onChange={getsearchdata} size='small'  type='search' variant='outlined' label="Search employee"/><Button onClick={find} variant='contained'>Find</Button></h1>
      
      <div className='w-[100%] flex flex-wrap justify-evenly'>
        {data.map((x)=>{
          return(
              <div className='h-[50vh] w-[17%] bg-black text-white shadow-md shadow-gray-800 rounded-[20px] mt-[40px] flex flex-col justify-evenly items-center'>
                  <img src={profile} alt="" className='h-[150px] w-[150px] rounded-[100%] shadow-md shadow-gray-300'/>
                  <h1 className='font-[700]'>{x.firstname}</h1>
                  <h1 className='font-[700]'>{x.role}</h1>
                  <Button onClick={()=>{navigate(`/profile/${x._id}`)}} className='hover:scale-[1.1]' color='inherit' variant='outlined'>More info</Button>
              </div>
        
          )
        })}
      </div>
    </div>
  )
}

export default Employees
