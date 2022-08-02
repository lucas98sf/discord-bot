module.exports = {
	apps: [
		{
			name: 'disc-bot',
			time: true,
			script: 'npm',
			args: 'start',
			watch: true, watch: ["dist"], watch_delay: 30000
		},
	],
};
