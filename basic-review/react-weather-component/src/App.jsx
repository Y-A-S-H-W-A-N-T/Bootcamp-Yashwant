import { useState } from 'react'
import WeatherComponent from '../Components/weathercomponent'

function App() {

  return (
    <>
      <h2>
      Reusable React weather Components 
      <a href="../notes.html"> Read About this Component</a>
      </h2>
      <WeatherComponent apiKey="b0b80ecb1ac34990a46201357242012" BG='linear-gradient(135deg, #6e8efb, #a777e3)'/>
    </>
  )
}

export default App
