from typing import Generator
#from sys import getsizeof
from .fetchS3 import fetch_s3

def bridge_ratings_pipeline() -> Generator[str, None, None]:
	rows = (i.decode('utf-8').rstrip().split(',') for i in fetch_s3(False, True))

	heading = rows.__next__()
	dictionaries = (dict(zip(heading, data)) for data in rows)

	headers = (
		'BIN',
		'Borough',
		'Bridge',
		'CurrentRating',
		'VerbalRating',
		'ReplacementCost'
	)

	yield ",".join(headers)+"\n"

	for i in dictionaries:
		if i['BORO'] == 'B':
			i['BORO'] = 'Bronx'

		if i['BORO'] == 'BM':
			i['BORO'] = 'Bronx-Manhattan'

		if i['BORO'] == 'K':
			i['BORO'] = 'Brooklyn'

		if i['BORO'] == 'KM':
			i['BORO'] = 'Brooklyn-Manhattan'

		if i['BORO'] == 'KQ':
			i['BORO'] = 'Brooklyn-Queens'

		if i['BORO'] == 'M':
			i['BORO'] = 'Manhattan'

		if i['BORO'] == 'MQ':
			i['BORO'] = 'Manhattan-Queens'

		if i['BORO'] == 'Q':
			i['BORO'] = 'Queens'

		if i['BORO'] == 'R':
			i['BORO'] = 'Staten Island'

		values = (
			i['BIN'],
			i['BORO'],
			i['FEATURE CARRIED'],
			i['Current Rating*'],
			i['Verbal Rating'],
			i['REPLACEMENT COST']
		)

		yield ",".join(values)+"\n"
