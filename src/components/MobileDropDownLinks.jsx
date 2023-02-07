import React, { useState } from "react"
import { Link, useLocation } from "react-router-dom"

const MobileDropDownLinks = ({ show, setShow }) => {
  const location = useLocation()

  return (
    <div className="bg-zinc-600 lg:hidden">
      {show && (
        <button
          onClick={() => setShow(false)}
          className="bg-transparent w-full h-full inset-0 fixed z-40"
        ></button>
      )}
     {show &&  <div className=" absolute right-0 bg-zinc-700 shadow-lg mt-3 rounded-lg z-50 overflow-clip">
        <div className="my-1 inline-flex flex-col gap-y-4 w-72">
          <Link to={"/"} >
            <button onClick={() => setShow(false)} className={`font-semibold block w-full py-3 px-2  ${
                location.pathname == "/"
                  ? "bg-zinc-500 "
                  : "bg-zinc-700 "
              }`}>Browse</button>
          </Link>
          <Link to={"/watchlist"}>
            <button onClick={() => setShow(false)} className={`font-semibold block w-full py-3 px-2  ${
                location.pathname == "/watchlist"
                  ? "bg-zinc-500 "
                  : "bg-zinc-700 "
              }`}>Watchlist</button>
          </Link>
          <Link to={"/coming-soon"}>
            <button onClick={() => setShow(false)} className={`font-semibold block w-full py-3 px-2 ${
                location.pathname == "/coming-soon"
                  ? "bg-zinc-500 "
                  : "bg-zinc-700 "
              }`}>Coming Soon</button>
          </Link>
        </div>
      </div>}
    </div>
  )
}

export default MobileDropDownLinks
