const detalleParadas = document.querySelectorAll(".ver-detalle-paradas");

detalleParadas.forEach(editarCuentaMaestra => {
  editarCuentaMaestra.addEventListener("click", function () { 
    const rutinaID = this.dataset.rutinaId;
    const rutinaDetail = this.dataset.rutinaDetails;
    Swal.fire({
        html: `
        <p class="pt-2 pb-2">Ruta ${rutinaID} rutina ${rutinaDetail}</p>
        <span class="parada-rutina-modal header"> <span> Paradas</span> <span> HPlanificada</span> </span>
        <span class="parada-rutina-modal"> <span> Parada 1</span> <span> 05:20</span> </span>
        <span class="parada-rutina-modal"> <span> Parada 2</span> <span> 05:30</span> </span>
        <span class="parada-rutina-modal"> <span> Parada 3</span> <span> 05:40</span> </span>
        <span class="parada-rutina-modal"> <span> Parada 4</span> <span> 06:00</span> </span>
        <span class="parada-rutina-modal"> <span> Parada 5</span> <span> 06:20</span> </span>
        <span class="parada-rutina-modal"> <span> Parada 6</span> <span> 06:40</span> </span>
        `,
        showCancelButton: false,
        confirmButtonText: 'Aceptar',
    }
    )
  })})

