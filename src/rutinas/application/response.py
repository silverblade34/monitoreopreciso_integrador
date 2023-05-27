import requests, json
class RutinasResponse:
    def listarRutinas(self):
        # rutinasDatabase = self.consumirRutinasDatabase()
        # rutinasPreciso = self.consumirRutinasPreciso()
        # listaRutas = self.listarRutas()
        # listaRutasParseada = []
        # for rutina in rutinasDatabase:
        #     rutinaparse = {}
        #     for ruta in listaRutas:
        #         if rutina["idruta"] == ruta["id"]:
        #             rutinaparse["nameruta"] = ruta["nombre"]
        rutinasfinal = {}
        rutinasPreciso = self.consumirRutinasPreciso()
        for rutina in rutinasPreciso["data"]:
            ruta = rutina["ruta"]
            if ruta not in rutinasfinal:
                rutinasfinal[ruta] = []
            rutinasfinal[ruta].append(rutina)
        return rutinasfinal    
    
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
    
    def listarRutas(self):
        resp = requests.get("http://localhost:4000/api/v1/rutas/listar")
        data = resp.json()
        return data
    
    def listarVehiculos(self):
        resp = requests.get("http://localhost:4000/api/v1/rutas/listar")
        data = resp.json()
        return data