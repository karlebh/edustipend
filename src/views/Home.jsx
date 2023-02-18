import React, { useContext, useEffect } from "react"

import Slider from "../components/Slider"
import Parties from "../components/Parties"
import Watching from "../components/Watching"
import Loader from "../components/Loader"
import { MovieContext } from "../context/MovieContext"

const Home = () => {
  const { getGenres, getMovies, genres, movies } = useContext(MovieContext)

  useEffect(() => {
    if (!genres.length) getGenres()
  }, [])

  useEffect(() => {
    if (!movies.length) getMovies()
  }, [])

  return (
    <main className="lg:px-10 pt-3 lg:pt-10 w-full lg:min-w-[80%] mb-14 bg-natural-500 overflow-hidden">
      {movies ? (
        <span>
          <Slider images={movies} />
          <Parties />
          <Watching />
        </span>
      ) : (
        <Loader />
      )}
    </main>
  )
}

export default Home
