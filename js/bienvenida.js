// js/bienvenida.js
// Maneja el formulario de bienvenida: guarda datos, muestra saludo y lógica de edad.
// Requiere en el HTML los IDs: nombre, apellido, edad, btnSaludar, btnLimpiar, saludoResultado

(function () {
  const LS_KEY = 'tp_bienvenida_v1';

  // Elementos
  const nombreInput = document.getElementById('nombre');
  const apellidoInput = document.getElementById('apellido');
  const edadInput = document.getElementById('edad');
  const btnSaludar = document.getElementById('btnSaludar');
  const btnLimpiar = document.getElementById('btnLimpiar');
  const saludoResultado = document.getElementById('saludoResultado');

  // Helper: carga datos guardados (si existen) y completa inputs
  function cargarDesdeStorage() {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (!raw) return;
      const data = JSON.parse(raw);
      if (data.nombre) nombreInput.value = data.nombre;
      if (data.apellido) apellidoInput.value = data.apellido;
      if (data.edad !== undefined && data.edad !== null) edadInput.value = data.edad;
    } catch (e) {
      console.warn('Error leyendo storage de bienvenida', e);
    }
  }

  // Helper: guarda en localStorage
  function guardarEnStorage(obj) {
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(obj));
    } catch (e) {
      console.warn('No se pudo guardar en localStorage', e);
    }
  }

  // Construye el mensaje según la edad
  function mensajeSegunEdad(edad) {
    if (typeof edad !== 'number' || Number.isNaN(edad)) return '';
    if (edad > 20) return 'Es mayor';
    if (edad < 20) return 'Es menor';
    return 'Tienes 20 años';
  }

  // Valida campos básicos
  function validarCampos(nombre, apellido, edad) {
    if (!nombre || !apellido) {
      return { ok: false, error: 'Por favor ingresa nombre y apellido.' };
    }
    if (!Number.isInteger(edad) || edad < 0 || edad > 130) {
      return { ok: false, error: 'Ingresa una edad válida (0-130).' };
    }
    return { ok: true };
  }

  // Muestra saludo en el DOM
  function mostrarSaludo(nombre, apellido, edad) {
    const estado = mensajeSegunEdad(edad);
    const message = `
      <strong>Hola ${escapeHtml(nombre)} ${escapeHtml(apellido)}!</strong>
      <div style="margin-top:8px">
        Tienes <strong>${edad}</strong> años. <em>${estado}</em>
      </div>
    `;
    saludoResultado.innerHTML = message;
    saludoResultado.classList.remove('hidden');
  }

  // Limpia saludo e inputs
  function limpiarTodo() {
    nombreInput.value = '';
    apellidoInput.value = '';
    edadInput.value = '';
    saludoResultado.innerHTML = '';
    saludoResultado.classList.add('hidden');
    localStorage.removeItem(LS_KEY);
    // devolver foco al nombre para una nueva entrada
    nombreInput.focus();
  }

  // Evita inyección simple en el DOM
  function escapeHtml(unsafe) {
    return String(unsafe)
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#039;');
  }

  // Evento Saludar
  function handleSaludar() {
    const nombre = nombreInput.value.trim();
    const apellido = apellidoInput.value.trim();
    const edadRaw = edadInput.value;
    const edad = parseInt(edadRaw, 10);

    const v = validarCampos(nombre, apellido, edad);
    if (!v.ok) {
      saludoResultado.innerHTML = `<span style="color:#ff9b9b">${escapeHtml(v.error)}</span>`;
      saludoResultado.classList.remove('hidden');
      return;
    }

    // Guardar y mostrar
    guardarEnStorage({ nombre, apellido, edad });
    mostrarSaludo(nombre, apellido, edad);
  }

  // Inicialización
  function init() {
    if (!nombreInput || !apellidoInput || !edadInput || !btnSaludar || !btnLimpiar || !saludoResultado) {
      console.warn('Elementos de bienvenida no encontrados en el DOM.');
      return;
    }

    // Cargar valores previos si existen
    cargarDesdeStorage();

    // Eventos
    btnSaludar.addEventListener('click', handleSaludar);
    btnLimpiar.addEventListener('click', limpiarTodo);

    // Permitir Enter en cualquier input para saludar
    [nombreInput, apellidoInput, edadInput].forEach(input => {
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          handleSaludar();
        }
      });
    });
  }

  // Ejecutar cuando DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
