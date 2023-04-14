from os import environ as env
import boto3
from typing import Generator
#from sys import getsizeof

def fetch_s3(test: bool, iterLines: bool, testConfigObj: dict={}) -> Generator[bytes, None, None]:
	if test == True and "region" in testConfigObj:
		try:
			VERCEL_PUBLIC_S3_REGION = testConfigObj['region']
			VERCEL_PUBLIC_ACCESS_KEY = testConfigObj['ak']
			VERCEL_PUBLIC_SECRET_KEY = testConfigObj['sk']
			VERCEL_PUBLIC_S3_BUCKET = testConfigObj['bucket']
			VERCEL_PUBLIC_S3_BUCKET_KEY = testConfigObj['key']
		except Exception as error:
			print(error)
			raise
	elif test == False and not "region" in testConfigObj:
		try:
			VERCEL_PUBLIC_S3_REGION = env['VERCEL_PUBLIC_S3_REGION']
			VERCEL_PUBLIC_ACCESS_KEY = env['VERCEL_PUBLIC_ACCESS_KEY']
			VERCEL_PUBLIC_SECRET_KEY = env['VERCEL_PUBLIC_SECRET_KEY']
			VERCEL_PUBLIC_S3_BUCKET = env['VERCEL_PUBLIC_S3_BUCKET']
			VERCEL_PUBLIC_S3_BUCKET_KEY = env['VERCEL_PUBLIC_S3_BUCKET_KEY']
		except Exception as error:
			print(error)
			raise
	else:
		print('*** fetch_s3() is Missing Required Arguments ***')
		raise

	session = boto3.Session()

	s3 = session.client(
		's3',
		region_name=VERCEL_PUBLIC_S3_REGION,
		aws_access_key_id=VERCEL_PUBLIC_ACCESS_KEY,
		aws_secret_access_key=VERCEL_PUBLIC_SECRET_KEY,
	)

	s3_ob = s3.get_object(
		Bucket=VERCEL_PUBLIC_S3_BUCKET,
		Key=VERCEL_PUBLIC_S3_BUCKET_KEY,
	)

	# https://botocore.amazonaws.com/v1/documentation/api/latest/reference/response.html
	# Return an iterator to yield lines from the raw stream
	# This is achieved by reading chunk of bytes (of size chunk_size) at a time from the raw stream, and then yielding lines from there
	if iterLines:
		for chunk in s3_ob['Body'].iter_lines(): # <<<<<<<<<<<<
			yield chunk
	else:
		for chunk in s3_ob['Body']:
			yield chunk
