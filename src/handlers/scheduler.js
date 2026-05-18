import cron from 'node-cron';
import { sendBriefing } from '../services/briefing.js';
import { config } from '../utils/config.js';

let scheduledJob = null;

export function setupScheduler(bot) {
  const [hours, minutes] = config.schedule.briefingTime.split(':');
  const cronExpr = `${minutes} ${hours} * * *`;

  console.log(`[SCHEDULER] Daily briefing scheduled at ${config.schedule.briefingTime} (${config.schedule.timezone})`);

  scheduledJob = cron.schedule(cronExpr, async () => {
    console.log('[SCHEDULER] Running scheduled briefing...');
    try {
      await sendBriefing(config.telegram.chatId);
    } catch (err) {
      console.error('[SCHEDULER ERROR]', err);
    }
  }, {
    timezone: config.schedule.timezone,
  });
}

export function stopScheduler() {
  if (scheduledJob) {
    scheduledJob.stop();
    console.log('[SCHEDULER] Stopped');
  }
}