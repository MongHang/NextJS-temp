import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    images: {
    domains: ['cdn.weatherapi.com'], // 添加 WeatherAPI 的圖片域名
  },
};

export default nextConfig;
