import { useState } from 'react'
import WeatherComponent from '../Components/weathercomponent'

function App() {

  return (
    <>
      <WeatherComponent apiKey="b0b80ecb1ac34990a46201357242012" BG='linear-gradient(135deg, #6e8efb, #a777e3)'/>
    </>
  )
}

export default App
