// js/calculos.js
// Funciones matemáticas básicas y avanzadas.

// Suma
function sumar(a, b) {
    return a + b;
}

// Resta
function restar(a, b) {
    return a - b;
}

// Multiplicación
function multiplicar(a, b) {
    return a * b;
}

// División con validación
function dividir(a, b) {
    if (b === 0) return "Error: no se puede dividir entre 0";
    return a / b;
}

// Potencia
function potencia(base, exp) {
    return Math.pow(base, exp);
}

// Raíz cuadrada con validación
function raiz(numero) {
    if (numero < 0) return "Error: no existe raíz real de un negativo";
    return Math.sqrt(numero);
}

// Porcentaje
function porcentaje(valor, porcentaje) {
    return (valor * porcentaje) / 100;
}

// Función general para usar en formularios
function calcular(operacion, a, b = null) {
    switch (operacion) {
        case "sumar": return sumar(a, b);
        case "restar": return restar(a, b);
        case "multiplicar": return multiplicar(a, b);
        case "dividir": return dividir(a, b);
        case "potencia": return potencia(a, b);
        case "raiz": return raiz(a);
        case "porcentaje": return porcentaje(a, b);
        default: return "Operación no reconocida";
    }
}

// Exportar para acceso global
window.Calculos = {
    sumar,
    restar,
    multiplicar,
    dividir,
    potencia,
    raiz,
    porcentaje,
    calcular
};
