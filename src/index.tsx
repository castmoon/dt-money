import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { createServer, Model } from 'miragejs';

createServer({
	models: {
		transaction: Model,
	},

	seeds(server) {
		server.db.loadData({
			transactions: [
				{
					id: 1,
					title: 'Freelance de website',
					type: 'deposit',
					category: 'dev',
					amount: 6000,
					createdAt: new Date('2022-02-02'),
				},
				{
					id: 2,
					title: 'Aluguel',
					type: 'withdraw',
					category: 'gastos',
					amount: 1500,
					createdAt: new Date('2022-04-03'),
				},
				{
					id: 3,
					title: 'Salario',
					type: 'deposit',
					category: 'dev',
					amount: 6000,
					createdAt: new Date('2022-02-06'),
				},
			],
		});
	},

	routes() {
		this.namespace = 'api';

		this.get('/transactions', () => {
			return this.schema.all('transaction');
		});

		this.post('/transactions', (schema, request) => {
			const data = JSON.parse(request.requestBody);

			return schema.create('transaction', data);
		});
	},
});

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById('root')
);
