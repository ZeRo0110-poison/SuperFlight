const preciosDestinos = {
  '1': 200000, // Bogotá
  '2': 100000, // Medellín
  '3': 90000, // Cali
  '4': 150000, // Cartagena
  '5': 150000 // Barranquilla
};

const preciosAsientos = {
  '1': 0, // Normal
  '2': 20000, // Ejecutivo
  '3': 40000 // VIP
};

function calcularCosto() {
  const destinoSelect = document.querySelector('#destinoSelect');
  const destinoValue = destinoSelect.value;
  const precioDestino = preciosDestinos[destinoValue] || 0;

  const pesoInputs = document.querySelectorAll('#pesoContainer input');
  let costoMaletas = 0;

  pesoInputs.forEach(input => {
      const peso = parseFloat(input.value) || 0;
      if (peso > 50) {
          const exceso = peso - 50;
          costoMaletas += exceso * 15000;
      }
  });

  const tipoAsientoSelect = document.querySelector('#tipoAsiento');
  const tipoAsientoValue = tipoAsientoSelect.value;
  const costoAsiento = preciosAsientos[tipoAsientoValue] || 0;

  const pasajerosInput = document.querySelector('#inputPasajeros');
  const numPasajeros = parseInt(pasajerosInput.value) || 1;
  const costoTotalAsientos = costoAsiento * numPasajeros;

  const costoTotal = (precioDestino * numPasajeros) + costoMaletas + costoTotalAsientos;

  return {
      costoTotal,
      costoPasaje: precioDestino * numPasajeros,
      costoMaletas,
      costoAsiento: costoTotalAsientos,
      numPasajeros
  };
}

document.querySelector('#destinoSelect').addEventListener('change', function() {
  const costoTotal = calcularCosto();
  console.log(`Costo total del viaje: $${costoTotal.costoTotal}`);
});

document.querySelector('#pesoContainer').addEventListener('input', function() {
  const costoTotal = calcularCosto();
  console.log(`Costo total del viaje: $${costoTotal.costoTotal}`);
});

document.querySelector('#inputCantidad').addEventListener('input', function() {
  const cantidad = parseInt(this.value);
  const pesoContainer = document.querySelector('#pesoContainer');

  pesoContainer.innerHTML = '';

  if (isNaN(cantidad) || cantidad <= 0) return;

  for (let i = 0; i < cantidad; i++) {
      const inputGroup = document.createElement('div');
      inputGroup.className = 'input-group mb-3';

      const span = document.createElement('span');
      span.className = 'input-group-text';
      span.id = `addon-wrapping-peso-${i}`;

      const img = document.createElement('img');
      img.src = 'images/peso.png'; 
      img.alt = '';
      img.className = 'input-icon me-2'; 

      const input = document.createElement('input');
      input.type = 'number';
      input.className = 'form-control';
      input.placeholder = `Peso de maleta ${i + 1}`;
      input.ariaLabel = `Peso de maleta ${i + 1}`; 

      span.appendChild(img);
      inputGroup.appendChild(span);
      inputGroup.appendChild(input);
      pesoContainer.appendChild(inputGroup);
  }
});

function validarCantidad(input) {
  if (input.value.length > 1) {
      input.value = input.value.slice(0, 1);
  }
}


document.querySelector('#btnCalcular').addEventListener('click', function() {
  const { costoTotal, costoPasaje, costoMaletas, costoAsiento, numPasajeros } = calcularCosto();
  const desgloseContainer = document.querySelector('#desgloseCostos');
  desgloseContainer.innerHTML = 
  `<p>Pasajes (${numPasajeros}): $${costoPasaje}</p> 
   <p>Maletas: $${costoMaletas}</p>
   <p>Asiento (${numPasajeros}): $${costoAsiento}</p> 
   <h5>Total: $${costoTotal}</h5>`;

  setTimeout(() => {
    Swal.fire({
      title: 'Tiquete Generado',
      html: `<p>Pasajes (${numPasajeros}): $${costoPasaje}</p>
             <p>Maletas: $${costoMaletas}</p>
             <p>Asiento (${numPasajeros}): $${costoAsiento}</p>
             <h5>Total: $${costoTotal}</h5>`,
      icon: 'success',
      confirmButtonText: 'Cerrar'
    });
  }, 500);
});

/*  */
  
  
  