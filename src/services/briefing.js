import axios from 'axios';
import { config } from '../utils/config.js';
import { getWeather } from './weather.js';
import { getNews } from './news.js';
import { getQuote, generateBriefingText } from './ai.js';
import { getAgenda } from './agenda.js';

export async function sendBriefing(chatId) {
  console.log('[BRIEFING] Generating briefing...');

  const weather = await getWeather();
  const news = await getNews();
  const quote = await getQuote();
  const agenda = await getAgenda();

  let briefingText;

  try {
    briefingText = await generateBriefingText(weather, news, agenda, quote);
  } catch (err) {
    console.error('[BRIEFING] AI generation failed, using fallback:', err.message);
  }

  if (!briefingText) {
    briefingText = composeFallbackBriefing(weather, news, agenda, quote);
  }

  await sendTelegramMessage(chatId, briefingText);
  console.log('[BRIEFING] Sent successfully');
}

function composeFallbackBriefing(weather, news, agenda, quote) {
  const today = new Date().toLocaleDateString('id-ID', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });

  return (
    `🌅 *Brief Harian — ${today}*\n\n` +
    `${weather}\n\n` +
    `${news}\n\n` +
    `${agenda}\n\n` +
    `${quote}`
  );
}

async function sendTelegramMessage(chatId, text) {
  const token = config.telegram.token;
  await axios.post(`https://api.telegram.org/bot${token}/sendMessage`, {
    chat_id: chatId,
    text,
    parse_mode: 'Markdown',
    disable_web_preview: false,
  });
}