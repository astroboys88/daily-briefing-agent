import 'dotenv/config';

export const config = {
  telegram: {
    token: process.env.TELEGRAM_BOT_TOKEN || '',
    chatId: process.env.TELEGRAM_CHAT_ID || '',
  },
  ai: {
    mimoKey: process.env.MIMO_API_KEY || '',
    claudeKey: process.env.CLAUDE_API_KEY || '',
  },
  weather: {
    apiKey: process.env.OPENWEATHER_API_KEY || '',
    city: process.env.WEATHER_CITY || 'jakarta',
    country: process.env.WEATHER_COUNTRY || 'ID',
    units: process.env.WEATHER_UNITS || 'metric',
  },
  news: {
    apiKey: process.env.NEWS_API_KEY || '',
    country: process.env.NEWS_COUNTRY || 'id',
    language: process.env.NEWS_LANGUAGE || 'id',
    category: process.env.NEWS_CATEGORY || 'general',
  },
  schedule: {
    briefingTime: process.env.BRIEFING_TIME || '08:00',
    timezone: process.env.TIMEZONE || 'Asia/Jakarta',
  },
  env: process.env.ENV || 'development',
  logLevel: process.env.LOG_LEVEL || 'info',
};

export function validateConfig() {
  const required = ['telegram.token'];
  for (const path of required) {
    const val = path.split('.').reduce((obj, k) => obj?.[k], config);
    if (!val) throw new Error(`Missing required config: ${path}`);
  }
}