// js/formulario_prueba.js
// Validación del formulario de prueba

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("formPrueba");
    const salida = document.getElementById("resultadoPrueba");

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const texto = document.getElementById("texto").value.trim();
        const numero = parseInt(document.getElementById("numero").value);
        const opcion = document.getElementById("opcion").value;

        let errores = [];

        if (!texto) errores.push("Debe ingresar un texto.");
        if (!numero || numero < 0) errores.push("Debe ingresar un número válido.");
        if (opcion === "") errores.push("Debe seleccionar una opción.");

        if (errores.length > 0) {
            salida.innerHTML = `
                <div style="color: #ff6b6b;">
                    <strong>Errores encontrados:</strong>
                    <ul>${errores.map(e => `<li>${e}</li>`).join("")}</ul>
                </div>
            `;
            return;
        }

        salida.innerHTML = `
            <div style="color: #6bff8f;">
                ✔ Formulario enviado correctamente<br>
                <strong>Texto:</strong> ${texto}<br>
                <strong>Número:</strong> ${numero}<br>
                <strong>Opción elegida:</strong> ${opcion}
            </div>
        `;

        form.reset();
    });
});
