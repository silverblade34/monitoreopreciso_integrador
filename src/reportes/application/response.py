import requests, json
class ReportesResponse:
    def consultarReportesRutinas(self, dataconsulta):
        headers = {
            'Content-Type': 'application/json'
        }
        resp = requests.post("http://localhost:3222/api/v1/mostrar_rutinas",
                             data=json.dumps(dataconsulta), headers=headers)
        data = resp.json()
        return data