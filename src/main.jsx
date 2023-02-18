import React from "react"
import axios from "axios"
import ReactDOM from "react-dom/client"

import App from "./App"
import "./index.css"

window.axios = axios
window.image_url = "https://image.tmdb.org/t/p/original"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
