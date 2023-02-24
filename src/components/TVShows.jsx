import React, { useContext } from "react"
import { useEffect } from "react"
import { Link } from "react-router-dom"
import { MovieContext } from "../context/MovieContext"
import { LazyLoadImage } from "react-lazy-load-image-component"

const Parties = () => {
  const { getGenre, tvShows, getTvShows } = useContext(MovieContext)
  useEffect(() => {
    getTvShows()
  }, [])
  return (
    <section>
      <div className="flex items-baseline">
        <h2 className="font-bold text-gray-300">TV Shows</h2>
        <span className="ml-16 rounded-lg w-8 h-3.5 bg-amber-900 inline-block"></span>
      </div>

      <div className="mt-5 grid sm:grid-cols-2 gap-x-6 gap-y-4 w-full">
        {tvShows.slice(0, 12).map((movie, id) => (
          <Link to={`/show/${movie.slug}/${movie.id}`} key={id}>
            <div
              className={`flex-shrink-0 flex items-stretch justify-between rounded-lg bg-zinc-800 h-32 max-h-[8rem] lg:hover:scale-105 cursor-pointer lg:transition-all lg:duration-500`}
            >
              <div className="flex justify-between w-1/2">
                <LazyLoadImage
                  effect="blur"
                  src={`${movie.backdrop_path}`}
                  className="h-full w-full rounded-l-lg"
                  alt=""
                />
              </div>

              <div className="w-1/2 px-4 flex items-center flex-wrap">
                <div>
                  <h1 className="font-bold text-sm text-zinc-300 text-left">
                    {movie.name}
                  </h1>
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
    </section>
  )
}

export default Parties
