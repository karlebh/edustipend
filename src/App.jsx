import React, { useContext } from "react"
import { BrowserRouter } from "react-router-dom"

import SideBar from "./components/SideBar"
import Header from "./components/Header"
import Pages from "./Pages"
import Loader from "./components/Loader"
import ScrollToTop from "./helpers/ScrollToTop"
import MovieContextProvider, { MovieContext } from "./context/MovieContext"
import ReactPlaceholder from "react-placeholder/lib"

const AnimationWrapper = () => {
  const { loading } = useContext(MovieContext)
  return (
    <div>
      {loading && <div className="mt-10"></div>}
      <ReactPlaceholder
        showLoadingAnimation
        type="media"
        rows={7}
        ready={loading}
        customPlaceholder={Loader}
      >
        <Pages />
      </ReactPlaceholder>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <MovieContextProvider>
        <div className="min-h-screen max-w-[85rem] mx-auto bg-zinc-900 text-gray-300 flex w-full overflow-x-hidden">
          <ScrollToTop />
          <SideBar />
          <main className="pt-3 w-[85%] lg:ml-4 mt-7 mx-auto mb-5 bg-natural-500 overflow-hidden">
            <Header />
            <AnimationWrapper />
          </main>
        </div>
      </MovieContextProvider>
    </BrowserRouter>
  )
}

export default App
