import React from "react"
import { useEffect, useState } from "react"

import Slider from "../components/Slider"
import Parties from "../components/Parties"
import Watching from "../components/Watching"
import Loader from "../components/Loader"

const Home = () => {
  const localMovies = localStorage.movies ? JSON.parse(localStorage.movies) : []
  const localGenres = localStorage.genres ? JSON.parse(localStorage.genres) : []
  const [count, setCount] = useState(0)
  const [movies, setMovies] = useState(localMovies)
  const [genres, setGenres] = useState(localGenres)
  const [pageCount, setPageCount] = useState(4)
  const genreUrl =
    "https://api.themoviedb.org/3/genre/movie/list?api_key=7316fba02f75311274d240dc8ac61a66"
  const options = {
    method: "GET",
    url: "https://api.themoviedb.org/3/movie/popular?api_key=7316fba02f75311274d240dc8ac61a66",
  }

  useEffect(() => {
    // if (!genres.length) {
      axios
        .get(genreUrl)
        .then(function (response) {
          console.log(response.data)
          setGenres([...response.data.genres])
          localStorage.setItem(
            "genres",
            JSON.stringify([...response.data.genres])
          )
        })
        .catch(function (error) {
          console.error(error)
        })
    // }
  }, [])

  useEffect(() => {
    if (!movies.length) {
      axios
        .request(options)
        .then(function (response) {
          let data = response.data.results
          const IMAGE_URL = "https://image.tmdb.org/t/p/original"
          data.forEach(movie => {
            let slug = movie.original_title
              .replaceAll(" ", "-")
              .replaceAll(":", "")
              .replaceAll(",", "")
              .toLowerCase()
            movie.poster_path = IMAGE_URL + movie.poster_path
            movie.backdrop_path = IMAGE_URL + movie.backdrop_path
            Object.assign(movie, { slug })
          })
          setMovies([...data])
          localStorage.setItem("movies", JSON.stringify([...data]))
        })
        .catch(function (error) {
          console.error(error)
        })
    }
  }, [])

  function getGenre(id) {
    return genres.find(genre => id == genre.id).name
  }
  const thumbnails = movies
  return (
    <main className="px-4 lg:px-10 pt-3 lg:pt-10 w-full lg:min-w-[80%] mb-14 bg-natural-500 overflow-hidden">
      {movies ? (
        <span>
          <div className="mx-auto relative">
            <Slider images={thumbnails} movies={movies} />
          </div>

          <Parties movies={movies} getGenre={getGenre} />
          <Watching movies={movies} getGenre={getGenre} />
        </span>
      ) : (
        <Loader />
      )}
    </main>
  )
}

export default Home
