import pino from 'pino';

import { config } from './config';

export const logger = pino({
	useLevel: config.LOG_LEVEL,
	transport: {
		target: 'pino-pretty',
		options: {
			colorize: true,
		},
	},
});
