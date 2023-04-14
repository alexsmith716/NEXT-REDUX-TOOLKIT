from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse, StreamingResponse

from .modules.fibonacci import fib_func
from .modules.verifyCredentials import verify_credentials
from .modules.brooklynBridgesReplacementCostPipeline import brooklyn_bridges_replacement_cost_pipeline
from .modules.bridgeRatingsPipeline import bridge_ratings_pipeline
from .modules.bridgeRatingsPandasDataframe import bridge_ratings_pandas_dataframe
from .modules.fetchS3 import fetch_s3

todos = [
	{
		"id": 1,
		"item": "Todo number one."
	},
	{
		"id": 2,
		"item": "Todo number two."
	},
	{
		"id": 3,
		"item": "Todo number three."
	},
	{
		"id": 4,
		"item": "Todo number four."
	},
]

nyc_counties = {}
nyc_counties[1] = "Bronx"
nyc_counties[2] = "Kings"
nyc_counties[3] = "New York"
nyc_counties[4] = "Queens"
nyc_counties[5] = "Richmond"

class CustomException(Exception):
	def __init__(self, name: str):
		self.name = name

app = FastAPI()

@app.exception_handler(CustomException)
async def CustomExceptionHandler(request: Request, exception: CustomException):
	return JSONResponse(status_code=400, content={"error": "Error attempting to fetch resource."})

@app.get('/todosapi/todos', tags=['todos'])
def get_todos() -> dict:
	if todos:
		return { "data": todos }
	else:
		raise CustomException(name = "error")

@app.get('/fibonacci/{len}', tags=['fibonacci'])
def get_fibonacci(len: int) -> dict:
	if len > 1:
		try:
			return { "data": fib_func(len) }
		except:
			raise CustomException(name = "error")
	else:
		raise CustomException(name = "error")

@app.get('/nyccounty/{id}', tags=['nyc_county'])
def get_nyc_county(id: int) -> dict:
	if id > 0 and id < 6:
		return { "data": nyc_counties[id] }
	else:
		raise CustomException(name = "error")

@app.get('/botosssgetobject/brooklynbridgesreplacementcost', tags=['brooklyn_bridges_replacement_cost'])
def get_brooklyn_bridges_replacement_cost():
	try:
		if verify_credentials():
			# for i in brooklyn_bridges_replacement_cost_pipeline():
			# 	return i
			return brooklyn_bridges_replacement_cost_pipeline().__next__()
	except Exception as error:
		print(error)
		raise CustomException(name = "error")

@app.get('/botosssgetobject/streambridgeratings', tags=['stream_bridge_ratings'])
def get_stream_bridge_ratings():
	try:
		if verify_credentials():
			return StreamingResponse(
				fetch_s3(False, False),
				media_type="text/csv",
				headers={
					"Content-Type": "text/csv",
				}
			)
	except Exception as error:
		print(error)
		raise CustomException(name = "error")

@app.get('/botosssgetobject/bridgeratings', tags=['bridge_ratings_pipeline'])
def get_bridge_ratings_pipeline():
	try:
		if verify_credentials():
			return StreamingResponse(
				bridge_ratings_pipeline(),
				media_type="text/csv",
				headers={
					"Content-Type": "text/csv",
				}
			)
	except Exception as error:
		print(error)
		raise CustomException(name = "error")

@app.get('/botosssgetobject/bridgeratingsdataframe', tags=['bridge_ratings_pandas_dataframe'])
def get_bridge_ratings_generator_pandas_dataframe():
	try:
		if verify_credentials():
			brgpdf = bridge_ratings_pandas_dataframe()
			dftj = brgpdf.to_json(orient='table')
			return dftj
	except Exception as error:
		print(error)
		raise CustomException(name = "error")

@app.get('/botosssgetobject/streambridgeratingstest', tags=['stream_bridge_ratings_test'])
def get_stream_bridge_ratings():
	try:
		if verify_credentials():
			rows = (i.decode('utf-8').rstrip().split(',') for i in fetch_s3(False, True))
			heading = rows.__next__()
			dictionaries = (dict(zip(heading, data)) for data in rows)
			return dictionaries
	except Exception as error:
		print(error)
		raise CustomException(name = "error")
