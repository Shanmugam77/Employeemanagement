import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Protect = (props) => {
    let navigate=useNavigate()
    let Component=props.component

    useEffect(()=>{
        let login=localStorage.getItem("login")
        if (!login) {
          navigate("/")
        }
    })
  return (
    <div>
      <Component/>
    </div>
  )
}

export default Protect
