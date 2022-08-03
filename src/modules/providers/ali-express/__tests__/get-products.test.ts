import { getProducts } from '../get-products';
// import { products } from './mocks/products';
describe('Ali-express web scrapping', () => {
	jest.setTimeout(30000);

	it('should work', async () => {
		const products = await getProducts('sapato');
		expect(products).toHaveLength(5);

		// console.log(products)
		for (const { id, image, price, name, sold, rating } of products) {
			expect(typeof id).toBe('string');
			expect(id.length).toBeLessThanOrEqual(16);
			expect(id).toMatch(/^\d+$/);

			expect(typeof image).toBe('string');
			expect(image.endsWith('.webp')).toBeTruthy();

			expect(price === null ||
				(typeof price === 'string' && price.match(/^R\$\s\d+,\d+/))
			).toBeTruthy();

			expect(typeof name).toBe('string');

			expect(sold === null || typeof sold === 'number').toBeTruthy();

			expect(rating === null || typeof rating === 'number').toBeTruthy();
		}
	});
});
