import { useEffect, useState } from 'react'
import './App.css'

function App() {

  const [ weather, setWeather] = useState({
    temp : '',
    desc: '',
    icon: '',
  });

  useEffect(() => {
    fetch()
    .then(response => response.json())
    .then(result => {
      setWeather({
        temp : result.main.temp,
        desc : result.weather[0].description,
        icon : result.weather[0].icon,
      })
    })
    .catch(error => console.log(error))
  },[]);



  if(weather.icon){
  return (
    <>
    <p>기온 : {weather.temp}</p>
    <p>설명 : {weather.desc}</p>
    <img src = {`https://openweathermap.org/img/wn/${weather.icon}@2x.png`} alt="alt" />
    </>
  )
}
else {
  return <div>Loding</div>
}
}

export default App
