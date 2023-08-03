// Datos de ejemplo (camionetas)
let camionetasOriginales = [
  {
    empresa: "Grupo Neria",
    cabina: "Sencilla",
    numero: "001",
    modelo: "Modelo1",
  },
  {
    empresa: "Super Pollo ",
    cabina: "Doble",
    numero: "101",
    modelo: "Modelo2",
  },
  {
    empresa: "Grupo Neria",
    cabina: "Sencilla",
    numero: "002",
    modelo: "Modelo3",
  },
  {
    empresa: "Super Pollo ",
    cabina: "Doble",
    numero: "102",
    modelo: "Modelo4",
  },
  // Agrega más camionetas aquí si lo deseas
];

// Función para mostrar la lista de camionetas en la página
function mostrarCamionetas() {
  const camionetaSencillaGNList = document.getElementById(
    "camionetaSencillaGNList"
  );
  const camionetaSencillaSPNList = document.getElementById(
    "camionetaSencillaSPNList"
  );
  const camionetaDobleGNList = document.getElementById("camionetaDobleGNList");
  const camionetaDobleSPNList = document.getElementById(
    "camionetaDobleSPNList"
  );

  // Limpiar las listas antes de volver a mostrar los resultados
  camionetaSencillaGNList.innerHTML = "";
  camionetaSencillaSPNList.innerHTML = "";
  camionetaDobleGNList.innerHTML = "";
  camionetaDobleSPNList.innerHTML = "";

  let countSencillaSPN = 0;
  let countDobleGN = 0;

  camionetasOriginales.forEach((camioneta) => {
    const listItem = document.createElement("li");
    listItem.textContent = `${camioneta.empresa} - Cabina ${camioneta.cabina} - Número ${camioneta.numero} - Modelo ${camioneta.modelo}`;

    if (
      camioneta.empresa === "Grupo Neria" &&
      camioneta.cabina === "Sencilla"
    ) {
      const camionetaSencillaGNListItem = document.createElement("li");
      camionetaSencillaGNListItem.textContent = `${listItem.textContent}`;
      camionetaSencillaGNList.appendChild(camionetaSencillaGNListItem);
    } else if (
      camioneta.empresa === "Super Pollo Co" &&
      camioneta.cabina === "Sencilla"
    ) {
      countSencillaSPN++;
      const listItemWithNumber = document.createElement("li");
      listItemWithNumber.textContent = `${countSencillaSPN}. ${listItem.textContent}`;
      camionetaSencillaSPNList.appendChild(listItemWithNumber);
    } else if (
      camioneta.empresa === "Grupo Neria" &&
      camioneta.cabina === "Doble"
    ) {
      countDobleGN++;
      const listItemWithNumber = document.createElement("li");
      listItemWithNumber.textContent = `${countDobleGN}. ${listItem.textContent}`;
      camionetaDobleGNList.appendChild(listItemWithNumber);
    } else if (
      camioneta.empresa === "Super Pollo Co" &&
      camioneta.cabina === "Doble"
    ) {
      const camionetaDobleSPNListItem = document.createElement("li");
      camionetaDobleSPNListItem.textContent = `${listItem.textContent}`;
      camionetaDobleSPNList.appendChild(camionetaDobleSPNListItem);
    }
  });
}

// Función para filtrar la lista de camionetas por número
function filtrarPorNumero() {
  const input = document.getElementById("searchInput");
  const filterValue = input.value.toLowerCase();
  camionetasOriginales = camionetasOriginales.filter((camioneta) =>
    camioneta.numero.toLowerCase().includes(filterValue)
  );
  mostrarCamionetas();
}

document.addEventListener("DOMContentLoaded", mostrarCamionetas);
document
  .getElementById("searchInput")
  .addEventListener("input", filtrarPorNumero);
  function setRotuladoCookie(camionetaId, rotulado) {
    document.cookie = `rotulado_${camionetaId}=${rotulado}; path=/`;
  }
  
  function marcarCamioneta(btn) {
  const camionetaInfo = btn.parentNode;
  const numeroCamioneta = camionetaInfo.querySelector(".camioneta-info").textContent;
  const rotulado = btn.classList.contains("rotulado");

  const confirmation = confirm(`¿Desea rotular la camioneta ${numeroCamioneta}?`);
  if (confirmation) {
    if (rotulado) {
      btn.classList.remove("rotulado");
      btn.textContent = "Rotular";
      setRotuladoCookie(numeroCamioneta, "0");
    } else {
      btn.classList.add("rotulado");
      btn.textContent = "Rotulada";
      setRotuladoCookie(numeroCamioneta, "1");
    }
  }
}
function cargarEstadoCamionetas() {
  const camionetas = document.querySelectorAll(".camioneta");
  camionetas.forEach((camioneta) => {
    const numeroCamioneta = camioneta.querySelector(".camioneta-info").textContent;
    const rotulado = getRotuladoCookie(numeroCamioneta);

    const btn = camioneta.querySelector("button");
    if (rotulado === "1") {
      btn.classList.add("rotulado");
      btn.textContent = "Rotulada";
    } else {
      btn.classList.remove("rotulado");
      btn.textContent = "Rotular";
    }
  });
}

function getRotuladoCookie(camionetaId) {
  const name = `rotulado_${camionetaId}=`;
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookies = decodedCookie.split(";");

  for (const cookie of cookies) {
    let c = cookie;
    while (c.charAt(0) === " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

// Función para manejar el evento de rotulado de una camioneta
function marcarCamioneta(btn) {
  const confirmation = confirm("¿Desea rotular esta camioneta?");
  if (confirmation) {
    const camioneta = btn.closest(".camioneta");
    const numeroCamioneta = camioneta.querySelector(".camioneta-info:nth-child(1)").innerText.trim();

    if (btn.classList.contains("rotulado")) {
      btn.classList.remove("rotulado");
      btn.textContent = "Rotular";
      guardarEstadoCamioneta(numeroCamioneta, "no_rotulada");
    } else {
      btn.classList.add("rotulado");
      const fechaActual = new Date().toLocaleDateString(); // Obtener la fecha actual en formato "dd/mm/yyyy"
      btn.textContent = "Rotulada el " + fechaActual;
      guardarEstadoCamioneta(numeroCamioneta, "rotulada");
    }
  }
}

function buscarCamioneta() {
  const input = document.querySelector(".search-input");
  const textoBusqueda = input.value.trim().toLowerCase();

  const camionetas = document.querySelectorAll(".camioneta");
  camionetas.forEach((camioneta) => {
    const numeroCamioneta = camioneta.querySelector(".camioneta-info:nth-child(1)").innerText.toLowerCase();
    const modeloCamioneta = camioneta.querySelector(".camioneta-info:nth-child(2)").innerText.toLowerCase();
    const grupoCamioneta = camioneta.parentNode.querySelector("h2").textContent.toLowerCase();

    const textoCombinado = `${numeroCamioneta} ${modeloCamioneta} ${grupoCamioneta}`;

    if (textoBusqueda === "" || textoCombinado.includes(textoBusqueda)) {
      camioneta.style.display = "block";
    } else {
      camioneta.style.display = "none";
    }
  });
}

// Función para cargar el estado de rotulado y la fecha desde el almacenamiento local
function cargarEstadoCamionetas() {
  const camionetas = document.querySelectorAll(".camioneta");

  camionetas.forEach((camioneta) => {
    const numeroCamioneta = camioneta.querySelector(".camioneta-info:nth-child(1)").innerText.trim();
    const estadoRotulado = localStorage.getItem(numeroCamioneta + "-estado");
    const fechaRotulacion = localStorage.getItem(numeroCamioneta + "-fecha");

    if (estadoRotulado === "rotulada") {
      const btn = camioneta.querySelector("button");
      btn.classList.add("rotulado");
      btn.textContent = "Rotulada el " + fechaRotulacion; // Mostrar la fecha en el botón
    }
  });
}

// Función para guardar el estado de rotulado y la fecha en el almacenamiento local
function guardarEstadoCamioneta(numeroCamioneta, estado) {
  const fechaActual = new Date().toLocaleDateString(); // Obtener la fecha actual en formato "dd/mm/yyyy"
  localStorage.setItem(numeroCamioneta + "-estado", estado);
  localStorage.setItem(numeroCamioneta + "-fecha", fechaActual);
}

// Evento click del botón de búsqueda
const btnBuscar = document.querySelector(".search-container button");
btnBuscar.addEventListener("click", buscarCamioneta);

// Llamar a la función para cargar el estado de rotulado al cargar la página
cargarEstadoCamionetas();

