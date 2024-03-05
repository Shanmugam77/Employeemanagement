import React, { useEffect, useState } from 'react'
import {TextField,FormControl,Button} from "@mui/material"
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const Edit = () => {
    let userid=useParams()
    let navigate=useNavigate()
    let [firstname,setFirstname]=useState("")
    let [lastname,setLastname]=useState("")
    let [email,setEmail]=useState("")
    let [role,setRole]=useState("")
    let [gender,setGender]=useState("")
    let [dob,setDob]=useState("")
    let [phone,setPhone]=useState("")
    let [address,setAddress]=useState("")
    let [company,setCompany]=useState("")
    let [salary,setSalary]=useState("")
    let emailregex=/[a-zA-Z0-9].*@gmail.com$/
    let phoneregex=/[0-9]{10}$/
    // let passwordregex=/.*[!@#$%&]{1}.*$/
    
    useEffect(()=>{
        axios.get(`http://localhost:5555/edit/${userid.id}`)
        .then((x)=>{
            setFirstname(x.data.firstname)
            setLastname(x.data.lastname)
            setEmail(x.data.email)
            setRole(x.data.role)
            setGender(x.data.gender)
            setDob(x.data.dob)
            setPhone(x.data.phone)
            setAddress(x.data.address)
            setCompany(x.data.company)
            setSalary(x.data.salary)
        })
        .catch(()=>{console.log("error in get edit data");})
    },[])

    let getfirstname=(e)=>{
        setFirstname(e.target.value)
    }
    let getlastname=(e)=>{
        setLastname(e.target.value)
    }
    let getemail=(e)=>{
        setEmail(e.target.value)
    }
    let getrole=(e)=>{
        setRole(e.target.value)
    }
    let getdob=(e)=>{
        setDob(e.target.value)
    }
    let getphone=(e)=>{
        setPhone(e.target.value)
    }
    let getaddress=(e)=>{
        setAddress(e.target.value)
    }
    let getcompany=(e)=>{
        setCompany(e.target.value)
    }
    let getsalary=(e)=>{
        setSalary(e.target.value)
    }
    let getgender=(e)=>{
        setGender(e.target.value);
    }

    let update=(e)=>{
        e.preventDefault()
            let payload={firstname,lastname,email,role,gender,dob,phone,address,company,salary}
            // console.log(payload);
            axios.post(`http://localhost:5555/update/${userid.id}`,payload)
            .then((x)=>{
                console.log(x.data);
                if (x.data.acknowledged==true) {
                    navigate(`/profile/${userid.id}`)
                }
            })
            .catch(()=>{console.log("error in data sent to server");})  
        
    }

  return (
    <div className='h-[100vh] w-[100%] flex justify-center items-center'>
        <FormControl className='h-[90vh] w-[23%] rounded-[20px] shadow-md shadow-slate-900 flex flex-col justify-evenly items-center '>
            <h1>Welcome to Edit page</h1>
            <TextField className='w-[80%]' size='small' label="First-name" variant='outlined' value={firstname} onChange={getfirstname}/>
            <TextField className='w-[80%]' size='small' label="Last-name" variant='outlined' value={lastname} onChange={getlastname}/>
            <TextField className='w-[80%]' size='small' label="E-mail" disabled variant='outlined' value={email} onChange={getemail}/>
            <TextField className='w-[80%]' size='small' label="Role" variant='outlined' value={role} onChange={getrole}/>
            <FormLabel className='w-[80%]' size='small' id="demo-row-radio-buttons-group-label">Gender :</FormLabel>
            <RadioGroup
              value={gender}
              onChange={getgender}
              className='w-[80%]'
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormControlLabel value="Male" control={<Radio />} label="Male" />
              <FormControlLabel value="female" control={<Radio />} label="Female" />
              <FormControlLabel value="other" control={<Radio />} label="Other" />
            </RadioGroup>
            <FormLabel className='w-[80%]' >DOB :</FormLabel>
            <TextField className='w-[80%]' size='small' type='date' variant='outlined' value={dob} onChange={getdob}/>
            <TextField className='w-[80%]' size='small' label="Phone-no" type='tel' variant='outlined' value={phone} onChange={getphone}/>
            <TextField className='w-[80%]' size='small' label="Address" multiline variant='outlined'  value={address} onChange={getaddress}/>
            <TextField className='w-[80%]' size='small' label="Company" variant='outlined' value={company} onChange={getcompany}/>
            <TextField className='w-[80%]' size='small' label="Salary"  variant='outlined' value={salary} onChange={getsalary}/>
            <Button onClick={update} variant='contained'>UPDATE</Button>
           
        </FormControl>
      
    </div>
  )
}

export default Edit
