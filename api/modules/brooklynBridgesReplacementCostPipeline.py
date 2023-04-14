from typing import Generator
from .fetchS3 import fetch_s3

def brooklyn_bridges_replacement_cost_pipeline() -> Generator[dict, None, None]:
	# array of rows
	# each row is array of string items
	rows = (i.decode('utf-8').rstrip().split(',') for i in fetch_s3(False, True))

	heading = rows.__next__()

	dictionaries = (dict(zip(heading, data)) for data in rows)

	replacementBrooklyn = (int(dictionary["REPLACEMENT COST"]) for dictionary in dictionaries if dictionary["BORO"] == "K")

	replacementBrooklynTotal = 0
	for i in replacementBrooklyn:
		replacementBrooklynTotal += i

	returnData = {
		'data': replacementBrooklynTotal,
	}

	yield returnData
