import React from 'react'
import axios from 'axios'
import ReactDOM from 'react-dom/client'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'

import App from './App'
import './index.css'
import movieReducer from './features/movie'

window.axios = axios

const store = configureStore({
  reducer: {
    movie: movieReducer
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App/>
    </Provider>
  </React.StrictMode>,
)
