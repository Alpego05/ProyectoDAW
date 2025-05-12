import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className='header'>
      <nav className='Flex'>
        <div className='Header-link'>
          <Link to={"/Home"}> 
          <h2  className='Purple'> Home</h2> </Link>
        </div>

        



      </nav>
    </header>
  )
}

export default Header