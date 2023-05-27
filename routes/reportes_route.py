from flask import Flask, request, render_template, redirect, url_for, session 
from flask_cors import CORS
from app import redis
from src.reportes.infrastructure.controller import ReportesController
import requests, uuid, json

#from app import app
from __main__ import app
CORS(app)

@app.route('/reporte_rutinas', methods=['POST'])
def reporte_rutinas():
  _reportesCL = ReportesController()
  data = _reportesCL.buscarReportesRutinas(request.json["data"])
  return data