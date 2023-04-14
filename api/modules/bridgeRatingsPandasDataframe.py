from .fetchS3 import fetch_s3
import pandas as pd

def bridge_ratings_pandas_dataframe():
	rows = (i.decode('utf-8').rstrip().split(',') for i in fetch_s3(False, True))

	heading = rows.__next__()
	dictionaries = (dict(zip(heading, data)) for data in rows)

	dfData = {
		'BIN': [],
		'Borough': [],
		'Feature Carried': [],
		'Current Rating': [],
		'Verbal Rating': [],
		'Replacement Cost': [],
		'Latitude': [],
		'Longitude': []
	}

	for i in dictionaries:
		if i['BORO'] == 'M' and i['Verbal Rating'] == 'POOR':
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

			dfData['BIN'].append(i['BIN'])
			dfData['Borough'].append(i['BORO'])
			dfData['Feature Carried'].append(i['FEATURE CARRIED'])
			dfData['Current Rating'].append(i['Current Rating*'])
			dfData['Verbal Rating'].append(i['Verbal Rating'])
			dfData['Replacement Cost'].append(i['REPLACEMENT COST'])
			dfData['Latitude'].append(i['X - COORD  (LAT)'])
			dfData['Longitude'].append(i['Y - COORD   (LON)'])

	df = pd.DataFrame(dfData)
	dfDeDuped = df.drop_duplicates('BIN')
	return dfDeDuped
