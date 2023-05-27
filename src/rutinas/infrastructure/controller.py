from src.rutinas.application.response import RutinasResponse
class RutinasController:
    def listarRutinas(self):
        response = RutinasResponse()
        data = response.consumirRutinasPreciso()
        return data
    
    def listarRutinasMonitoreo(self):
        response = RutinasResponse()
        data = response.listarRutinas()
        return data