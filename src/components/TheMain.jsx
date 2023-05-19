import React from "react"

const TheMain = () => {
  return (
    <main>
      <div className="container">
        <div>
          <h1>Make your party fun!</h1>

          <p>Create your own playlist today.</p>

          <button>Create playlist</button>
        </div>
      </div>

      <div className="song-container">
        <h3>Trending songs</h3>

        <div className="song-list">
          <button className="song">
            Unavailable by <span className="artist-name">Davido</span>{" "}
            <span className="plus">+</span>
          </button>
          <button className="song">
            Unavailable by <span className="artist-name">Davido</span>{" "}
            <span className="plus">+</span>
          </button>
          <button className="song">
            Unavailable by <span className="artist-name">Davido</span>{" "}
            <span className="plus">+</span>
          </button>
          <button className="song">
            Unavailable by <span className="artist-name">Davido</span>{" "}
            <span className="plus">+</span>
          </button>
          <button className="song">
            Unavailable by <span className="artist-name">Davido</span>{" "}
            <span className="plus">+</span>
          </button>

          <button className="view-more">View more</button>
        </div>
      </div>
    </main>
  )
}

export default TheMain
