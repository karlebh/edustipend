import React from "react"
import { useParams } from "react-router"
import moment from "moment/moment"

const Details = () => {
  const { slug } = useParams()

  const localMovies = localStorage.movies ? JSON.parse(localStorage.movies) : []
  const localGenres = localStorage.genres ? JSON.parse(localStorage.genres) : []
  const movie = localMovies.find(movie => movie.slug == slug)
  function getGenre(id) {
    return localGenres.find(genre => id == genre.id)["name"]
  }
  return (
    <div className="mt-5 text-center">
      <h1 className="font-bold font-sans text-4xl my-5">
        {movie.original_title}
      </h1>

      <img
        src={"https://image.tmdb.org/t/p/original/" + movie.poster_path}
        className="h-[40rem] w-[80%] mx-auto rounded-lg"
        alt=""
      />

      <div className="mt-4">
        {movie.genre_ids.map(id => (
          <span key={id} className="text-2xl font-semibold mr-5">
            {getGenre(id)}
          </span>
        ))}
      </div>

      <div className="mt-3 text-2xl text-amber-500 font-normal">
        {movie.vote_average} / 10 based on {movie.vote_count} votes
      </div>

      <p className="text-zinc-500 text-xl mt-5">
        {" "}
        <span>Released Date:</span> {moment(movie.release_date).format("ll")}
      </p>

      <div className="mt-7 font-semibold text-xl text-justify">
        {movie.overview}
      </div>

      <div></div>
    </div>
  )
}

export default Details
