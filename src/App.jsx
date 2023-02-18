import React from "react"
import { BrowserRouter } from "react-router-dom"

import SideBar from "./components/SideBar"
import Header from "./components/Header"
import Pages from "./Pages"
import ScrollToTop from "./helpers/ScrollToTop"
import MovieContextProvider from "./context/MovieContext"

function App() {
  return (
    <BrowserRouter>
      <MovieContextProvider>
        <div className="min-h-screen max-w-[85rem] mx-auto bg-zinc-900 text-gray-300 flex w-full overflow-x-hidden">
          <ScrollToTop />
          <SideBar />
          <main className="pt-3 px-4 w-[85%] lg:ml-4 mt-7 mx-auto mb-5 bg-natural-500 overflow-hidden">
            <Header />
            <Pages />
          </main>
        </div>
      </MovieContextProvider>
    </BrowserRouter>
  )
}

export default App
