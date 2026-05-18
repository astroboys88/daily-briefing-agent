export const logMiddleware = async (ctx, next) => {
  const start = Date.now();
  const msg = ctx.message;
  console.log(`[LOG] ${ctx.from?.username || ctx.from?.id} -> ${msg?.text || 'media'}`);
  await next();
  const ms = Date.now() - start;
  console.log(`[LOG] Processed in ${ms}ms`);
};

export const errorMiddleware = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    console.error('[MIDDLEWARE ERROR]', err);
    if (ctx.chat) {
      await ctx.reply('❌ An error occurred while processing your request.');
    }
  }
};