import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './page/home'
// import About from './pages/About'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* <Route path="/about" element={<About />} /> */}
    </Routes>
  )
}

export default App