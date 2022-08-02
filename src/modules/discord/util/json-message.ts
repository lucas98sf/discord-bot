export const jsonMessage = (message: unknown) =>
	`
\`\`\`json
${JSON.stringify(message, null, 2)}
\`\`\`
`;
