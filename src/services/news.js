import axios from 'axios';
import { config } from '../utils/config.js';

export async function getNews() {
  const { apiKey, country, language, category } = config.news;

  try {
    const res = await axios.get('https://newsapi.org/v2/top-headlines', {
      params: { country, category, apiKey },
    });

    const articles = res.data.articles?.slice(0, 5) || [];

    if (!articles.length) return '📰 Tidak ada berita hari ini.';

    let msg = '📰 *Top Berita Hari Ini*\n\n';
    articles.forEach((a, i) => {
      msg += `${i + 1}. [${a.title}](${a.url})\n`;
      if (a.description) msg += `   _${a.description.slice(0, 80)}..._\n`;
      msg += '\n';
    });

    return msg;
  } catch (err) {
    console.error('[NEWS ERROR]', err.message);
    return '⚠️ Gagal mengambil berita. Coba lagi nanti.';
  }
}