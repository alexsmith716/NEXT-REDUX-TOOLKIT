import boto3
import pytest
from moto import mock_s3
from ..modules.verifyCredentials import verify_credentials
from ..modules.fetchS3 import fetch_s3

testConfigObj = {
	"region": 'us-east-1',
	"ak": 'testing',
	"sk": 'testing',
	"bucket": 'testbucket',
	"key": 'test_file.csv',
}

csv_string = '''BIN,BORO,FEATURE CARRIED,FEATURE CROSSED,RAIL ROAD,BRIDGE TYPE,OTHER OWNER,SPANS,RATING SOURCE,INSPECTION DATE,GENERAL RECOMMENDATION**,Current Rating*,Verbal Rating,DECK AREA (SQ FT),REPLACEMENT COST,X - COORD  (LAT),Y - COORD   (LON),CD,CD2,CD3
1065210,Q,WHITESTONE EXP NB,BCIP,,A,,1,STATE,06/07/2018,5,5.127,GOOD,2480,11160000,40.78975382,-73.82243394,407,,
1066510,B,BRUCKNER EXPWY SVC RD,WESTCHESTER CREEK,,WMA,,17,STATE,09/21/2018,3,3.104,FAIR,35000,157500000,40.8289655,-73.84271079,209,,'''

# # conftest.py
# @pytest.fixture(scope='function')
# def s3_resource():
# 	with mock_s3():
# 		s3 = boto3.resource(
# 			's3',
# 			aws_access_key_id='testing',
# 			aws_secret_access_key='testing',
# 			region_name='us-east-1'
# 		)
# 		yield s3

# @pytest.fixture
# def bucket_test_name():
# 	return "testbucket"

# @pytest.fixture
# def s3_test(s3_resource, bucket_test_name):
# 	s3_resource.create_bucket(Bucket=bucket_test_name)
# 	s3_resource.Bucket(bucket_test_name).upload_file('./api/tests/fixtures/test_file.csv', 'test_file.csv')

def test_get_object():
	with mock_s3():
		s3_resource = boto3.resource(
			's3',
			aws_access_key_id='testing',
			aws_secret_access_key='testing',
			region_name='us-east-1'
		)

		s3_resource.create_bucket(Bucket='testbucket')

		s3_resource.Bucket('testbucket').upload_file('./api/tests/fixtures/test_file.csv', 'test_file.csv')

		with open('./api/tests/fixtures/test_file.csv') as s:
			a = s.read()

		b = fetch_s3(True, False, testConfigObj).__next__().decode('utf-8')

		# 6 passed in 1.36s
		assert a == b
