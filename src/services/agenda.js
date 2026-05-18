import axios from 'axios';
import { config } from '../utils/config.js';

// In-memory task store (replace with DB/Redis in production)
const tasks = new Map();

export async function getAgenda() {
  const chatId = config.telegram.chatId;
  const today = new Date().toDateString();
  const userTasks = Array.from(tasks.values()).filter(
    t => t.chatId === chatId && t.date === today && !t.done
  );

  if (!userTasks.length) return '📋 *Agenda Hari Ini*\n\n✨ Tidak ada tugas. Nikmati harimu!';

  let msg = '📋 *Agenda Hari Ini*\n\n';
  userTasks.forEach((t, i) => {
    msg += `${i + 1}. ${t.text} [${t.time}]\n`;
  });
  return msg;
}

export async function addTask(text, chatId) {
  const id = Date.now().toString();
  const now = new Date();
  tasks.set(id, {
    id,
    text,
    chatId,
    date: now.toDateString(),
    time: now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
    done: false,
    createdAt: now.toISOString(),
  });

  const count = Array.from(tasks.values()).filter(t => t.chatId === chatId && !t.done).length;
  return `✅ *Tugas Ditambahkan*\n\n"${text}"\n\nTotal tugas aktif: ${count}`;
}

export async function markDone(taskId, chatId) {
  const task = tasks.get(taskId);
  if (!task) return '❌ Tugas tidak ditemukan.';
  if (task.chatId !== chatId) return '❌ Bukan tugasmu.';

  task.done = true;
  task.doneAt = new Date().toISOString();
  return `🎉 *Tugas Selesai!*\n\n"${task.text}"\n\nSemoga harimu produktif!`;
}

export async function getTasksByDate(chatId, date) {
  return Array.from(tasks.values()).filter(t => t.chatId === chatId && t.date === date);
}

export async function clearOldTasks(daysOld = 7) {
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - daysOld);
  for (const [id, task] of tasks) {
    if (new Date(task.createdAt) < cutoff) tasks.delete(id);
  }
}