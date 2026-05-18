import { sendBriefing } from '../services/briefing.js';
import { getWeather } from '../services/weather.js';
import { getNews } from '../services/news.js';
import { getQuote } from '../services/ai.js';
import { getAgenda, addTask, markDone } from '../services/agenda.js';

export async function handleCommand(ctx, command) {
  const chatId = ctx.chat.id;
  const args = ctx.message?.text?.split(' ').slice(1).join(' ') || '';

  try {
    switch (command) {
      case 'start':
        await ctx.reply(
          '✅ Daily Briefing Agent activated!\n\n' +
          'You will receive your daily briefing every morning at 08:00.\n' +
          'Use /now to get your briefing immediately.\n' +
          'Use /help to see all commands.'
        );
        break;

      case 'stop':
        await ctx.reply(
          '⏸️ Daily Briefing Agent paused.\n' +
          'Use /start to resume.'
        );
        break;

      case 'now':
        await ctx.reply('⏳ Generating your briefing...');
        await sendBriefing(chatId);
        break;

      case 'weather':
        await ctx.reply('⏳ Fetching weather...');
        const weather = await getWeather();
        await ctx.reply(weather);
        break;

      case 'news':
        await ctx.reply('⏳ Fetching news...');
        const news = await getNews();
        await ctx.reply(news);
        break;

      case 'quote':
        await ctx.reply('⏳ Generating quote...');
        const quote = await getQuote();
        await ctx.reply(quote);
        break;

      case 'agenda':
        const agenda = await getAgenda();
        await ctx.reply(agenda);
        break;

      case 'add':
        if (!args) {
          await ctx.reply('❌ Usage: /add [task text]\nExample: /add Meeting with client at 2pm');
          return;
        }
        const added = await addTask(args, chatId);
        await ctx.reply(added);
        break;

      case 'done':
        if (!args) {
          await ctx.reply('❌ Usage: /done [task id]\nExample: /done 1');
          return;
        }
        const done = await markDone(args, chatId);
        await ctx.reply(done);
        break;

      case 'help':
        await ctx.reply(
          '📋 *Available Commands*\n\n' +
          '/start — Activate daily briefing\n' +
          '/stop — Pause briefing\n' +
          '/now — Get briefing now\n' +
          '/weather — Current weather\n' +
          '/news — Latest news\n' +
          '/quote — Daily motivation\n' +
          '/agenda — Today\'s tasks\n' +
          '/add [task] — Add new task\n' +
          '/done [id] — Mark task complete\n' +
          '/help — This menu',
          { parse_mode: 'Markdown' }
        );
        break;

      default:
        await ctx.reply('❓ Unknown command. Use /help for available commands.');
    }
  } catch (err) {
    console.error(`[COMMAND ERROR] ${command}:`, err);
    await ctx.reply('❌ Something went wrong. Please try again.');
  }
}