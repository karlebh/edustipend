import React, { useEffect, useState } from "react"
import moment from "moment/moment"
import { Link, useNavigate } from "react-router-dom"

const ComingSoon = () => {
  const [pageCount, setPageCount] = useState(4)

  const localGenres = localStorage.genres ? JSON.parse(localStorage.genres) : []
  const localMovies = localStorage.comingSoon
    ? JSON.parse(localStorage.comingSoon)
    : []
  const [movies, setLatestMovies] = useState(localMovies)
  const [genres, setGenres] = useState(localGenres)
  const IMAGE_URL = "https://image.tmdb.org/t/p/original/"
  const navigate = useNavigate()
  console.log(navigate)

  useEffect(() => {
    async function getMovies() {
      if (!localMovies)
        await axios
          .request({
            method: "GET",
            url: `https://api.themoviedb.org/3/movie/upcoming?api_key=7316fba02f75311274d240dc8ac61a66&language=en-US&page=1`,
          })
          .then(res => {
            setLatestMovies([...res.data])
            localStorage.setItem("comingSoon", JSON.parse(movies))
            console.log(res)
          })
          .catch(err => err.message)
    }

    getMovies()
  }, [])

  function getGenre(id) {
    return genres.find(genre => id == genre.id).name
  }

  return (
    <section>
      <div className="flex items-baseline mt-20">
        <h2 className="font-bold text-gray-300">Continue Watching</h2>
        <span className="ml-16 rounded-lg w-8 h-3.5 bg-amber-900 inline-block"></span>
      </div>

      <div className="mt-5 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
        {movies.slice(0, pageCount).map((movie, id) => (
          <Link to={`/movie/${movie.slug}`} key={id}>
            <div
              className={`flex-shrink-0 rounded-lg bg-zinc-800 hover:scale-105 cursor-pointer transition-all duration-500  `}
            >
              <img
                src={`${IMAGE_URL}${movie.backdrop_path}`}
                className="w-full min-h-[12rem] object-cover rounded-t-lg"
                alt=""
              />
              <div className="px-3 h-32 overflow-hidden mt-3 flex flex-col justify-evenly">
                <h1 className="font-bold text-sm text-zinc-300 text-left mb-3 ">
                  {movie.title}
                </h1>
                <div>
                  <p className="text-sm text-zinc-500">
                    {" "}
                    <span>Released Date:</span>{" "}
                    {moment(movie.release_date).format("ll")}
                  </p>
                  <p>
                    {movie.genre_ids.slice(0, 3).map((id, index) => (
                      <span
                        key={id}
                        className="text-zinc-500 font-bold text-xs mr-1.5 text-left"
                      >
                        {getGenre(id)}
                      </span>
                    ))}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      {pageCount >= movies.length || (
        <div className="flex justify-center items-center mt-10 mb-10">
          <br />
          <button
            onClick={() => setPageCount(prevCount => prevCount + 2)}
            className="text-xl font-bold px-3 py-2 rounded-lg bg-zinc-200 text-zinc-800 md:hidden"
          >
            Load More
          </button>
          <button
            onClick={() => setPageCount(prevCount => prevCount + 3)}
            className="text-xl font-bold px-3 py-2 rounded-lg bg-zinc-200 text-zinc-800 hidden md:inline-block lg:hidden"
          >
            Load More
          </button>
          <button
            onClick={() => {
              window.scrollTo(0, document.body.scrollHeight)
              setPageCount(prevCount => prevCount + 4)
            }}
            className="text-xl font-bold px-3 py-2 rounded-lg bg-zinc-200 text-zinc-800 hidden lg:inline-block"
          >
            Load More
          </button>
        </div>
      )}
    </section>
  )
}

export default ComingSoon
