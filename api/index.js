import fetch from 'isomorphic-fetch';
import Promise from 'promise';

const API_KEY = '5a043a1bd95bf3ee500eb89de107b41e';
const API_URL = 'http://api.openweathermap.org/data/2.5';

// 溫度轉換(凱氏→攝氏)
const kelvinToCelsius = (kelvin) => kelvin - 273.15;

// 四捨五入取到小數點後一位
const round = (value, decimals = 1) => {
  const x = Math.pow(10, decimals);
  return Math.round(x * value) / x;
};

// 檢查請求是否已經被完成
const apiCall = (url) => {
  return fetch(url)
    .then(response => {
      if (response.status >= 400) {
        return Promise.reject('用戶端錯誤回應');
      }

      return response.json();
    })
    .then(json => {
      if (parseInt(json.cod) !== 200) {
        return Promise.reject('失敗回應');
      }

      return json;
    });
};

/* 查詢天氣
 * 每日預測回應的資料格式為 JSONArray ，透過 List 進行存取，再使用 Map 操作 JSONObject 對象
*/
export const queryWeather = (city) => {
  let data;

  return apiCall(`${API_URL}/weather?q=${city.trim()}&appid=${API_KEY}`)
    .then(json => {
      data = {
        temperature: round(kelvinToCelsius(json.main.temp), 0),
        humidity: json.main.humidity,
        icon: json.weather[0].id,
        name: json.name,
        country: json.sys.country.toLowerCase()
      };

      return apiCall(`${API_URL}/forecast/daily?id=${json.id}&cnt=5&appid=${API_KEY}`);
    })
    .then(json => {
      return {
        ...data,
        forecast: json.list.map((d) => ({
          weekday: (new Date(d.dt * 1000)).getDay(),
          icon: d.weather[0].id,
          maxTemp: round(kelvinToCelsius(d.temp.max), 0),
          minTemp: round(kelvinToCelsius(d.temp.min), 0)
        }))
      };
    });
};
