// js/apis.js
// Funciones centralizadas para consumir APIs.

// Función general para manejar fetch
async function solicitarAPI(url) {
    try {
        const respuesta = await fetch(url);
        if (!respuesta.ok) throw new Error("Error: " + respuesta.status);
        return await respuesta.json();
    } catch (error) {
        console.error("Error al solicitar API:", error);
        return null;
    }
}

/* -----------------------------
   API: OpenWeather
-------------------------------- */
async function obtenerClima(ciudad) {
    const API_KEY = "MI_API_KEY_REAL_AQUI";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&units=metric&lang=es&appid=${API_KEY}`;
    return await solicitarAPI(url);
}

/* -----------------------------
   API: REST Countries
-------------------------------- */
async function obtenerPais(nombrePais) {
    const url = `https://restcountries.com/v3.1/name/${nombrePais}`;
    return await solicitarAPI(url);
}

/* -----------------------------
   API: PokéAPI
-------------------------------- */
async function obtenerPokemon(nombre) {
    const url = `https://pokeapi.co/api/v2/pokemon/${nombre.toLowerCase()}`;
    return await solicitarAPI(url);
}

/* -----------------------------
   API: Rick and Morty
-------------------------------- */
async function obtenerPersonajeRickMorty(id) {
    const url = `https://rickandmortyapi.com/api/character/${id}`;
    return await solicitarAPI(url);
}

/* -----------------------------
   API: CoinGecko (no requiere key)
-------------------------------- */
async function obtenerCriptomoneda(idCripto) {
    const url = `https://api.coingecko.com/api/v3/coins/${idCripto}`;
    return await solicitarAPI(url);
}

// Exportar para uso global
window.APIS = {
    solicitarAPI,
    obtenerClima,
    obtenerPais,
    obtenerPokemon,
    obtenerPersonajeRickMorty,
    obtenerCriptomoneda
};
