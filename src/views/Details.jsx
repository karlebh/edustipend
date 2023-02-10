import React, { useEffect, useState } from "react"
import { useParams } from "react-router"
import moment from "moment/moment"

const Details = () => {
  const { slug } = useParams()

  const localMovies = localStorage.movies ? JSON.parse(localStorage.movies) : []
  const localGenres = localStorage.genres ? JSON.parse(localStorage.genres) : []
  const movie = localMovies.find(movie => movie.slug == slug)
  const [credits, setCredits] = useState([])
  function getGenre(id) {
    return localGenres.find(genre => id == genre.id).name
  }

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=7316fba02f75311274d240dc8ac61a66&language=en-US`
      )
      .then(resp => {
        const IMAGE_URL = "https://image.tmdb.org/t/p/original"
        const casts = resp.data.cast
        let newCasts = []
        for (let i = 0; i < casts.length; i++) {
          if (!casts[i].profile_path) continue
          casts[i].profile_path = IMAGE_URL + casts[i].profile_path
          newCasts.push(casts[i])
        }
        setCredits(newCasts)
      })
      .catch(err => console.log(err.message))
  }, [])

  return (
    <div className="mt-5 text-center mb-10">
      <h1 className="font-bold font-sans text-4xl my-5">
        {movie.original_title}
      </h1>

      <img
        src={"https://image.tmdb.org/t/p/original/" + movie.poster_path}
        className="h-[20rem] lg:h-[40rem] w-[98%] md:w-[80%] mx-auto rounded-lg"
        alt=""
      />

      <div className="mt-4">
        {movie.genre_ids.map(id => (
          <span key={id} className="text-xl font-semibold mr-5">
            {getGenre(id)}
          </span>
        ))}
      </div>

      <div className="mt-3 text-lg text-amber-500 font-normal">
        {movie.vote_average} / 10 based on {movie.vote_count} votes
      </div>

      <p className="text-zinc-500 text-xl mt-5">
        {" "}
        <span>Released Date:</span> {moment(movie.release_date).format("ll")}
      </p>

      <div className="mt-7 font-semibold text-md text-justify lg:px-4 text-neutral-100">
        {movie.overview}
      </div>

      <h1 className="mt-5 font-sans text-2xl">Credits</h1>

      <div className="mt-5 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full px-2 lg:px-4">
        {credits.slice(0, 16).map((cast, id) => (
          <div
            key={id}
            className={`flex-shrink-0 rounded-lg bg-zinc-800 lg:hover:scale-105 lg:cursor-pointer lg:transition-all lg:duration-500  `}
          >
            <img
              src={`${cast.profile_path}`}
              className="w-full min-h-[12rem] object-cover rounded-t-lg"
              alt=""
            />
            <div className="px-3 h-32 overflow-hidden mt-3 flex flex-col justify-evenly">
              <h1 className="font-bold text-sm text-zinc-300 text-left mb-3 ">
                {cast.original_name}
              </h1>

              <h1 className="text-sm text-zinc-300 text-left mb-3 ">
                {cast.character}
              </h1>
              

              <div></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Details
