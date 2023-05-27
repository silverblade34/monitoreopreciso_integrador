from flask import Flask, request, render_template, redirect, url_for, session 
from flask_cors import CORS
from app import redis
from src.dashboard.infrastructure.controller import DashboardController
from src.rutas.infrastructure.controller import RutasController
import requests, uuid, json

#from app import app
from __main__ import app
CORS(app)

@app.route('/crear_rutas', methods=['POST'])
def crear_rutas():
  _rutasCL = RutasController()
  print(request.json["data"])
  dataestadoRutas = _rutasCL.creaRutas(request.json["data"])
  return dataestadoRutas

@app.route('/eliminar_ruta', methods=['POST'])
def eliminar_ruta():
  _rutasCL = RutasController()
  dataestadoRuta = _rutasCL.eliminarRuta(request.json["rutaid"])
  return dataestadoRuta

@app.route('/buscar_rutas', methods=['GET'])
def buscar_rutas():
  _rutasCL = RutasController()
  rutaid = request.args.get('rutaid')
  dataestadoRuta = _rutasCL.buscarRuta(rutaid)
  return dataestadoRuta