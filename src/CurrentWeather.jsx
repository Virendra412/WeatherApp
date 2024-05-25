import { useState } from "react";
import { getcurtime,EmojiSeter } from "./utils";
function CurrentWeather({ information }) {
    const curWeather = information.current;
    const [timing, setTiming] = useState(getcurtime);
    const direction = curWeather.wind_direction_10m?`${curWeather.wind_direction_10m-90}deg`:`${-90}deg`;
    setInterval(() => {
        setTiming(getcurtime())
    },100)
    return (
        <>
             <div className="currentWeather">
            <h4>Current Weather</h4>
                <p className="cur_time">{timing}</p>
            <div className="temp_indicator">
                <img src={EmojiSeter(curWeather.is_day,curWeather.cloud_cover)[0]} alt=""/>
                    <h1>{curWeather.temperature_2m}°C</h1>
            </div>
            <div className="labels">
                
                <div className="items">
                    <p>Wind Speed</p>
                    <p>{curWeather.wind_speed_10m} km/h<span className="windDirection" style={{rotate:direction}}>➤</span></p>
                </div>
                <div className="items">
                    <p>Humidity</p>
                    <p>{curWeather.relative_humidity_2m}%</p>
                </div>
                <div className="items">
                    <p>Feels Like</p>
                    <p>{curWeather.apparent_temperature}°C</p>
                </div>
                <div className="items">
                    <p>Percipitation</p>
                    <p>{curWeather.precipitation}%</p>
                </div>
            </div>

            </div>
            
        </>
    )
}
export default CurrentWeather;