import React, { useContext, useEffect } from "react"

import Slider from "../components/Slider"
import TVShows from "../components/TVShows"
import Watching from "../components/Watching"

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
    <div className="lg:px-10 w-full lg:min-w-[80%] mb-14 bg-natural-500 overflow-hidden">
      <span>
        <Slider images={movies} />
        <TVShows />
        <Watching />
      </span>
    </div>
  )
}

export default Home
