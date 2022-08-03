import puppeteer from 'puppeteer';

import { logger } from '@/logger';

type Maybe<T> = T | null | undefined;

type Product = {
	id: string;
	image: string;
	price: Maybe<string>;
	name: string;
	sold: Maybe<number>;
	rating: Maybe<number>;
};

export const getProducts = async (productName: string) => {
	const browser = await puppeteer.launch({
		headless: true,
		args: ['--no-sandbox', '--disable-setuid-sandbox'],
	});
	const page = await browser.newPage();
	await page.goto(`https://pt.aliexpress.com/wholesale?SearchText=${productName}`);

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
			const formatPrice = (price: string) =>
				new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
					+parseFloat(price).toFixed(2)
				);
			const price = childrenArray(infos.find(info => info.innerHTML.includes('R$')))
				.map(priceSpan => priceSpan.textContent)
				.filter(text => text?.match(/^\d+[\d]|,/))
				.join('')
				.replace(',', '.');

			const name = infos.find(info => info.querySelector('h1'))?.textContent;

			const [sold, , rating] = childrenArray(
				infos.find(info => info.innerHTML.includes(' vendido(s)'))
			).map(span => span.innerHTML);

			return {
				id: id!.split(' ').shift(),
				image,
				price: formatPrice(price) || null,
				name,
				sold: Number(sold?.split(' ')[0]) || null,
				rating: parseFloat(rating!) || null,
			} as Product;
		});
	});
	await browser.close();

	logger.info(products);

	return products;
};
