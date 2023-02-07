import React from "react"
import Flickity from "react-flickity-component"
import "flickity/dist/flickity.min.css"
import "flickity-as-nav-for"
import "./style.css"

const Flick = () => {
  return (
    <>
      <Flickity className="carousel-main">
        <div className="carousel-cell" />
        <div className="carousel-cell" />
        <div className="carousel-cell" />
        <div className="carousel-cell" />
        <div className="carousel-cell" />
        <div className="carousel-cell" />
        <div className="carousel-cell" />
        <div className="carousel-cell" />
        <div className="carousel-cell" />
        <div className="carousel-cell" />
      </Flickity>

      
      <Flickity
        className="carousel-nav"
        options={{
          asNavFor: ".carousel-main",
          contain: true,
          pageDots: false,
        }}
      >
        <div className="carousel-cell-1" />
        <div className="carousel-cell-1" />
        <div className="carousel-cell-1" />
        <div className="carousel-cell-1" />
        <div className="carousel-cell-1" />
        <div className="carousel-cell-1" />
        <div className="carousel-cell-1" />
        <div className="carousel-cell-1" />
        <div className="carousel-cell-1" />
        <div className="carousel-cell-1" />
      </Flickity>

    
    </>
  )
}

export default Flick
