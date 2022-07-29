describe('Ali-express web scrapping', () => {
	jest.setTimeout(30000);

	it('should work', async () => {
		//WIP
		expect(products).toHaveLength(5);

		for (const { id, image, price, name, selled, rating } of products) {
			expect(typeof id).toBe('string');
			expect(id.length).toBeLessThanOrEqual(16);
			expect(id).toMatch(/^\d+$/);

			expect(typeof image).toBe('string');

			expect(typeof price).toBe('string');
			expect(price).toMatch(/^\d+[\d]|\./);

			expect(typeof name).toBe('string');

			expect(typeof selled).toMatch(/number|null/);
			expect(Number.isInteger(selled) ?? null).toStrictEqual(true);

			expect(typeof rating).toMatch(/number|null/);
			expect(Number.isInteger(rating) ?? null).toStrictEqual(false);
		}
	});
});
