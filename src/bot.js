import { Bot } from 'grammy';
import { config } from '../utils/config.js';
import { handleCommand } from './handlers/commands.js';
import { setupScheduler } from './handlers/scheduler.js';
import { errorMiddleware, logMiddleware } from './handlers/middleware.js';

const bot = new Bot(config.telegram.token);

bot.use(logMiddleware);
bot.use(errorMiddleware);

bot.command('start', (ctx) => handleCommand(ctx, 'start'));
bot.command('stop', (ctx) => handleCommand(ctx, 'stop'));
bot.command('now', (ctx) => handleCommand(ctx, 'now'));
bot.command('weather', (ctx) => handleCommand(ctx, 'weather'));
bot.command('news', (ctx) => handleCommand(ctx, 'news'));
bot.command('quote', (ctx) => handleCommand(ctx, 'quote'));
bot.command('agenda', (ctx) => handleCommand(ctx, 'agenda'));
bot.command('add', (ctx) => handleCommand(ctx, 'add'));
bot.command('done', (ctx) => handleCommand(ctx, 'done'));
bot.command('help', (ctx) => handleCommand(ctx, 'help'));

bot.catch((err) => {
  console.error('[BOT ERROR]', err);
});

export async function startBot() {
  await bot.api.setMyCommands([
    { command: 'start', description: 'Activate daily briefing' },
    { command: 'stop', description: 'Deactivate daily briefing' },
    { command: 'now', description: 'Get briefing now' },
    { command: 'weather', description: 'Current weather' },
    { command: 'news', description: 'Latest news' },
    { command: 'quote', description: 'Daily motivation' },
    { command: 'agenda', description: "Today's tasks" },
    { command: 'add', description: 'Add task — /add [task text]' },
    { command: 'done', description: 'Mark done — /done [task id]' },
    { command: 'help', description: 'All commands' },
  ]);

  setupScheduler(bot);
  await bot.start();
  console.log('[BOT] Daily Briefing Agent started');
}

export { bot };