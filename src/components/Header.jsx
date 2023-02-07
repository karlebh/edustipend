import axios from "axios"
import React, { useCallback, useState } from "react"
import { debounce, throttle } from "lodash"
import { Link } from "react-router-dom"

import SearchDropDown from "./SearchDropDown"
import a from "../assets/a.jpg"
import MobileDropDownLinks from "./MobileDropDownLinks"
const Header = () => {
  const [search, setSearch] = useState("")
  const [results, setResults] = useState([])
  const [showMenu, setShow] = useState(false)

  const Search = throttle((value) => {
    axios
      .request({
        method: "GET",
        url: `https://api.themoviedb.org/3/search/movie?api_key=7316fba02f75311274d240dc8ac61a66&language=en-US&query=endgame&page=1&include_adult=false`,
      })
      .then(res => {
        setResults([...res.data])
        console.log(res)
      })
      .catch(err => err.message)
  }, 100)

  const debouncedSearch = useCallback(value => Search(value), [])

  function searchMovie(e) {
    debouncedSearch(e.target.value)
    setSearch(e.target.value)
  }

  function toggleSearch() {
    let mobileSearch = document.getElementById("mobileSearch")

    if (mobileSearch.classList.contains("hidden")) {
      mobileSearch.classList.replace("hidden", "inline-flex")
      mobileSearch.classList.remove("growUp")
      mobileSearch.classList.add("growDown")
    } else {
      mobileSearch.classList.remove("growDown")
      mobileSearch.classList.add("growUp")
      setTimeout(
        () => mobileSearch.classList.replace("inline-flex", "hidden"),
        200
      )
    }
  }

  return (
    <div>
      <header className="flex items-center justify-between">
        <div className="flex items-center">
          <Link to={"/"}>
            <h1 className="text-xl font-bold font-sans lg:hidden">Movies</h1>
          </Link>
          <div className="mr-10 hidden lg:inline-flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 mr-4 text-gray-600 hover:text-gray-400 transition-all duration-700"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-gray-600 hover:text-gray-400 transition-all duration-700"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </div>

          <div className="relative hidden lg:block">
            <div className="relative">
              <form
                action=""
                className="inline-flex items-center rounded-3xl border border-zinc-800
               hover:border-zinc-800 hover:border-2 pl-6 pr-4 gap-x-4 transition-all duration-100 hover:outline hover:outline-zinc-500 hover:outline-offset-2"
              >
                <div className="p-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  autoComplete="off"
                  name="search"
                  placeholder="Search everything"
                  onChange={searchMovie}
                  value={search}
                  className="bg-inherit outline-none placeholder:text-zinc-600 font-semibold w-72"
                />
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
                    />
                  </svg>
                </div>
              </form>
              {search && <SearchDropDown results={results} />}
            </div>

            {!!results.length && (
              <div className="absolute">
                {results.map((result, id) => (
                  <div className="h-10">{result.title}</div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* tablet screen */}
        <div className="flex items-center">
          <div className="sm:hidden md:flex lg:hidden flex mr-3 md:mr-5 relative">
            <button className="hidden md:inline-block" onClick={toggleSearch}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            <div className="relative">
              {/* hidden is for animation */}
              <form
                action=""
                id="mobileSearch"
                className="growUp h-12 hidden absolute z-20 bg-zinc-800 text-white 
                -right-24 top-10 items-center rounded-3xl border border-zinc-800 pl-6 pr-4 gap-x-4 
          transition-all duration-100 hover:outline hover:outline-zinc-500 hover:outline-offset-3"
              >
                <input
                  type="text"
                  autoComplete="off"
                  name="search"
                  placeholder="Search everything"
                  onChange={searchMovie}
                  value={search}
                  className="bg-inherit outline-none placeholder:text-zinc-600 font-semibold w-96"
                />
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
                    />
                  </svg>
                </div>
                {search && <SearchDropDown results={results} />}
              </form>
            </div>
          </div>

          <button className="mr-3 md:mr-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
              />
            </svg>
          </button>

          <button className="mr-3 md:mr-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
              />
            </svg>
          </button>
          <div className="relative">
            <button
              className="h-9 w-9 flex justify-center items-center rounded-full grad"
              onClick={() => setShow(!showMenu)}
            >
              <img
                src={a}
                className="object-cover w-8 h-8 rounded-full"
                alt=""
              />
            </button>
            {/* dropdown links */}
            <MobileDropDownLinks show={showMenu} setShow={setShow} />
          </div>
        </div>
      </header>
      {/* Mobile Screen */}
      <div className="relative w-full md:hidden">
        <form
          action=""
          className="flex items-center rounded-3xl border border-zinc-800 px-8 mt-5 gap-x-4 transition-all 
      duration-100 hover:outline hover:outline-zinc-500 hover:outline-offset-2"
        >
          <div className="p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </div>
          <input
            type="text"
            autoComplete="off"
            onChange={searchMovie}
            value={search}
            placeholder="Search everything"
            className="bg-inherit outline-none placeholder:text-zinc-600 font-semibold w-full"
          />
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
              />
            </svg>
          </div>
        </form>
        {search && <SearchDropDown results={results} />}
      </div>
    </div>
  )
}

export default Header
