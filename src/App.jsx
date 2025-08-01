import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import NavBar from './Components/navBar/navBar'
import Home from './Pages/Home/home'
import Favorites from './Pages/Favorites/favorites'
import Details from './Pages/Details/details'
import './App.css'

function App() {

  return (
    <>
      <NavBar />
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/recipe-item/:id" element={<Details />} />
      </Routes>
    </>
  )
}

export default App
