import React, { createContext, useState } from "react"

export const MovieContext = createContext()

const MovieContextProvider = ({ children }) => {
  const localGenres = localStorage.genres ? JSON.parse(localStorage.genres) : []
  const localMovies = localStorage.movies ? JSON.parse(localStorage.movies) : []
  const localWatchlist = localStorage.watchlist 
    ? JSON.parse(localStorage.watchlist)
    : []

  const data = {
    number: localStorage.movies ? JSON.parse(localStorage.movies) : [],
    searchResults: [],
    loading: false,
    genreUrl:
      "https://api.themoviedb.org/3/genre/movie/list?api_key=7316fba02f75311274d240dc8ac61a66",
    options: {
      method: "GET",
      url: "https://api.themoviedb.org/3/movie/popular?api_key=7316fba02f75311274d240dc8ac61a66",
    },
    image_url: "https://image.tmdb.org/t/p/original/",
  }

  const [movieData] = useState(data)
  const [genres, setGenres] = useState(localGenres)
  const [movies, setMovies] = useState(localMovies)
  const [results, setResults] = useState([])
  const [watchlist, setWatchlist] = useState(localWatchlist)

  const [movie] = useState([])

  const getGenre = id => {
    return genres?.find(genre => id == genre.id).name
  }

  const getMovies = async () => {
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
      })
      .catch(error => {
        console.error(error)
      })
  }

  const sluggify = name =>
    name
      .replaceAll(" ", "-")
      .replaceAll(":", "")
      .replaceAll(",", "")
      .toLowerCase()

  const getGenres = async () => {
    await axios
      .get(movieData.genreUrl)
      .then(response => {
        console.log(response.data)
        setGenres([...response.data.genres])
        localStorage.setItem(
          "genres",
          JSON.stringify([...response.data.genres])
        )
      })
      .catch(error => {
        console.error(error)
      })
  }

  const getWatchlist = async () => {
    if (!watchlist.length)
      await axios
        .get(
          "https://api.themoviedb.org/3/movie/now_playing?api_key=7316fba02f75311274d240dc8ac61a66&language=en-US&page=1"
        )
        .then(res => {
          let data = res.data.results
          data.forEach(movie => {
            let slug = sluggify(movie.original_title)
            movie.poster_path = movieData.image_url + movie.poster_path
            movie.backdrop_path = movieData.image_url + movie.backdrop_path
            Object.assign(movie, { slug })
          })
          setWatchlist([...data])
          localStorage.setItem("watchlist", JSON.stringify(data))
        })
        .catch(err => err.message)
  }

  const setLoading = () => {
    console.log(action.payload)
    loading = action.payload
  }
  const addResults = results => {
    setResults([...results])
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

  return (
    <MovieContext.Provider
      value={{
        movies,
        genres,
        results,
        movieData,
        watchlist,
        setWatchlist,
        getWatchlist,
        getMovies,
        getGenres,
        getGenre,
        toggleSearch,
        setLoading,
        setResults,
        addResults,
      }}
    >
      {children}
    </MovieContext.Provider>
  )
}

export default MovieContextProvider
