import axios from 'axios';
import { config } from '../utils/config.js';

export async function getWeather() {
  const { apiKey, city, country, units } = config.weather;

  try {
    const res = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
      params: {
        q: `${city},${country}`,
        appid: apiKey,
        units,
      },
    });

    const { temp, temp_min, temp_max, humidity } = res.data.main;
    const { description, icon } = res.data.weather[0];
    const cityName = res.data.name;

    const emoji = icon.includes('01') ? '☀️' : icon.includes('02') ? '⛅' : icon.includes('03') ? '☁️' : icon.includes('04') ? '☁️' : icon.includes('09') ? '🌧️' : icon.includes('10') ? '🌦️' : icon.includes('11') ? '⛈️' : icon.includes('13') ? '❄️' : '🌫️';

    return (
      `${emoji} *Cuaca di ${cityName}*\n\n` +
      `Suhu: *${temp.toFixed(1)}°C* (${temp_min.toFixed(1)}° - ${temp_max.toFixed(1)}°)\n` +
      `Kondisi: *${description}*\n` +
      `Kelembapan: *${humidity}%*\n\n` +
      `_Updated: ${new Date().toLocaleString('id-ID', { timeZone: config.schedule.timezone })}_`
    );
  } catch (err) {
    console.error('[WEATHER ERROR]', err.message);
    return '⚠️ Gagal mengambil data cuaca. Coba lagi nanti.';
  }
}