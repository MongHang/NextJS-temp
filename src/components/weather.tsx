"use client"
import { useEffect, useState } from "react";
import { weatherService } from "@/services/weatherService";
import Image from "next/image";
import {LocationState, WeatherData} from "@/types/locationType";



export default function Weather() {
  const [location, setLocation] = useState<LocationState>({
    latitude: null,
    longitude: null
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  const handleGeolocationError = (error: GeolocationPositionError) => {
    switch (error.code) {
      case GeolocationPositionError.PERMISSION_DENIED:
        setError("您已拒絕位置存取權限。請在瀏覽器設定中允許位置存取，然後重新整理頁面。");
        break;
      case GeolocationPositionError.POSITION_UNAVAILABLE:
        setError("無法獲取您的位置資訊，請確認您的設備 GPS 已開啟。");
        break;
      case GeolocationPositionError.TIMEOUT:
        setError("獲取位置超時，請檢查您的網路連線並重試。");
        break;
      default:
        setError("獲取位置時發生錯誤：" + error.message);
    }
    setIsLoading(false);
  };

  const fetchPosition = () => {
    return new Promise<LocationState>((resolve, reject) => {
      if (!navigator.geolocation) {
        setError('您的瀏覽器不支援地理位置功能。');
        reject(new Error('Geolocation not supported'));
        return;
      }

      setIsLoading(true);
      setError(null);

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const newLocation = { latitude, longitude };
          setLocation(newLocation);
          setError(null);
          setIsLoading(false);
          resolve(newLocation);
        },
        (error) => {
          handleGeolocationError(error);
          reject(error);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        }
      );
    });
  };

  const fetchWeatherData = async (lat: number, lon: number) => {
    try {
      const data = await weatherService.Decimal_degree(
        String(lat),
        String(lon)
      );
      setWeatherData(data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setError('獲取天氣數據失敗');
    }
  };

  useEffect(() => {
    fetchPosition();
  }, []);

  useEffect(() => {
    if (location.latitude && location.longitude) {
      fetchWeatherData(location.latitude, location.longitude);
    }
  }, [location]);

  return (
    <div className="p-4">
      {isLoading && <div>正在獲取位置...</div>}

      {error ? (
        <div className="text-red-500">
          <p>{error}</p>
          <button
            onClick={() => fetchPosition()}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            重試
          </button>
        </div>
      ) : (
        <>
          {location.latitude && location.longitude && (
            <div>
              <div>緯度：{location.latitude}</div>
              <div>經度：{location.longitude}</div>
              {weatherData && (
                <div className="mt-4">
                  <h2 className="text-xl font-bold">
                    {weatherData.location?.name}, {weatherData.location?.country}
                  </h2>
                  <div className="mt-2">
                    <p>溫度：{weatherData.current?.temp_c}°C</p>
                    <p>天氣：{weatherData.current?.condition?.text}</p>
                    {weatherData.current?.condition?.icon && (
                      <Image
                        src={`https:${weatherData.current.condition.icon}`}
                        alt="天氣圖標"
                        className="w-16 h-16"
                        width="200"
                        height="200"
                      />
                    )}
                  </div>
                  {weatherData.forecast?.forecastday && (
                    <div className="mt-4">
                      <h3 className="font-bold">未來預報</h3>
                      <div className="flex gap-4 mt-2">
                        {weatherData.forecast.forecastday.map((day) => (
                          <div key={day.date} className="text-center">
                            <p>{day.date}</p>
                            <p>最高：{day.day?.maxtemp_c}°C</p>
                            <p>最低：{day.day?.mintemp_c}°C</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
