from src.rutas.application.response import RutasResponse

class RutasController:
    def creaRutas(self, dataruta):
        response = RutasResponse()
        data = response.crearRutasResponse(dataruta)
        return data
    
    def eliminarRuta(self, idruta):
        response = RutasResponse()
        data = response.eliminarRutasResponse(idruta)
        return data
    
    def buscarRuta(self, idruta):
        response = RutasResponse()
        data = response.buscarRutaResponse(idruta)
        return data