export type Props = {
	disabled?: boolean;
	className?: string;
	//onClick?: () => void;
	onClick?(event: React.MouseEvent<HTMLButtonElement>): void;
	type?: 'button' | 'submit' | 'reset' | undefined;
	buttonText?: string;
};

export default function Button({ disabled=false, className, onClick, type='button', buttonText='button' }: Props) {
	return (
		<button disabled={disabled} className={`btn ${className}`} onClick={onClick} type={type}>
			{buttonText}
		</button>
	);
};
