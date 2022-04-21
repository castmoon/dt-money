import React from 'react';
import { Container } from './styles';
import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';
import totalImg from '../../assets/total.svg';
import { useTransactions } from '../../hooks/useTransactions';

const Summary = () => {
	const { transactions } = useTransactions();

	const totalDeposits = transactions.reduce(
		(acc, transaction) => {
			switch (transaction.type) {
				case 'deposit':
					acc.deposits += transaction.amount;
					acc.total += transaction.amount;
					break;
				case 'withdraw':
					acc.withdraws += transaction.amount;
					acc.total -= transaction.amount;
					break;
				default:
					break;
			}
			return acc;
		},
		{
			deposits: 0,
			withdraws: 0,
			total: 0,
		}
	);

	return (
		<Container>
			<div>
				<header>
					<p>Entradas</p>
					<img src={incomeImg} alt="entradas" />
				</header>
				<strong>
					{new Intl.NumberFormat('pt-BR', {
						currency: 'BRL',
						style: 'currency',
					}).format(totalDeposits.deposits)}
				</strong>
			</div>
			<div>
				<header>
					<p>Saídas</p>
					<img src={outcomeImg} alt="saídas" />
				</header>
				<strong>
					-{' '}
					{new Intl.NumberFormat('pt-BR', {
						currency: 'BRL',
						style: 'currency',
					}).format(totalDeposits.withdraws)}
				</strong>
			</div>
			<div className="highlight-background">
				<header>
					<p>total</p>
					<img src={totalImg} alt="total" />
				</header>
				<strong>
					{new Intl.NumberFormat('pt-BR', {
						currency: 'BRL',
						style: 'currency',
					}).format(totalDeposits.total)}
				</strong>
			</div>
		</Container>
	);
};

export default Summary;
