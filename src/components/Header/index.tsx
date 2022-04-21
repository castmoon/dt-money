import React from 'react';
import logo from '../../assets/logo.svg';
import { Container, Content } from './styles';

interface HeaderProps {
	onOpenNewTransactionModal: () => void;
}

const Header = ({ onOpenNewTransactionModal }: HeaderProps) => {
	return (
		<Container>
			<Content>
				<img src={logo} alt="dt money" />
				<button type="button" onClick={onOpenNewTransactionModal}>
					Nova Transação
				</button>
			</Content>
		</Container>
	);
};

export default Header;
