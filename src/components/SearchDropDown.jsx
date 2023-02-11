import React from "react"
import { Link } from "react-router-dom"

const SearchDropDown = ({results}) => {
  const movies = JSON.parse(localStorage.movies)
  return (
    <div className="bg-zinc-800 rounded-md p-3 text-zinc-400 absolute mt-3 z-30 
    shadow-lg max-h-[35rem] overflow-y-auto w-96 searchDisplay 
     top-12">
      {results.map((movie, id) => (
        <Link key={id} to={`/movie/${movie.slug}`}>
          <div className="border-b border-zinc-400 mb-3">{movie.title}</div>
        </Link>
      ))}
    </div>
  )
}

export default SearchDropDown
