import { parse, unparse } from 'papaparse';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { CognitoIdentityClient } from '@aws-sdk/client-cognito-identity';
import { fromCognitoIdentityPool } from '@aws-sdk/credential-provider-cognito-identity';
import { BridgeRatingType } from '../types';

const region = process.env.NEXT_PUBLIC_S3_REGION;

const s3Client = new S3Client({
	region,
	credentials: fromCognitoIdentityPool({
		client: new CognitoIdentityClient({ region }),
		identityPoolId: process.env.NEXT_PUBLIC_S3_BUCKET_IP_ID!,
	}),
});

const getBridgeRatings = new GetObjectCommand({
	Bucket: process.env.NEXT_PUBLIC_S3_BUCKET,
	Key: process.env.NEXT_PUBLIC_S3_BUCKET_KEY,
});

function streamToString(stream: ReadableStream): Promise<string> {
	return new Promise((resolve, reject) => {
		if (stream instanceof ReadableStream === false) {
			reject();
		}
		let text = '';
		const decoder = new TextDecoder('utf-8');
		const reader = stream.getReader();

		function processRead(done: boolean, value: BufferSource | undefined): Uint8Array[] | undefined {
			if (done) {
				resolve(text);
				return;
			}
			text += decoder.decode(value);
			reader.read()
				.then((response) => {
					return processRead(response.done, response.value);
				})
		};
		reader.read()
			.then((response) => {
				return processRead(response.done, response.value);
			})
	});
}

async function doStreamToString(body: ReadableStream<any>) {
	try {
		const responseString: string = await streamToString(body);
		let data: BridgeRatingType[] | undefined;
		parse(responseString, {
			header: true,
			complete: (res) => {
				data = res.data.map((e: any): BridgeRatingType => {
					if (e['BORO'] === 'B') {
						e['BORO'] = 'Bronx';
					}
					if (e['BORO'] === 'BM') {
						e['BORO'] = 'Bronx-Manhattan';
					}
					if (e['BORO'] === 'K') {
						e['BORO'] = 'Brooklyn';
					}
					if (e['BORO'] === 'KM') {
						e['BORO'] = 'Brooklyn-Manhattan';
					}
					if (e['BORO'] === 'KQ') {
						e['BORO'] = 'Brooklyn-Queens';
					}
					if (e['BORO'] === 'M') {
						e['BORO'] = 'Manhattan';
					}
					if (e['BORO'] === 'MQ') {
						e['BORO'] = 'Manhattan-Queens';
					}
					if (e['BORO'] === 'Q') {
						e['BORO'] = 'Queens';
					}
					if (e['BORO'] === 'R') {
						e['BORO'] = 'Staten Island';
					}
					return {
						BIN: e['BIN'],
						Borough: e['BORO'],
						Bridge: e['FEATURE CARRIED'],
						CurrentRating: e['Current Rating*'],
						VerbalRating: e['Verbal Rating'],
						ReplacementCost: e['REPLACEMENT COST'],
					};
				});
			},
		});
		if (data !== undefined) {
			return unparse(data);
		}
	} catch (error) {
		return Promise.reject();
	}
}

export async function fetchBridgeRatings() {
	try {
		const response = await s3Client.send(getBridgeRatings);
		const stream = response.Body as ReadableStream;
		const data = await doStreamToString(stream);

		return Promise.resolve({ result: data });
	} catch (error) {
		return Promise.reject({ result: 'Error when attempting to fetch resource.' });
	}
}
