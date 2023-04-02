import React, { useContext, useState } from 'react';

const defaultMode = 'default';
const defaultModalState = 'modalClosed';

export type Props = {
	children: React.ReactNode;
};

export type ContextProps = {
	mode: string | undefined;
	toggleTheme: () => void;
	modalMode: string | undefined;
	toggleModalState: () => void;
};

export const Context = React.createContext<ContextProps>({
	mode: defaultMode,
	toggleTheme: () => {},
	modalMode: defaultModalState,
	toggleModalState: () => {},
});

export const useReactContext = (): ContextProps => useContext(Context);

export const ThemeContext: React.FC<Props> = ({ children }) => {
	const [themeModeState, setThemeModeState] = useState({ mode: defaultMode });
	const [modalState, setModalState] = useState({ modalMode: defaultModalState });

	const toggleTheme = () => {
		setThemeModeState({ mode: themeModeState.mode === 'dark' ? `default` : `dark` });
	};

	const toggleModalState = () => {
		setModalState({ modalMode: modalState.modalMode === 'modalOpen' ? `modalClosed` : `modalOpen` });
	};

	return (
		<Context.Provider value={
			{
				mode: themeModeState.mode,
				toggleTheme: toggleTheme,
				modalMode: modalState.modalMode,
				toggleModalState: toggleModalState,
			}
		}>
			{children}
		</Context.Provider>
	);
};
