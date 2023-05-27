$(document).ready(function () {
    const tablaRutas = $('#tabla-rutas').DataTable({
        dom: 'Bfrtip',
        buttons: ['excel']
      });  
    document.getElementById("loader").style.display = "none";
    // Agregar evento de envío al formulario
    const consultaForm = document.getElementById('consulta-form');
    consultaForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Evitar que se envíe el formulario de forma predeterminada
        // Obtener los valores de los campos del formulario
        document.getElementById("loader").style.display = "flex";
        const ruta = document.getElementById('ruta-select').value;
        const fechaInicio = new Date(document.getElementById('fecha-inicio-input').value).getTime() / 1000; // Convertir a fecha Unix
        const fechaFin = new Date(document.getElementById('fecha-fin-input').value).getTime() / 1000; // Convertir a fecha Unix
        // Realizar la solicitud al servidor utilizando Fetch
        fetch('/reporte_rutinas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                data: {
                    ruta: ruta,
                    fechaIni: fechaInicio,
                    fechaFin: fechaFin,
                    ruc: "1790293092001",
                }
            })
        })
            .then(function (response) {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Error en la solicitud');
                }
            })
            .then(function (data) {
                tablaRutas.clear();
                data.data.forEach(function (registro) {
                    tablaRutas.row.add([
                        registro.fecha,
                        registro.placa,
                        registro.ruta,
                        registro.rutina,
                        registro.adelantadostotal,
                        registro.atrasadostotal
                    ]).draw(false);
                });
                document.getElementById("loader").style.display = "none";
            })

            .catch(function (error) {
                document.getElementById("loader").style.display = "none";
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Se dio un error al buscar rutinas'
                });
            });
    });
});
