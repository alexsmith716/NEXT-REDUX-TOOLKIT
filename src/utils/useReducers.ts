export function incrementReducer(int: number, action: { [key: string]: string}) {
	switch (action.type) {
		case 'increment':
			return int + 1;
		case 'reset':
			return int = -1;
		default:
			throw new Error();
	}
};