import axios from "axios";


async function getWeatherInfo(lat, long) {
  const quo = await axios
    .get(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,cloud_cover,wind_speed_10m,wind_direction_10m&hourly=temperature_2m,precipitation,cloud_cover,wind_speed_10m,wind_direction_10m,is_day&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,sunrise,sunset&timezone=auto&forecast_days=7&forecast_hours=191`
    )
    .then((res) => {
      // console.log(res.data);
      return res.data;
    })
    .catch((e) => {
      console.log(e.message);
      return e;
    });

  const hourlyData = filterHourlyData(quo.hourly);

  const DailyData = filterDailyData(quo.daily);
  //  console.log({current:quo.current ,hourlyData,DailyData, isLoading:false});
 
  return { current: quo.current, hourlyData, DailyData, isLoading: false };
 
}

// getWeatherInfo("28.7041", "77.1025")

function getTimeandDate(x) {
  const d = new Date(x);
  // const ob = d.toLocaleTimeString('hi-IN', { timeZone: 'IST' }).toUpperCase()
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const timeArray = [
    "12 AM",
    "1 AM",
    "2 AM",
    "3 AM",
    "4 AM",
    "5 AM",
    "6 AM",
    "7 AM",
    "8 AM",
    "9 AM",
    "10 AM",
    "11 AM",
    "12 PM",
    "1 PM",
    "2 PM",
    "3 PM",
    "4 PM",
    "5 PM",
    "6 PM",
    "7 PM",
    "8 PM",
    "9 PM",
    "10 PM",
    "11 PM",
    "12 AM",
  ];
  const timing = {
    date: `${d.getDate()} ${months[d.getMonth()]}`,
    time: `${timeArray[d.getHours()]}`,
  };
  return timing;
}

async function Geocoding(city) {
 return await axios
    .get(
      `https://geocoding-api.open-meteo.com/v1/search?name=${city}&country=india&count=1&language=en&format=json`
    )
    .then((res) => res.data.results)
    .catch((e) => {
      console.log(e.message);
      return e
    });

 
}

function getcurtime() {
  const d = new Date();
  return d.toLocaleTimeString().toUpperCase();
}

function timematcher(x) {
  const cur = new Date().getTime();
  let curInd = 0;
  x.forEach((v, ind) => {
    const dif = (cur - new Date(v).getTime()) / 60000;
    if (dif < 60 && dif > 0) {
      curInd = ind;
    }
  });

  return curInd;
}

const filterData = {
  latitude: 28.75,
  longitude: 77.125,
  generationtime_ms: 0.13303756713867188,
  utc_offset_seconds: 19800,
  timezone: "Asia/Kolkata",
  timezone_abbreviation: "IST",
  elevation: 222,
  current_units: {
    time: "iso8601",
    interval: "seconds",
    temperature_2m: "°C",
    relative_humidity_2m: "%",
    apparent_temperature: "°C",
    is_day: "",
    precipitation: "mm",
    cloud_cover: "%",
    wind_speed_10m: "km/h",
    wind_direction_10m: "°",
  },
  current: {
    time: "2024-03-18T08:30",
    interval: 900,
    temperature_2m: 17.5,
    relative_humidity_2m: 73,
    apparent_temperature: 17.9,
    is_day: 1,
    precipitation: 0,
    cloud_cover: 0,
    wind_speed_10m: 3.6,
    wind_direction_10m: 276,
  },
  hourly_units: {
    time: "iso8601",
    temperature_2m: "°C",
    precipitation: "mm",
    cloud_cover: "%",
    wind_speed_10m: "km/h",
    wind_direction_10m: "°",
    is_day: "",
  },
  hourly: {
    time: [
      "2024-03-18T08:00",
      "2024-03-18T09:00",
      "2024-03-18T10:00",
      "2024-03-18T11:00",
      "2024-03-18T12:00",
      "2024-03-18T13:00",
      "2024-03-18T14:00",
      "2024-03-18T15:00",
      "2024-03-18T16:00",
      "2024-03-18T17:00",
      "2024-03-18T18:00",
      "2024-03-18T19:00",
      "2024-03-18T20:00",
      "2024-03-18T21:00",
      "2024-03-18T22:00",
      "2024-03-18T23:00",
      "2024-03-19T00:00",
      "2024-03-19T01:00",
      "2024-03-19T02:00",
      "2024-03-19T03:00",
      "2024-03-19T04:00",
      "2024-03-19T05:00",
      "2024-03-19T06:00",
      "2024-03-19T07:00",
    ],
    temperature_2m: [
      17.5, 21.3, 24.4, 26.8, 28.2, 29, 29.4, 29.3, 28.8, 27.8, 25.2, 22.9,
      21.5, 20.4, 19.4, 18.5, 17.7, 16.9, 16.1, 15.6, 15.2, 14.6, 13.9, 14.6,
    ],
    precipitation: [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    cloud_cover: [
      0, 0, 0, 0, 0, 0, 0, 5, 7, 7, 14, 3, 6, 0, 0, 0, 0, 0, 0, 0, 31, 55, 59,
      0,
    ],
    wind_speed_10m: [
      3.6, 3.6, 5, 5.9, 9.1, 8.8, 8.7, 8.4, 8.4, 7.1, 4.2, 3.7, 3.3, 2.5, 2.6,
      1.8, 2.3, 2.8, 2.8, 3, 2.6, 4.9, 3.9, 0.5,
    ],
    wind_direction_10m: [
      276, 276, 291, 313, 326, 325, 318, 313, 310, 311, 329, 349, 13, 8, 326,
      281, 231, 220, 230, 256, 304, 306, 292, 315,
    ],
    is_day: [
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
    ],
  },
  daily_units: {
    time: "iso8601",
    temperature_2m_max: "°C",
    temperature_2m_min: "°C",
    precipitation_sum: "mm",
  },
  daily: {
    time: [
      "2024-03-18",
      "2024-03-19",
      "2024-03-20",
      "2024-03-21",
      "2024-03-22",
      "2024-03-23",
      "2024-03-24",
    ],
    temperature_2m_max: [29.4, 30.7, 32.2, 33, 34.5, 35.6, 35.8],
    temperature_2m_min: [13.5, 13.9, 13.2, 16.3, 18.7, 17.6, 17.7],
    precipitation_sum: [0, 0, 0, 0, 0, 0, 0],
  },
  isLoading: false,
};
function EmojiSeter(is_day, isCloudy) {
  var condit = [];
  if (is_day) {
    switch (true) {
      case isCloudy < 30:
        condit = [
          "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/SunnyDayV3.svg",
          "Sunny",
        ];
        break;
      default:
        condit = [
          "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/MostlySunnyDay.svg",
          "Cloudy",
        ];
    }
  } else {
    switch (true) {
      case isCloudy < 30:
        condit = [
          "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/ClearNightV3.svg",
          "Clear Night",
        ];

        break;
      default:
        condit = [
          "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/MostlyClearNight.svg",
          "Cloudy Night",
        ];
    }
  }
  return condit;
}

// filterHourlyData(filterData.hourly)
function isToday(x) {
  let foundToday = false;
  let foundTommorow = false;
  const inputdate = new Date(x).getDate();
  const today = new Date().getDate();

  if (!foundToday) {
    console.log(`got first today ${v}`);
    foundToday = true;
  } else if (!foundTommorow) {
    console.log(`got first tommorow ${v}`);
    foundTommorow = true;
  }
}
function Slider() {
  const container = document.querySelector(".hourlyContainer");
  const right = document.querySelector(".rightarrow");
  const left = document.querySelector(".leftarrow");
  left.style.display = "none";

  const maxTransformRange = 2972 - container.offsetWidth;

  var elTransformed = 0;

  right.addEventListener("click", () => {
    if (maxTransformRange - 372 > elTransformed) {
      right.dataset.click = parseInt(right.dataset.click) + 1;
      const click = right.dataset.click;
      container.style.transform = `translateX(${-click * 372}px)`;
      elTransformed = click * 372;
      left.style.display = "inline-block";
    } else {
      container.style.transform = `translateX(-${maxTransformRange}px)`;
      right.style.display = "none";
    }
  });
  left.addEventListener("click", () => {
    if (right.dataset.click >= 1) {
      right.dataset.click = right.dataset.click - 1;
      const click = right.dataset.click;
      container.style.transform = `translateX(${-click * 372}px)`;
      elTransformed = click * 372;
      right.style.display = "block";
    }
    if (right.dataset.click < 1) {
      left.style.display = "none";
    }
  });
}

function filterDailyData(obj) {
  const res = [];
  obj.time.forEach((item, ind) => {
    res.push({
      time: getTimeandDate(item).date,
      max_temp: obj.temperature_2m_max[ind],
      min_temp: obj.temperature_2m_min[ind],
      precipitation: obj.precipitation_sum[ind],
    });
  });
  return res;
}



const test_data = {
  time: [
    "2024-03-26T11:00",
    "2024-03-26T12:00",
    "2024-03-26T13:00",
    "2024-03-26T14:00",
    "2024-03-26T15:00",
    "2024-03-26T16:00",
    "2024-03-26T17:00",
    "2024-03-26T18:00",
    "2024-03-26T19:00",
    "2024-03-26T20:00",
    "2024-03-26T21:00",
    "2024-03-26T22:00",
    "2024-03-26T23:00",
    "2024-03-27T00:00",
    "2024-03-27T01:00",
    "2024-03-27T02:00",
    "2024-03-27T03:00",
    "2024-03-27T04:00",
    "2024-03-27T05:00",
    "2024-03-27T06:00",
    "2024-03-27T07:00",
    "2024-03-27T08:00",
    "2024-03-27T09:00",
    "2024-03-27T10:00",
    "2024-03-27T11:00",
    "2024-03-27T12:00",
    "2024-03-27T13:00",
    "2024-03-27T14:00",
    "2024-03-27T15:00",
    "2024-03-27T16:00",
    "2024-03-27T17:00",
    "2024-03-27T18:00",
    "2024-03-27T19:00",
    "2024-03-27T20:00",
    "2024-03-27T21:00",
    "2024-03-27T22:00",
    "2024-03-27T23:00",
    "2024-03-28T00:00",
    "2024-03-28T01:00",
    "2024-03-28T02:00",
    "2024-03-28T03:00",
    "2024-03-28T04:00",
    "2024-03-28T05:00",
    "2024-03-28T06:00",
    "2024-03-28T07:00",
    "2024-03-28T08:00",
    "2024-03-28T09:00",
    "2024-03-28T10:00",
    "2024-03-28T11:00",
    "2024-03-28T12:00",
    "2024-03-28T13:00",
    "2024-03-28T14:00",
    "2024-03-28T15:00",
    "2024-03-28T16:00",
    "2024-03-28T17:00",
    "2024-03-28T18:00",
    "2024-03-28T19:00",
    "2024-03-28T20:00",
    "2024-03-28T21:00",
    "2024-03-28T22:00",
    "2024-03-28T23:00",
    "2024-03-29T00:00",
    "2024-03-29T01:00",
    "2024-03-29T02:00",
    "2024-03-29T03:00",
    "2024-03-29T04:00",
    "2024-03-29T05:00",
    "2024-03-29T06:00",
    "2024-03-29T07:00",
    "2024-03-29T08:00",
    "2024-03-29T09:00",
    "2024-03-29T10:00",
    "2024-03-29T11:00",
    "2024-03-29T12:00",
    "2024-03-29T13:00",
    "2024-03-29T14:00",
    "2024-03-29T15:00",
    "2024-03-29T16:00",
    "2024-03-29T17:00",
    "2024-03-29T18:00",
    "2024-03-29T19:00",
    "2024-03-29T20:00",
    "2024-03-29T21:00",
    "2024-03-29T22:00",
    "2024-03-29T23:00",
    "2024-03-30T00:00",
    "2024-03-30T01:00",
    "2024-03-30T02:00",
    "2024-03-30T03:00",
    "2024-03-30T04:00",
    "2024-03-30T05:00",
    "2024-03-30T06:00",
    "2024-03-30T07:00",
    "2024-03-30T08:00",
    "2024-03-30T09:00",
    "2024-03-30T10:00",
    "2024-03-30T11:00",
    "2024-03-30T12:00",
    "2024-03-30T13:00",
    "2024-03-30T14:00",
    "2024-03-30T15:00",
    "2024-03-30T16:00",
    "2024-03-30T17:00",
    "2024-03-30T18:00",
    "2024-03-30T19:00",
    "2024-03-30T20:00",
    "2024-03-30T21:00",
    "2024-03-30T22:00",
    "2024-03-30T23:00",
    "2024-03-31T00:00",
    "2024-03-31T01:00",
    "2024-03-31T02:00",
    "2024-03-31T03:00",
    "2024-03-31T04:00",
    "2024-03-31T05:00",
    "2024-03-31T06:00",
    "2024-03-31T07:00",
    "2024-03-31T08:00",
    "2024-03-31T09:00",
    "2024-03-31T10:00",
    "2024-03-31T11:00",
    "2024-03-31T12:00",
    "2024-03-31T13:00",
    "2024-03-31T14:00",
    "2024-03-31T15:00",
    "2024-03-31T16:00",
    "2024-03-31T17:00",
    "2024-03-31T18:00",
    "2024-03-31T19:00",
    "2024-03-31T20:00",
    "2024-03-31T21:00",
    "2024-03-31T22:00",
    "2024-03-31T23:00",
    "2024-04-01T00:00",
    "2024-04-01T01:00",
    "2024-04-01T02:00",
    "2024-04-01T03:00",
    "2024-04-01T04:00",
    "2024-04-01T05:00",
    "2024-04-01T06:00",
    "2024-04-01T07:00",
    "2024-04-01T08:00",
    "2024-04-01T09:00",
    "2024-04-01T10:00",
    "2024-04-01T11:00",
    "2024-04-01T12:00",
    "2024-04-01T13:00",
    "2024-04-01T14:00",
    "2024-04-01T15:00",
    "2024-04-01T16:00",
    "2024-04-01T17:00",
    "2024-04-01T18:00",
    "2024-04-01T19:00",
    "2024-04-01T20:00",
    "2024-04-01T21:00",
    "2024-04-01T22:00",
    "2024-04-01T23:00",
    "2024-04-02T00:00",
    "2024-04-02T01:00",
    "2024-04-02T02:00",
    "2024-04-02T03:00",
    "2024-04-02T04:00",
    "2024-04-02T05:00",
    "2024-04-02T06:00",
    "2024-04-02T07:00",
    "2024-04-02T08:00",
    "2024-04-02T09:00",
    "2024-04-02T10:00",
    "2024-04-02T11:00",
    "2024-04-02T12:00",
    "2024-04-02T13:00",
    "2024-04-02T14:00",
    "2024-04-02T15:00",
    "2024-04-02T16:00",
    "2024-04-02T17:00",
    "2024-04-02T18:00",
    "2024-04-02T19:00",
    "2024-04-02T20:00",
    "2024-04-02T21:00",
    "2024-04-02T22:00",
    "2024-04-02T23:00",
    "2024-04-03T00:00",
    "2024-04-03T01:00",
    "2024-04-03T02:00",
    "2024-04-03T03:00",
    "2024-04-03T04:00",
    "2024-04-03T05:00",
    "2024-04-03T06:00",
    "2024-04-03T07:00",
    "2024-04-03T08:00",
    "2024-04-03T09:00",
  ],
  temperature_2m: [
    27.5, 29.4, 30.5, 32.2, 33.4, 33.8, 33.5, 32.5, 29.7, 27.2, 25.7, 25, 24.7,
    24.2, 23.5, 22.8, 22.1, 21, 20.3, 20, 20, 20.8, 23.5, 27.2, 30.5, 32.9,
    34.5, 35.5, 36, 36, 35.5, 34.4, 32, 29.3, 27.5, 26.2, 25.2, 24.3, 23.7,
    23.3, 22.8, 22.3, 21.8, 21.1, 20.5, 21.5, 24.3, 27.1, 29.9, 32.6, 35.2,
    37.1, 37.9, 37.8, 37.2, 36.1, 33.4, 30.7, 29.1, 27.9, 26.9, 26.2, 25.3,
    24.5, 23.8, 23, 22.5, 22.2, 22.2, 23, 25.4, 28.4,
  ],
  precipitation: [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ],
  cloud_cover: [
    100, 100, 100, 72, 13, 71, 2, 32, 97, 80, 100, 100, 100, 48, 100, 4, 20, 98,
    91, 78, 100, 99, 100, 34, 0, 0, 0, 0, 38, 17, 0, 0, 0, 0, 90, 96, 100, 100,
    100, 100, 34, 54, 100, 77, 46, 85, 55, 100, 98, 80, 23, 41, 54, 98, 100,
    100, 98, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 89, 75, 68,
    66,
  ],
  wind_speed_10m: [
    5.9, 6.9, 7.3, 8, 9.1, 9.2, 9.8, 8.4, 5.4, 5.5, 4.1, 3.2, 2.9, 3.6, 3.7,
    2.9, 3.3, 4.5, 4, 4, 3.1, 3.1, 4, 4.2, 5.2, 8, 9.2, 10.7, 11.5, 12.2, 12.7,
    11, 5.9, 4.8, 4.6, 4.8, 4.9, 5.2, 5.2, 4.8, 4.7, 4.6, 4.3, 4.3, 4.2, 4.4,
    6.2, 7.4, 7.1, 6.7, 7.1, 7.4, 6.8, 7.1, 7.6, 6.6, 6.8, 7.3, 5.9, 5.2, 6.2,
    6.1, 4.6, 3.5, 3.3, 3.3, 2.9, 1.8, 1.5, 2.1, 1.9, 1.6,
  ],
  wind_direction_10m: [
    259, 276, 279, 297, 304, 309, 324, 329, 8, 11, 15, 27, 7, 6, 349, 330, 264,
    256, 270, 270, 291, 291, 297, 301, 304, 306, 312, 312, 311, 313, 313, 311,
    322, 318, 315, 312, 324, 335, 326, 312, 328, 342, 336, 275, 250, 261, 263,
    284, 300, 324, 319, 317, 328, 330, 341, 347, 360, 9, 14, 12, 7, 360, 18, 24,
    6, 347, 360, 11, 14, 301, 292, 297,
  ],
  is_day: [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1,
  ],
};

function geetDate(x) {
  return new Date(x).getDate();
}

function Last_sixDaysIndex(arr) {
  var currentDate = new Date().getDate() + 1;
  const indexArr = [];
  arr.time.forEach((val, index) => {
    if (geetDate(val) == currentDate) {
      indexArr.push(index);
      if (currentDate == 31) {
        currentDate = 1;
      } else {
        currentDate += 1;
      }
    }
  });
  return indexArr.slice(0, 6);
}

function filterHourlyData(ob) {
  let filterRes = [];
  (() => {
    const today = [];
    for (let i = 0; i <= 23; i++) {
      today.push({
        time: getTimeandDate(ob.time[i]),
        temp: ob.temperature_2m[i],
        precipitation: ob.precipitation[i],
        windSpeed: ob.wind_speed_10m[i],
        wind_direction: ob.wind_direction_10m[i],
        imageurl: EmojiSeter(ob.is_day[i], ob.cloud_cover[i])[0],
        condition: EmojiSeter(ob.is_day[i], ob.cloud_cover[i])[1],
      });
    }
    filterRes.push(today);
  })();

  Last_sixDaysIndex(ob).forEach((v, ind) => {
    (() => {
      const day = [];
      for (let i = v; i <= v + 23; i++) {
        day.push({
          time: getTimeandDate(ob.time[i]),
          temp: ob.temperature_2m[i],
          precipitation: ob.precipitation[i],
          windSpeed: ob.wind_speed_10m[i],
          wind_direction: ob.wind_direction_10m[i],
          imageurl: EmojiSeter(ob.is_day[i], ob.cloud_cover[i])[0],
          condition: EmojiSeter(ob.is_day[i], ob.cloud_cover[i])[1],
        });
      }
      filterRes.push(day);
    })();
  });

  return filterRes;
}

const dddd = {
  current: {
    time: "2024-03-26T12:30",
    interval: 900,
    temperature_2m: 30.5,
    relative_humidity_2m: 41,
    apparent_temperature: 31.9,
    is_day: 1,
    precipitation: 0,
    cloud_cover: 100,
    wind_speed_10m: 7.3,
    wind_direction_10m: 279,
  },
  hourlyData: [
    [
      {
        time: {
          date: "26 Mar",
          time: "12 PM",
        },
        temp: 30.5,
        precipitation: 0,
        windSpeed: 7.3,
        wind_direction: 279,
        imageurl:
          "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/MostlySunnyDay.svg",
        condition: "Cloudy",
      },
      {
        time: {
          date: "26 Mar",
          time: "1 PM",
        },
        temp: 32.2,
        precipitation: 0,
        windSpeed: 8,
        wind_direction: 297,
        imageurl:
          "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/MostlySunnyDay.svg",
        condition: "Cloudy",
      },
      {
        time: {
          date: "26 Mar",
          time: "2 PM",
        },
        temp: 33.4,
        precipitation: 0,
        windSpeed: 9.1,
        wind_direction: 304,
        imageurl:
          "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/SunnyDayV3.svg",
        condition: "Sunny",
      },
      {
        time: {
          date: "26 Mar",
          time: "3 PM",
        },
        temp: 33.8,
        precipitation: 0,
        windSpeed: 9.2,
        wind_direction: 309,
        imageurl:
          "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/MostlySunnyDay.svg",
        condition: "Cloudy",
      },
      {
        time: {
          date: "26 Mar",
          time: "4 PM",
        },
        temp: 33.5,
        precipitation: 0,
        windSpeed: 9.8,
        wind_direction: 324,
        imageurl:
          "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/SunnyDayV3.svg",
        condition: "Sunny",
      },
      {
        time: {
          date: "26 Mar",
          time: "5 PM",
        },
        temp: 32.5,
        precipitation: 0,
        windSpeed: 8.4,
        wind_direction: 329,
        imageurl:
          "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/MostlySunnyDay.svg",
        condition: "Cloudy",
      },
      {
        time: {
          date: "26 Mar",
          time: "6 PM",
        },
        temp: 29.7,
        precipitation: 0,
        windSpeed: 5.4,
        wind_direction: 8,
        imageurl:
          "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/MostlySunnyDay.svg",
        condition: "Cloudy",
      },
      {
        time: {
          date: "26 Mar",
          time: "7 PM",
        },
        temp: 27.2,
        precipitation: 0,
        windSpeed: 5.5,
        wind_direction: 11,
        imageurl:
          "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/MostlyClearNight.svg",
        condition: "Cloudy Night",
      },
      {
        time: {
          date: "26 Mar",
          time: "8 PM",
        },
        temp: 25.7,
        precipitation: 0,
        windSpeed: 4.1,
        wind_direction: 15,
        imageurl:
          "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/MostlyClearNight.svg",
        condition: "Cloudy Night",
      },
      {
        time: {
          date: "26 Mar",
          time: "9 PM",
        },
        temp: 25,
        precipitation: 0,
        windSpeed: 3.2,
        wind_direction: 27,
        imageurl:
          "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/MostlyClearNight.svg",
        condition: "Cloudy Night",
      },
      {
        time: {
          date: "26 Mar",
          time: "10 PM",
        },
        temp: 24.7,
        precipitation: 0,
        windSpeed: 2.9,
        wind_direction: 7,
        imageurl:
          "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/MostlyClearNight.svg",
        condition: "Cloudy Night",
      },
      {
        time: {
          date: "26 Mar",
          time: "11 PM",
        },
        temp: 24.2,
        precipitation: 0,
        windSpeed: 3.6,
        wind_direction: 6,
        imageurl:
          "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/MostlyClearNight.svg",
        condition: "Cloudy Night",
      },
      {
        time: {
          date: "27 Mar",
          time: "12 AM",
        },
        temp: 23.5,
        precipitation: 0,
        windSpeed: 3.7,
        wind_direction: 349,
        imageurl:
          "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/MostlyClearNight.svg",
        condition: "Cloudy Night",
      },
      {
        time: {
          date: "27 Mar",
          time: "1 AM",
        },
        temp: 22.8,
        precipitation: 0,
        windSpeed: 2.9,
        wind_direction: 330,
        imageurl:
          "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/ClearNightV3.svg",
        condition: "Clear Night",
      },
      {
        time: {
          date: "27 Mar",
          time: "2 AM",
        },
        temp: 22.1,
        precipitation: 0,
        windSpeed: 3.3,
        wind_direction: 264,
        imageurl:
          "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/ClearNightV3.svg",
        condition: "Clear Night",
      },
      {
        time: {
          date: "27 Mar",
          time: "3 AM",
        },
        temp: 21,
        precipitation: 0,
        windSpeed: 4.5,
        wind_direction: 256,
        imageurl:
          "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/MostlyClearNight.svg",
        condition: "Cloudy Night",
      },
      {
        time: {
          date: "27 Mar",
          time: "4 AM",
        },
        temp: 20.3,
        precipitation: 0,
        windSpeed: 4,
        wind_direction: 270,
        imageurl:
          "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/MostlyClearNight.svg",
        condition: "Cloudy Night",
      },
      {
        time: {
          date: "27 Mar",
          time: "5 AM",
        },
        temp: 20,
        precipitation: 0,
        windSpeed: 4,
        wind_direction: 270,
        imageurl:
          "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/MostlyClearNight.svg",
        condition: "Cloudy Night",
      },
      {
        time: {
          date: "27 Mar",
          time: "6 AM",
        },
        temp: 20,
        precipitation: 0,
        windSpeed: 3.1,
        wind_direction: 291,
        imageurl:
          "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/MostlySunnyDay.svg",
        condition: "Cloudy",
      },
      {
        time: {
          date: "27 Mar",
          time: "7 AM",
        },
        temp: 20.8,
        precipitation: 0,
        windSpeed: 3.1,
        wind_direction: 291,
        imageurl:
          "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/MostlySunnyDay.svg",
        condition: "Cloudy",
      },
      {
        time: {
          date: "27 Mar",
          time: "8 AM",
        },
        temp: 23.5,
        precipitation: 0,
        windSpeed: 4,
        wind_direction: 297,
        imageurl:
          "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/MostlySunnyDay.svg",
        condition: "Cloudy",
      },
      {
        time: {
          date: "27 Mar",
          time: "9 AM",
        },
        temp: 27.2,
        precipitation: 0,
        windSpeed: 4.2,
        wind_direction: 301,
        imageurl:
          "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/MostlySunnyDay.svg",
        condition: "Cloudy",
      },
      {
        time: {
          date: "27 Mar",
          time: "10 AM",
        },
        temp: 30.5,
        precipitation: 0,
        windSpeed: 5.2,
        wind_direction: 304,
        imageurl:
          "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/SunnyDayV3.svg",
        condition: "Sunny",
      },
      {
        time: {
          date: "27 Mar",
          time: "11 AM",
        },
        temp: 32.9,
        precipitation: 0,
        windSpeed: 8,
        wind_direction: 306,
        imageurl:
          "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/SunnyDayV3.svg",
        condition: "Sunny",
      },
    ],
    [
      {
        time: {
          date: "26 Mar",
          time: "12 PM",
        },
        temp: 30.5,
        precipitation: 0,
        windSpeed: 7.3,
        wind_direction: 279,
        imageurl:
          "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/MostlySunnyDay.svg",
        condition: "Cloudy",
      },
      {
        time: {
          date: "26 Mar",
          time: "1 PM",
        },
        temp: 32.2,
        precipitation: 0,
        windSpeed: 8,
        wind_direction: 297,
        imageurl:
          "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/MostlySunnyDay.svg",
        condition: "Cloudy",
      },
      {
        time: {
          date: "26 Mar",
          time: "2 PM",
        },
        temp: 33.4,
        precipitation: 0,
        windSpeed: 9.1,
        wind_direction: 304,
        imageurl:
          "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/SunnyDayV3.svg",
        condition: "Sunny",
      },
      {
        time: {
          date: "26 Mar",
          time: "3 PM",
        },
        temp: 33.8,
        precipitation: 0,
        windSpeed: 9.2,
        wind_direction: 309,
        imageurl:
          "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/MostlySunnyDay.svg",
        condition: "Cloudy",
      },
      {
        time: {
          date: "26 Mar",
          time: "4 PM",
        },
        temp: 33.5,
        precipitation: 0,
        windSpeed: 9.8,
        wind_direction: 324,
        imageurl:
          "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/SunnyDayV3.svg",
        condition: "Sunny",
      },
      {
        time: {
          date: "26 Mar",
          time: "5 PM",
        },
        temp: 32.5,
        precipitation: 0,
        windSpeed: 8.4,
        wind_direction: 329,
        imageurl:
          "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/MostlySunnyDay.svg",
        condition: "Cloudy",
      },
      {
        time: {
          date: "26 Mar",
          time: "6 PM",
        },
        temp: 29.7,
        precipitation: 0,
        windSpeed: 5.4,
        wind_direction: 8,
        imageurl:
          "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/MostlySunnyDay.svg",
        condition: "Cloudy",
      },
      {
        time: {
          date: "26 Mar",
          time: "7 PM",
        },
        temp: 27.2,
        precipitation: 0,
        windSpeed: 5.5,
        wind_direction: 11,
        imageurl:
          "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/MostlyClearNight.svg",
        condition: "Cloudy Night",
      },
      {
        time: {
          date: "26 Mar",
          time: "8 PM",
        },
        temp: 25.7,
        precipitation: 0,
        windSpeed: 4.1,
        wind_direction: 15,
        imageurl:
          "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/MostlyClearNight.svg",
        condition: "Cloudy Night",
      },
      {
        time: {
          date: "26 Mar",
          time: "9 PM",
        },
        temp: 25,
        precipitation: 0,
        windSpeed: 3.2,
        wind_direction: 27,
        imageurl:
          "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/MostlyClearNight.svg",
        condition: "Cloudy Night",
      },
      {
        time: {
          date: "26 Mar",
          time: "10 PM",
        },
        temp: 24.7,
        precipitation: 0,
        windSpeed: 2.9,
        wind_direction: 7,
        imageurl:
          "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/MostlyClearNight.svg",
        condition: "Cloudy Night",
      },
      {
        time: {
          date: "26 Mar",
          time: "11 PM",
        },
        temp: 24.2,
        precipitation: 0,
        windSpeed: 3.6,
        wind_direction: 6,
        imageurl:
          "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/MostlyClearNight.svg",
        condition: "Cloudy Night",
      },
      {
        time: {
          date: "27 Mar",
          time: "12 AM",
        },
        temp: 23.5,
        precipitation: 0,
        windSpeed: 3.7,
        wind_direction: 349,
        imageurl:
          "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/MostlyClearNight.svg",
        condition: "Cloudy Night",
      },
      {
        time: {
          date: "27 Mar",
          time: "1 AM",
        },
        temp: 22.8,
        precipitation: 0,
        windSpeed: 2.9,
        wind_direction: 330,
        imageurl:
          "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/ClearNightV3.svg",
        condition: "Clear Night",
      },
      {
        time: {
          date: "27 Mar",
          time: "2 AM",
        },
        temp: 22.1,
        precipitation: 0,
        windSpeed: 3.3,
        wind_direction: 264,
        imageurl:
          "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/ClearNightV3.svg",
        condition: "Clear Night",
      },
      {
        time: {
          date: "27 Mar",
          time: "3 AM",
        },
        temp: 21,
        precipitation: 0,
        windSpeed: 4.5,
        wind_direction: 256,
        imageurl:
          "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/MostlyClearNight.svg",
        condition: "Cloudy Night",
      },
      {
        time: {
          date: "27 Mar",
          time: "4 AM",
        },
        temp: 20.3,
        precipitation: 0,
        windSpeed: 4,
        wind_direction: 270,
        imageurl:
          "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/MostlyClearNight.svg",
        condition: "Cloudy Night",
      },
      {
        time: {
          date: "27 Mar",
          time: "5 AM",
        },
        temp: 20,
        precipitation: 0,
        windSpeed: 4,
        wind_direction: 270,
        imageurl:
          "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/MostlyClearNight.svg",
        condition: "Cloudy Night",
      },
      {
        time: {
          date: "27 Mar",
          time: "6 AM",
        },
        temp: 20,
        precipitation: 0,
        windSpeed: 3.1,
        wind_direction: 291,
        imageurl:
          "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/MostlySunnyDay.svg",
        condition: "Cloudy",
      },
      {
        time: {
          date: "27 Mar",
          time: "7 AM",
        },
        temp: 20.8,
        precipitation: 0,
        windSpeed: 3.1,
        wind_direction: 291,
        imageurl:
          "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/MostlySunnyDay.svg",
        condition: "Cloudy",
      },
      {
        time: {
          date: "27 Mar",
          time: "8 AM",
        },
        temp: 23.5,
        precipitation: 0,
        windSpeed: 4,
        wind_direction: 297,
        imageurl:
          "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/MostlySunnyDay.svg",
        condition: "Cloudy",
      },
      {
        time: {
          date: "27 Mar",
          time: "9 AM",
        },
        temp: 27.2,
        precipitation: 0,
        windSpeed: 4.2,
        wind_direction: 301,
        imageurl:
          "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/MostlySunnyDay.svg",
        condition: "Cloudy",
      },
      {
        time: {
          date: "27 Mar",
          time: "10 AM",
        },
        temp: 30.5,
        precipitation: 0,
        windSpeed: 5.2,
        wind_direction: 304,
        imageurl:
          "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/SunnyDayV3.svg",
        condition: "Sunny",
      },
      {
        time: {
          date: "27 Mar",
          time: "11 AM",
        },
        temp: 32.9,
        precipitation: 0,
        windSpeed: 8,
        wind_direction: 306,
        imageurl:
          "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/SunnyDayV3.svg",
        condition: "Sunny",
      },
    ],
    [
      {
        time: {
          date: "26 Mar",
          time: "12 PM",
        },
        temp: 30.5,
        precipitation: 0,
        windSpeed: 7.3,
        wind_direction: 279,
        imageurl:
          "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/MostlySunnyDay.svg",
        condition: "Cloudy",
      },
      {
        time: {
          date: "26 Mar",
          time: "1 PM",
        },
        temp: 32.2,
        precipitation: 0,
        windSpeed: 8,
        wind_direction: 297,
        imageurl:
          "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/MostlySunnyDay.svg",
        condition: "Cloudy",
      },
      {
        time: {
          date: "26 Mar",
          time: "2 PM",
        },
        temp: 33.4,
        precipitation: 0,
        windSpeed: 9.1,
        wind_direction: 304,
        imageurl:
          "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/SunnyDayV3.svg",
        condition: "Sunny",
      },
      {
        time: {
          date: "26 Mar",
          time: "3 PM",
        },
        temp: 33.8,
        precipitation: 0,
        windSpeed: 9.2,
        wind_direction: 309,
        imageurl:
          "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/MostlySunnyDay.svg",
        condition: "Cloudy",
      },
      {
        time: {
          date: "26 Mar",
          time: "4 PM",
        },
        temp: 33.5,
        precipitation: 0,
        windSpeed: 9.8,
        wind_direction: 324,
        imageurl:
          "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/SunnyDayV3.svg",
        condition: "Sunny",
      },
      {
        time: {
          date: "26 Mar",
          time: "5 PM",
        },
        temp: 32.5,
        precipitation: 0,
        windSpeed: 8.4,
        wind_direction: 329,
        imageurl:
          "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/MostlySunnyDay.svg",
        condition: "Cloudy",
      },
      {
        time: {
          date: "26 Mar",
          time: "6 PM",
        },
        temp: 29.7,
        precipitation: 0,
        windSpeed: 5.4,
        wind_direction: 8,
        imageurl:
          "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/MostlySunnyDay.svg",
        condition: "Cloudy",
      },
      {
        time: {
          date: "26 Mar",
          time: "7 PM",
        },
        temp: 27.2,
        precipitation: 0,
        windSpeed: 5.5,
        wind_direction: 11,
        imageurl:
          "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/MostlyClearNight.svg",
        condition: "Cloudy Night",
      },
      {
        time: {
          date: "26 Mar",
          time: "8 PM",
        },
        temp: 25.7,
        precipitation: 0,
        windSpeed: 4.1,
        wind_direction: 15,
        imageurl:
          "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/MostlyClearNight.svg",
        condition: "Cloudy Night",
      },
      {
        time: {
          date: "26 Mar",
          time: "9 PM",
        },
        temp: 25,
        precipitation: 0,
        windSpeed: 3.2,
        wind_direction: 27,
        imageurl:
          "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/MostlyClearNight.svg",
        condition: "Cloudy Night",
      },
      {
        time: {
          date: "26 Mar",
          time: "10 PM",
        },
        temp: 24.7,
        precipitation: 0,
        windSpeed: 2.9,
        wind_direction: 7,
        imageurl:
          "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/MostlyClearNight.svg",
        condition: "Cloudy Night",
      },
      {
        time: {
          date: "26 Mar",
          time: "11 PM",
        },
        temp: 24.2,
        precipitation: 0,
        windSpeed: 3.6,
        wind_direction: 6,
        imageurl:
          "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/MostlyClearNight.svg",
        condition: "Cloudy Night",
      },
      {
        time: {
          date: "27 Mar",
          time: "12 AM",
        },
        temp: 23.5,
        precipitation: 0,
        windSpeed: 3.7,
        wind_direction: 349,
        imageurl:
          "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/MostlyClearNight.svg",
        condition: "Cloudy Night",
      },
      {
        time: {
          date: "27 Mar",
          time: "1 AM",
        },
        temp: 22.8,
        precipitation: 0,
        windSpeed: 2.9,
        wind_direction: 330,
        imageurl:
          "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/ClearNightV3.svg",
        condition: "Clear Night",
      },
      {
        time: {
          date: "27 Mar",
          time: "2 AM",
        },
        temp: 22.1,
        precipitation: 0,
        windSpeed: 3.3,
        wind_direction: 264,
        imageurl:
          "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/ClearNightV3.svg",
        condition: "Clear Night",
      },
      {
        time: {
          date: "27 Mar",
          time: "3 AM",
        },
        temp: 21,
        precipitation: 0,
        windSpeed: 4.5,
        wind_direction: 256,
        imageurl:
          "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/MostlyClearNight.svg",
        condition: "Cloudy Night",
      },
      {
        time: {
          date: "27 Mar",
          time: "4 AM",
        },
        temp: 20.3,
        precipitation: 0,
        windSpeed: 4,
        wind_direction: 270,
        imageurl:
          "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/MostlyClearNight.svg",
        condition: "Cloudy Night",
      },
      {
        time: {
          date: "27 Mar",
          time: "5 AM",
        },
        temp: 20,
        precipitation: 0,
        windSpeed: 4,
        wind_direction: 270,
        imageurl:
          "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/MostlyClearNight.svg",
        condition: "Cloudy Night",
      },
      {
        time: {
          date: "27 Mar",
          time: "6 AM",
        },
        temp: 20,
        precipitation: 0,
        windSpeed: 3.1,
        wind_direction: 291,
        imageurl:
          "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/MostlySunnyDay.svg",
        condition: "Cloudy",
      },
      {
        time: {
          date: "27 Mar",
          time: "7 AM",
        },
        temp: 20.8,
        precipitation: 0,
        windSpeed: 3.1,
        wind_direction: 291,
        imageurl:
          "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/MostlySunnyDay.svg",
        condition: "Cloudy",
      },
      {
        time: {
          date: "27 Mar",
          time: "8 AM",
        },
        temp: 23.5,
        precipitation: 0,
        windSpeed: 4,
        wind_direction: 297,
        imageurl:
          "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/MostlySunnyDay.svg",
        condition: "Cloudy",
      },
      {
        time: {
          date: "27 Mar",
          time: "9 AM",
        },
        temp: 27.2,
        precipitation: 0,
        windSpeed: 4.2,
        wind_direction: 301,
        imageurl:
          "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/MostlySunnyDay.svg",
        condition: "Cloudy",
      },
      {
        time: {
          date: "27 Mar",
          time: "10 AM",
        },
        temp: 30.5,
        precipitation: 0,
        windSpeed: 5.2,
        wind_direction: 304,
        imageurl:
          "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/SunnyDayV3.svg",
        condition: "Sunny",
      },
      {
        time: {
          date: "27 Mar",
          time: "11 AM",
        },
        temp: 32.9,
        precipitation: 0,
        windSpeed: 8,
        wind_direction: 306,
        imageurl:
          "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/SunnyDayV3.svg",
        condition: "Sunny",
      },
    ],
    [
      {
        time: {
          date: "26 Mar",
          time: "12 PM",
        },
        temp: 30.5,
        precipitation: 0,
        windSpeed: 7.3,
        wind_direction: 279,
        imageurl:
          "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/MostlySunnyDay.svg",
        condition: "Cloudy",
      },
      {
        time: {
          date: "26 Mar",
          time: "1 PM",
        },
        temp: 32.2,
        precipitation: 0,
        windSpeed: 8,
        wind_direction: 297,
        imageurl:
          "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/MostlySunnyDay.svg",
        condition: "Cloudy",
      },
      {
        time: {
          date: "26 Mar",
          time: "2 PM",
        },
        temp: 33.4,
        precipitation: 0,
        windSpeed: 9.1,
        wind_direction: 304,
        imageurl:
          "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/SunnyDayV3.svg",
        condition: "Sunny",
      },
      {
        time: {
          date: "26 Mar",
          time: "3 PM",
        },
        temp: 33.8,
        precipitation: 0,
        windSpeed: 9.2,
        wind_direction: 309,
        imageurl:
          "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/MostlySunnyDay.svg",
        condition: "Cloudy",
      },
      {
        time: {
          date: "26 Mar",
          time: "4 PM",
        },
        temp: 33.5,
        precipitation: 0,
        windSpeed: 9.8,
        wind_direction: 324,
        imageurl:
          "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/SunnyDayV3.svg",
        condition: "Sunny",
      },
      {
        time: {
          date: "26 Mar",
          time: "5 PM",
        },
        temp: 32.5,
        precipitation: 0,
        windSpeed: 8.4,
        wind_direction: 329,
        imageurl:
          "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/MostlySunnyDay.svg",
        condition: "Cloudy",
      },
      {
        time: {
          date: "26 Mar",
          time: "6 PM",
        },
        temp: 29.7,
        precipitation: 0,
        windSpeed: 5.4,
        wind_direction: 8,
        imageurl:
          "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/MostlySunnyDay.svg",
        condition: "Cloudy",
      },
      {
        time: {
          date: "26 Mar",
          time: "7 PM",
        },
        temp: 27.2,
        precipitation: 0,
        windSpeed: 5.5,
        wind_direction: 11,
        imageurl:
          "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/MostlyClearNight.svg",
        condition: "Cloudy Night",
      },
      {
        time: {
          date: "26 Mar",
          time: "8 PM",
        },
        temp: 25.7,
        precipitation: 0,
        windSpeed: 4.1,
        wind_direction: 15,
        imageurl:
          "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/MostlyClearNight.svg",
        condition: "Cloudy Night",
      },
      {
        time: {
          date: "26 Mar",
          time: "9 PM",
        },
        temp: 25,
        precipitation: 0,
        windSpeed: 3.2,
        wind_direction: 27,
        imageurl:
          "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/MostlyClearNight.svg",
        condition: "Cloudy Night",
      },
      {
        time: {
          date: "26 Mar",
          time: "10 PM",
        },
        temp: 24.7,
        precipitation: 0,
        windSpeed: 2.9,
        wind_direction: 7,
        imageurl:
          "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/MostlyClearNight.svg",
        condition: "Cloudy Night",
      },
      {
        time: {
          date: "26 Mar",
          time: "11 PM",
        },
        temp: 24.2,
        precipitation: 0,
        windSpeed: 3.6,
        wind_direction: 6,
        imageurl:
          "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/MostlyClearNight.svg",
        condition: "Cloudy Night",
      },
      {
        time: {
          date: "27 Mar",
          time: "12 AM",
        },
        temp: 23.5,
        precipitation: 0,
        windSpeed: 3.7,
        wind_direction: 349,
        imageurl:
          "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/MostlyClearNight.svg",
        condition: "Cloudy Night",
      },
      {
        time: {
          date: "27 Mar",
          time: "1 AM",
        },
        temp: 22.8,
        precipitation: 0,
        windSpeed: 2.9,
        wind_direction: 330,
        imageurl:
          "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/ClearNightV3.svg",
        condition: "Clear Night",
      },
      {
        time: {
          date: "27 Mar",
          time: "2 AM",
        },
        temp: 22.1,
        precipitation: 0,
        windSpeed: 3.3,
        wind_direction: 264,
        imageurl:
          "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/ClearNightV3.svg",
        condition: "Clear Night",
      },
      {
        time: {
          date: "27 Mar",
          time: "3 AM",
        },
        temp: 21,
        precipitation: 0,
        windSpeed: 4.5,
        wind_direction: 256,
        imageurl:
          "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/MostlyClearNight.svg",
        condition: "Cloudy Night",
      },
      {
        time: {
          date: "27 Mar",
          time: "4 AM",
        },
        temp: 20.3,
        precipitation: 0,
        windSpeed: 4,
        wind_direction: 270,
        imageurl:
          "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/MostlyClearNight.svg",
        condition: "Cloudy Night",
      },
      {
        time: {
          date: "27 Mar",
          time: "5 AM",
        },
        temp: 20,
        precipitation: 0,
        windSpeed: 4,
        wind_direction: 270,
        imageurl:
          "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/MostlyClearNight.svg",
        condition: "Cloudy Night",
      },
      {
        time: {
          date: "27 Mar",
          time: "6 AM",
        },
        temp: 20,
        precipitation: 0,
        windSpeed: 3.1,
        wind_direction: 291,
        imageurl:
          "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/MostlySunnyDay.svg",
        condition: "Cloudy",
      },
      {
        time: {
          date: "27 Mar",
          time: "7 AM",
        },
        temp: 20.8,
        precipitation: 0,
        windSpeed: 3.1,
        wind_direction: 291,
        imageurl:
          "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/MostlySunnyDay.svg",
        condition: "Cloudy",
      },
      {
        time: {
          date: "27 Mar",
          time: "8 AM",
        },
        temp: 23.5,
        precipitation: 0,
        windSpeed: 4,
        wind_direction: 297,
        imageurl:
          "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/MostlySunnyDay.svg",
        condition: "Cloudy",
      },
      {
        time: {
          date: "27 Mar",
          time: "9 AM",
        },
        temp: 27.2,
        precipitation: 0,
        windSpeed: 4.2,
        wind_direction: 301,
        imageurl:
          "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/MostlySunnyDay.svg",
        condition: "Cloudy",
      },
      {
        time: {
          date: "27 Mar",
          time: "10 AM",
        },
        temp: 30.5,
        precipitation: 0,
        windSpeed: 5.2,
        wind_direction: 304,
        imageurl:
          "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/SunnyDayV3.svg",
        condition: "Sunny",
      },
      {
        time: {
          date: "27 Mar",
          time: "11 AM",
        },
        temp: 32.9,
        precipitation: 0,
        windSpeed: 8,
        wind_direction: 306,
        imageurl:
          "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/SunnyDayV3.svg",
        condition: "Sunny",
      },
    ],
    [
      {
        time: {
          date: "26 Mar",
          time: "12 PM",
        },
        temp: 30.5,
        precipitation: 0,
        windSpeed: 7.3,
        wind_direction: 279,
        imageurl:
          "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/MostlySunnyDay.svg",
        condition: "Cloudy",
      },
      {
        time: {
          date: "26 Mar",
          time: "1 PM",
        },
        temp: 32.2,
        precipitation: 0,
        windSpeed: 8,
        wind_direction: 297,
        imageurl:
          "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/MostlySunnyDay.svg",
        condition: "Cloudy",
      },
      {
        time: {
          date: "26 Mar",
          time: "2 PM",
        },
        temp: 33.4,
        precipitation: 0,
        windSpeed: 9.1,
        wind_direction: 304,
        imageurl:
          "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/SunnyDayV3.svg",
        condition: "Sunny",
      },
      {
        time: {
          date: "26 Mar",
          time: "3 PM",
        },
        temp: 33.8,
        precipitation: 0,
        windSpeed: 9.2,
        wind_direction: 309,
        imageurl:
          "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/MostlySunnyDay.svg",
        condition: "Cloudy",
      },
      {
        time: {
          date: "26 Mar",
          time: "4 PM",
        },
        temp: 33.5,
        precipitation: 0,
        windSpeed: 9.8,
        wind_direction: 324,
        imageurl:
          "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/SunnyDayV3.svg",
        condition: "Sunny",
      },
      {
        time: {
          date: "26 Mar",
          time: "5 PM",
        },
        temp: 32.5,
        precipitation: 0,
        windSpeed: 8.4,
        wind_direction: 329,
        imageurl:
          "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/MostlySunnyDay.svg",
        condition: "Cloudy",
      },
      {
        time: {
          date: "26 Mar",
          time: "6 PM",
        },
        temp: 29.7,
        precipitation: 0,
        windSpeed: 5.4,
        wind_direction: 8,
        imageurl:
          "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/MostlySunnyDay.svg",
        condition: "Cloudy",
      },
      {
        time: {
          date: "26 Mar",
          time: "7 PM",
        },
        temp: 27.2,
        precipitation: 0,
        windSpeed: 5.5,
        wind_direction: 11,
        imageurl:
          "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/MostlyClearNight.svg",
        condition: "Cloudy Night",
      },
      {
        time: {
          date: "26 Mar",
          time: "8 PM",
        },
        temp: 25.7,
        precipitation: 0,
        windSpeed: 4.1,
        wind_direction: 15,
        imageurl:
          "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/MostlyClearNight.svg",
        condition: "Cloudy Night",
      },
      {
        time: {
          date: "26 Mar",
          time: "9 PM",
        },
        temp: 25,
        precipitation: 0,
        windSpeed: 3.2,
        wind_direction: 27,
        imageurl:
          "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/MostlyClearNight.svg",
        condition: "Cloudy Night",
      },
      {
        time: {
          date: "26 Mar",
          time: "10 PM",
        },
        temp: 24.7,
        precipitation: 0,
        windSpeed: 2.9,
        wind_direction: 7,
        imageurl:
          "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/MostlyClearNight.svg",
        condition: "Cloudy Night",
      },
      {
        time: {
          date: "26 Mar",
          time: "11 PM",
        },
        temp: 24.2,
        precipitation: 0,
        windSpeed: 3.6,
        wind_direction: 6,
        imageurl:
          "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/MostlyClearNight.svg",
        condition: "Cloudy Night",
      },
      {
        time: {
          date: "27 Mar",
          time: "12 AM",
        },
        temp: 23.5,
        precipitation: 0,
        windSpeed: 3.7,
        wind_direction: 349,
        imageurl:
          "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/MostlyClearNight.svg",
        condition: "Cloudy Night",
      },
      {
        time: {
          date: "27 Mar",
          time: "1 AM",
        },
        temp: 22.8,
        precipitation: 0,
        windSpeed: 2.9,
        wind_direction: 330,
        imageurl:
          "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/ClearNightV3.svg",
        condition: "Clear Night",
      },
      {
        time: {
          date: "27 Mar",
          time: "2 AM",
        },
        temp: 22.1,
        precipitation: 0,
        windSpeed: 3.3,
        wind_direction: 264,
        imageurl:
          "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/ClearNightV3.svg",
        condition: "Clear Night",
      },
      {
        time: {
          date: "27 Mar",
          time: "3 AM",
        },
        temp: 21,
        precipitation: 0,
        windSpeed: 4.5,
        wind_direction: 256,
        imageurl:
          "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/MostlyClearNight.svg",
        condition: "Cloudy Night",
      },
      {
        time: {
          date: "27 Mar",
          time: "4 AM",
        },
        temp: 20.3,
        precipitation: 0,
        windSpeed: 4,
        wind_direction: 270,
        imageurl:
          "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/MostlyClearNight.svg",
        condition: "Cloudy Night",
      },
      {
        time: {
          date: "27 Mar",
          time: "5 AM",
        },
        temp: 20,
        precipitation: 0,
        windSpeed: 4,
        wind_direction: 270,
        imageurl:
          "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/MostlyClearNight.svg",
        condition: "Cloudy Night",
      },
      {
        time: {
          date: "27 Mar",
          time: "6 AM",
        },
        temp: 20,
        precipitation: 0,
        windSpeed: 3.1,
        wind_direction: 291,
        imageurl:
          "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/MostlySunnyDay.svg",
        condition: "Cloudy",
      },
      {
        time: {
          date: "27 Mar",
          time: "7 AM",
        },
        temp: 20.8,
        precipitation: 0,
        windSpeed: 3.1,
        wind_direction: 291,
        imageurl:
          "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/MostlySunnyDay.svg",
        condition: "Cloudy",
      },
      {
        time: {
          date: "27 Mar",
          time: "8 AM",
        },
        temp: 23.5,
        precipitation: 0,
        windSpeed: 4,
        wind_direction: 297,
        imageurl:
          "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/MostlySunnyDay.svg",
        condition: "Cloudy",
      },
      {
        time: {
          date: "27 Mar",
          time: "9 AM",
        },
        temp: 27.2,
        precipitation: 0,
        windSpeed: 4.2,
        wind_direction: 301,
        imageurl:
          "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/MostlySunnyDay.svg",
        condition: "Cloudy",
      },
      {
        time: {
          date: "27 Mar",
          time: "10 AM",
        },
        temp: 30.5,
        precipitation: 0,
        windSpeed: 5.2,
        wind_direction: 304,
        imageurl:
          "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/SunnyDayV3.svg",
        condition: "Sunny",
      },
      {
        time: {
          date: "27 Mar",
          time: "11 AM",
        },
        temp: 32.9,
        precipitation: 0,
        windSpeed: 8,
        wind_direction: 306,
        imageurl:
          "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/SunnyDayV3.svg",
        condition: "Sunny",
      },
    ],
    [
      {
        time: {
          date: "26 Mar",
          time: "12 PM",
        },
        temp: 30.5,
        precipitation: 0,
        windSpeed: 7.3,
        wind_direction: 279,
        imageurl:
          "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/MostlySunnyDay.svg",
        condition: "Cloudy",
      },
      {
        time: {
          date: "26 Mar",
          time: "1 PM",
        },
        temp: 32.2,
        precipitation: 0,
        windSpeed: 8,
        wind_direction: 297,
        imageurl:
          "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/MostlySunnyDay.svg",
        condition: "Cloudy",
      },
      {
        time: {
          date: "26 Mar",
          time: "2 PM",
        },
        temp: 33.4,
        precipitation: 0,
        windSpeed: 9.1,
        wind_direction: 304,
        imageurl:
          "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/SunnyDayV3.svg",
        condition: "Sunny",
      },
      {
        time: {
          date: "26 Mar",
          time: "3 PM",
        },
        temp: 33.8,
        precipitation: 0,
        windSpeed: 9.2,
        wind_direction: 309,
        imageurl:
          "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/MostlySunnyDay.svg",
        condition: "Cloudy",
      },
      {
        time: {
          date: "26 Mar",
          time: "4 PM",
        },
        temp: 33.5,
        precipitation: 0,
        windSpeed: 9.8,
        wind_direction: 324,
        imageurl:
          "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/SunnyDayV3.svg",
        condition: "Sunny",
      },
      {
        time: {
          date: "26 Mar",
          time: "5 PM",
        },
        temp: 32.5,
        precipitation: 0,
        windSpeed: 8.4,
        wind_direction: 329,
        imageurl:
          "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/MostlySunnyDay.svg",
        condition: "Cloudy",
      },
      {
        time: {
          date: "26 Mar",
          time: "6 PM",
        },
        temp: 29.7,
        precipitation: 0,
        windSpeed: 5.4,
        wind_direction: 8,
        imageurl:
          "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/MostlySunnyDay.svg",
        condition: "Cloudy",
      },
      {
        time: {
          date: "26 Mar",
          time: "7 PM",
        },
        temp: 27.2,
        precipitation: 0,
        windSpeed: 5.5,
        wind_direction: 11,
        imageurl:
          "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/MostlyClearNight.svg",
        condition: "Cloudy Night",
      },
      {
        time: {
          date: "26 Mar",
          time: "8 PM",
        },
        temp: 25.7,
        precipitation: 0,
        windSpeed: 4.1,
        wind_direction: 15,
        imageurl:
          "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/MostlyClearNight.svg",
        condition: "Cloudy Night",
      },
      {
        time: {
          date: "26 Mar",
          time: "9 PM",
        },
        temp: 25,
        precipitation: 0,
        windSpeed: 3.2,
        wind_direction: 27,
        imageurl:
          "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/MostlyClearNight.svg",
        condition: "Cloudy Night",
      },
      {
        time: {
          date: "26 Mar",
          time: "10 PM",
        },
        temp: 24.7,
        precipitation: 0,
        windSpeed: 2.9,
        wind_direction: 7,
        imageurl:
          "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/MostlyClearNight.svg",
        condition: "Cloudy Night",
      },
      {
        time: {
          date: "26 Mar",
          time: "11 PM",
        },
        temp: 24.2,
        precipitation: 0,
        windSpeed: 3.6,
        wind_direction: 6,
        imageurl:
          "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/MostlyClearNight.svg",
        condition: "Cloudy Night",
      },
      {
        time: {
          date: "27 Mar",
          time: "12 AM",
        },
        temp: 23.5,
        precipitation: 0,
        windSpeed: 3.7,
        wind_direction: 349,
        imageurl:
          "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/MostlyClearNight.svg",
        condition: "Cloudy Night",
      },
      {
        time: {
          date: "27 Mar",
          time: "1 AM",
        },
        temp: 22.8,
        precipitation: 0,
        windSpeed: 2.9,
        wind_direction: 330,
        imageurl:
          "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/ClearNightV3.svg",
        condition: "Clear Night",
      },
      {
        time: {
          date: "27 Mar",
          time: "2 AM",
        },
        temp: 22.1,
        precipitation: 0,
        windSpeed: 3.3,
        wind_direction: 264,
        imageurl:
          "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/ClearNightV3.svg",
        condition: "Clear Night",
      },
      {
        time: {
          date: "27 Mar",
          time: "3 AM",
        },
        temp: 21,
        precipitation: 0,
        windSpeed: 4.5,
        wind_direction: 256,
        imageurl:
          "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/MostlyClearNight.svg",
        condition: "Cloudy Night",
      },
      {
        time: {
          date: "27 Mar",
          time: "4 AM",
        },
        temp: 20.3,
        precipitation: 0,
        windSpeed: 4,
        wind_direction: 270,
        imageurl:
          "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/MostlyClearNight.svg",
        condition: "Cloudy Night",
      },
      {
        time: {
          date: "27 Mar",
          time: "5 AM",
        },
        temp: 20,
        precipitation: 0,
        windSpeed: 4,
        wind_direction: 270,
        imageurl:
          "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/MostlyClearNight.svg",
        condition: "Cloudy Night",
      },
      {
        time: {
          date: "27 Mar",
          time: "6 AM",
        },
        temp: 20,
        precipitation: 0,
        windSpeed: 3.1,
        wind_direction: 291,
        imageurl:
          "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/MostlySunnyDay.svg",
        condition: "Cloudy",
      },
      {
        time: {
          date: "27 Mar",
          time: "7 AM",
        },
        temp: 20.8,
        precipitation: 0,
        windSpeed: 3.1,
        wind_direction: 291,
        imageurl:
          "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/MostlySunnyDay.svg",
        condition: "Cloudy",
      },
      {
        time: {
          date: "27 Mar",
          time: "8 AM",
        },
        temp: 23.5,
        precipitation: 0,
        windSpeed: 4,
        wind_direction: 297,
        imageurl:
          "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/MostlySunnyDay.svg",
        condition: "Cloudy",
      },
      {
        time: {
          date: "27 Mar",
          time: "9 AM",
        },
        temp: 27.2,
        precipitation: 0,
        windSpeed: 4.2,
        wind_direction: 301,
        imageurl:
          "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/MostlySunnyDay.svg",
        condition: "Cloudy",
      },
      {
        time: {
          date: "27 Mar",
          time: "10 AM",
        },
        temp: 30.5,
        precipitation: 0,
        windSpeed: 5.2,
        wind_direction: 304,
        imageurl:
          "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/SunnyDayV3.svg",
        condition: "Sunny",
      },
      {
        time: {
          date: "27 Mar",
          time: "11 AM",
        },
        temp: 32.9,
        precipitation: 0,
        windSpeed: 8,
        wind_direction: 306,
        imageurl:
          "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/SunnyDayV3.svg",
        condition: "Sunny",
      },
    ],
    [
      {
        time: {
          date: "26 Mar",
          time: "12 PM",
        },
        temp: 30.5,
        precipitation: 0,
        windSpeed: 7.3,
        wind_direction: 279,
        imageurl:
          "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/MostlySunnyDay.svg",
        condition: "Cloudy",
      },
      {
        time: {
          date: "26 Mar",
          time: "1 PM",
        },
        temp: 32.2,
        precipitation: 0,
        windSpeed: 8,
        wind_direction: 297,
        imageurl:
          "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/MostlySunnyDay.svg",
        condition: "Cloudy",
      },
      {
        time: {
          date: "26 Mar",
          time: "2 PM",
        },
        temp: 33.4,
        precipitation: 0,
        windSpeed: 9.1,
        wind_direction: 304,
        imageurl:
          "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/SunnyDayV3.svg",
        condition: "Sunny",
      },
      {
        time: {
          date: "26 Mar",
          time: "3 PM",
        },
        temp: 33.8,
        precipitation: 0,
        windSpeed: 9.2,
        wind_direction: 309,
        imageurl:
          "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/MostlySunnyDay.svg",
        condition: "Cloudy",
      },
      {
        time: {
          date: "26 Mar",
          time: "4 PM",
        },
        temp: 33.5,
        precipitation: 0,
        windSpeed: 9.8,
        wind_direction: 324,
        imageurl:
          "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/SunnyDayV3.svg",
        condition: "Sunny",
      },
      {
        time: {
          date: "26 Mar",
          time: "5 PM",
        },
        temp: 32.5,
        precipitation: 0,
        windSpeed: 8.4,
        wind_direction: 329,
        imageurl:
          "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/MostlySunnyDay.svg",
        condition: "Cloudy",
      },
      {
        time: {
          date: "26 Mar",
          time: "6 PM",
        },
        temp: 29.7,
        precipitation: 0,
        windSpeed: 5.4,
        wind_direction: 8,
        imageurl:
          "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/MostlySunnyDay.svg",
        condition: "Cloudy",
      },
      {
        time: {
          date: "26 Mar",
          time: "7 PM",
        },
        temp: 27.2,
        precipitation: 0,
        windSpeed: 5.5,
        wind_direction: 11,
        imageurl:
          "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/MostlyClearNight.svg",
        condition: "Cloudy Night",
      },
      {
        time: {
          date: "26 Mar",
          time: "8 PM",
        },
        temp: 25.7,
        precipitation: 0,
        windSpeed: 4.1,
        wind_direction: 15,
        imageurl:
          "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/MostlyClearNight.svg",
        condition: "Cloudy Night",
      },
      {
        time: {
          date: "26 Mar",
          time: "9 PM",
        },
        temp: 25,
        precipitation: 0,
        windSpeed: 3.2,
        wind_direction: 27,
        imageurl:
          "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/MostlyClearNight.svg",
        condition: "Cloudy Night",
      },
      {
        time: {
          date: "26 Mar",
          time: "10 PM",
        },
        temp: 24.7,
        precipitation: 0,
        windSpeed: 2.9,
        wind_direction: 7,
        imageurl:
          "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/MostlyClearNight.svg",
        condition: "Cloudy Night",
      },
      {
        time: {
          date: "26 Mar",
          time: "11 PM",
        },
        temp: 24.2,
        precipitation: 0,
        windSpeed: 3.6,
        wind_direction: 6,
        imageurl:
          "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/MostlyClearNight.svg",
        condition: "Cloudy Night",
      },
      {
        time: {
          date: "27 Mar",
          time: "12 AM",
        },
        temp: 23.5,
        precipitation: 0,
        windSpeed: 3.7,
        wind_direction: 349,
        imageurl:
          "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/MostlyClearNight.svg",
        condition: "Cloudy Night",
      },
      {
        time: {
          date: "27 Mar",
          time: "1 AM",
        },
        temp: 22.8,
        precipitation: 0,
        windSpeed: 2.9,
        wind_direction: 330,
        imageurl:
          "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/ClearNightV3.svg",
        condition: "Clear Night",
      },
      {
        time: {
          date: "27 Mar",
          time: "2 AM",
        },
        temp: 22.1,
        precipitation: 0,
        windSpeed: 3.3,
        wind_direction: 264,
        imageurl:
          "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/ClearNightV3.svg",
        condition: "Clear Night",
      },
      {
        time: {
          date: "27 Mar",
          time: "3 AM",
        },
        temp: 21,
        precipitation: 0,
        windSpeed: 4.5,
        wind_direction: 256,
        imageurl:
          "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/MostlyClearNight.svg",
        condition: "Cloudy Night",
      },
      {
        time: {
          date: "27 Mar",
          time: "4 AM",
        },
        temp: 20.3,
        precipitation: 0,
        windSpeed: 4,
        wind_direction: 270,
        imageurl:
          "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/MostlyClearNight.svg",
        condition: "Cloudy Night",
      },
      {
        time: {
          date: "27 Mar",
          time: "5 AM",
        },
        temp: 20,
        precipitation: 0,
        windSpeed: 4,
        wind_direction: 270,
        imageurl:
          "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/MostlyClearNight.svg",
        condition: "Cloudy Night",
      },
      {
        time: {
          date: "27 Mar",
          time: "6 AM",
        },
        temp: 20,
        precipitation: 0,
        windSpeed: 3.1,
        wind_direction: 291,
        imageurl:
          "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/MostlySunnyDay.svg",
        condition: "Cloudy",
      },
      {
        time: {
          date: "27 Mar",
          time: "7 AM",
        },
        temp: 20.8,
        precipitation: 0,
        windSpeed: 3.1,
        wind_direction: 291,
        imageurl:
          "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/MostlySunnyDay.svg",
        condition: "Cloudy",
      },
      {
        time: {
          date: "27 Mar",
          time: "8 AM",
        },
        temp: 23.5,
        precipitation: 0,
        windSpeed: 4,
        wind_direction: 297,
        imageurl:
          "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/MostlySunnyDay.svg",
        condition: "Cloudy",
      },
      {
        time: {
          date: "27 Mar",
          time: "9 AM",
        },
        temp: 27.2,
        precipitation: 0,
        windSpeed: 4.2,
        wind_direction: 301,
        imageurl:
          "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/MostlySunnyDay.svg",
        condition: "Cloudy",
      },
      {
        time: {
          date: "27 Mar",
          time: "10 AM",
        },
        temp: 30.5,
        precipitation: 0,
        windSpeed: 5.2,
        wind_direction: 304,
        imageurl:
          "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/SunnyDayV3.svg",
        condition: "Sunny",
      },
      {
        time: {
          date: "27 Mar",
          time: "11 AM",
        },
        temp: 32.9,
        precipitation: 0,
        windSpeed: 8,
        wind_direction: 306,
        imageurl:
          "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/SunnyDayV3.svg",
        condition: "Sunny",
      },
    ],
  ],
  DailyData: [
    {
      time: "26 Mar",
      max_temp: 33.8,
      min_temp: 18,
      precipitation: 0,
    },
    {
      time: "27 Mar",
      max_temp: 36,
      min_temp: 20,
      precipitation: 0,
    },
    {
      time: "28 Mar",
      max_temp: 37.9,
      min_temp: 20.5,
      precipitation: 0,
    },
    {
      time: "29 Mar",
      max_temp: 37.9,
      min_temp: 22.2,
      precipitation: 0,
    },
    {
      time: "30 Mar",
      max_temp: 35.4,
      min_temp: 22.1,
      precipitation: 0.6,
    },
    {
      time: "31 Mar",
      max_temp: 33.1,
      min_temp: 21.4,
      precipitation: 0,
    },
    {
      time: "1 Apr",
      max_temp: 32.2,
      min_temp: 17.9,
      precipitation: 0,
    },
  ],
  isLoading: false,
};

const quo = {
  latitude: 28.75,
  longitude: 77.125,
  generationtime_ms: 0.11396408081054688,
  utc_offset_seconds: 19800,
  timezone: "Asia/Kolkata",
  timezone_abbreviation: "IST",
  elevation: 222,
  current_units: {
    time: "iso8601",
    interval: "seconds",
    temperature_2m: "°C",
    relative_humidity_2m: "%",
    apparent_temperature: "°C",
    is_day: "",
    precipitation: "mm",
    cloud_cover: "%",
    wind_speed_10m: "km/h",
    wind_direction_10m: "°",
  },
  current: {
    time: "2024-03-26T13:00",
    interval: 900,
    temperature_2m: 31.5,
    relative_humidity_2m: 37,
    apparent_temperature: 33.2,
    is_day: 1,
    precipitation: 0,
    cloud_cover: 100,
    wind_speed_10m: 7.6,
    wind_direction_10m: 289,
  },
  hourly_units: {
    time: "iso8601",
    temperature_2m: "°C",
    precipitation: "mm",
    cloud_cover: "%",
    wind_speed_10m: "km/h",
    wind_direction_10m: "°",
    is_day: "",
  },
  hourly: {
    time: [
      "2024-03-26T12:00",
      "2024-03-26T13:00",
      "2024-03-26T14:00",
      "2024-03-26T15:00",
      "2024-03-26T16:00",
      "2024-03-26T17:00",
      "2024-03-26T18:00",
      "2024-03-26T19:00",
      "2024-03-26T20:00",
      "2024-03-26T21:00",
      "2024-03-26T22:00",
      "2024-03-26T23:00",
      "2024-03-27T00:00",
      "2024-03-27T01:00",
      "2024-03-27T02:00",
      "2024-03-27T03:00",
      "2024-03-27T04:00",
      "2024-03-27T05:00",
      "2024-03-27T06:00",
      "2024-03-27T07:00",
      "2024-03-27T08:00",
      "2024-03-27T09:00",
      "2024-03-27T10:00",
      "2024-03-27T11:00",
      "2024-03-27T12:00",
      "2024-03-27T13:00",
      "2024-03-27T14:00",
      "2024-03-27T15:00",
      "2024-03-27T16:00",
      "2024-03-27T17:00",
      "2024-03-27T18:00",
      "2024-03-27T19:00",
      "2024-03-27T20:00",
      "2024-03-27T21:00",
      "2024-03-27T22:00",
      "2024-03-27T23:00",
      "2024-03-28T00:00",
      "2024-03-28T01:00",
      "2024-03-28T02:00",
      "2024-03-28T03:00",
      "2024-03-28T04:00",
      "2024-03-28T05:00",
      "2024-03-28T06:00",
      "2024-03-28T07:00",
      "2024-03-28T08:00",
      "2024-03-28T09:00",
      "2024-03-28T10:00",
      "2024-03-28T11:00",
      "2024-03-28T12:00",
      "2024-03-28T13:00",
      "2024-03-28T14:00",
      "2024-03-28T15:00",
      "2024-03-28T16:00",
      "2024-03-28T17:00",
      "2024-03-28T18:00",
      "2024-03-28T19:00",
      "2024-03-28T20:00",
      "2024-03-28T21:00",
      "2024-03-28T22:00",
      "2024-03-28T23:00",
      "2024-03-29T00:00",
      "2024-03-29T01:00",
      "2024-03-29T02:00",
      "2024-03-29T03:00",
      "2024-03-29T04:00",
      "2024-03-29T05:00",
      "2024-03-29T06:00",
      "2024-03-29T07:00",
      "2024-03-29T08:00",
      "2024-03-29T09:00",
      "2024-03-29T10:00",
      "2024-03-29T11:00",
      "2024-03-29T12:00",
      "2024-03-29T13:00",
      "2024-03-29T14:00",
      "2024-03-29T15:00",
      "2024-03-29T16:00",
      "2024-03-29T17:00",
      "2024-03-29T18:00",
      "2024-03-29T19:00",
      "2024-03-29T20:00",
      "2024-03-29T21:00",
      "2024-03-29T22:00",
      "2024-03-29T23:00",
      "2024-03-30T00:00",
      "2024-03-30T01:00",
      "2024-03-30T02:00",
      "2024-03-30T03:00",
      "2024-03-30T04:00",
      "2024-03-30T05:00",
      "2024-03-30T06:00",
      "2024-03-30T07:00",
      "2024-03-30T08:00",
      "2024-03-30T09:00",
      "2024-03-30T10:00",
      "2024-03-30T11:00",
      "2024-03-30T12:00",
      "2024-03-30T13:00",
      "2024-03-30T14:00",
      "2024-03-30T15:00",
      "2024-03-30T16:00",
      "2024-03-30T17:00",
      "2024-03-30T18:00",
      "2024-03-30T19:00",
      "2024-03-30T20:00",
      "2024-03-30T21:00",
      "2024-03-30T22:00",
      "2024-03-30T23:00",
      "2024-03-31T00:00",
      "2024-03-31T01:00",
      "2024-03-31T02:00",
      "2024-03-31T03:00",
      "2024-03-31T04:00",
      "2024-03-31T05:00",
      "2024-03-31T06:00",
      "2024-03-31T07:00",
      "2024-03-31T08:00",
      "2024-03-31T09:00",
      "2024-03-31T10:00",
      "2024-03-31T11:00",
      "2024-03-31T12:00",
      "2024-03-31T13:00",
      "2024-03-31T14:00",
      "2024-03-31T15:00",
      "2024-03-31T16:00",
      "2024-03-31T17:00",
      "2024-03-31T18:00",
      "2024-03-31T19:00",
      "2024-03-31T20:00",
      "2024-03-31T21:00",
      "2024-03-31T22:00",
      "2024-03-31T23:00",
      "2024-04-01T00:00",
      "2024-04-01T01:00",
      "2024-04-01T02:00",
      "2024-04-01T03:00",
      "2024-04-01T04:00",
      "2024-04-01T05:00",
      "2024-04-01T06:00",
      "2024-04-01T07:00",
      "2024-04-01T08:00",
      "2024-04-01T09:00",
      "2024-04-01T10:00",
      "2024-04-01T11:00",
      "2024-04-01T12:00",
      "2024-04-01T13:00",
      "2024-04-01T14:00",
      "2024-04-01T15:00",
      "2024-04-01T16:00",
      "2024-04-01T17:00",
      "2024-04-01T18:00",
      "2024-04-01T19:00",
      "2024-04-01T20:00",
      "2024-04-01T21:00",
      "2024-04-01T22:00",
      "2024-04-01T23:00",
      "2024-04-02T00:00",
      "2024-04-02T01:00",
      "2024-04-02T02:00",
      "2024-04-02T03:00",
      "2024-04-02T04:00",
      "2024-04-02T05:00",
      "2024-04-02T06:00",
      "2024-04-02T07:00",
      "2024-04-02T08:00",
      "2024-04-02T09:00",
      "2024-04-02T10:00",
      "2024-04-02T11:00",
      "2024-04-02T12:00",
      "2024-04-02T13:00",
      "2024-04-02T14:00",
      "2024-04-02T15:00",
      "2024-04-02T16:00",
      "2024-04-02T17:00",
      "2024-04-02T18:00",
      "2024-04-02T19:00",
      "2024-04-02T20:00",
      "2024-04-02T21:00",
      "2024-04-02T22:00",
      "2024-04-02T23:00",
      "2024-04-03T00:00",
      "2024-04-03T01:00",
      "2024-04-03T02:00",
      "2024-04-03T03:00",
      "2024-04-03T04:00",
      "2024-04-03T05:00",
      "2024-04-03T06:00",
      "2024-04-03T07:00",
      "2024-04-03T08:00",
      "2024-04-03T09:00",
      "2024-04-03T10:00",
    ],
    temperature_2m: [
      30.5, 32.2, 33.4, 33.8, 33.5, 32.5, 29.7, 27.2, 25.7, 25, 24.7, 24.2,
      23.5, 22.8, 22.1, 21, 20.3, 20, 20, 20.8, 23.5, 27.2, 30.5, 32.9, 34.5,
      35.5, 36, 36, 35.5, 34.4, 32, 29.3, 27.5, 26.2, 25.2, 24.3, 23.7, 23.3,
      22.8, 22.3, 21.8, 21.1, 20.5, 21.5, 24.3, 27.1, 29.9, 32.6, 35.2, 37.1,
      37.9, 37.8, 37.2, 36.1, 33.4, 30.7, 29.1, 27.9, 26.9, 26.2, 25.3, 24.5,
      23.8, 23, 22.5, 22.2, 22.2, 23, 25.4, 28.4, 31.3, 33.9, 35.7, 37, 37.8,
      37.9, 37.4, 36.3, 34.3, 31.7, 29.4, 27.9, 26.8, 25.7, 24.7, 23.7, 23,
      22.4, 22.1, 22.1, 22.7, 23.6, 25.1, 27.5, 30.3, 32.6, 34.2, 35.2, 35.4,
      34.7, 33.2, 31.6, 29.9, 28, 26.6, 25.8, 25.5, 25.1, 24.3, 23.5, 22.8,
      22.2, 21.6, 21.4, 21.7, 22.3, 23.5, 25.7, 28.3, 30.5, 31.9, 32.7, 33.1,
      32.9, 32.1, 31, 29.2, 27.1, 25.2, 23.9, 22.8, 21.8, 21, 20.2, 19.6, 18.8,
      18.1, 17.9, 18.7, 20, 21.7, 23.9, 26.4, 28.6, 30.1, 31.3, 32, 32.2, 31.9,
      30.9, 28.9, 26.3, 24, 22.3, 21, 19.9, 19.3, 18.9, 18.6, 18.2, 17.8, 17.9,
      18.5, 19.6, 21.3, 24.2, 27.6, 30.5, 32.3, 33.4, 34, 33.8, 33, 32.4, 34.4,
      32.9, 31.5, 30.6, 29.9, 29.2, 28.7, 28.4, 27.9, 27.2, 26.4, 26, 26.4,
      27.2, 28.4, 30.5, 33,
    ],
    precipitation: [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0.2, 0.2, 0.2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    cloud_cover: [
      100, 72, 13, 71, 2, 32, 97, 80, 100, 100, 100, 48, 100, 4, 20, 98, 91, 78,
      100, 99, 100, 34, 0, 0, 0, 0, 38, 17, 0, 0, 0, 0, 90, 96, 100, 100, 100,
      100, 34, 54, 100, 77, 46, 85, 55, 100, 98, 80, 23, 41, 54, 98, 100, 100,
      98, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 89, 75, 68, 66,
      66, 68, 57, 47, 36, 57, 79, 100, 99, 97, 96, 65, 33, 2, 35, 67, 100, 83,
      65, 48, 42, 37, 31, 42, 53, 64, 56, 48, 40, 50, 61, 71, 66, 60, 55, 59,
      62, 66, 64, 61, 59, 44, 30, 15, 10, 5, 0, 0, 0, 0, 5, 9, 14, 18, 21, 25,
      17, 8, 0, 0, 0, 0, 2, 3, 5, 26, 47, 68, 79, 89, 100, 100, 100, 100, 100,
      100, 100, 100, 100, 100, 67, 35, 2, 6, 11, 15, 43, 72, 100, 100, 100, 100,
      72, 45, 17, 11, 6, 0, 1, 3, 4, 16, 29, 41, 0, 0, 0, 0, 0, 0, 12, 23, 35,
      35, 34, 34, 23, 13, 2, 1, 1,
    ],
    wind_speed_10m: [
      7.3, 8, 9.1, 9.2, 9.8, 8.4, 5.4, 5.5, 4.1, 3.2, 2.9, 3.6, 3.7, 2.9, 3.3,
      4.5, 4, 4, 3.1, 3.1, 4, 4.2, 5.2, 8, 9.2, 10.7, 11.5, 12.2, 12.7, 11, 5.9,
      4.8, 4.6, 4.8, 4.9, 5.2, 5.2, 4.8, 4.7, 4.6, 4.3, 4.3, 4.2, 4.4, 6.2, 7.4,
      7.1, 6.7, 7.1, 7.4, 6.8, 7.1, 7.6, 6.6, 6.8, 7.3, 5.9, 5.2, 6.2, 6.1, 4.6,
      3.5, 3.3, 3.3, 2.9, 1.8, 1.5, 2.1, 1.9, 1.6, 1.6, 3, 3.1, 3.1, 3, 4, 5.5,
      5.9, 4.7, 3.8, 4.8, 5.2, 5.4, 5.2, 4.8, 4.8, 4.7, 5.1, 5.9, 6.7, 7.9, 9.3,
      10.2, 10.7, 11.1, 11.2, 9.9, 8.5, 8, 7.2, 5.5, 4.2, 3.6, 4.9, 5.9, 6, 5.5,
      4.7, 3.5, 2.9, 2.5, 1.5, 4.3, 7.4, 8.8, 9.2, 9.2, 7.9, 6.8, 6.8, 8.6,
      10.7, 12.5, 13.3, 13.7, 13.3, 11.4, 8.7, 6.7, 5.9, 5.5, 5.2, 5.2, 5.5,
      5.8, 5.6, 5.6, 5.7, 5.9, 6.4, 7.1, 8.2, 9, 10.2, 11.6, 13.2, 13.8, 13.2,
      12.1, 10.4, 8.1, 5.8, 4.2, 4.1, 4.8, 5.4, 6.1, 6.5, 6.7, 6, 5, 4.3, 5,
      6.5, 7.9, 9.5, 11.6, 13, 13.9, 14, 13.7, 12.9, 11.7, 11, 13.5, 11, 8.9,
      7.7, 7.1, 6.4, 5.7, 5.5, 4.6, 2.6, 4.4, 5.9, 3.1, 1.8, 5.2, 6.4, 6.4,
    ],
    wind_direction_10m: [
      279, 297, 304, 309, 324, 329, 8, 11, 15, 27, 7, 6, 349, 330, 264, 256,
      270, 270, 291, 291, 297, 301, 304, 306, 312, 312, 311, 313, 313, 311, 322,
      318, 315, 312, 324, 335, 326, 312, 328, 342, 336, 275, 250, 261, 263, 284,
      300, 324, 319, 317, 328, 330, 341, 347, 360, 9, 14, 12, 7, 360, 18, 24, 6,
      347, 360, 11, 14, 301, 292, 297, 333, 14, 21, 21, 14, 360, 349, 346, 4,
      49, 77, 78, 70, 65, 63, 63, 58, 51, 43, 36, 24, 13, 10, 20, 36, 42, 33,
      12, 352, 342, 337, 340, 6, 36, 52, 65, 79, 90, 114, 150, 172, 104, 48, 39,
      35, 31, 26, 16, 357, 342, 338, 340, 342, 341, 342, 341, 342, 343, 344,
      346, 349, 348, 344, 337, 330, 320, 310, 305, 308, 313, 315, 311, 307, 302,
      300, 299, 298, 296, 293, 290, 291, 292, 301, 308, 318, 323, 332, 341, 344,
      343, 330, 312, 291, 276, 273, 281, 292, 298, 301, 305, 305, 306, 304, 302,
      304, 311, 317, 319, 315, 313, 305, 293, 288, 326, 35, 47, 45, 259, 236,
      223, 207,
    ],
    is_day: [
      1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1,
    ],
  },
  daily_units: {
    time: "iso8601",
    temperature_2m_max: "°C",
    temperature_2m_min: "°C",
    precipitation_sum: "mm",
    sunrise: "iso8601",
    sunset: "iso8601",
  },
  daily: {
    time: [
      "2024-03-26",
      "2024-03-27",
      "2024-03-28",
      "2024-03-29",
      "2024-03-30",
      "2024-03-31",
      "2024-04-01",
    ],
    temperature_2m_max: [33.8, 36, 37.9, 37.9, 35.4, 33.1, 32.2],
    temperature_2m_min: [18, 20, 20.5, 22.2, 22.1, 21.4, 17.9],
    precipitation_sum: [0, 0, 0, 0, 0.6, 0, 0],
    sunrise: [
      "2024-03-26T06:47",
      "2024-03-27T06:46",
      "2024-03-28T06:45",
      "2024-03-29T06:44",
      "2024-03-30T06:43",
      "2024-03-31T06:42",
      "2024-04-01T06:41",
    ],
    sunset: [
      "2024-03-26T19:06",
      "2024-03-27T19:06",
      "2024-03-28T19:07",
      "2024-03-29T19:07",
      "2024-03-30T19:08",
      "2024-03-31T19:09",
      "2024-04-01T19:09",
    ],
  },
};
filterHourlyData(quo.hourly);

function classRemover(ind) {
  const cards = document.querySelectorAll(".daysCards");
  cards.forEach((v, i) => {
    if (v.classList.contains("isActive")) {
      v.classList.remove("isActive");
    }
  }
    
  );
  cards[ind].classList.add("isActive")
}

async function placeAutoComplete(place) {
  const result = await axios.get(`https://api.geoapify.com/v1/geocode/autocomplete?text=${place}&apiKey=05cbbddbc8ba4bcd85e69ca0076db7e5&type=city&filter=countrycode:in`)
    .then((res) => {
      const rArr = []
      // console.log(res.data.features);
                const r = res.data.features.map((val)=>{
                 if(val.properties.city) rArr.push({city:val.properties.city, state:val.properties.state, country:val.properties.country,lon:val.properties.lon,lat:val.properties.lat})
                  
                })
      
                return rArr
    })
  
  return result;
}


// placeAutoComplete("delhi")


async  function geocoding2(lat, long) {
  const result = await axios.get(`https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${long}&format=json&&apiKey=05cbbddbc8ba4bcd85e69ca0076db7e5&type=city`)
  .then((res) => {
   
    return res.data.results[0];
        
    
             
  })
console.log(result);
return result;


}



 function debouncer(cb, delay=1000) {
  let debounceTimeout

   return (...args) => {
    
    clearTimeout(debounceTimeout)
    debounceTimeout=setTimeout(() => {
       cb(...args)
    }, delay);

  }
}



export {
  getWeatherInfo,
  getTimeandDate,
  Geocoding,
  getcurtime,
  Slider,
  EmojiSeter,
  classRemover,
  placeAutoComplete,debouncer,displayDate,geocoding2
};

const temporary=[
  {
      "time": {
          "date": "22 May",
          "time": "5 PM"
      },
      "temp": 41.7,
      "precipitation": 0,
      "windSpeed": 6.3,
      "wind_direction": 31,
      "imageurl": "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/MostlySunnyDay.svg",
      "condition": "Cloudy"
  },
  {
      "time": {
          "date": "22 May",
          "time": "6 PM"
      },
      "temp": 40.8,
      "precipitation": 0,
      "windSpeed": 4,
      "wind_direction": 27,
      "imageurl": "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/MostlySunnyDay.svg",
      "condition": "Cloudy"
  },
  {
      "time": {
          "date": "22 May",
          "time": "7 PM"
      },
      "temp": 39.2,
      "precipitation": 0.1,
      "windSpeed": 3.3,
      "wind_direction": 186,
      "imageurl": "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/MostlyClearNight.svg",
      "condition": "Cloudy Night"
  },
  {
      "time": {
          "date": "22 May",
          "time": "8 PM"
      },
      "temp": 37.2,
      "precipitation": 0,
      "windSpeed": 6.6,
      "wind_direction": 139,
      "imageurl": "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/MostlyClearNight.svg",
      "condition": "Cloudy Night"
  },
  {
      "time": {
          "date": "22 May",
          "time": "9 PM"
      },
      "temp": 36.2,
      "precipitation": 0,
      "windSpeed": 5.9,
      "wind_direction": 128,
      "imageurl": "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/MostlyClearNight.svg",
      "condition": "Cloudy Night"
  },
  {
      "time": {
          "date": "22 May",
          "time": "10 PM"
      },
      "temp": 35.2,
      "precipitation": 0,
      "windSpeed": 8.1,
      "wind_direction": 122,
      "imageurl": "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/ClearNightV3.svg",
      "condition": "Clear Night"
  },
  {
      "time": {
          "date": "22 May",
          "time": "11 PM"
      },
      "temp": 34.1,
      "precipitation": 0,
      "windSpeed": 7.4,
      "wind_direction": 113,
      "imageurl": "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/ClearNightV3.svg",
      "condition": "Clear Night"
  },
  {
      "time": {
          "date": "23 May",
          "time": "12 AM"
      },
      "temp": 33.1,
      "precipitation": 0,
      "windSpeed": 5.9,
      "wind_direction": 101,
      "imageurl": "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/ClearNightV3.svg",
      "condition": "Clear Night"
  },
  {
      "time": {
          "date": "23 May",
          "time": "1 AM"
      },
      "temp": 32.4,
      "precipitation": 0,
      "windSpeed": 6.4,
      "wind_direction": 106,
      "imageurl": "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/MostlyClearNight.svg",
      "condition": "Cloudy Night"
  },
  {
      "time": {
          "date": "23 May",
          "time": "2 AM"
      },
      "temp": 32,
      "precipitation": 0,
      "windSpeed": 8.4,
      "wind_direction": 115,
      "imageurl": "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/ClearNightV3.svg",
      "condition": "Clear Night"
  },
  {
      "time": {
          "date": "23 May",
          "time": "3 AM"
      },
      "temp": 31.6,
      "precipitation": 0,
      "windSpeed": 8.7,
      "wind_direction": 120,
      "imageurl": "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/ClearNightV3.svg",
      "condition": "Clear Night"
  },
  {
      "time": {
          "date": "23 May",
          "time": "4 AM"
      },
      "temp": 31.1,
      "precipitation": 0,
      "windSpeed": 8.4,
      "wind_direction": 115,
      "imageurl": "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/ClearNightV3.svg",
      "condition": "Clear Night"
  },
  {
      "time": {
          "date": "23 May",
          "time": "5 AM"
      },
      "temp": 30.4,
      "precipitation": 0,
      "windSpeed": 9.1,
      "wind_direction": 99,
      "imageurl": "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/SunnyDayV3.svg",
      "condition": "Sunny"
  },
  {
      "time": {
          "date": "23 May",
          "time": "6 AM"
      },
      "temp": 30.4,
      "precipitation": 0,
      "windSpeed": 11.4,
      "wind_direction": 103,
      "imageurl": "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/SunnyDayV3.svg",
      "condition": "Sunny"
  },
  {
      "time": {
          "date": "23 May",
          "time": "7 AM"
      },
      "temp": 31.3,
      "precipitation": 0,
      "windSpeed": 14.8,
      "wind_direction": 108,
      "imageurl": "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/SunnyDayV3.svg",
      "condition": "Sunny"
  },
  {
      "time": {
          "date": "23 May",
          "time": "8 AM"
      },
      "temp": 32.9,
      "precipitation": 0,
      "windSpeed": 16.3,
      "wind_direction": 115,
      "imageurl": "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/SunnyDayV3.svg",
      "condition": "Sunny"
  },
  {
      "time": {
          "date": "23 May",
          "time": "9 AM"
      },
      "temp": 34.5,
      "precipitation": 0,
      "windSpeed": 16.5,
      "wind_direction": 106,
      "imageurl": "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/SunnyDayV3.svg",
      "condition": "Sunny"
  },
  {
      "time": {
          "date": "23 May",
          "time": "10 AM"
      },
      "temp": 36.4,
      "precipitation": 0,
      "windSpeed": 15.2,
      "wind_direction": 112,
      "imageurl": "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/SunnyDayV3.svg",
      "condition": "Sunny"
  },
  {
      "time": {
          "date": "23 May",
          "time": "11 AM"
      },
      "temp": 38.3,
      "precipitation": 0,
      "windSpeed": 14.2,
      "wind_direction": 111,
      "imageurl": "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/SunnyDayV3.svg",
      "condition": "Sunny"
  },
  {
      "time": {
          "date": "23 May",
          "time": "12 PM"
      },
      "temp": 39.8,
      "precipitation": 0,
      "windSpeed": 13.2,
      "wind_direction": 112,
      "imageurl": "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/SunnyDayV3.svg",
      "condition": "Sunny"
  },
  {
      "time": {
          "date": "23 May",
          "time": "1 PM"
      },
      "temp": 41,
      "precipitation": 0,
      "windSpeed": 11.9,
      "wind_direction": 115,
      "imageurl": "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/SunnyDayV3.svg",
      "condition": "Sunny"
  },
  {
      "time": {
          "date": "23 May",
          "time": "2 PM"
      },
      "temp": 41.9,
      "precipitation": 0,
      "windSpeed": 9.7,
      "wind_direction": 121,
      "imageurl": "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/SunnyDayV3.svg",
      "condition": "Sunny"
  },
  {
      "time": {
          "date": "23 May",
          "time": "3 PM"
      },
      "temp": 42.3,
      "precipitation": 0,
      "windSpeed": 7.9,
      "wind_direction": 114,
      "imageurl": "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/SunnyDayV3.svg",
      "condition": "Sunny"
  },
  {
      "time": {
          "date": "23 May",
          "time": "4 PM"
      },
      "temp": 42.3,
      "precipitation": 0,
      "windSpeed": 5,
      "wind_direction": 90,
      "imageurl": "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/SunnyDayV3.svg",
      "condition": "Sunny"
  }
]
function displayDate(arr,ind) {
  if (ind == 0) return true;
  
  if (parseInt(arr[ind].time.date.substr(0, 2)) == parseInt(arr[ind - 1].time.date.substr(0, 2))) {
    
   return false
  }
  else {
    return true
  }
 
}
// console.log(displayDate(temporary,6));



// async function placeAutoCompletebyBing(place) {
//   const result = await axios.get(`https://www.accuweather.com/web-api/autocomplete?query=jhansi&language=en-us`)
//     .then((res) => {
//                 const rArr=[]
//              console.log(res.data);
//     })
  
//   return result;
// }
// placeAutoCompletebyBing("jhan")