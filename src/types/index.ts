export type TimeZoneData = {
	datetime: string;
	timezone_name: string;
	timezone_location: string;
	timezone_abbreviation: string;
	gmt_offset: number;
	is_dst: boolean;
	requested_location: string;
	latitude: number;
	longitude: number;
};

export type OpenWeatherMapType = {
	coord: {
		lon: number;
		lat: number;
	};
	weather: {
		id: number;
		main: string;
		description: string;
		icon: string;
	}[];
	base: string;
	main: {
		temp: number;
		feels_like: number;
		temp_min: number;
		temp_max: number;
		pressure: number;
		humidity: number;
	};
	visibility: number;
	wind: {
		speed: number;
		deg: number;
	};
	clouds: {
		all: number;
	};
	dt: number;
	sys: {
		type: number;
		id: number;
		country: string;
		sunrise: number;
		sunset: number;
	};
	timezone: number;
	id: number;
	name: string;
	cod: number;
};

export type AboutCSVBPostType = {
	userId: number;
	id: number;
	title: string;
	body: string;
};

export type HydrateActionType = {
	type: '__NEXT_REDUX_WRAPPER_HYDRATE__';
	payload: any;
};

export type ActionLoadPromiseType = {
	type: string[];
	httpClientPromise: Promise<any>;
};

export type BridgeRatingType = {
	BIN: string;
	Borough: string;
	Bridge: string;
	CurrentRating: number;
	VerbalRating: string;
	ReplacementCost: number;
};

export type StyledThemeType = {
	textColor: string;
	backgroundColor: string;
	navBarColor: string;
	spinnerColor: string;
	rutgersScarlet: string;
};

export type DateNowType = {
	time: number;
	message: string;
	status: number;
};

export type DateNowErrorType = {
	message: string;
	status: number;
};

export type User = {
	id: number;
	name: string;
};

export type TimeZoneType = {
	gc: string | undefined;
};

export type LatLonType = {
	lat: number;
	lon: number;
	gc: string | undefined;
};

export type FilterCharacterType = {
	name?: string;
	status?: string;
	species?: string;
	type?: string;
	gender?: string;
};

export type QueryResolverCharacterIDArgs = {
	id: string;
};

export type QueryResolverCharacterIDSArgs = {
	ids: QueryResolverCharacterIDArgs[];
};

export type QueryResolverCharactersArgs = {
	page?: number;
	filter?: FilterCharacterType;
};

export type Character = {
	__typename: string;
	name: string;
	image: string;
};

export type CharactersInfo = {
	__typename: string;
	next: number | null;
	prev: number | null;
	pages: number;
	count: number;
};

export type TodosType = {
	data?: {
		id: number
		item: string
	}[];
	error?: string;
};

export type FibonacciType = {
	data?: number[];
	error?: string;
};

export type NycCountyType = {
	data?: string;
	error?: string;
};

export type BridgeRatingsFullType = {
	data?: string;
	error?: string;
};
