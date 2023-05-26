from flask import Flask, request, render_template, redirect, url_for, session
from flask_cors import CORS
from src.credential.infrastructure.controller import CredentialController
import requests, uuid, json
from app import redis

#from app import app
from __main__ import app

CORS(app)

@app.route('/login', methods=['GET'])
def login():
    return render_template('login.html')

@app.route('/validar_login', methods=['POST'])
def validar_login():
    try:
        if str(request.json['usuario']) != "" and str(request.json['password']) != "":
            _credentialCL = CredentialController()
            datauser = _credentialCL.validarUsuario(request.json['usuario'], request.json['password'])
            print(json.dumps(datauser))
            if datauser["status"] == True:
                session_token = str(uuid.uuid4())
                # Guardar los datos de sesión del usuario en Redis con el token
                redis.set(f'logueado', "Logueado")
                redis.set(f'session:{session_token}:usuario', datauser["data"]["user"])
                redis.set(f'session:{session_token}:token', datauser["data"]["token"])
                redis.set(f'session:{session_token}:ruc', datauser["data"]["ruc"])
                redis.set(f'session:{session_token}:depot', datauser["data"]["depot"])
                return {
                        'status': True,
                        'token': session_token,
                        'servidor': True,
                    }
            elif datauser["status"] == False:
                return {
                    'status': False,
                    'message': 'Usuario no válido',
                    'servidor': True,
                }
        else:
            return {
                'status': False,
                'message': 'Usuario o contraseña sin completar',
                'servidor': True,
                'admin': False
            }
    except requests.exceptions.RequestException as e:
            mensaje_error = "Hubo un error al conectarse con la API. Por favor, inténtelo de nuevo más tarde."
            return {
                'status': False,
                'message': mensaje_error,
                'servidor': False,
                'admin': False
            }

@app.route('/dashboard', methods=['GET'])
def prueba():
    return render_template('dashboard.html')
    
@app.route('/logout', methods=['GET'])
def logout():
    session_token = request.args.get('token')
    redis.delete(f'session:{session_token}:usuario')
    redis.delete(f'session:{session_token}:datauser')
    redis.delete(f'session:{session_token}:user_admin')
    redis.delete(f'session:{session_token}:cod_admin')
    return redirect(url_for('login'))
