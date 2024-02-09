import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from './UserContext'

export default function Header() {

  const {setUserInfo,userInfo} = useContext(UserContext)

  useEffect(() =>{
    fetch('https://cvserver-3tbg.onrender.com/profile', {
      credentials: 'include',
    }).then(response => {
      response.json().then(userInfo => {
        setUserInfo(userInfo)
      })
    })
  }, [])

  function logout(){
    fetch('https://cvserver-3tbg.onrender.com/logout' , {
      credentials: 'include',
      method: 'POST',
    })
    setUserInfo(null)
  }

  const username = userInfo?.username

  return (
    <header>
        <Link to='/' className='logo'>My Works</Link>
        <nav>
          {username && (
            <>
              <Link to="/create">Create new post</Link>
              <Link to={'/login'} onClick={logout}>Logout</Link>
            </>
          )}
          {!username && (
            <>
              <Link to='/login'>Login</Link>
              {/* <Link to='/register'>Register</Link> */}
            </>
          )}
        </nav>
    </header>
  )
}
