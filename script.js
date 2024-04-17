const campos = document.querySelectorAll('#producto, #cantidad, #descripcion, #codigo, #cliente');
const enviarBtn = document.getElementById('enviar-btn');
const eliminarBtn = document.getElementById('eliminar-btn');
const listaPedidos = document.getElementById('tabla-pedidos');
const menu = document.querySelector('.menu');
const menuToggle = document.querySelector('.menu-toggle');
const cargarBtn = document.getElementById('cargar-btn');
const numeroInput = document.getElementById('numero');
const nombreVendedor = document.getElementById('nombre-vendedor');
const cantidadInput = document.getElementById('cantidad');
const enviar1Btn = document.getElementById('enviar1-btn');
cantidadInput.addEventListener('input', function() {
    this.value = this.value.replace(/[^0-9]/g, '');
});
const vendedores = {
  98: 'Elizabeth Crespo',
  82: 'David Escobar',
  70: 'Jorving Bastidas',
  143: 'Johana Flores',
  75: 'Irwing Bastidas',
  136: 'Edinson Mata',
  119: 'Javier Uzcategui',
  162: 'Jean Porta',
  148: 'Mo-mo-moises Gonzales',
  183: 'Joel Porta',
  113: 'Alejandro Bastidas',
};

menuToggle.addEventListener('click', function() {
  menu.classList.toggle('active');
  menuToggle.textContent = menu.classList.contains('active') ? '✕' : '☰';
});

cargarBtn.addEventListener('click', function() {
  const numero = numeroInput.value;
  const vendedor = vendedores[numero];

  if (vendedor) {
    nombreVendedor.textContent = vendedor;
    nombreVendedor.style.fontSize = '26px';
    nombreVendedor.style.fontWeight = 'bold';
  } else {
    nombreVendedor.textContent = '';
  }
});

function guardarEnCookies(nombre, valor) {
  var fecha = new Date();
  fecha.setTime(fecha.getTime() + (24*60*60*1000)); // Guardar por 24 horas
  var expira = "expires="+ fecha.toUTCString();
  document.cookie = nombre + "=" + valor + ";" + expira + ";path=/";
}

// Obtener información de las cookies
function obtenerDeCookies(nombre) {
  var nombre = nombre + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
          c = c.substring(1);
      }
      if (c.indexOf(nombre) == 0) {
          return c.substring(nombre.length, c.length);
      }
  }
  return "";
}

// Borrar información de las cookies
function borrarDeCookies(nombre) {   
  document.cookie = nombre+'=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}


function agregarPedido() {
  let todosLlenos = true;

  campos.forEach(campo => {
    if (!campo.value.trim()) {
      campo.value = 'Rellenar';
      campo.style.backgroundColor = '#ffe6e6';
      todosLlenos = false;
    } else {
      campo.style.backgroundColor = '';
    }
  });

  if (!todosLlenos) {
    alert('Por favor, complete todos los campos correctamente antes de enviar el pedido.');
    return;
  }

  const newRow = listaPedidos.insertRow();

  campos.forEach(campo => {
    const newCell = newRow.insertCell();
    newCell.textContent = campo.value;
    guardarEnCookies(campo.id, campo.value); //
    campo.value = '';
    campo.style.backgroundColor = '';
  });

  const checkboxCell = newRow.insertCell();
  checkboxCell.innerHTML = '<input type="checkbox">';
  checkboxCell.style.textAlign = 'center';

}

enviarBtn.addEventListener('click', agregarPedido);

eliminarBtn.addEventListener('click', function () {
  document.querySelectorAll('table input[type="checkbox"]').forEach(checkbox => {
    const fila = checkbox.closest('tr');
    if (checkbox.checked) fila.remove();
  });
});

campos.forEach(campo => {
  campo.addEventListener('focus', function() {
    if (this.value === 'Rellenar') {
      this.value = '';
      this.style.backgroundColor = '';
    }
  });
});


campos.forEach((campo, index) => {
  campo.addEventListener('keydown', function(event) {
      if (event.key === 'Enter') {
          event.preventDefault();
          let nextIndex = index + 1;
          if (nextIndex < campos.length) {
              campos[nextIndex].focus();
          }
      }
  });
});

function obtenerTablaModificada() {
  let tabla = document.getElementById('tabla-pedidos').cloneNode(true);
  let filas = Array.from(tabla.rows);

  // Eliminar la columna de acciones
  filas.forEach(fila => fila.deleteCell(-1));

  // Mover el nombre del vendedor al encabezado de la tabla
  let encabezado = filas[0];
  let celdaVendedor = encabezado.insertCell();
  celdaVendedor.textContent = document.getElementById('nombre-vendedor').textContent;
  celdaVendedor.style.textAlign = 'right';

  return tabla.outerHTML;
}

window.addEventListener('DOMContentLoaded', (event) => {
    campos.forEach(campo => {
        const valorGuardado = localStorage.getItem(campo.id);
        if (valorGuardado) {
            campo.value = valorGuardado;
        }
    });
});

enviar1Btn.addEventListener('click', function() {
  const tablaModificada = obtenerTablaModificada();
  // Ahora puedes usar la variable tablaModificada para hacer lo que necesites con la tabla del usuario
  campos.forEach(campo => {
    borrarDeCookies(campo.id); // Borrar la información de las cookies
  });
});



