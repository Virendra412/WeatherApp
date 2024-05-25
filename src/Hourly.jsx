import { v4 as uuid } from "uuid";
// import { Slider } from "./utils";
import { useState, useRef, useEffect } from "react";
import { displayDate } from "./utils";

function Hourly({ data }) {
    const [arrowR,setArrowR]=useState(true)
    const [arrowL,setArrowL]=useState(false)
    const [clicked, setClicked] = useState(0);
   
    const container = useRef();
    
    useEffect(() => {
        if (clicked > 0) {
            setClicked(0)
        }
        crousel()
    },[data])


    function crousel() {
      if (container.current) {
        const el = container.current;
        const maxTransformRange = 2880 - el.offsetWidth;
        console.log(el.offsetWidth);
        if (maxTransformRange > 360 * clicked) {
          el.style.transform = `translateX(-${clicked * 360}px)`;
        } else {
          el.style.transform = `translateX(-${maxTransformRange}px)`;
        }
      }
    }
    crousel()
    

    function incre() {
        
        if (clicked <7 ) {
            setClicked((prev) => prev + 1);
        }
        
       
        setArrowL(true)
      
  }
    function decre() {
       
      setClicked((prev) => {
          if (prev > 0) {
              return prev - 1;
          }
          else {
            setArrowL(false)
              return prev
              
          }
          
    });
  }
// console.log(data);
  return (
    <div className="hourly">
      <span className="leftarrow" id="arrow" onClick={decre} style={{display:arrowL?"inline-block":"none"}}>
        ◂
      </span>
      <span className="rightarrow" id="arrow" onClick={incre} style={{display:arrowR?"inline-block":"none"}}>
        ▸
      </span>
      <h4>HOURLY</h4>
      <div className="hourlyContainer" ref={container}>
        {data.map((val,ind) => {
          const direction = val.wind_direction
            ? `${val.wind_direction - 90}deg`
            : `${-90}deg`;

          return (
            <div className="cards" key={uuid()}>
              <img className="cardImg" src={val.imageurl} alt="" />
              <p className="cardItem cardTemp">{val.temp}°C</p>
              <p className="cardItem cardCondition">{val.condition}</p>
              <p className="cardItem cardRain">💧 {val.precipitation}%</p>
              <p className="cardItem cardWind">
                {val.windSpeed} km/h{" "}
                <span className="windDirection" style={{ rotate: direction }}>
                  ➤
                </span>
              </p>
              <p className=" cardTime">
                {displayDate(data,ind)?`${val.time.time} - ${val.time.date}`:`${val.time.time}` }
                
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default Hourly;
