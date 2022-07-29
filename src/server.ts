import { config } from '@/config';
import { DiscordClient } from './modules/discord/client';
// import { connectToDatabase } from '@/db';

const bootstrap = async () => {
	// await connectToDatabase(config.MONGO_URI);
	await DiscordClient.login(config.BOT_TOKEN);
};
bootstrap();
