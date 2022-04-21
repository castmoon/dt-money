import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import Header from './components/Header';
import NewTransactionModal from './components/NewTransactionModal';
import TransactionsTable from './components/TransactionsTable';
import { GlobalStyle } from './styles/global';
import Modal from 'react-modal';
import { TransactionsProvider } from './hooks/useTransactions';

Modal.setAppElement('#root');

export function App() {
	const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] =
		useState(false);

	function openNewTransactionModal() {
		setIsNewTransactionModalOpen(true);
	}
	function closeNewTransactionModal() {
		setIsNewTransactionModalOpen(false);
	}
	return (
		<TransactionsProvider>
			<Header onOpenNewTransactionModal={openNewTransactionModal} />
			<Dashboard />
			<NewTransactionModal
				isOpen={isNewTransactionModalOpen}
				onRequestClose={closeNewTransactionModal}
			/>

			<TransactionsTable />
			<GlobalStyle />
		</TransactionsProvider>
	);
}
