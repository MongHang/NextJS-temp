export interface address {
    region:string; //國家
    name:string;  //地區
}
export interface LocationState {
  latitude: number | null;
  longitude: number | null;
}

export interface WeatherData {
  location?: {
    name?: string;
    region?: string;
    country?: string;
  };
  current?: {
    temp_c?: number;
    condition?: {
      text?: string;
      icon?: string;
    };
  };
  forecast?: {
    forecastday?: Array<{
      date?: string;
      day?: {
        maxtemp_c?: number;
        mintemp_c?: number;
        condition?: {
          text?: string;
          icon?: string;
        };
      };
    }>;
  };
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
