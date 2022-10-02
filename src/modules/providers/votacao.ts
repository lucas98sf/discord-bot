import axios from 'axios';
import { EmbedBuilder } from 'discord.js';

export default async () => {
	const res: any = await axios
		.get(
			'https://resultados.tse.jus.br/oficial/ele2022/544/dados-simplificados/br/br-c0001-e000544-r.json'
		)
		.then(res => res.data as Record<string, any> & { cand: any[] });

	const canditatos: any[] = res.cand.filter((item: any) => item.seq < 6);

	const json = {
		Apurados: `${res.pst as string}%`,
		Votos: canditatos.map((cand: any) => ({
			nome: cand.nm,
			porcentagem: `${cand.pvap as string}%`,
		})),
	};
	const table = new EmbedBuilder()
		.setColor('Red')
		.setTitle('Votação')
		.setFields(
			{
				name: 'Apurados',
				value: json.Apurados,
			},
			{
				name: 'Votos',
				value: json.Votos.map(
					(voto: any) => `${voto.nome as string} - ${voto.porcentagem as string}`
				).join('\n'),
			}
		)
		.setThumbnail(
			json.Votos[0]?.nome === 'LULA'
				? 'https://classic.exame.com/wp-content/uploads/2021/05/LULA-RICARDO-STUCKERT.jpg?quality=70&strip=info&w=1024'
				: 'https://ichef.bbci.co.uk/news/640/cpsprodpb/05CA/production/_125728410_bosoreuters-2.jpg'
		);
	return table;
};
