from flask import Flask, request, render_template, redirect, url_for, session 
from flask_cors import CORS
from app import redis
from src.dashboard.infrastructure.controller import DashboardController
from src.rutinas.infrastructure.controller import RutinasController
import requests, uuid, json

#from app import app
from __main__ import app
CORS(app)

@app.route('/', methods=['GET'])
def index():
    usuario = redis.get('usuario')
    if usuario is not None:
        return redirect(url_for('dashboard'))
    else:
        return redirect(url_for('login'))
    
@app.route('/dashboard', methods=['GET'])
def dashboard():
    _dashCL = DashboardController()
    datarutas = _dashCL.listarClasesTarjetas()
    return render_template('dashboard.html', datarutas = datarutas, link="dash")

@app.route('/monitoreo', methods=['GET'])
def monitoreo():
    return render_template('monitoreo.html',link="moni")

@app.route('/rutas', methods=['GET'])
def rutas():
    _dashCL = DashboardController()
    datarutas = _dashCL.listarClasesTarjetas()
    return render_template('rutas.html',datarutas = datarutas,  link="rutas")

@app.route('/rutinas', methods=['GET'])
def rutinas():
    _rutinasCL = RutinasController()
    datarutinas = _rutinasCL.listarRutinas()
    return render_template('rutinas.html',datarutinas = datarutinas["data"],  link="rutinas")

def pagina_no_encontrada(error):
    return render_template('404.html')