import React from "react"
import { Route, Routes } from 'react-router-dom'; 
import Layout from './Layout';
import Home from './pages/Home';

function App() {
  return (
  <Routes>
    <Route element={<Layout />}>
      <Route index element={<Home />} />
    </Route>
  </Routes>
  )
}

export default App