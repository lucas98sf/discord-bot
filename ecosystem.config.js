module.exports = {
	apps: [
		{
			name: 'disc-bot',
			time: true,
			script: 'npm',
			args: 'start',
			watch: ['dist'],
			watch_delay: 10000,
		},
	],
};
