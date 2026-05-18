# daily-briefing-agent

AI-powered daily briefing agent — weather, news, agenda reminder via Telegram.

## What it does

Every morning (08:00 AM), the agent sends a personalized briefing to your Telegram:

- **Cuaca** — Current weather + forecast for the day
- **News** — Top headlines from your preferred categories
- **Agenda** — Scheduled tasks/reminders for today
- **Motivational quote** — AI-generated daily quote
- **Quick actions** — Actionable items for the day

## Tech Stack

- **Runtime:** Node.js 20+
- **Bot Framework:** grammY (Telegram)
- **AI:** Xiaomi MiMo API / Claude API
- **Scheduler:** node-cron
- **Weather:** OpenWeatherMap (free tier)
- **News:** NewsAPI / RSS aggregator
- **Host:** Ubuntu + PM2

## Setup

```bash
# Clone repo
git clone https://github.com/astroboys88/daily-briefing-agent.git
cd daily-briefing-agent

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env with your tokens

# Run locally
npm run dev

# Deploy with PM2
pm2 start ecosystem.config.js
```

## Environment Variables

```env
# Telegram
TELEGRAM_BOT_TOKEN=your_telegram_bot_token
TELEGRAM_CHAT_ID=your_chat_id

# AI (choose one)
MIMO_API_KEY=your_mimo_api_key
# or
CLAUDE_API_KEY=your_claude_api_key

# Weather
OPENWEATHER_API_KEY=your_openweather_api_key
WEATHER_CITY=jakarta
WEATHER_COUNTRY=ID

# News
NEWS_API_KEY=your_newsapi_key
NEWS_COUNTRY=id

# Schedule
BRIEFING_TIME=08:00
TIMEZONE=Asia/Jakarta
```

## Commands

| Command | Description |
|---------|-------------|
| `/start` | Activate daily briefing |
| `/stop` | Deactivate daily briefing |
| `/now` | Get briefing now (on-demand) |
| `/weather` | Get current weather |
| `/news` | Get latest news |
| `/quote` | Get AI motivational quote |
| `/agenda` | View today's agenda |
| `/add [task]` | Add task to agenda |
| `/done [id]` | Mark task complete |
| `/help` | Show all commands |

## Project Structure

```
daily-briefing-agent/
├── src/
│   ├── bot.js              # Bot entry point
│   ├── handlers/
│   │   ├── commands.js     # Command handlers
│   │   ├── scheduler.js    # Cron scheduling
│   │   └── middleware.js   # Logging, error handling
│   ├── services/
│   │   ├── weather.js      # Weather service
│   │   ├── news.js         # News aggregator
│   │   ├── ai.js           # AI brief generator
│   │   ├── agenda.js       # Task manager
│   │   └── briefing.js      # Compose briefing
│   ├── utils/
│   │   ├── config.js       # Env config
│   │   └── helpers.js      # Utility functions
│   └── index.js            # Main export
├── .env.example
├── ecosystem.config.js      # PM2 config
├── package.json
├── README.md
└── LICENSE
```

## API Providers

- [Xiaomi MiMo API](https://platform.xiaomimimo.com) — AI inference
- [OpenWeatherMap](https://openweathermap.org/) — Weather data
- [NewsAPI](https://newsapi.org/) — News headlines

## License

MIT — use it, fork it, improve it.

---

Built with Astro 🔥 for the Xiaomi MiMo 100T Creator Incentive Program