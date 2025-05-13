import { useState } from 'react'
import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Layout from './components/Layout'
import Home from './components/Home'
import Login from './components/Login'

function App() {

  return (
        <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login/>}/>   
          <Route path='Home' element={<Layout/>}/> 

          
        </Routes>
        </BrowserRouter>
  )
}

export default App
