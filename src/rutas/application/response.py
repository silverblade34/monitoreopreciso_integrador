import requests, json

class RutasResponse:
    def crearRutasResponse(self, dataruta):
        headers = {
            'Content-Type': 'application/json'
        }
        resp = requests.post("http://localhost:4000/api/v1/rutas/create",
                             data=json.dumps(dataruta), headers=headers)
        data = resp.json()
        return data
    
    def eliminarRutasResponse(self, idruta):
        resp = requests.delete(f"http://localhost:4000/api/v1/rutas/delete/{idruta}")
        data = resp.json()
        return data
    
    def buscarRutaResponse(self, idruta):
        resp = requests.get("http://localhost:4000/api/v1/rutas/listar")
        data = resp.json()
        for ruta in data:
            if ruta["id"] == int(idruta):
                return ruta
