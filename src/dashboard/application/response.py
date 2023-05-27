import requests
import json
from datetime import datetime


class DashboardResponse:
    def listarRutasTarjetas(self):
        resp = requests.get("http://localhost:4000/api/v1/rutas/listar")
        data = resp.json()
        return data

    def listarEstadoRutinas(self):
        rutinasDatabase = self.consumirRutinasDatabase()
        rutinasPreciso = self.consumirRutinasPreciso()
        databaseAnalizado = self.analizarRutinasDatabase(rutinasDatabase)
        precisoAnalizado = self.analizarRutinasPreciso(rutinasPreciso["data"])
        dataGraficos = {
            "conAtraso": databaseAnalizado["conAtraso"] + precisoAnalizado["conAtraso"],
            "conAdelantamiento": databaseAnalizado["conAdelantamiento"] + precisoAnalizado["conAdelantamiento"],
            "sinSalirRutina": databaseAnalizado["sinSalirRutina"],
            "sinUnidadAsignada": databaseAnalizado["sinUnidadAsignada"]
        }
        return dataGraficos

    def consumirRutinasDatabase(self):
        resp = requests.get("http://localhost:4000/api/v1/rutinas/listar")
        data = resp.json()
        return data

    def consumirRutinasPreciso(self):
        dataEnviar = {
            "token": "221011ab1e4a4e2fa502539fb5345371", "depot": 6090
        }
        headers = {
            'Content-Type': 'application/json'
        }
        resp = requests.post("http://localhost:4000/api/v1/rutinas_preciso",
                             data=json.dumps(dataEnviar), headers=headers)
        data = resp.json()
        return data

    def analizarRutinasDatabase(self, rutinasDatabase):
        conAtraso = 0
        sinSalirRutina = 0
        conAdelantamiento = 0
        sinUnidadAsignada = 0
        for rutinas in rutinasDatabase:
            if rutinas["paradas"][0]["horaejecutada"] == "":
                sinSalirRutina = sinSalirRutina + 1
            else:
                for i in range(len(rutinas["paradas"])):
                    if rutinas["paradas"][i]["horaejecutada"] == "":
                        if i > 0:
                            horaplanificada_anterior = datetime.strptime(
                                rutinas["paradas"][i - 1]["horaplanificada"], "%H:%M")
                            horaejecutada_anterior = datetime.strptime(
                                rutinas["paradas"][i - 1]["horaejecutada"], "%H:%M")
                            diferencia = horaplanificada_anterior - horaejecutada_anterior
                            if diferencia.total_seconds() > 0:
                                conAtraso = conAtraso + 1
                            elif diferencia.total_seconds() < 0:
                                conAdelantamiento = conAdelantamiento + 1
            if rutinas["idvehiculo"] == 0:
                sinUnidadAsignada = sinUnidadAsignada + 1
        dataGraficos = {
            "conAtraso": conAtraso,
            "sinSalirRutina": sinSalirRutina,
            "conAdelantamiento": conAdelantamiento,
            "sinUnidadAsignada": sinUnidadAsignada
        }
        return dataGraficos

    def analizarRutinasPreciso(self, rutinasPreciso):
        conAtraso = 0
        conAdelantamiento = 0
        for rutinas in rutinasPreciso:
            if (rutinas["adelantadostotal"] + rutinas["adelantadostotal"]) > 0:
                conAdelantamiento = conAdelantamiento + 1
            else:
                conAtraso = conAtraso + 1
        dataGraficos = {
            "conAtraso": conAtraso,
            "conAdelantamiento": conAdelantamiento,
        }
        return dataGraficos

    def contarRutinasRuta(self, rutinasDatabase, rutinasPreciso):
        pass