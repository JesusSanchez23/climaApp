const resultado = document.querySelector("#resultado");
const formulario = document.querySelector("#formulario");
const container = document.querySelector(".container");

window.addEventListener("load", () => {
  formulario.addEventListener("submit", buscarClima);
});

function buscarClima(e) {
  e.preventDefault();

  // validar campos
  const ciudad = document.querySelector("#ciudad").value;
  const pais = document.querySelector("#pais").value;
  if (ciudad === "" || pais === "") {
    imprimirAlerta("Ambos campos son obligatorios");
    return;
  }
  // consultar la API
  consultarAPI(ciudad, pais);
}

function imprimirAlerta(mensaje) {
  const divAlerta = document.createElement("DIV");
  divAlerta.classList.add(
    "bg-red-100",
    "border-red-400",
    "text-red-700",
    "px-4",
    "py-3",
    "rounded",
    "max-w-md",
    "mx-auto",
    "mt-6",
    "text-center",
    "existe"
  );
  const existe = document.querySelector(".existe");

  if (!existe) {
    divAlerta.classList.add("bg-red-100", "border-red-400", "text-red-700");

    divAlerta.innerHTML = `
    <strong class="font-bold">Error!</strong>
    <span class="block">${mensaje}</span>
    `;

    setTimeout(() => {
      divAlerta.remove();
    }, 2000);
    container.appendChild(divAlerta);
  }
}

function consultarAPI(ciudad, pais) {
  const appId = "52210fc3c74b51090cf948d1e5cb8243";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;
  // Muestra un spinner de carga
  Spinner();
  fetch(url)
    .then((resultado) => resultado.json())
    .then((data) => {
      limpiarHTML();
      if (data.cod === "404") {
        imprimirAlerta("Ciudad No encontrada");
        return;
      }
      // Imprime la respuesta en el HTML
      mostrarClima(data);
    });
  // .catch((err) => console.log(err));
}

function mostrarClima(data) {
  const {
    main: { temp, temp_max, temp_min },
    name,
  } = data;
  const temperatura = kelvinACentigrados(temp);
  const temperatura_min = kelvinACentigrados(temp_min);
  const temperatura_max = kelvinACentigrados(temp_max);

  const nombreCiudad = document.createElement("p");
  nombreCiudad.textContent = `Clima en ${name}`;
  nombreCiudad.classList.add("font-bold", "text-2zl");

  const actual = document.createElement("p");
  actual.innerHTML = `${temperatura} &#8451`;
  actual.classList.add("font-bold", "text-6xl");

  const tempMaxima = document.createElement("p");
  tempMaxima.innerHTML = `Maxima: ${temperatura_max} &#8451`;
  tempMaxima.classList.add("text-xl");

  const tempMinima = document.createElement("p");
  tempMinima.innerHTML = `Minima : ${temperatura_min} &#8451`;
  tempMinima.classList.add("text-xl");

  const resultadoDiv = document.createElement("div");
  resultadoDiv.classList.add("text-center", "text-white");

  resultadoDiv.appendChild(nombreCiudad);
  resultadoDiv.appendChild(actual);
  resultadoDiv.appendChild(tempMaxima);
  resultadoDiv.appendChild(tempMinima);

  resultado.appendChild(resultadoDiv);

  formulario.reset();
}

const kelvinACentigrados = (grados) => parseInt(grados - 273.15);

function limpiarHTML() {
  while (resultado.firstChild) {
    resultado.removeChild(resultado.firstChild);
  }
}
function Spinner() {
  limpiarHTML();
  const divSpinner = document.createElement("div");
  divSpinner.classList.add("sk-fading-circle");

  divSpinner.innerHTML = `
  <div class="sk-circle1 sk-circle"></div>
  <div class="sk-circle2 sk-circle"></div>
  <div class="sk-circle3 sk-circle"></div>
  <div class="sk-circle4 sk-circle"></div>
  <div class="sk-circle5 sk-circle"></div>
  <div class="sk-circle6 sk-circle"></div>
  <div class="sk-circle7 sk-circle"></div>
  <div class="sk-circle8 sk-circle"></div>
  <div class="sk-circle9 sk-circle"></div>
  <div class="sk-circle10 sk-circle"></div>
  <div class="sk-circle11 sk-circle"></div>
  <div class="sk-circle12 sk-circle"></div>
  `;

  resultado.appendChild(divSpinner);
}
