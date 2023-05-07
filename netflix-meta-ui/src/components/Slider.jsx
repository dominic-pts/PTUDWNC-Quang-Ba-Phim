import React from 'react'
import CardSlider from './CardSlider'

export default function Slider({ movies }) {
  const getMoviesFromRange=(from,to)=>{
    return movies.slice(from,to)
  }

  return (
    <div>
      <CardSlider title = "Trending Now" data={getMoviesFromRange(0,6)}/>
      <CardSlider title = "New Releases" data={getMoviesFromRange(6,9)}/>
      <CardSlider title = "Blockbuster Movies" data={getMoviesFromRange(9,15)}/>
      <CardSlider title = "Popular On Netflix" data={getMoviesFromRange(15,21)}/>
      <CardSlider title = "Action Movies" data={getMoviesFromRange(21,30)}/>
    </div>
  )
}
