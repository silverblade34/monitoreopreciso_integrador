from src.dashboard.application.response import DashboardResponse

class DashboardController:
    def listarClasesTarjetas(self):
        response = DashboardResponse()
        data = response.listarRutasTarjetas()
        return data
    
    def listarEstadoRutinas(self):
        response = DashboardResponse()
        data = response.listarEstadoRutinas()
        return data