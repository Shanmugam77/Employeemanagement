import React, { useState } from 'react'
import {TextField,FormControl,Button} from "@mui/material"
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    let navigate=useNavigate()
    let [firstname,setFirstname]=useState("")
    let [lastname,setLastname]=useState("")
    let [email,setEmail]=useState("")
    let [role,setRole]=useState("")
    let [gender,setGender]=useState("Male")
    let [dob,setDob]=useState("")
    let [phone,setPhone]=useState("")
    let [address,setAddress]=useState("")
    let [company,setCompany]=useState("")
    let [salary,setSalary]=useState("")
    let emailregex=/[a-zA-Z0-9].*@gmail.com$/
    let phoneregex=/[0-9]{10}$/
    // let passwordregex=/.*[!@#$%&]{1}.*$/
    let [fcolor,setFcolor]=useState(false)
    let [lcolor,setLcolor]=useState(false)
    let [emailcolor,setEmailcolor]=useState(false)
    let [rolecolor,setRolecolor]=useState(false)
    let [dobcolor,setDobcolor]=useState(false)
    let [phonecolor,setPhonecolor]=useState(false)
    let [addcolor,setAddcolor]=useState(false)
    let [comcolor,setcomcolor]=useState(false)
    let [salarycolor,setSalarycolor]=useState(false)

    let getfirstname=(e)=>{
        setFirstname(e.target.value)
        if (e.target.value.length>3) {
            setFcolor(false)
        }
    }
    let getlastname=(e)=>{
        setLastname(e.target.value)
        if (e.target.value.length>0) {
            setLcolor(false)
        }
    }
    let getemail=(e)=>{
        setEmail(e.target.value)
        if (e.target.value.match(emailregex)) {
            setEmailcolor(false)
        }
    }
    let getrole=(e)=>{
        setRole(e.target.value)
        if (e.target.value.length>0) {
            setRolecolor(false)
        }
    }
    let getdob=(e)=>{
        setDob(e.target.value)
        if (e.target.value.length>0) {
            setDobcolor(false)
        }
    }
    let getphone=(e)=>{
        if (e.target.value.length<=10) {
            setPhone(e.target.value)
           if (e.target.value.match(phoneregex)) {
            setPhonecolor(false)
           }    
        }  
    }
    let getaddress=(e)=>{
        setAddress(e.target.value)
        if (e.target.value.length>=15) {
            setAddcolor(false)
        }
    }
    let getcompany=(e)=>{
        setCompany(e.target.value)
        if (e.target.value.length>3) {
            setcomcolor(false)
        }
    }
    let getsalary=(e)=>{
        setSalary(e.target.value)
        if (e.target.value.length>0) {
            setSalarycolor(false)
        }
    }
    let getgender=(e)=>{
        setGender(e.target.value);
    }



    let formhandle=(e)=>{
        e.preventDefault()
        if (firstname.length>3 && lastname.length>0 && email.match(emailregex) && role.length>0 && gender.length>0 && dob.length>0 && phone.length==10 && phone.match(phoneregex) && address.length>15 && company.length>3 && salary.length>0) {
            let payload={firstname,lastname,email,role,gender,dob,phone,address,company,salary}
            // console.log(payload);
            axios.post("http://localhost:5555/register",payload)
            .then((x)=>{
                console.log(x.data);
                if (x.data.firstname==firstname) {
                    navigate("/employees")
                }
                if (x.data=="alreadyemployee") {
                    alert("This email was already used by another employee")
                }
            })
            .catch(()=>{console.log("error in data sent to server");})  
        }
        else{
             if (firstname.length>3) {setFcolor(false)}
             else{setFcolor(true)}
             if (lastname.length>0) {setLcolor(false)}
             else{setLcolor(true)}
             if (email.match(emailregex)) {setEmailcolor(false)}
             else{setEmailcolor(true)}
             if (role.length>0) {setRolecolor(false)}
             else{setRolecolor(true)}
             if (dob.length>0) {setDobcolor(false)}
             else{setDobcolor(true)}
             if (phone.length==10 && phone.match(phoneregex)) {setPhonecolor(false)}
             else{setPhonecolor(true)}
             if (address.length>15) {setAddcolor(false)}
             else{setAddcolor(true)}
             if (company.length>3) {setcomcolor(false)}
             else{setcomcolor(true)}
             if (salary.length>0) {setSalarycolor(false)}
             else{setSalarycolor(true)}
        }
       
    }
  return (
    <div className='h-[120vh] w-[100%] flex justify-center items-center'>
        <FormControl className='h-[110vh] w-[23%] rounded-[20px] shadow-md shadow-slate-900 flex flex-col justify-evenly items-center '>
            <h1>Welcome to Register page</h1>
            <TextField helperText={fcolor?"atleast 4 char should contain":""} className='w-[80%]' size='small' label="First-name" variant='outlined' value={firstname} onChange={getfirstname}/>
            <TextField helperText={lcolor?"atleast 1 char should contain":""} className='w-[80%]' size='small' label="Last-name" variant='outlined' value={lastname} onChange={getlastname}/>
            <TextField helperText={emailcolor?"'@gmail.com' is mandatory":""} className='w-[80%]' size='small' label="E-mail" variant='outlined' value={email} onChange={getemail}/>
            <TextField helperText={rolecolor?"must fill the role":""} className='w-[80%]' size='small' label="Role" variant='outlined' value={role} onChange={getrole}/>
            <FormLabel className='w-[80%]' size='small' id="demo-row-radio-buttons-group-label">Gender :</FormLabel>
            <RadioGroup
              value={gender}
              onChange={getgender}
              className='w-[80%]'
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              defaultValue="Male"
            >
              <FormControlLabel value="Male" control={<Radio />} label="Male" />
              <FormControlLabel value="Female" control={<Radio />} label="Female" />
              <FormControlLabel value="other" control={<Radio />} label="Other" />
            </RadioGroup>
            <FormLabel className='w-[80%]' >DOB :</FormLabel>
            <TextField helperText={dobcolor?"must fill the dob":""} className='w-[80%]' size='small' type='date' variant='outlined' value={dob} onChange={getdob}/>
            <TextField helperText={phonecolor?"it should contain 10 digit":""} className='w-[80%]' size='small' label="Phone-no" type='tel' variant='outlined' value={phone} onChange={getphone}/>
            <TextField helperText={addcolor?"atleast 15 char should contain":""} className='w-[80%]' size='small' label="Address" multiline variant='outlined'  value={address} onChange={getaddress}/>
            <TextField helperText={comcolor?"atleast 4 char should contain":""} className='w-[80%]' size='small' label="Company" variant='outlined' value={company} onChange={getcompany}/>
            <TextField helperText={salarycolor?"salary should more then 0":""} className='w-[80%]' size='small' label="Salary"  variant='outlined' value={salary} onChange={getsalary}/>
            <Button onClick={formhandle} variant='contained'>SUBMIT</Button>
           
        </FormControl>
      
    </div>
  )
}

export default Register
