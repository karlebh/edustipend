import React from 'react'
import { Route, Routes } from "react-router-dom"

import Home from "./views/Home"
import Details from "./views/Details"
import WatchList from './views/WatchList'
import ComingSoon from './views/ComingSoon'

const Pages = () => {
  return (
    <Routes location={location}>
    
    <Route path='/' element={<Home />} />
    <Route path='/movie/:slug/:id' element={<Details />} />
    <Route path='/show/:slug/:id' element={<Details />} />
    <Route path='/watchlist' element={<WatchList />} />
    <Route path='/coming-soon' element={<ComingSoon />} />
  </Routes>
  )
}

export default Pages