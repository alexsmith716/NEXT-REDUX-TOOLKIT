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
	BIN: String;
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

export type CurrencyCommasType = {
	data?: number;
	error?: string;
};

export type BridgeRatingsFullType = {
	data?: string;
	error?: string;
};

export type BridgeRatingsType = {
	data?: string;
	error?: string;
};

//  export type DfTableSchemaFieldType  = {
//    name?: string;
//    type?: string | number;
//  };
//  
//  export type DfTableDataType = {
//    index?: number;
//    BIN?: number;
//    Borough?: string;
//    FeatureCarried?: string;
//    CurrentRating?: number;
//    VerbalRating?: string;
//    ReplacementCost?: number;
//    Latitude?: number;
//    Longitude?: number;
//  };
//  
//  export type BridgeRatingsDataFrameType = {
//    data?: {
//      schema: {
//        fields: DfTableSchemaFieldType[];
//      };
//      data: DfTableDataType[];
//    };
//    error?: string;
//  };
