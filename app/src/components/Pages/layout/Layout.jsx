import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../../Header/Header'
import Footer from '../../Footer/Footer'

const Layout = () => {
  return (
    <div>
        <Header></Header>


        <section>
            <Outlet/>
        </section>

        <Footer></Footer>
    </div>
  )
}

export default Layout