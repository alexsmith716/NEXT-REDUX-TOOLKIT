import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

//@ts-ignore
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	try {
		let lat:string | string[] | undefined = req.query.lat;
		let lon:string | string[] | undefined = req.query.lon;

		const returned = await axios(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.NEXT_PUBLIC_APP_ID}&units=imperial`);
		res.status(returned.status).json(returned.data);
	} catch (error) {
		res.status(400).json({error: 'error'});
	}
};
