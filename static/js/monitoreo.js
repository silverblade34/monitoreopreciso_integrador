var tableWrapper = document.querySelector(".table-wrapper");
var isDragging = false;
var startX;
var scrollLeft;

tableWrapper.addEventListener("mousedown", function(event) {
  isDragging = true;
  startX = event.pageX;
  scrollLeft = tableWrapper.scrollLeft;
});

tableWrapper.addEventListener("mousemove", function(event) {
  if (!isDragging) return;

  var moveX = event.pageX - startX;
  tableWrapper.scrollLeft = scrollLeft - moveX;
});

tableWrapper.addEventListener("mouseup", function() {
  isDragging = false;
});

tableWrapper.addEventListener("mouseleave", function() {
  isDragging = false;
});


//MOSTRAR OCULTAR RUTAS CORRESPONDIENTES

var rutaButtons = document.querySelectorAll(".ruta-btn");
var tablasContainer = document.getElementById("tablas-container");

rutaButtons.forEach(function(button) {
  button.addEventListener("click", function() {
    var ruta = this.dataset.ruta;

    // Ocultar todos los contenedores de ruta
    var rutaTablas = document.querySelectorAll(".ruta-tabla");
    rutaTablas.forEach(function(tabla) {
      tabla.classList.remove("show");
    });

    // Mostrar el contenedor correspondiente a la ruta seleccionada
    var rutaContainer = document.getElementById("ruta-" + ruta);
    rutaContainer.classList.add("show");
  });
});
