var socket = io();

var params = new URLSearchParams(window.location.search);

if (!params.has("nombre") || !params.has("sala")) {
  window.location = "index.html";
  throw new Error("El nombre y sala son necesarios");
}

var usuario = {
  nombre: params.get("nombre"),
  sala: params.get("sala"),
};

// ON: escuchar procesos.

socket.on("connect", function () {
  console.log("Conectado al servidor");

  socket.emit("entrarChat", usuario, function (resp) {
    console.log("Usuarios conectados: ");
    console.log(resp);
  });
});

socket.on("disconnect", function () {
  console.log("Perdimos conexión con el servidor");
});

socket.on("crearMensaje", function (mensaje) {
  console.log("Servidor: ");

  console.log(mensaje);
});

//Escuchar cambios de usuarios
//Cuando un usuario entra o sale del chat

socket.on("listaPersona", function (usuarios) {
  console.log(usuarios);
});

socket.on("mensajePrivado", function (mensaje) {
  console.log("Mensaje privado: ");

  console.log(mensaje);
});
