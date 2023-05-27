//  ----------VISTA DE IMAGENES ALEATORIAS EN EL LOGIN--------------
function randombg() {
  var random = Math.floor(Math.random() * 3) + 0;
  var bigSize = [
    "url('https://gesab.com/wp-content/uploads/2019/02/cabecera-centro-control-web.jpg')",
    "url('https://ubitec.mx/wp-content/uploads/2020/03/UbiTec-Flotillas.jpg')",
    "url('https://www.trackperu.com/wp-content/uploads/2021/01/Servidor-gps.jpg')",
    "url('https://mercadovial.tv/wp-content/uploads/2022/09/Electricos_3-scaled.jpg')",
  ];
  document.getElementById("right").style.backgroundImage = bigSize[random];
}

//  ----------FUNCION PARA PONER VISIBLE O NO EL PASSWOORD--------------
document.getElementById("password-toggle").addEventListener("click", function () {
  var input = document.getElementById("password-input");
  if (input.type === "password") {
    this.classList.remove("fa-eye");
    this.classList.add("fa-eye-slash");
    input.type = "text";
  } else {
    this.classList.remove("fa-eye-slash");
    this.classList.add("fa-eye");
    input.type = "password";
  }
});

// -------------VALIDAR EL LOGIN CONECTANDOSE A PYTHON-------------------
document.getElementById('login-form').addEventListener('submit', login);

function login(event) {
  event.preventDefault(); // prevenir que se recargue la página
    // Obtener los valores del usuario y contraseña desde el formulario
    const hiddenLoa = document.getElementById("hidden-loader");
    hiddenLoa.style.display = "flex";
    const usuario = document.getElementById('usuario').value;
    const password = document.getElementById('password-input').value;
    // Realizar una petición POST al endpoint /login del backend con los valores del usuario y contraseña
    fetch('/validar_login', {
      method: 'POST',
      body: JSON.stringify({usuario, password}),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      hiddenLoa.style.display = "none";
      // Verificar si el usuario y contraseña son correctos
      if (data.status == true) {
        const token = data.token
        console.log(data)
        console.log(token)
        // Guardar el token en sessionStorage
        sessionStorage.setItem('token', data.token);
        window.location.href = "/dashboard";

        // Redirigir al usuario a la vista del dashboard en Flask
      } else {
        if(data.servidor == true){
          // Mostrar un mensaje de error si el usuario y contraseña son incorrectos
          const alert = document.getElementById("alert-message-login")
          // Establecer el mensaje en el elemento alert
          alert.innerHTML = `<span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span> ${data.message}`;
          // Establece el estilo display del elemento alert en 'block'
          alert.style.display = 'block';
        }else{
          Swal.fire({
            title: "Error",
            text: data.message,
            icon: "error"
          });
        }
      }
    })
    .catch(error => {
      hiddenLoa.style.display = "none";
       window.onload = function () {
        Swal.fire({
        title: "Error",
        text: "Hubo un error al conectarse al servidor",
        icon: "error"
      });
    };
    });
}
  