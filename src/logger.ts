import pino from 'pino';

import { config } from './config';

export const logger = pino({
	// autoLogging: true,
	useLevel: config.LOG_LEVEL,
	transport: {
		target: 'pino-pretty',
		options: {
			colorize: true,
			hideObject: true,
		},
	},
});
