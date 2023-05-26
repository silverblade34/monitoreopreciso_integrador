from flask import Flask, request, render_template, redirect, url_for, session 
from flask_cors import CORS
from app import redis
import requests, uuid, json

#from app import app
from __main__ import app
CORS(app)

def pagina_no_encontrada(error):
    return render_template('404.html'), 404