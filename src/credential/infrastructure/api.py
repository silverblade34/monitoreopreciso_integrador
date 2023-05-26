from flask import Flask, request, json
import requests, hashlib
from config import API_SERVER

class ApiConnection:
    @staticmethod
    def connectionApi(user, pasw):
        url = f'{API_SERVER}/api/v1/login'
        hed = {"Content-Type": "application/json"}  
        body = {"user": user, "pass" : pasw}
        resp = requests.post(url, data= json.dumps(body), headers= hed)
        rawData = resp.json()
        return rawData
