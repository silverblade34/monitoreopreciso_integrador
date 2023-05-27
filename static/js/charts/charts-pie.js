/**
 * For usage, visit Chart.js docs https://www.chartjs.org/docs/latest/
 */

$(document).ready(function () {
  document.getElementById("loader").style.display = "flex";
  // Llamada a la función de renderizado de la tabla con callback
  insertarChartSeguimiento();

  // Retraso de 2 segundos antes de ocultar el loader
  setTimeout(function () {
    document.getElementById("loader").style.display = "none";
  }, 6000);
});

function crearGraficoBarras() {
  // Obtener una referencia al elemento canvas del DOM
  const $grafica = document.querySelector("#graficabarras");
  // Las etiquetas son las que van en el eje X. 
  const etiquetas = ["RUTA08", "RUTA115", "RUTA50"]
  // Podemos tener varios conjuntos de datos. Comencemos con uno
  const datosVentas2020 = {
    label: "Rutinas del mes por ruta",
    data: [5000, 1500, 8000], // La data es un arreglo que debe tener la misma cantidad de valores que la cantidad de etiquetas
    backgroundColor: ['#ca8a04', '#ca8a04','#ca8a04', '#dc2626'], // Color de fondo
  };
  new Chart($grafica, {
    type: 'bar',// Tipo de gráfica
    data: {
      labels: etiquetas,
      datasets: [
        datosVentas2020,
        // Aquí más datos...
      ]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }],
      },
    }
  });
}

function insertarChartSeguimiento() {
  fetch('/listar_rutinas', {
    method: "GET",
  })// Reemplaza '/ruta/datos' con la URL de tu endpoint en el servidor
    .then(response => response.json()) // Convertir la respuesta a formato JSON
    .then(data => {
      console.log(data);
      const total = data.conAtraso + data.conAdelantamiento + data.sinSalirRutina + data.sinUnidadAsignada
      document.getElementById("totalrutinas").innerText = total;
      const pieConfig = {
        type: 'doughnut',
        data: {
          datasets: [
            {
              data: [data.conAtraso, total - data.conAtraso],
              /**
               * These colors come from Tailwind CSS palette
               * https://tailwindcss.com/docs/customizing-colors/#default-color-palette
               */
              backgroundColor: ['#0694a2', '#8b8b8b'],
              label: 'Dataset 1',
            },
          ],
          labels: ['Con atraso'],
        },
        options: {
          responsive: true,
          cutoutPercentage: 80,
          /**
           * Default legends are ugly and impossible to style.
           * See examples in charts.html to add your own legends
           *  */
          legend: {
            display: false,
          },
        },
      }
      // change this to the id of your chart element in HMTL
      const pieCtx = document.getElementById('pie')
      window.myPie = new Chart(pieCtx, pieConfig)

      const pieConfig2 = {
        type: 'doughnut',
        data: {
          datasets: [
            {
              data: [data.conAdelantamiento, total - data.conAdelantamiento],
              /**
               * These colors come from Tailwind CSS palette
               * https://tailwindcss.com/docs/customizing-colors/#default-color-palette
               */
              backgroundColor: ['#1c64f2', '#8b8b8b'],
              label: 'Dataset 1',
            },
          ],
          labels: ['Con adelantamiento'],
        },
        options: {
          responsive: true,
          cutoutPercentage: 80,
          /**
           * Default legends are ugly and impossible to style.
           * See examples in charts.html to add your own legends
           *  */
          legend: {
            display: false,
          },
        },
      }
      // change this to the id of your chart element in HMTL
      const pieCtx2 = document.getElementById('pie2')
      window.myPie = new Chart(pieCtx2, pieConfig2)

      const pieConfig3 = {
        type: 'doughnut',
        data: {
          datasets: [
            {
              data: [data.sinSalirRutina, total - data.sinSalirRutina],
              /**
               * These colors come from Tailwind CSS palette
               * https://tailwindcss.com/docs/customizing-colors/#default-color-palette
               */
              backgroundColor: ['#7e3af2', '#8b8b8b'],
              label: 'Dataset 1',
            },
          ],
          labels: ['Sin salir a la rutina'],
        },
        options: {
          responsive: true,
          cutoutPercentage: 80,
          /**
           * Default legends are ugly and impossible to style.
           * See examples in charts.html to add your own legends
           *  */
          legend: {
            display: false,
          },
        },
      }
      // change this to the id of your chart element in HMTL
      const pieCtx3 = document.getElementById('pie3')
      window.myPie = new Chart(pieCtx3, pieConfig3)

      const pieConfig4 = {
        type: 'doughnut',
        data: {
          datasets: [
            {
              data: [data.sinUnidadAsignada, total - data.sinUnidadAsignada],
              /**
               * These colors come from Tailwind CSS palette
               * https://tailwindcss.com/docs/customizing-colors/#default-color-palette
               */
              backgroundColor: ['#ca8a04', '#8b8b8b'],
              label: 'Dataset 1',
            },
          ],
          labels: ['Sin unidad asignada'],
        },
        options: {
          responsive: true,
          cutoutPercentage: 80,
          /**
           * Default legends are ugly and impossible to style.
           * See examples in charts.html to add your own legends
           *  */
          legend: {
            display: false,
          },
        },
      }
      // change this to the id of your chart element in HMTL
      const pieCtx4 = document.getElementById('pie4')
      window.myPie = new Chart(pieCtx4, pieConfig4)

      crearGraficoBarras();
    })
    .catch(error => {
      // Manejo de errores en caso de que la consulta falle
      console.error('Error al obtener los datos del servidor:', error);
    });
}



