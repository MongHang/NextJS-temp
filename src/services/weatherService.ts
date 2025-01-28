//
//curl -X 'GET' \
//   'https://api.weatherapi.com/v1/forecast.json?q=Kaohsiung%2C%20Taiwan&days=1&key=d5ba7e3b6e314503ab4111721252801' \
//   -H 'accept: application/json'
import axios from 'axios';

const baseApiUrl = 'https://api.weatherapi.com/v1/forecast.json';
const apiKey = 'd5ba7e3b6e314503ab4111721252801';
const acceptHeader = 'application/json';

export interface address {
    name:string;  //地區
}
export const name = {
    Taipei: "台北市",
    NewTaipei: "新北市",
    Taoyuan: "桃園市",
    Taichung: "台中市",
    Tainan: "台南市",
    Kaohsiung: "高雄市",
    Keelung: "基隆市",
    HsinchuCity: "新竹市",
    HsinchuCounty: "新竹縣",
    Miaoli: "苗栗縣",
    Changhua: "彰化縣",
    Nantou: "南投縣",
    Yunlin: "雲林縣",
    ChiayiCity: "嘉義市",
    ChiayiCounty: "嘉義縣",
    Pingtung: "屏東縣",
    Yilan: "宜蘭縣",
    Hualien: "花蓮縣",
    Taitung: "台東縣",
    Penghu: "澎湖縣",
    Kinmen: "金門縣",
    Lienchiang: "連江縣"
};



// 根據鍵值返回地址資訊的函式
export const getAddress = (key: keyof typeof name): address => {
  return {
    name: name[key] +",Taiwan"  // 從 `name` 物件中取得對應的中文地名
  };
};
export const weatherService = {
  query: async (name:string) => {
    try {
      const response = await axios.get(baseApiUrl, {
        params: {
          q: name, // 城市名稱，例如 'Kaohsiung, Taiwan'
          days: 1, // 預測天數
          key: apiKey // API 密鑰
        },
        headers: {
          'accept': acceptHeader
        }
      });

      return response.data; // 返回 API 響應數據
    } catch (error) {
      console.error('Error fetching weather data:', error);
      throw error; // 若有錯誤，拋出錯誤以便外層處理
    }
  },
  Decimal_degree: async (latitude:string,longitude:string) => {
    try {
      const response = await axios.get(baseApiUrl, {
        params: {
          q: latitude,longitude,
          days: 1, // 預測天數
          key: apiKey // API 密鑰
        },
        headers: {
          'accept': acceptHeader
        }
      });

      return response.data; // 返回 API 響應數據
    } catch (error) {
      console.error('Error fetching weather data:', error);
      throw error; // 若有錯誤，拋出錯誤以便外層處理
    }
  }
};
