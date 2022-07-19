import { hooksRouter } from './';

hooksRouter.post('/ali-express', ctx => {
	//chamar o provider e notificar no discord
	ctx.body = 'ali-express';
});
