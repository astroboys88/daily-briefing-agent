import axios from 'axios';
import { config } from '../utils/config.js';

const MIMO_BASE = 'https://api.xiaomimimo.com/v1/chat/completions';

async function callMiMo(prompt) {
  const { mimoKey } = config.ai;
  if (!mimoKey) throw new Error('MIMO_API_KEY not configured');

  const res = await axios.post(MIMO_BASE, {
    model: 'MiMo-8B-Preview',
    messages: [{ role: 'user', content: prompt }],
    max_tokens: 512,
    temperature: 0.7,
  }, {
    headers: {
      'Authorization': `Bearer ${mimoKey}`,
      'Content-Type': 'application/json',
    },
  });

  return res.data.choices?.[0]?.message?.content || 'Unable to generate response.';
}

export async function getQuote() {
  try {
    const quote = await callMiMo(
      'Buatkan 1 kalimat motivasi pendek dalam Bahasa Indonesia yang inspiratif dan bermakna untuk memulai hari. ' +
      'Format: hanya 1 kalimat, langsung saja, tidak perlu tanda kutip.'
    );
    return `💬 *Daily Motivation*\n\n${quote.trim()}`;
  } catch (err) {
    console.error('[AI QUOTE ERROR]', err.message);
    return '💬 *Daily Motivation*\n\n"Hari ini adalah kesempatan baru untuk jadi versi terbaikmu."';
  }
}

export async function generateBriefingText(weather, news, agenda, quote) {
  try {
    const prompt = `Buatkan brief harian dalam Bahasa Indonesia untuk user berdasarkan data berikut:

Cuaca: ${weather}
Berita: ${news}
Agenda: ${agenda}
Quote: ${quote}

Format seperti ini:
🌅 *Brief Harian — [tanggal]*

[Cuaca section]
[Berita section - 2-3 berita teratas]
[Agenda section - kalau ada]
[Quote section]
[action items - 2-3 hal yang harus dilakukan hari ini]

Singkat, padat, actionable. Gak perlu panjang.`;
    return await callMiMo(prompt);
  } catch (err) {
    console.error('[AI BRIEFING ERROR]', err.message);
    return null;
  }
}