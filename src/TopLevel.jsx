import { useState, useEffect } from "react";
import { getWeatherInfo } from "./utils.js";
import Navbar from "./Navbar";
import CurrentWeather from "./CurrentWeather";

import SevenDays from "./SevenDaysForecast.jsx";
import Map from "./Map.jsx";

function WeatherWebsite() {
  const [city, setCity] = useState({
    city: "Delhi",
    state: "Delhi",
    country: "India",
  });
  const [laoding, setloading] = useState(true);
  const [info, setInfo] = useState();
  const [err, seterr] = useState(false);
  const [cordinate, setCordinate] = useState(["28.7041", "77.1025"]);

  useEffect(() => {
    async function handlecha() {
      try {
        const res = await getWeatherInfo("28.7041", "77.1025");
        
        console.log("getting city data");
        setInfo(res);
        setloading(false);
      } catch (e) {
        console.log(e);
        seterr(true);
      }
    }
    handlecha();
  }, []);


  function refreshPage() {
    window.location.reload(false);
  }

  if (err) {
    return (
      <>
        <div className="errorPage" style={{ textAlign: "center", background:"black"}}>
          Something went Wrong!!!! <br /> Cannot load Data
          <button onClick={refreshPage}>Refresh</button>
        </div>
      </>
    );
  }
  if (laoding) {
    return (
      <div className="loader" style={{ opacity: 1 }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
          <circle
            fill="white"
            stroke="%230ED1FF"
            strokeWidth="15"
            r="15"
            cx="40"
            cy="65"
          >
            <animate
              attributeName="cy"
              calcMode="spline"
              dur="2"
              values="65;135;65;"
              keySplines=".5 0 .5 1;.5 0 .5 1"
              repeatCount="indefinite"
              begin="-.4"
            ></animate>
          </circle>
          <circle
            fill="white"
            stroke="%230ED1FF"
            strokeWidth="15"
            r="15"
            cx="100"
            cy="65"
          >
            <animate
              attributeName="cy"
              calcMode="spline"
              dur="2"
              values="65;135;65;"
              keySplines=".5 0 .5 1;.5 0 .5 1"
              repeatCount="indefinite"
              begin="-.2"
            ></animate>
          </circle>
          <circle
            fill="white"
            stroke="%230ED1FF"
            strokeWidth="15"
            r="15"
            cx="160"
            cy="65"
          >
            <animate
              attributeName="cy"
              calcMode="spline"
              dur="2"
              values="65;135;65;"
              keySplines=".5 0 .5 1;.5 0 .5 1"
              repeatCount="indefinite"
              begin="0"
            ></animate>
          </circle>
        </svg>
      </div>
    );
  }


  function infoChanger(info) {
    setInfo(info);
  }
  function CitySeter(d) {
    setCity(d);
  }

  

  return (
    <div className="superior"   >
      
      
      <Navbar
        infoChanger={infoChanger}
        citydata={city}
        temp={info.current.temperature_2m}
        CitySeter={CitySeter}
        information={info}
        loading={setloading}
        errorHandler={seterr}
        cordinateSeter={setCordinate}
      />
      <div className="main">
      <div id="wrapper">
        <SevenDays information={info} />
        <CurrentWeather information={info} />

          <Map cord={cordinate} />
          </div>
      </div>
    </div>
  );
}
export default WeatherWebsite;
