import { createSlice } from "@reduxjs/toolkit"

const movieSlice = createSlice({
  name: "movie",
  initialState: {
    value: {
      name: "caleb",
      movies: [],
      genres: [],
      genreUrl:
        "http://api.themoviedb.org/3/genre/movie/list?api_key=7316fba02f75311274d240dc8ac61a66",
      options: {
        method: "GET",
        url: "https://api.themoviedb.org/3/movie/popular?api_key=7316fba02f75311274d240dc8ac61a66",
      },
      IMAGE_URL: "https://image.tmdb.org/t/p/original/",
    },
  },
  reducers: {
     getGenre: (state, action) => {
      return state.value.genres?.find(genre => action.payload == genre.id)["name"]
    },
    getMovies: async (state, action) => {
      await axios
        .request(state.value.options)
        .then(function (response) {
          let data = response.data.results
          data.forEach(movie => {
            let slug = movie.original_title
              .replaceAll(" ", "-")
              .replaceAll(":", "")
              .replaceAll(",", "")
              .toLowerCase()
            movie.poster_path = state.value.IMAGE_URL + movie.poster_path
            movie.backdrop_path = state.value.IMAGE_URL + movie.backdrop_path
            Object.assign(movie, { slug })
          })
          state.value.movies = [...data]
          localStorage.setItem("movies", JSON.stringify([...data]))
        })
        .catch(function (error) {
          console.error(error)
        })
    },

    getGenres: async (state, action) => {
      await axios
        .get(state.value.genreUrl)
        .then(function (response) {
          console.log(response.data)
          state.value.genres = [...response.data.genres]
          localStorage.setItem(
            "genres",
            JSON.stringify([...response.data.genres])
          )
        })
        .catch(function (error) {
          console.error(error)
        })
    },
  },
})

export const { getMovies, getGenres, getGenre } = movieSlice.actions

export default movieSlice.reducer
