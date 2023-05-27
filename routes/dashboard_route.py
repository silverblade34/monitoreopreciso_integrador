from flask import Flask, request, render_template, redirect, url_for, session 
from flask_cors import CORS
from app import redis
from src.dashboard.infrastructure.controller import DashboardController
import requests, uuid, json

#from app import app
from __main__ import app
CORS(app)

@app.route('/listar_rutinas', methods=['GET'])
def listarRutinas():
  _dashCL = DashboardController()
  dataestadoRutinas = _dashCL.listarEstadoRutinas()
  return dataestadoRutinas