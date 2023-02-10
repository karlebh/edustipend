import React from "react"
import { Link } from "react-router-dom"
import a from "../assets/a.jpg"
import c from "../assets/c.jpg"
import d from "../assets/d.jpg"
import b from "../assets/b.jpg"
import e from "../assets/e.jpg"

const Parties = ({ movies, getGenre }) => {
  return (
    <section>
      <div className="flex items-baseline">
        <h2 className="font-bold text-gray-300">Parties</h2>
        <span className="ml-16 rounded-lg w-8 h-3.5 bg-amber-900 inline-block"></span>
      </div>

      <div className="mt-5 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
        {movies.slice(0, 12).map((movie, id) => (
          <Link to={`movie/${movie.slug}`} key={id}>
            <div
              className={`flex-shrink-0 flex flex-col items-stretch justify-between rounded-lg h-48 bg-zinc-800 px-3 py-2 `}
            >
              <div className="flex justify-between">
                <img
                  src={`${movie.backdrop_path}`}
                  className="w-20 h-16 object-cover rounded-lg"
                  alt=""
                />
                <div className="relative ml-4 -mr-4 flex items-center flex-shrink-0">
                  <img
                    src={a}
                    alt=""
                    className="w-7 h-7 rounded-full object-cover object-top relative"
                  />
                  <img
                    src={d}
                    alt=""
                    className="w-7 h-7 rounded-full object-cover object-top relative -left-3"
                  />
                  <img
                    src={c}
                    alt=""
                    className="w-7 h-7 rounded-full object-cover object-top relative -left-6"
                  />
                </div>
              </div>

              <div className="">
                <h1 className="font-bold text-sm text-zinc-300 text-left">
                  {movie.title}
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
          </Link>
        ))}
      </div>
    </section>
  )
}

export default Parties
