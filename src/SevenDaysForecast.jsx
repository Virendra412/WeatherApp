import { useState,useEffect,useRef } from "react";
import Hourly from "./Hourly";
import {classRemover} from "./utils"
import CurrentWeather from "./CurrentWeather";

function SevenDays({ information }) {
    const [hourData, setHourData] = useState(information.hourlyData[0]) 

    useEffect(() => {
        setHourData(information.hourlyData[0])
    },[information])
    
    function hourlyDataChanger(ind) {
        setHourData(information.hourlyData[ind])
        classRemover(ind)
     }
    const sData = information.DailyData;
    
    return (<>
        <div className="SevenDays">
        <p>7 Days Forecast</p>
        <div className="daysContainer">
                {sData.map((v, i) => {
                    const cls=`daysCards ${i==0?"isActive":""}`
                    return (
                        <div className={cls} key={i} onClick={()=>{hourlyDataChanger(i)}}>
                        <div className="left">
                                <p>{v.time}</p>
                        <img  src="https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/SunnyDayV3.svg" />
                    </div>
                    <div className="right">
                                <p >{v.max_temp}°</p>
                                <p >{v.min_temp}°</p>
                    </div>
                    </div>
                    )
           })}
           
        </div>
        </div>
        <Hourly data={hourData} />
        </>
    )
}
export default SevenDays;