from fastapi.testclient import TestClient
from ..index import app

client = TestClient(app)

def test_valid_id_path_param_1():
	response = client.get('/nyccounty/1')
	assert response.status_code == 200
	assert response.json() == {
		"data": "Bronx"
	}

def test_valid_id_path_param_5():
	response = client.get('/nyccounty/5')
	assert response.status_code == 200
	assert response.json() == {
		"data": "Richmond"
	}

def test_invalid_id_path_param():
	response = client.get('/nyccounty/1000')
	assert response.status_code == 400
	assert response.json() == {
		"error": "Error attempting to fetch resource."
	}
