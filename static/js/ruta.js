// Obtener referencia al botón "Crear ruta"
const crearRutaBtn = document.getElementById('crear-ruta-btn');
crearRutaBtn.addEventListener('click', function () {
  // Mostrar el modal de SweetAlert con un formulario
  Swal.fire({
    title: 'Crear ruta',
    html: `
            <form class="form-crear-ruta">
                <div>
                    <p>Nombre de ruta:</p>
                    <input id="nombre-ruta" class="swal2-input" placeholder="Nombre de la ruta" />
                </div>
                <div>
                    <p>CodigoGPS:</p>
                    <input id="codigo-gps" class="swal2-input" placeholder="Código del GPS" />
                </div>
                <div>
                    <p>Detalles:</p>
                    <input id="detalles" class="swal2-input" placeholder="Parada 1 - Parada fin" />
                </div>
                <div id="paradas-container">
                    <p class="pb-2">Agregar paradas:</p>
                    <div class="parada">
                        <input class="parada-input" placeholder="Parada 1" />
                        <input class="codigo-gps-input" placeholder="Código GPS" />
                        <div>
                            <button type="button" class="agregar-parada-btn">+</button>
                            <button type="button" class="eliminar-parada-btn">-</button>
                        </div>
                    </div>
                </div>
            </form>
        `,
    showCancelButton: true,
    focusConfirm: false,
    preConfirm: () => {
      // Obtener los valores ingresados por el usuario
      const nombreRuta = document.getElementById('nombre-ruta').value;
      const codigoGPS = document.getElementById('codigo-gps').value;
      const detalles = document.getElementById('detalles').value;

      const paradasInputs = Array.from(document.getElementsByClassName('parada-input'));
      const codigosGPSInputs = Array.from(document.getElementsByClassName('codigo-gps-input'));

      const paradas = paradasInputs.map((input, index) => {
        const parada = {
          codigogps: codigosGPSInputs[index].value,
          orden: (index + 1).toString(),
          nombre: input.value
        };
        return parada;
      });

      // Construir el objeto de datos para enviar al servidor
      const datosRuta = {
        nombre: nombreRuta,
        codigogps: codigoGPS,
        detalles: detalles,
        paradas: paradas
      };

      fetch(`/crear_rutas`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ data: datosRuta })
      })
        .then(response => {
          if (!response.ok) {
            throw new Error("Error al crear ruta");
          }
          return response.json();
        })
        .then(data => {
          Swal.fire({
            title: "Agregado",
            text: "Ruta creada",
            icon: "success",
            showCancelButton: false, // muestra el botón de confirmación
            confirmButtonText: "Aceptar",
          }).then((result) => {
            if (result.isConfirmed) { // si se hizo clic en el botón de confirmación
              location.reload();
            }
          });
        })
        .catch(error => {
          Swal.fire("Error", "Error al crear ruta", "error");
        });
    }
  });
  // Agregar evento de clic al botón "Agregar parada" y "Eliminar parada"
  document.addEventListener('click', function (event) {
    if (event.target.classList.contains('agregar-parada-btn')) {
      const paradasContainer = document.getElementById('paradas-container');
      const nuevaParada = document.createElement('div');
      nuevaParada.classList.add('parada');
      nuevaParada.innerHTML = `
            <input class="parada-input" placeholder="Parada ${paradasContainer.childElementCount + 1}" />
            <input class="codigo-gps-input" placeholder="Código GPS" />
            <div>
                <button type="button" class="agregar-parada-btn">+</button>
                <button type="button" class="eliminar-parada-btn">-</button>
            </div>
        `;
      paradasContainer.appendChild(nuevaParada);
    } else if (event.target.classList.contains('eliminar-parada-btn')) {
      const parada = event.target.parentNode.parentNode;
      parada.parentNode.removeChild(parada);
    }
  });

});



const eliminarRutas = document.querySelectorAll(".eliminar-ruta");

eliminarRutas.forEach(eliminarRuta => {
  eliminarRuta.addEventListener("click", function () {
    const rutaID = this.dataset.rutaId;
    const rutaName = this.dataset.rutaName;
    Swal.fire({
      html: `
        <p class="pt-2 pb-2">¿Estás seguro de eliminar la ruta ${rutaName}?</p>
      `,
      showCancelButton: false,
      confirmButtonText: 'Aceptar',
      preConfirm: () => {
        // Enviar solicitud AJAX al servidor
        return fetch('/eliminar_ruta', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ rutaid: rutaID })
        })
          .then(response => {
            if (!response.ok) {
              throw new Error(response.statusText);
            }
            return response.json();
          })
          .then(data => {
            // Mostrar mensaje de éxito
            Swal.fire({
              icon: 'success',
              title: 'Ruta eliminada',
              text: `La ruta ${rutaName} ha sido eliminada`
            }).then(() => {
              location.reload(); // Recargar la página
            });

          })
          .catch(error => {
            // Mostrar mensaje de error
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'No se pudo eliminar la ruta'
            });
          });
      }
    });
  });
});


const crearRutinas = document.querySelectorAll(".crear-rutina-btn");

crearRutinas.forEach(crearRutina => {
  crearRutina.addEventListener("click", function () {
    const rutaID = this.dataset.rutaId;
    console.log(rutaID)
    // Realizar la solicitud al servidor para obtener los datos
    fetch('/buscar_rutas?rutaid=' + encodeURIComponent(rutaID))
      .then(function (response) {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Error en la solicitud');
        }
      })
      .then(function (data) {
        // Construir el formulario con los datos recibidos
        console.log(data);
        // Crear el contenido del formulario utilizando el HTML de SweetAlert
        const formContent = `
          <form class="form-crear-rutina">
            <div>
              <p>Rutina Inicio Fin:</p>
              <input id="incioFin" class="swal2-input" placeholder="10:30am - 12:50pm" />
            </div>
            <div>
              <p>Vehiculo asignado:</p>
              <select id="vehiculo-select" >
                        <option value="">Seleccione un vehiculo</option>
                        <option value="1">ASC-234</option>
                        <option value="2">BSC-234</option>
                        <option value="3">ESC-234</option>
              </select>
            </div>
            <div id="paradas-container-rutinas" class="pt-3">
              <p class="pb-2">Inserte una hora planificada</p>
              ${data.paradas
                .map(
                  (parada) => `
                  <div class="parada-horas">
                    <span>${parada.nombre}</span>
                    <div><input type="time"/></div>
                  </div>
                `
                )
                .join('')}
            </div>
          </form>
        `;
      
        // Mostrar el modal de SweetAlert con el formulario
        Swal.fire({
          title: 'Crear Rutina',
          html: formContent,
          showCancelButton: true,
          confirmButtonText: 'Crear',
          cancelButtonText: 'Cancelar',
        }).then((result) => {
          if (result.isConfirmed) {
            // Se hizo clic en el botón de crear, realizar acciones adicionales si es necesario
            
          }
        });
      });       
  });
})
