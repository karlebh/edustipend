import React, { useEffect } from "react"
import Splide from "@splidejs/splide"
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll"
import imdb from "../assets/imdb.png"
import usa from "../assets/usa.jpg"
import { LazyLoadImage } from "react-lazy-load-image-component"

// Default theme
import "@splidejs/splide/css"

// or other themes
import "@splidejs/splide/css/skyblue"
import "@splidejs/splide/css/sea-green"

// or only core styles
import "@splidejs/splide/css/core"

const Slider = ({ images }) => {
  let screenSize = () => (screen.width < 768 ? 4 : 3)
  useEffect(() => {
    let main = new Splide("#main-carousel", {
      type: "fade",
      rewind: true,
      pagination: false,
      arrows: false,
    })

    let thumbnails = new Splide("#thumbnail-carousel", {
      perPage: screenSize(),
      fixedHeight: 60,
      gap: 10,
      rewind: true,
      pagination: false,
      isNavigation: true,
    })

    main.sync(thumbnails)
    main.mount()
    thumbnails.mount()
  }, [])
  return (
    <div className="h-[30rem] mt-5">
      <section id="main-carousel" className="splide w-full p-0">
        <div className="splide__track">
          <ul className="splide__list">
            {images.map((movie, id) => (
              <li
                key={id}
                className="splide__slide w-full h-96 flex bg-black rounded-lg overflow-hidden"
              >
                <div className="w-1/2 md:flex flex-col justify-between px-4 md:pl-8 py-7 hidden">
                  <div>
                    <h1 className="text-3xl font-bold">{movie.title}</h1>
                    <br />
                    <div className="flex items-center">
                      <div className="flex items-center text-xs mr-4">
                        <img src={imdb} className="w-5 h-4 mr-1" alt="" />{" "}
                        {movie.vote_average}
                      </div>
                      <span className="text-3xl mr-4">&middot;</span>
                      <div className="flex items-center text-xs">
                        <img
                          src={usa}
                          className="w-5 h-4 object-cover object-center mr-1"
                          alt=""
                        />{" "}
                        <span className="font-semibold">English</span>
                      </div>
                    </div>
                  </div>

                  <div className="">
                    <div className="flex items-center">
                      <button className="px-4 py-2 bg-amber-700 rounded-2xl text-gray-50 font-semibold">
                        Watch
                      </button>
                      {/* <span className="text-zinc-400 inline mt-20">
                        +5 friends are watching
                      </span> */}
                    </div>
                  </div>
                </div>
                <div className="h-full md:flex w-full md:w-1/2">
                  {/* mobile */}
                  <LazyLoadImage
                    effect="blur"
                    src={`${movie.poster_path}`}
                    alt=""
                    className="h-full w-full md:hidden"
                    id={id}
                  />
                  {/* desktop */}
                  <LazyLoadImage
                    effect="blur"
                    src={`${movie.backdrop_path}`}
                    alt=""
                    className="h-full w-full hidden md:inline-block"
                    id={id}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <div className="relative bottom-10">
        <section id="thumbnail-carousel" className="splide">
          <div className="splide__track">
            <ul className="splide__list">
              {images.map((movie, id) => (
                <li key={id} className="splide__slide">
                  <img
                    src={`${movie.backdrop_path}`}
                    alt=""
                    className="image cover w-full center h-full"
                    id={id}
                  />
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
      {/* <div className="absolute md:w-5/12 right-0 bottom-2 ">
        <section id="thumbnail-carousel" className="splide">
          <div className="splide__track">
            <ul className="splide__list">
              {images.map((movie, id) => (
                <li key={id} className="splide__slide">
                  <img
                    src={`${movie.backdrop_path}`}
                    alt=""
                    className="image cover w-full center h-full"
                    id={id}
                  />
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div> */}
    </div>
  )
}

export default Slider
