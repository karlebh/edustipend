import React, { useContext, useEffect } from "react"
import { LazyLoadImage } from "react-lazy-load-image-component"

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
        {/* <LazyLoadImage width={600} height={400} src="https://s-media-cache-ak0.pinimg.com/474x/50/1b/74/501b74902935b063816ea8e14f460ca0.jpg"/> */}
        <Slider images={movies} />
        <TVShows />
        <Watching />
      </span>
    </div>
  )
}

export default Home
