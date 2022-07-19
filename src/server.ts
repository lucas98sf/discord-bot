import app from '@/app';
import { config } from '@/config';
// import { connectToDatabase } from '@/db';
import { logger } from '@/logger';

import { DiscordClient } from './modules/discord/client';

const bootstrap = async () => {
	// await connectToDatabase(config.MONGO_URI);
	await DiscordClient.login(config.BOT_TOKEN);

	app.listen(config.PORT);
	logger.info(`Server is running on port ${config.PORT}`);
};
bootstrap();
