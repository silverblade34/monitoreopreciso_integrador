from src.reportes.application.response import ReportesResponse

class ReportesController:
    def buscarReportesRutinas(self,dataconsulta):
        response = ReportesResponse()
        data = response.consultarReportesRutinas(dataconsulta)
        return data