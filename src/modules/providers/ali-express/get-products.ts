import puppeteer from 'puppeteer';

import { logger } from '@/logger';

type Maybe<T> = T | null | undefined;

type Product = {
	id: string;
	image: string;
	price: string;
	name: string;
	sold: number;
	rating: number;
};

const formatPrice = (price: string) =>
	new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
		+parseFloat(price).toFixed(2)
	);

export const getProducts = async (productName: string) => {
	const browser = await puppeteer.launch({
		headless: false,
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

			//TODO: fix this for sales and price ranges
			const price =
				// formatPrice(
				childrenArray(infos.find(info => info.innerHTML.includes('R$')))
					.map(priceSpan => priceSpan.textContent)
					.filter(text => text?.match(/^\d+[\d]|,/))
					.join('')
					.replace(',', '.');
			// );

			const name = infos.find(info => info.querySelector('h1'))?.textContent;

			const [sold, , rating] = childrenArray(
				infos.find(info => info.innerHTML.includes(' vendido(s)'))
			).map(span => span.innerHTML);

			return {
				id,
				image,
				price,
				name,
				sold: Number(sold?.split(' ')[0]),
				rating: parseFloat(rating ?? ''),
			} as Product;
		});
	});
	await browser.close();

	//TODO: this could be better
	products.map(product => {
		product.id = product.id.split(' ').shift()!;
		product.name = product.name
			.split(' ')
			.slice(0, 8 ?? product.name.split(' ').length)
			.join(' ')!;
		product.price = formatPrice(product.price);

		return product;
	});
	logger.debug(products);

	return products;
};
