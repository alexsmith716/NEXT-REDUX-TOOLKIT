import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

//@ts-ignore
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	try {
		let location:string | string[] | undefined = req.query.location;

		const returned = await axios(`https://timezone.abstractapi.com/v1/current_time/?api_key=${process.env.NEXT_PUBLIC_APP_ID_B}&location=${location}`);
		if(returned.status > 299 || Object.keys(returned.data).length === 0) {
			res.status(400).json({error: 'error'});
		} else {
			res.status(returned.status).json(returned.data);
		}
	} catch (error) {
		res.status(400).json({error: 'error'});
	}
};
