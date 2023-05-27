from flask import Flask
from flask_cors import CORS
from redis import Redis
import uuid
import os

app = Flask(__name__)

# Configurar Redis
#redis = Redis(host='redis', port=6379)
redis = Redis(host='127.0.0.1', port=6379)
redis.config_set('timeout', '36000')
CORS(app)

# Importar los módulos de rutas después de la inicialización de Flask-Session y la configuración de CORS
import routes.credential_route
import routes.rutas_route
import routes.dashboard_route
import routes.reportes_route

# Importar la función de manejo de errores 404 de la ruta de páginas
from routes.paginas_route import pagina_no_encontrada
if __name__ == '__main__':
    # Registrar la función de manejo de errores 404
    app.register_error_handler(404, pagina_no_encontrada)
    
    # Iniciar la aplicación de Flask en modo debug
    app.run(debug=True)
