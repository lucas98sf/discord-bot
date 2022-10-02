import cron from 'node-cron';

import { config } from '@/config';

import { logger } from './logger';
import { DiscordClient } from './modules/discord/client';
import { lulaChron } from './modules/discord/commands/votacao';
// import { connectToDatabase } from '@/db';

const bootstrap = async () => {
	// await connectToDatabase(config.MONGO_URI);
	await DiscordClient.login(config.BOT_TOKEN);
	cron.schedule('*/5 * * * *', async () => {
		logger.info('Cron job running');
		await lulaChron('845724364468256808');
	});
};
bootstrap().catch(logger.error);
