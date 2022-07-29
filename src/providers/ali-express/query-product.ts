import { logger } from '@/logger';
import puppeteer from 'puppeteer';

type Maybe<T> = T | null | undefined;
/**
 * @jest-environment jsdom
 */

type Product = {
	id: string;
	image: string;
	price: string;
	name: string;
	selled: number;
	rating: number;
};

const formatPrice = (price: string) =>
	new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
		+parseFloat(price).toFixed(2)
	);

export const getProducts = async (productName: string) => {
	const browser = await puppeteer.launch({
		headless: true,
		args: ['--no-sandbox', '--disable-setuid-sandbox'],
	});
	const page = await browser.newPage();
	await page.goto('https://pt.aliexpress.com');

	const input = await page.waitForSelector('#search-key');
	await input!.type(productName);
	await input!.press('Enter');
	await page.waitForNavigation();

	const products: Product[] = await page.evaluate(() => {
		const maxProducts = 5;
		const selectedProducts = Array.from(
			document.querySelector('.product-container > div:nth-child(2)')?.children ?? []
		).slice(0, maxProducts);

		return selectedProducts.map(productDiv => {
			const childrenArray = (node: Maybe<ParentNode | Element>) =>
				node ? Array.from(node.children) : [];

			const id = productDiv.getAttribute('href')?.match(/(?!item\/)(\d+)(?=\.html)/)?.[0];

			const [imageDiv, infosDiv] = childrenArray(productDiv);

			const image = imageDiv?.querySelector('img')?.getAttribute('src');

			const infos = childrenArray(infosDiv);

			const price =
				// formatPrice(
				childrenArray(infos.find(info => info.innerHTML.includes('R$')))
					.map(priceSpan => priceSpan.textContent)
					.filter(text => text?.match(/^\d+[\d]|,/))
					.join('')
					.replace(',', '.');
			// );

			const name = infos.find(info => info.querySelector('h1'))?.textContent;

			const [selled, , rating] = childrenArray(
				infos.find(info => info.innerHTML.includes(' vendido(s)'))
			).map(span => span.innerHTML);

			return {
				id,
				image,
				price,
				name,
				selled: Number(selled?.split(' ')[0]),
				rating: parseFloat(rating ?? ''),
			} as Product;
		});
	});
	browser.close();

	const formatedProducts = structuredClone(products).map(product => {
		product.id = product.id.split(' ').shift()!;
		product.name = product.name
			.split(' ')
			.slice(0, 8 ?? product.name.split(' ').length)
			.join(' ')!;
		product.price = formatPrice(product.price);

		return product;
	});
	logger.debug(formatedProducts);

	return formatedProducts; //products;
};
