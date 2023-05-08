import React, { PropsWithChildren, useEffect } from 'react';
import { ModalMain, ModalDialog, ModalContent, Screen } from './styles';

interface ModalProps {
	toggleModal: () => void;
}

function Modal({ toggleModal, children }: PropsWithChildren<ModalProps>) {

	// vertically re-position to selected character
	useEffect(() => {
		document.body.style.cssText = `
			position: fixed;
			top: -${window.scrollY}px;
			overflow-y: auto;
			width: 100%;`;
		return () => {
			const scrollY = document.body.style.top;
			document.body.style.cssText = '';
			window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
		};
	}, []);

	return (
		<ModalMain> 
			<ModalDialog>
				<ModalContent>
					{children}
				</ModalContent>
			</ModalDialog>
			<Screen
				onClick={(e: React.MouseEvent) => {
					e.preventDefault();
					if (toggleModal) {
						toggleModal();
					}
				}}
			/>
		</ModalMain>
	);
}

export default Modal;
