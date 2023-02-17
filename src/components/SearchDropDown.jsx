import React from "react"
import { Link } from "react-router-dom"

const SearchDropDown = ({ results, clear }) => {
  return (
    <div
      className="bg-zinc-800 rounded-md p-3 text-zinc-400 absolute mt-3 z-30 
    shadow-lg max-h-[35rem] overflow-y-auto w-full py-2 searchDisplay 
     top-12 left-0"
    >
      {results.map((movie, id) => (
        <Link
          key={id}
          to={`/movie/${movie.slug}/${movie.id}`}
          onClick={() => clear()}
        >
          <div className="border-b border-zinc-400 mb-3">{movie.title}</div>
        </Link>
      ))}
    </div>
  )
}

export default SearchDropDown
