import {useEffect, useState } from "react";
import { Geocoding, getWeatherInfo, placeAutoComplete,debouncer, geocoding2 } from "./utils.js";
import ser from "./assets/searchIcon.png"
import {v4 as uuid} from "uuid"


function Navbar({
  citydata,
  temp = "20",
  infoChanger,
  CitySeter,
  information,
  loading,
  errorHandler,
  cordinateSeter,
}) {
  const [searchText, setSearchText] = useState("");
  const [autoCity, setAutoCity] = useState()
  const [suggestionLoader, setSuggestionLoader]=useState(false)

 


  async function handlechange(evt) {
   
    
  
    const val = evt.target.value;
    setAutoCity(null)
   setSearchText(val);
   
  
       
      
}

  useEffect(() => {
    
    const timeout = setTimeout(async () => {
      if (searchText.length > 2) {
        setSuggestionLoader(true)
        const suggestion = await placeAutoComplete(searchText)
        setAutoCity(suggestion)
        setSuggestionLoader(false)
      }
     },700)
  
 

    return ()=>clearTimeout(timeout)
  },[searchText])
 
 

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (searchText) {
        loading(true);

        const res = await Geocoding(searchText);

        const data = await getWeatherInfo(res[0].latitude, res[0].longitude);
        loading(false);
        
        cordinateSeter([res[0].latitude, res[0].longitude]);
        CitySeter({
          city: res[0].name,
          state: res[0].admin1,
          country: res[0].country,
        });
        infoChanger(data);
        setSearchText("");
      }
    } catch {
      errorHandler(true);
    }
  }
   async function handleSuggestionClick(suggestionObj) {
    try{
      loading(true);
      
      // setSearchText(city);
      const res = await geocoding2(suggestionObj.lat, suggestionObj.lon);
      const data = await getWeatherInfo(suggestionObj.lat, suggestionObj.lon);
      console.log(res);
      loading(false);
      
      cordinateSeter([suggestionObj.lat, suggestionObj.lon]);
      CitySeter({
        city: res.address_line1,
        state: res.state,
        country: res.country,
      });
      infoChanger(data);
      setSearchText("");
     }
    catch (error) {
      
      errorHandler(true);
     }
  }
 

  return (
    <>
     
      <nav>
        <div className="logo">Weather </div>
        <div className="searchSection">
        <div className="suggestion">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter City"
            name="searchText"
            id="searchText"
                value={searchText}
                autoComplete="off"
            onChange={handlechange}
            />
            <button><img src={ser} /></button>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" style={{opacity:suggestionLoader?1:0}}>
          <circle
            fill="grey"
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
            fill="grey"
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
            fill="grey"
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
         </form>
          <div className="suggestionlist">
          
            {autoCity?.map((ob) => {
              return (
                <div className="sitems" onClick={()=>{handleSuggestionClick(ob)}} key={uuid()}>
                  <p className="scity">{ob.city}</p>
                  <p className="sstate">{ob.state}, {ob.country }</p>
             </div>
            )
          })}
          
            {/* <div className="sitems">
              <p className="scity">Jhansi</p>
              <p className="sstate">Uttarpradesh, India</p>
           </div>
            <div className="sitems">
              <p className="scity">Jhansi</p>
              <p className="sstate">Uttarpradesh, India</p>
           </div>
            <div className="sitems">
              <p className="scity">Jhansi</p>
              <p className="sstate">Uttarpradesh, India</p>
           </div> */}
            
          </div>
          </div>
        <div className="loc_temp">
          <p>{citydata.city}</p>
          <p>
            <img src="https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/Haze.svg" />
            {temp}°C
          </p>
          </div>
          </div>
      </nav>
<div className="main">
      <div className="location">
        <svg
          baseProfile="tiny"
          height="24px"
          id="Layer_1"
          version="1.2"
          viewBox="0 0 24 24"
          width="24px"
          fill="white"
        >
          <path d="M12,3c0,0-6.186,5.34-9.643,8.232C2.154,11.416,2,11.684,2,12c0,0.553,0.447,1,1,1h2v7c0,0.553,0.447,1,1,1h3  c0.553,0,1-0.448,1-1v-4h4v4c0,0.552,0.447,1,1,1h3c0.553,0,1-0.447,1-1v-7h2c0.553,0,1-0.447,1-1c0-0.316-0.154-0.584-0.383-0.768  C18.184,8.34,12,3,12,3z" />
        </svg>
        <p>
          {citydata.city}, {citydata.state}, {citydata.country}
        </p>
      </div>
      </div>
    </>
  );
}
export default Navbar;
