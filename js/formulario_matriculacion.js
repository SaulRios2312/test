// js/formulario_matriculacion.js
// Validación completa del formulario de matriculación

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("formMatriculacion");
    const resultado = document.getElementById("resultadoMatricula");

    form.addEventListener("submit", (e) => {
        e.preventDefault(); // evita recargar la página

        const nombre = document.getElementById("nombre").value.trim();
        const apellido = document.getElementById("apellido").value.trim();
        const edad = parseInt(document.getElementById("edad").value);
        const email = document.getElementById("email").value.trim();
        const telefono = document.getElementById("telefono").value.trim();
        const carrera = document.getElementById("carrera").value;
        const modalidad = document.querySelector("input[name='modalidad']:checked");

        let errores = [];

        if (!nombre) errores.push("El nombre es obligatorio.");
        if (!apellido) errores.push("El apellido es obligatorio.");
        if (!edad || edad < 15) errores.push("La edad mínima es 15 años.");
        if (!email || !email.includes("@")) errores.push("El email no es válido.");
        if (!telefono || telefono.length < 6) errores.push("El número telefónico es inválido.");
        if (carrera === "") errores.push("Debe seleccionar una carrera.");
        if (!modalidad) errores.push("Debe seleccionar una modalidad.");

        if (errores.length > 0) {
            resultado.innerHTML = `
                <div style="color: #ff6b6b;">
                    <strong>Errores encontrados:</strong>
                    <ul>${errores.map(e => `<li>${e}</li>`).join("")}</ul>
                </div>
            `;
            return;
        }

        resultado.innerHTML = `
            <div style="color: #6bff8f;">
                ✔ Matriculación exitosa<br>
                <strong>Nombre:</strong> ${nombre} ${apellido}<br>
                <strong>Edad:</strong> ${edad}<br>
                <strong>Email:</strong> ${email}<br>
                <strong>Teléfono:</strong> ${telefono}<br>
                <strong>Carrera:</strong> ${carrera}<br>
                <strong>Modalidad:</strong> ${modalidad.value}
            </div>
        `;

        form.reset();
    });
});
