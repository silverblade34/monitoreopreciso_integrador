from src.rutinas.application.response import RutinasResponse
class RutinasController:
    def listarRutinas(self):
        response = RutinasResponse()
        data = response.listarRutinas()
        return data