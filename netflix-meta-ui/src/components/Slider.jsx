import React from 'react'
import CardSlider from './CardSlider'

export default function Slider({ movies }) {
  const getMoviesFromRange=(from,to)=>{
    return movies.slice(from,to)
  }

  return (
    <div>
      <CardSlider title = "Trending Now" data={getMoviesFromRange(0,3)}/>
      <CardSlider title = "New Releases" data={getMoviesFromRange(0,3)}/>
      <CardSlider title = "Blockbuster Movies" data={getMoviesFromRange(0,3)}/>
      <CardSlider title = "Popular On Netflix" data={getMoviesFromRange(0,3)}/>
      <CardSlider title = "Action Movies" data={getMoviesFromRange(0,3)}/>
      <CardSlider title = "Epics" data={getMoviesFromRange(0,3)}/>
    </div>
  )
}
