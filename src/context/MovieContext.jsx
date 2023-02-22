import axios from "axios"
import React, { createContext, useState } from "react"

export const MovieContext = createContext()

const MovieContextProvider = ({ children }) => {
  const localGenres = localStorage.genres ? JSON.parse(localStorage.genres) : []
  const localMovies = localStorage.movies ? JSON.parse(localStorage.movies) : []
  const localtvShows = localStorage.tvShows
    ? JSON.parse(localStorage.tvShows)
    : []
  const localpopularActors = localStorage.popularActors
    ? JSON.parse(localStorage.popularActors)
    : []
  const localComingSoon = localStorage.comingSoon
    ? JSON.parse(localStorage.comingSoon)
    : []

  const data = {
    number: localStorage.movies ? JSON.parse(localStorage.movies) : [],
    searchResults: [],
    genreUrl: [
      "https://api.themoviedb.org/3/genre/tv/list?api_key=7316fba02f75311274d240dc8ac61a66&language=en-US",
      "https://api.themoviedb.org/3/genre/movie/list?api_key=7316fba02f75311274d240dc8ac61a66",
    ],
    options: {
      method: "GET",
      url: "https://api.themoviedb.org/3/movie/popular?api_key=7316fba02f75311274d240dc8ac61a66",
    },
    popularActorsUrl:
      "https://api.themoviedb.org/3/person/popular?api_key=7316fba02f75311274d240dc8ac61a66&language=en-US&page=1",
    tvShowsUrl:
      "https://api.themoviedb.org/3/tv/top_rated?api_key=7316fba02f75311274d240dc8ac61a66&language=en-US&page=1",
    watchlistUrl:
      "https://api.themoviedb.org/3/movie/now_playing?api_key=7316fba02f75311274d240dc8ac61a66&language=en-US&page=1",
    image_url: "https://image.tmdb.org/t/p/original",
    comingSoonUrl: `https://api.themoviedb.org/3/movie/upcoming?api_key=7316fba02f75311274d240dc8ac61a66&language=en-US&page=1`,
  }

  const [movieData] = useState(data)
  const [genres, setGenres] = useState(localGenres)
  const [movies, setMovies] = useState(localMovies)
  const [comingSoon, setComingSoon] = useState(localComingSoon)
  const [results, setResults] = useState([])

  const [popularActors, setPopularActors] = useState(localpopularActors)
  const [tvShows, setTvShows] = useState(localtvShows)
  const [loading, setLoading] = useState(false)
  const [credits, setCredits] = useState([])

  const [movie] = useState([])

  const getGenre = id => {
    return genres?.find(genre => id == genre.id)?.name
  }

  const imagify = imgPath => {
    if (!imgPath) return
    return movieData.image_url + imgPath
  }

  const getMovies = async () => {
    setLoading(true)
    await axios
      .request(movieData.options)
      .then(response => {
        let data = response.data.results
        data.forEach(movie => {
          let slug = sluggify(movie.original_title)
          movie.poster_path = movieData.image_url + movie.poster_path
          movie.backdrop_path = movieData.image_url + movie.backdrop_path
          Object.assign(movie, { slug })
        })
        setMovies([...data])
        localStorage.setItem("movies", JSON.stringify([...data]))
        setLoading(false)
      })
      .catch(error => {
        console.error(error)
      })
  }

  const sluggify = name => {
    return name
      .replaceAll(" ", "-")
      .replaceAll(":", "")
      .replaceAll(",", "")
      .toLowerCase()
  }

  const getGenres = async () => {
    setLoading(true)
    for (let url of movieData.genreUrl) {
      await axios
        .get(url)
        .then(response => {
          setGenres([...genres, ...response.data.genres])
          localStorage.setItem(
            "genres",
            JSON.stringify([...genres, ...response.data.genres])
          )
        })
        .catch(error => {
          console.error(error)
        })
    }
    setLoading(false)
  }

  const addResults = results => {
    setResults([...results])
  }

  const getPopularActors = async () => {
    if (!popularActors.length)
      await axios
        .get(movieData.popularActorsUrl)
        .then(res => {
          let data = res.data.results
          data.forEach(actor => {
            actor.profile_path = movieData.image_url + actor.profile_path
          })
          setPopularActors([...data])
          localStorage.setItem("popularActors", JSON.stringify(data))
        })
        .catch(err => err.message)
  }

  const showImage = imagePath => {
    return movieData.image_url + imagePath
  }

  const getTvShows = async () => {
    if (!tvShows.length)
      await axios
        .get(movieData.tvShowsUrl)
        .then(res => {
          let shows = res.data.results

          // for (let tv = 0; tv < shows.length; tv++) {
          //   if (!shows[tv].poster_path || !shows[tv].backdrop_path) continue
          //   let slug = sluggify(shows[tv].original_title)
          //   shows[tv].poster_path = movieData.image_url + shows[tv].poster_path
          //   shows[tv].backdrop_path =
          //     movieData.image_url + shows[tv].backdrop_path
          //   Object.assign(shows[tv], { slug })
          // }

          shows.forEach((movie, id) => {
            let slug = sluggify(movie.original_name)
            // if (!movie.poster_path || !movie.backdrop_path)
            movie.poster_path = movieData.image_url + movie.poster_path
            movie.backdrop_path = movieData.image_url + movie.backdrop_path
            Object.assign(movie, { slug })
          })

          console.log(shows)
          setTvShows([...shows])
          localStorage.setItem("tvShows", JSON.stringify(shows))
        })
        .catch(err => err.message)
  }

  const toggleSearch = () => {
    let mobileSearch = document.getElementById("mobileSearch")

    if (mobileSearch.classList.contains("hidden")) {
      mobileSearch.classList.replace("hidden", "inline-flex")
      mobileSearch.classList.remove("growUp")
      mobileSearch.classList.add("growDown")
    } else {
      mobileSearch.classList.remove("growDown")
      mobileSearch.classList.add("growUp")
      setTimeout(
        () => mobileSearch.classList.replace("inline-flex", "hidden"),
        200
      )
    }
  }

  const getComingSoon = async () => {
    await axios
      .get(movieData.comingSoonUrl)
      .then(res => {
        let data = res.data.results
        data.forEach(movie => {
          let slug = sluggify(movie.original_title)
          movie.poster_path = movieData.image_url + movie.poster_path
          movie.backdrop_path = movieData.image_url + movie.backdrop_path
          Object.assign(movie, { slug })
        })
        setComingSoon([...data])
        localStorage.setItem("comingSoon", JSON.stringify(data))
      })
      .catch(err => err.message)
  }

  const getMovieCredit = async id => {
    await axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}/credits?api_key=7316fba02f75311274d240dc8ac61a66&language=en-US`
      )
      .then(resp => {
        const casts = resp.data.cast
        let newCasts = []
        for (let i = 0; i < casts.length; i++) {
          if (!casts[i].profile_path) continue
          casts[i].profile_path = movieData.image_url + casts[i].profile_path
          newCasts.push(casts[i])
        }
        setCredits(newCasts)
      })
      .catch(err => console.log(err.message))
  }
  const getSingleMovie = async id => {}

  return (
    <MovieContext.Provider
      value={{
        movies,
        credits,
        genres,
        tvShows,
        loading,
        results,
        movieData,
        // watchlist,
        popularActors,
        comingSoon,
        imagify,
        sluggify,
        getPopularActors,
        getComingSoon,
        getMovieCredit,
        // setWatchlist,
        // getWatchlist,
        getMovies,
        getTvShows,
        getGenres,
        getGenre,
        toggleSearch,
        setResults,
        setLoading,
        addResults,
      }}
    >
      {children}
    </MovieContext.Provider>
  )
}

export default MovieContextProvider
