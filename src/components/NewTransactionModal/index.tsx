import Modal from 'react-modal';
import {
	Container,
	TransactionTypeContainer,
	TransactionButton,
} from './styles';
import closeImg from '../../assets/close.svg';
import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';
import { FormEvent, useState } from 'react';
import { useTransactions } from '../../hooks/useTransactions';

interface TransactionModalProps {
	isOpen: boolean;
	onRequestClose: () => void;
}

const NewTransactionModal = ({
	isOpen,
	onRequestClose,
}: TransactionModalProps) => {
	const { createTransaction } = useTransactions();

	const [typeTransaction, setTypeTransaction] = useState<
		'deposit' | 'withdraw'
	>('deposit');
	const [title, setTitle] = useState('');
	const [amount, setAmount] = useState(0);
	const [category, setCategory] = useState('');

	async function createNewTransaction(event: FormEvent) {
		event.preventDefault();

		await createTransaction({
			title,
			amount,
			category,
			type: typeTransaction,
		});

		setTitle('');
		setAmount(0);
		setCategory('');
		setTypeTransaction('deposit');
		onRequestClose();
	}

	return (
		<Modal
			isOpen={isOpen}
			onRequestClose={onRequestClose}
			overlayClassName="react-modal-overlay"
			className="react-modal-content"
		>
			<button
				type="button"
				onClick={onRequestClose}
				className="react-modal-close"
			>
				<img src={closeImg} alt="Fechar modal" />
			</button>
			<Container onSubmit={createNewTransaction}>
				<h2>Cadastrar transação</h2>

				<input
					placeholder="Título"
					onChange={(event) => setTitle(event.target.value)}
				/>
				<input
					placeholder="Valor"
					type="number"
					step="0.01"
					onChange={(event) => setAmount(Number(event.target.value))}
				/>
				<TransactionTypeContainer>
					<TransactionButton
						type="button"
						isActive={typeTransaction === 'deposit'}
						activeColor="green"
						onClick={() => setTypeTransaction('deposit')}
					>
						<img src={incomeImg} alt="Entrada" />
						<span>Entrada</span>
					</TransactionButton>
					<TransactionButton
						type="button"
						activeColor="red"
						isActive={typeTransaction === 'withdraw'}
						onClick={() => setTypeTransaction('withdraw')}
					>
						<img src={outcomeImg} alt="Saída" />
						<span>Saida</span>
					</TransactionButton>
				</TransactionTypeContainer>

				<input
					placeholder="Categoria"
					onChange={(event) => setCategory(event.target.value)}
				/>
				<button type="submit">Cadastrar</button>
			</Container>
		</Modal>
	);
};

export default NewTransactionModal;
